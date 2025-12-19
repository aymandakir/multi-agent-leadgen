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
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            Multi-Agent Leadgen
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Campaigns</Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost">Settings</Button>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              ← Back to Home
            </Link>
            <form action="/api/auth/signout" method="POST">
              <Button type="submit" variant="ghost">
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

