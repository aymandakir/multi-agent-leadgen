'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/preview/HeroSection';
import DashboardGrid from '@/components/preview/DashboardGrid';
import LeadsTable from '@/components/preview/LeadsTable';
import StatusBar from '@/components/preview/StatusBar';
import { useThemeStore } from '@/lib/stores/theme-store';

const ParticleBackground = dynamic(() => import('@/components/preview/ParticleBackground'), {
  ssr: false,
});

export default function PreviewPage() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
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
    <div className="min-h-screen relative overflow-x-hidden bg-white dark:bg-black">
      <ParticleBackground />
      <StatusBar />
      <div className="relative z-10">
        <HeroSection />
        <DashboardGrid />
        <LeadsTable />
      </div>
    </div>
  );
}
