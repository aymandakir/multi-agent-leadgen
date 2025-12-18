import { AIProvider } from '../ai/provider';
import { ICPConfig, Lead } from '../types';

export interface OutreachDraft {
  subject: string;
  body: string;
  variant?: string;
}

export interface OutreachContext {
  lead: {
    name: string;
    role: string;
    company_name: string;
    industry?: string;
    location?: string;
    enriched_data?: Record<string, unknown>;
  };
  icpConfig: ICPConfig;
  messagingTone: string;
  goal: string;
}

export class OutreachAgent {
  constructor(private aiProvider: AIProvider) {}

  async generateOutreach(context: OutreachContext): Promise<OutreachDraft> {
    const { lead, icpConfig, messagingTone, goal } = context;

    const prompt = `You are a cold outreach email expert. Write a personalized cold email with these requirements:

Recipient: ${lead.name}, ${lead.role} at ${lead.company_name}
Company Industry: ${lead.industry || icpConfig.industry}
Location: ${lead.location || icpConfig.geography}
Messaging Tone: ${messagingTone}
Campaign Goal: ${goal}

Additional Context:
${lead.enriched_data ? JSON.stringify(lead.enriched_data, null, 2) : 'None'}

Requirements:
- Subject line should be compelling and personalized (max 60 characters)
- Email body should be concise (3-4 paragraphs max)
- Personalize based on company, role, and any available context
- Match the messaging tone specified
- Include a clear call-to-action aligned with the campaign goal
- Be professional but approachable

Return ONLY a valid JSON object with this structure:
{
  "subject": "Email subject line here",
  "body": "Email body here with proper line breaks (use \\n for new lines)"
}

Do not include any markdown formatting or explanations, just the JSON object.`;

    const response = await this.aiProvider.chatCompletion([
      {
        role: 'system',
        content: 'You are an expert cold email writer. Write compelling, personalized outreach emails. Always return valid JSON objects.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]);

    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const draft = JSON.parse(cleaned);
      
      return {
        subject: draft.subject || 'Re: Quick question',
        body: draft.body?.replace(/\\n/g, '\n') || 'Hello...',
        variant: 'default',
      };
    } catch (error) {
      console.error('Failed to parse outreach response:', error);
      // Fallback draft
      return {
        subject: `Re: ${lead.company_name}`,
        body: `Hi ${lead.name},\n\nI noticed ${lead.company_name} is in ${lead.industry || 'your industry'}. I'd love to connect.\n\nBest regards`,
        variant: 'default',
      };
    }
  }
}

