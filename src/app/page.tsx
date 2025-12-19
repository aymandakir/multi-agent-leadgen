import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">LeadGen AI</div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
          Multi-Agent AI Lead Generation
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          Automate your lead generation with AI agents that source, enrich, personalize, and analyze leads at scale.
        </p>
          <div className="flex gap-4">
            <Link href="/preview">
              <Button size="lg">View Live Preview</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>1. Source Leads</CardTitle>
                <CardDescription>
                  AI agent finds potential leads based on your Ideal Customer Profile (ICP)
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2. Enrich Data</CardTitle>
                <CardDescription>
                  Automatically enrich leads with emails, LinkedIn profiles, and company data
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3. Personalize Outreach</CardTitle>
                <CardDescription>
                  Generate personalized cold emails tailored to each lead and your messaging tone
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>4. Analyze & Score</CardTitle>
                <CardDescription>
                  AI analyzes lead quality and outreach effectiveness, providing actionable insights
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Pricing</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for small teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li>✓ 500 leads/month</li>
                  <li>✓ Basic enrichment</li>
                  <li>✓ Email outreach drafts</li>
                  <li>✓ Lead scoring</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li>✓ 2,000 leads/month</li>
                  <li>✓ Advanced enrichment</li>
                  <li>✓ Multiple outreach variants</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Priority support</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 text-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to scale your lead generation?</h2>
          <p className="mb-8 text-gray-400">
            Join thousands of companies using AI to find and connect with their ideal customers.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="bg-white text-black hover:bg-gray-200">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 LeadGen AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
