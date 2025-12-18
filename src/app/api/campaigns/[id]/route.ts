import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentOrganization } from '@/lib/utils/org';

export async function GET(
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

    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .eq('organization_id', org.id)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Fetch leads
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .eq('campaign_id', id)
      .order('created_at', { ascending: false });

    // Fetch outreach drafts
    const leadIds = leads?.map(l => l.id) || [];
    const { data: drafts } = leadIds.length > 0
      ? await supabase
          .from('outreach_drafts')
          .select('*')
          .in('lead_id', leadIds)
      : { data: null };

    return NextResponse.json({
      campaign,
      leads: leads || [],
      drafts: drafts || [],
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}

