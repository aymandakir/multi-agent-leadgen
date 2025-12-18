import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CampaignOrchestrator } from '@/lib/agents/orchestrator';
import { getCurrentOrganization } from '@/lib/utils/org';
import { checkCreditsAvailable, useCredits } from '@/lib/utils/credits';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const org = await getCurrentOrganization();
    if (!org) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 });
    }

    // Fetch campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .eq('organization_id', org.id)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Check credits (estimate: 4 credits per lead - source, enrich, outreach, analyze)
    const estimatedCredits = 40; // 10 leads * 4 credits
    const hasCredits = await checkCreditsAvailable(org.id, estimatedCredits);

    if (!hasCredits) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please upgrade your plan.' },
        { status: 402 }
      );
    }

    // Update campaign status
    await supabase
      .from('campaigns')
      .update({ status: 'running' })
      .eq('id', id);

    // Run campaign asynchronously
    const orchestrator = new CampaignOrchestrator();
    const result = await orchestrator.runCampaign({
      campaignId: id,
      icpConfig: campaign.icp_config as any,
      messagingTone: campaign.messaging_tone,
      goal: campaign.goal,
      leadCount: 10,
    });

    // Use credits
    await useCredits(org.id, result.creditsUsed);

    // Update campaign status
    await supabase
      .from('campaigns')
      .update({ status: result.success ? 'completed' : 'draft' })
      .eq('id', id);

    return NextResponse.json({
      success: result.success,
      leadsGenerated: result.leadsGenerated,
      creditsUsed: result.creditsUsed,
      error: result.error,
    });
  } catch (error) {
    console.error('Error running campaign:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to run campaign' },
      { status: 500 }
    );
  }
}

