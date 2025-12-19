'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/preview/HeroSection';
import DashboardGrid from '@/components/preview/DashboardGrid';
import LeadsTable from '@/components/preview/LeadsTable';
import StatusBar from '@/components/preview/StatusBar';

export default function PreviewPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-white">
      <StatusBar />
      <div className="relative z-10">
        <HeroSection />
        <DashboardGrid />
        <LeadsTable />
      </div>
    </div>
  );
}
