'use client';

import { motion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { stats } = useLiveStats();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 relative overflow-hidden bg-gradient-to-b from-white to-[#FFF8F0]">
      <motion.div
        className="max-w-6xl w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Live Preview Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF8F0] border border-[#FF6B35]/20 text-[#FF6B35] mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Live Preview</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 text-gray-900 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Multi-Agent Leadgen
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          AI-powered lead generation with automated sourcing, enrichment, outreach, and analysis.
          See it live in action.
        </motion.p>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: 'Leads', value: stats.totalLeads, suffix: '' },
            { label: 'Conversion', value: stats.conversionRate, suffix: '%' },
            { label: 'Avg Score', value: stats.avgScore, suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-3xl md:text-4xl font-semibold text-gray-900">
                {stat.value}
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
