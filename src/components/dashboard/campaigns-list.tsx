'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Campaign } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.campaigns || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching campaigns:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">No campaigns yet</p>
          <Link href="/dashboard/campaigns/new">
            <Button>Create Your First Campaign</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
              <CardDescription>
                {campaign.icp_config.industry} • {campaign.icp_config.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-sm px-2 py-1 rounded ${
                  campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'running' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

