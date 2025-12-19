import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCurrentOrganization } from '@/lib/utils/org';
import { Campaign, Lead, OutreachDraft } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CampaignDetailClient from '@/components/dashboard/campaign-detail-client';

async function getCampaignData(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/campaigns/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const data = await getCampaignData(id);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p>Campaign not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { campaign, leads, drafts } = data as {
    campaign: Campaign;
    leads: Lead[];
    drafts: OutreachDraft[];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{campaign.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {campaign.icp_config.industry} • {campaign.icp_config.role} • {campaign.status}
        </p>
      </div>

      <CampaignDetailClient campaign={campaign} leads={leads} drafts={drafts} />
    </div>
  );
}

