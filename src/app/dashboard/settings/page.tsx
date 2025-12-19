import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ORG_ID } from '@/lib/org-context';
import { getOrganizationCredits } from '@/lib/utils/credits';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SubscriptionSettings from '@/components/dashboard/subscription-settings';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const credits = await getOrganizationCredits(ORG_ID);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <div className="space-y-6">
        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription and credits</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionSettings credits={credits} />
          </CardContent>
        </Card>

        {/* Credits Card */}
        <Card>
          <CardHeader>
            <CardTitle>Credits</CardTitle>
            <CardDescription>Your current credit usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Available Credits</span>
                <span className="text-2xl font-bold">{credits.available}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Used This Month</span>
                <span className="text-lg font-semibold">{credits.used}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Monthly Credits</span>
                <span className="text-lg font-semibold">{credits.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Resets On</span>
                <span className="text-sm">{new Date(credits.resetAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

