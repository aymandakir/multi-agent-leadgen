import { createClient } from '../supabase/server';
import { Organization, Member } from '../types';

export async function getUserOrganizations(): Promise<Organization[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const { data: members } = await supabase
    .from('members')
    .select('organization_id')
    .eq('user_id', user.id);

  if (!members || members.length === 0) {
    return [];
  }

  const orgIds = members.map(m => m.organization_id);
  const { data: organizations } = await supabase
    .from('organizations')
    .select('*')
    .in('id', orgIds);

  return organizations || [];
}

export async function getCurrentOrganization(): Promise<Organization | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  // Get user's first organization (in production, you'd use a selected org from session)
  const { data: members } = await supabase
    .from('members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!members) {
    return null;
  }

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', members.organization_id)
    .single();

  return org;
}

export async function createOrganization(name: string): Promise<Organization> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Create organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name,
      slug: `${slug}-${Date.now()}`, // Ensure uniqueness
    })
    .select()
    .single();

  if (orgError || !org) {
    throw new Error(`Failed to create organization: ${orgError?.message}`);
  }

  // Add user as owner
  const { error: memberError } = await supabase
    .from('members')
    .insert({
      user_id: user.id,
      organization_id: org.id,
      role: 'owner',
    });

  if (memberError) {
    throw new Error(`Failed to add member: ${memberError.message}`);
  }

  // Create default subscription (free tier)
  const resetDate = new Date();
  resetDate.setMonth(resetDate.getMonth() + 1);

  await supabase
    .from('subscriptions')
    .insert({
      organization_id: org.id,
      stripe_customer_id: `temp_${org.id}`, // Will be updated when Stripe customer is created
      plan: 'starter',
      status: 'active',
      monthly_credits: 100, // Default free tier
      credits_used: 0,
      credits_reset_at: resetDate.toISOString(),
    });

  return org;
}

