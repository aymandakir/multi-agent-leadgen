'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroError from '@/components/error-page/HeroError';
import QuickFixCard from '@/components/error-page/QuickFixCard';
import EnvValidator from '@/components/error-page/EnvValidator';
import BenefitsGrid from '@/components/error-page/BenefitsGrid';
import RocketTimeline from '@/components/error-page/RocketTimeline';
import SupportSection from '@/components/error-page/SupportSection';
import { useThemeStore } from '@/lib/stores/theme-store';

// Dynamically import particles to avoid SSR issues
const ParticleBackground = dynamic(() => import('@/components/error-page/ParticleBackground'), {
  ssr: false,
});

export default function SupabaseSetupPage() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Set theme based on system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      useThemeStore.setState({ theme: e.matches ? 'dark' : 'light' });
    };

    if (theme === 'system') {
      useThemeStore.setState({ theme: mediaQuery.matches ? 'dark' : 'light' });
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <HeroError />
        <QuickFixCard />
        <EnvValidator />
        <BenefitsGrid />
        <RocketTimeline />
        <SupportSection />
      </div>
    </div>
  );
}

