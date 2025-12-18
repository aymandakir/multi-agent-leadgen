'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCampaign } from '@/lib/types';

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateCampaign>({
    name: '',
    icp_config: {
      industry: '',
      companySize: '',
      role: '',
      geography: '',
    },
    messaging_tone: '',
    goal: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create campaign');
      }

      const { campaign } = await response.json();
      router.push(`/dashboard/campaigns/${campaign.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
          <CardDescription>Set up your lead generation campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Campaign Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Q4 Enterprise Outreach"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ideal Customer Profile (ICP)</h3>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry
                </label>
                <Input
                  id="industry"
                  value={formData.icp_config.industry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icp_config: { ...formData.icp_config, industry: e.target.value },
                    })
                  }
                  placeholder="Technology, Healthcare, Finance..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="companySize" className="text-sm font-medium">
                  Company Size
                </label>
                <Input
                  id="companySize"
                  value={formData.icp_config.companySize}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icp_config: { ...formData.icp_config, companySize: e.target.value },
                    })
                  }
                  placeholder="50-200 employees, 500+, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Target Role
                </label>
                <Input
                  id="role"
                  value={formData.icp_config.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icp_config: { ...formData.icp_config, role: e.target.value },
                    })
                  }
                  placeholder="VP of Engineering, CTO, Marketing Director..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="geography" className="text-sm font-medium">
                  Geography
                </label>
                <Input
                  id="geography"
                  value={formData.icp_config.geography}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icp_config: { ...formData.icp_config, geography: e.target.value },
                    })
                  }
                  placeholder="United States, Europe, Global..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="messagingTone" className="text-sm font-medium">
                Messaging Tone
              </label>
              <Input
                id="messagingTone"
                value={formData.messaging_tone}
                onChange={(e) => setFormData({ ...formData, messaging_tone: e.target.value })}
                placeholder="Professional, Casual, Technical, Friendly..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="goal" className="text-sm font-medium">
                Campaign Goal
              </label>
              <Input
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                placeholder="Schedule demos, Generate signups, Book meetings..."
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Campaign'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

