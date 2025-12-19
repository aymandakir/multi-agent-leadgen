'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import LiveHero from '@/components/preview/LiveHero';
import DemoDashboard from '@/components/preview/DemoDashboard';
import StatsCards from '@/components/preview/StatsCards';
import AgentPerformance from '@/components/preview/AgentPerformance';
import DeployCTA from '@/components/preview/DeployCTA';
import ThemeToggle from '@/components/preview/ThemeToggle';
import { useThemeStore } from '@/lib/stores/theme-store';

const ParticleBackground = dynamic(() => import('@/components/preview/ParticleBackground'), {
  ssr: false,
});

export default function PreviewPage() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Set theme based on system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (theme === 'system') {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black">
      <ParticleBackground />
      <div className="relative z-10">
        {/* Status Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[32px] bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                leadgen-demo
              </span>
              <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href="/dashboard"
                className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Open Dashboard →
              </a>
            </div>
          </div>
        </div>

        <div className="pt-16">
          <LiveHero />
          <StatsCards />
          <DemoDashboard />
          <AgentPerformance />
          <DeployCTA />
        </div>
      </div>
    </div>
  );
}

