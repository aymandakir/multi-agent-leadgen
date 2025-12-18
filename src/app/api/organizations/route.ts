import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOrganization } from '@/lib/utils/org';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 });
    }

    const org = await createOrganization(name);

    return NextResponse.json({ organization: org });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create organization' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: members } = await supabase
      .from('members')
      .select('organization_id')
      .eq('user_id', user.id);

    if (!members || members.length === 0) {
      return NextResponse.json({ organizations: [] });
    }

    const orgIds = members.map(m => m.organization_id);
    const { data: organizations } = await supabase
      .from('organizations')
      .select('*')
      .in('id', orgIds);

    return NextResponse.json({ organizations: organizations || [] });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

