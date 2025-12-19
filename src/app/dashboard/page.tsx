import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ORG_ID } from '@/lib/org-context';
import { getOrganizationCredits } from '@/lib/utils/credits';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CampaignsList from '@/components/dashboard/campaigns-list';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const credits = await getOrganizationCredits(ORG_ID);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.email}</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>Create Campaign</Button>
        </Link>
      </div>

      {/* Credits Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Credits</CardTitle>
          <CardDescription>Your monthly lead generation credits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{credits.available}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                of {credits.total} credits remaining
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Used this month</div>
              <div className="text-lg font-semibold">{credits.used}</div>
            </div>
          </div>
          {credits.available < 50 && (
            <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
              Low credits remaining.{' '}
              <Link href="/dashboard/settings" className="underline">
                Consider upgrading your plan
              </Link>
              .
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaigns */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Campaigns</h2>
        <CampaignsList />
      </div>
    </div>
  );
}

