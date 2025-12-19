import { createAIProvider } from '../ai/provider';
import { SourcingAgent } from './sourcing-agent';
import { EnrichmentAgent } from './enrichment-agent';
import { OutreachAgent } from './outreach-agent';
import { AnalysisAgent } from './analysis-agent';
import { ICPConfig, Campaign, Lead, OutreachDraft } from '../types';
import { createClient } from '../supabase/server';
import { ORG_ID } from '../org-context';

export interface CampaignRunConfig {
  campaignId: string;
  icpConfig: ICPConfig;
  messagingTone: string;
  goal: string;
  leadCount?: number;
}

export interface CampaignRunResult {
  success: boolean;
  leadsGenerated: number;
  creditsUsed: number;
  error?: string;
}

export class CampaignOrchestrator {
  private sourcingAgent: SourcingAgent;
  private enrichmentAgent: EnrichmentAgent;
  private outreachAgent: OutreachAgent;
  private analysisAgent: AnalysisAgent;

  constructor() {
    const aiProvider = createAIProvider();
    this.sourcingAgent = new SourcingAgent(aiProvider);
    this.enrichmentAgent = new EnrichmentAgent(aiProvider);
    this.outreachAgent = new OutreachAgent(aiProvider);
    this.analysisAgent = new AnalysisAgent(aiProvider);
  }

  async runCampaign(config: CampaignRunConfig): Promise<CampaignRunResult> {
    const supabase = await createClient();
    const leadCount = config.leadCount || 10;
    let creditsUsed = 0;
    let leadsGenerated = 0;

    try {
      // Create campaign run record
      const { data: runRecord, error: runError } = await supabase
        .from('campaign_runs')
        .insert({
          campaign_id: config.campaignId,
          status: 'running',
          leads_generated: 0,
          credits_used: 0,
          organization_id: ORG_ID,
        })
        .select()
        .single();

      if (runError || !runRecord) {
        throw new Error(`Failed to create campaign run: ${runError?.message}`);
      }

      // Step 1: Source leads
      console.log('Step 1: Sourcing leads...');
      const sourcingResult = await this.sourcingAgent.sourceLeads(config.icpConfig, leadCount);
      creditsUsed += leadCount; // 1 credit per lead sourced

      // Step 2-4: Process each lead through enrichment, outreach, and analysis
      for (const sourcedLead of sourcingResult.leads) {
        try {
          // Step 2: Enrich lead
          console.log(`Step 2: Enriching lead for ${sourcedLead.name}...`);
          const enrichmentData = await this.enrichmentAgent.enrichLead(sourcedLead);
          creditsUsed += 1; // 1 credit for enrichment

          // Create lead record
          const { data: lead, error: leadError } = await supabase
            .from('leads')
            .insert({
              campaign_id: config.campaignId,
              company_name: sourcedLead.company_name,
              company_size: sourcedLead.company_size || null,
              industry: sourcedLead.industry || null,
              role: sourcedLead.role,
              name: sourcedLead.name,
              email: enrichmentData.email || null,
              linkedin_url: enrichmentData.linkedin_url || null,
              location: sourcedLead.location || null,
              enriched_data: enrichmentData as Record<string, unknown>,
              organization_id: ORG_ID,
            })
            .select()
            .single();

          if (leadError || !lead) {
            console.error(`Failed to create lead: ${leadError?.message}`);
            continue;
          }

          // Record enrichment event
          await supabase.from('lead_events').insert({
            lead_id: lead.id,
            event_type: 'enriched',
            metadata: { enrichment_data: enrichmentData },
          });

          // Step 3: Generate outreach draft
          console.log(`Step 3: Generating outreach for ${lead.name}...`);
          const outreachDraft = await this.outreachAgent.generateOutreach({
            lead: {
              name: lead.name,
              role: lead.role,
              company_name: lead.company_name,
              industry: lead.industry || undefined,
              location: lead.location || undefined,
              enriched_data: lead.enriched_data as Record<string, unknown> | undefined,
            },
            icpConfig: config.icpConfig,
            messagingTone: config.messagingTone,
            goal: config.goal,
          });
          creditsUsed += 1; // 1 credit for outreach generation

          // Save outreach draft
          const { data: draft, error: draftError } = await supabase
            .from('outreach_drafts')
            .insert({
              lead_id: lead.id,
              subject: outreachDraft.subject,
              body: outreachDraft.body,
              variant: outreachDraft.variant || 'default',
              organization_id: ORG_ID,
            })
            .select()
            .single();

          if (draftError) {
            console.error(`Failed to save outreach draft: ${draftError.message}`);
          }

          // Record outreach event
          await supabase.from('lead_events').insert({
            lead_id: lead.id,
            event_type: 'outreach_generated',
            metadata: { draft_id: draft?.id },
          });

          // Step 4: Analyze and score lead
          console.log(`Step 4: Analyzing lead ${lead.name}...`);
          
          // Use saved draft from DB if available, otherwise create minimal draft for analysis
          const draftForAnalysis: OutreachDraft = draft
            ? {
                id: draft.id,
                lead_id: draft.lead_id,
                subject: draft.subject,
                body: draft.body,
                variant: draft.variant || 'default',
                score: draft.score,
                created_at: draft.created_at,
              }
            : {
                id: '', // Temporary ID, will be updated after analysis
                lead_id: lead.id,
                subject: outreachDraft.subject,
                body: outreachDraft.body,
                variant: outreachDraft.variant || 'default',
                score: null,
                created_at: new Date().toISOString(),
              };
          
          const analysis = await this.analysisAgent.analyzeLead({
            lead,
            outreachDraft: draftForAnalysis,
            icpConfig: config.icpConfig,
            goal: config.goal,
          });
          creditsUsed += 1; // 1 credit for analysis

          // Update lead with score
          await supabase
            .from('leads')
            .update({ score: analysis.score })
            .eq('id', lead.id)
            .eq('organization_id', ORG_ID);

          // Update outreach draft with score
          if (draft) {
            await supabase
              .from('outreach_drafts')
              .update({ score: analysis.score })
              .eq('id', draft.id)
              .eq('organization_id', ORG_ID);
          }

          // Record analysis event
          await supabase.from('lead_events').insert({
            lead_id: lead.id,
            event_type: 'analyzed',
            metadata: {
              score: analysis.score,
              reasoning: analysis.reasoning,
              suggestions: analysis.suggestions,
              nextSteps: analysis.nextSteps,
            },
          });

          leadsGenerated++;
        } catch (error) {
          console.error(`Error processing lead ${sourcedLead.name}:`, error);
          // Continue with next lead
        }
      }

      // Update campaign run as completed
      await supabase
        .from('campaign_runs')
        .update({
          status: 'completed',
          leads_generated: leadsGenerated,
          credits_used: creditsUsed,
          completed_at: new Date().toISOString(),
        })
        .eq('id', runRecord.id)
        .eq('organization_id', ORG_ID);

      return {
        success: true,
        leadsGenerated,
        creditsUsed,
      };
    } catch (error) {
      console.error('Campaign run error:', error);
      return {
        success: false,
        leadsGenerated,
        creditsUsed,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

