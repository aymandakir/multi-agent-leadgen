// AI Provider abstraction for OpenAI-compatible APIs
export interface AIProvider {
  chatCompletion(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>): Promise<string>;
}

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.openai.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async chatCompletion(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

// Factory function to create provider
export function createAIProvider(): AIProvider {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error('AI API key not configured');
  }

  const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  return new OpenAIProvider(apiKey, baseUrl);
}

