'use client';

import { useState } from 'react';
import { Subscription } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface SubscriptionSettingsProps {
  credits: {
    available: number;
    used: number;
    total: number;
    resetAt: string;
    subscription: Subscription | null;
  };
}

export default function SubscriptionSettings({ credits }: SubscriptionSettingsProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (plan: 'starter' | 'pro') => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const currentPlan = credits.subscription?.plan || 'free';

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm font-medium">Current Plan</div>
        <div className="text-lg font-semibold capitalize">{currentPlan}</div>
        {credits.subscription?.status && (
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Status: <span className="capitalize">{credits.subscription.status}</span>
          </div>
        )}
      </div>

      {currentPlan === 'free' && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Upgrade Plan</div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleUpgrade('starter')}
              disabled={loading}
              variant="outline"
            >
              Upgrade to Starter ($49/mo)
            </Button>
            <Button
              onClick={() => handleUpgrade('pro')}
              disabled={loading}
            >
              Upgrade to Pro ($149/mo)
            </Button>
          </div>
        </div>
      )}

      {currentPlan !== 'free' && (
        <Button onClick={handleManageBilling} disabled={loading} variant="outline">
          {loading ? 'Loading...' : 'Manage Billing'}
        </Button>
      )}
    </div>
  );
}

