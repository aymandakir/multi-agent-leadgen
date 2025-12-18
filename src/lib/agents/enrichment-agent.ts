import { AIProvider } from '../ai/provider';

export interface EnrichmentData {
  email?: string;
  linkedin_url?: string;
  company_website?: string;
  company_description?: string;
  employee_count?: string;
  funding_stage?: string;
  technologies?: string[];
  recent_news?: string[];
}

export interface LeadToEnrich {
  company_name: string;
  company_size?: string;
  industry?: string;
  role: string;
  name: string;
  location?: string;
}

export class EnrichmentAgent {
  constructor(private aiProvider: AIProvider) {}

  async enrichLead(lead: LeadToEnrich): Promise<EnrichmentData> {
    // In production, this would query APIs like Clearbit, Hunter.io, LinkedIn, etc.
    // For now, we'll use AI to generate realistic enrichment data

    const prompt = `You are a lead enrichment agent. Enrich this lead with additional data:

Company: ${lead.company_name}
Company Size: ${lead.company_size || 'Unknown'}
Industry: ${lead.industry || 'Unknown'}
Role: ${lead.role}
Name: ${lead.name}
Location: ${lead.location || 'Unknown'}

Generate realistic enrichment data including:
- Email address (format: firstname.lastname@company.com or similar patterns)
- LinkedIn URL (format: linkedin.com/in/firstname-lastname)
- Company website (format: www.companyname.com)
- Company description (1-2 sentences)
- Employee count (if not provided)
- Funding stage (if applicable)
- Technologies used (array of 3-5 technologies)
- Recent news (array of 2-3 recent company news items)

Return ONLY a valid JSON object with this structure:
{
  "email": "john.doe@example.com",
  "linkedin_url": "https://linkedin.com/in/john-doe",
  "company_website": "https://www.example.com",
  "company_description": "Example Corp is a leading...",
  "employee_count": "150",
  "funding_stage": "Series B",
  "technologies": ["React", "Node.js", "AWS"],
  "recent_news": ["Raised $10M Series B", "Launched new product"]
}

Do not include any markdown formatting or explanations, just the JSON object.`;

    const response = await this.aiProvider.chatCompletion([
      {
        role: 'system',
        content: 'You are a lead enrichment expert. Generate realistic enrichment data. Always return valid JSON objects.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]);

    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const enrichment = JSON.parse(cleaned);
      return enrichment as EnrichmentData;
    } catch (error) {
      console.error('Failed to parse enrichment response:', error);
      // Return minimal enrichment
      return {
        email: `${lead.name.toLowerCase().replace(/\s+/g, '.')}@${lead.company_name.toLowerCase().replace(/\s+/g, '')}.com`,
      };
    }
  }
}

