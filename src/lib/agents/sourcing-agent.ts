import { AIProvider } from '../ai/provider';
import { ICPConfig, Lead } from '../types';

export interface SourcingResult {
  leads: Array<{
    company_name: string;
    company_size?: string;
    industry?: string;
    role: string;
    name: string;
    location?: string;
  }>;
}

export class SourcingAgent {
  constructor(private aiProvider: AIProvider) {}

  async sourceLeads(icpConfig: ICPConfig, count: number = 10): Promise<SourcingResult> {
    // In production, this would query external APIs (Clearbit, Apollo, etc.)
    // For now, we'll use AI to generate mock leads based on ICP
    
    const prompt = `You are a lead sourcing agent. Generate ${count} potential leads based on this Ideal Customer Profile (ICP):

Industry: ${icpConfig.industry}
Company Size: ${icpConfig.companySize}
Target Role: ${icpConfig.role}
Geography: ${icpConfig.geography}

For each lead, provide:
- Company name (real or realistic company names)
- Company size (if available)
- Industry (if different from ICP)
- Role/title
- Person's name (realistic names)
- Location (city, country)

Return ONLY a valid JSON array with this structure:
[
  {
    "company_name": "Example Corp",
    "company_size": "50-200",
    "industry": "Technology",
    "role": "VP of Engineering",
    "name": "John Doe",
    "location": "San Francisco, USA"
  }
]

Do not include any markdown formatting or explanations, just the JSON array.`;

    const response = await this.aiProvider.chatCompletion([
      {
        role: 'system',
        content: 'You are a lead sourcing expert. Generate realistic leads based on ICP criteria. Always return valid JSON arrays.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]);

    try {
      // Clean response (remove markdown code blocks if present)
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const leads = JSON.parse(cleaned);
      
      return { leads: Array.isArray(leads) ? leads : [] };
    } catch (error) {
      console.error('Failed to parse sourcing response:', error);
      // Fallback: return empty array
      return { leads: [] };
    }
  }
}

