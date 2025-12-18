import { createClient } from '../supabase/server';
import { Subscription } from '../types';

export async function getOrganizationCredits(organizationId: string): Promise<{
  available: number;
  used: number;
  total: number;
  resetAt: string;
  subscription: Subscription | null;
}> {
  const supabase = await createClient();
  
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('organization_id', organizationId)
    .single();

  if (!subscription) {
    return {
      available: 0,
      used: 0,
      total: 0,
      resetAt: new Date().toISOString(),
      subscription: null,
    };
  }

  // Check if credits need to be reset
  const resetAt = new Date(subscription.credits_reset_at);
  const now = new Date();
  
  if (now > resetAt) {
    // Reset credits
    const newResetDate = new Date();
    newResetDate.setMonth(newResetDate.getMonth() + 1);
    
    await supabase
      .from('subscriptions')
      .update({
        credits_used: 0,
        credits_reset_at: newResetDate.toISOString(),
      })
      .eq('id', subscription.id);

    return {
      available: subscription.monthly_credits,
      used: 0,
      total: subscription.monthly_credits,
      resetAt: newResetDate.toISOString(),
      subscription,
    };
  }

  const available = Math.max(0, subscription.monthly_credits - subscription.credits_used);

  return {
    available,
    used: subscription.credits_used,
    total: subscription.monthly_credits,
    resetAt: subscription.credits_reset_at,
    subscription,
  };
}

export async function useCredits(organizationId: string, amount: number): Promise<boolean> {
  const supabase = await createClient();
  
  const credits = await getOrganizationCredits(organizationId);
  
  if (credits.available < amount) {
    return false;
  }

  const { error } = await supabase.rpc('increment_credits_used', {
    org_id: organizationId,
    amount,
  });

  // If RPC doesn't exist, use direct update
  if (error) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('credits_used')
      .eq('organization_id', organizationId)
      .single();

    if (!subscription) {
      return false;
    }

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        credits_used: subscription.credits_used + amount,
      })
      .eq('organization_id', organizationId);

    if (updateError) {
      return false;
    }
  }

  return true;
}

export async function checkCreditsAvailable(organizationId: string, amount: number): Promise<boolean> {
  const credits = await getOrganizationCredits(organizationId);
  return credits.available >= amount;
}

