import { AIProvider } from '../ai/provider';
import { OutreachDraft, Lead } from '../types';

export interface AnalysisResult {
  score: number; // 0-100
  reasoning: string;
  suggestions: string[];
  nextSteps: string[];
}

export interface AnalysisContext {
  lead: Lead;
  outreachDraft: OutreachDraft;
  icpConfig: {
    industry: string;
    companySize: string;
    role: string;
    geography: string;
  };
  goal: string;
}

export class AnalysisAgent {
  constructor(private aiProvider: AIProvider) {}

  async analyzeLead(context: AnalysisContext): Promise<AnalysisResult> {
    const { lead, outreachDraft, icpConfig, goal } = context;

    const prompt = `You are a lead scoring and analysis expert. Analyze this lead and outreach draft:

Lead:
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company_name}
- Company Size: ${lead.company_size || 'Unknown'}
- Industry: ${lead.industry || 'Unknown'}
- Location: ${lead.location || 'Unknown'}
- Email: ${lead.email || 'Not found'}
- LinkedIn: ${lead.linkedin_url || 'Not found'}

ICP Match:
- Target Industry: ${icpConfig.industry}
- Target Company Size: ${icpConfig.companySize}
- Target Role: ${icpConfig.role}
- Target Geography: ${icpConfig.geography}

Outreach Draft:
Subject: ${outreachDraft.subject}
Body: ${outreachDraft.body}

Campaign Goal: ${goal}

Provide:
1. A quality score (0-100) based on:
   - ICP match quality
   - Data completeness (email, LinkedIn, etc.)
   - Company fit
   - Role relevance
   - Outreach draft quality

2. Brief reasoning for the score

3. 2-3 suggestions to improve the lead or outreach

4. 2-3 recommended next steps

Return ONLY a valid JSON object with this structure:
{
  "score": 85,
  "reasoning": "Strong ICP match with complete data...",
  "suggestions": ["Add more personalization", "Include specific company mention"],
  "nextSteps": ["Send follow-up in 3 days", "Connect on LinkedIn"]
}

Do not include any markdown formatting or explanations, just the JSON object.`;

    const response = await this.aiProvider.chatCompletion([
      {
        role: 'system',
        content: 'You are a lead scoring expert. Analyze leads and provide actionable insights. Always return valid JSON objects.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]);

    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const analysis = JSON.parse(cleaned);
      
      return {
        score: Math.min(100, Math.max(0, analysis.score || 50)),
        reasoning: analysis.reasoning || 'Analysis completed',
        suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions : [],
        nextSteps: Array.isArray(analysis.nextSteps) ? analysis.nextSteps : [],
      };
    } catch (error) {
      console.error('Failed to parse analysis response:', error);
      // Fallback analysis
      return {
        score: 50,
        reasoning: 'Analysis completed with default scoring',
        suggestions: ['Review lead data', 'Personalize outreach'],
        nextSteps: ['Send email', 'Follow up'],
      };
    }
  }
}

