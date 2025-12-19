import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
          <Link href="/" className="text-lg sm:text-xl font-bold truncate">
            Multi-Agent Leadgen
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                Campaigns
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                Settings
              </Button>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium whitespace-nowrap">
              ← Back
            </Link>
            <form action="/api/auth/signout" method="POST">
              <Button type="submit" variant="ghost" className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                Sign Out
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

