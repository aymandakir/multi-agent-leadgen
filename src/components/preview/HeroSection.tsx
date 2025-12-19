'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { stats } = useLiveStats();
  const reducedMotion = useReducedMotion();

  // Reduce particle count
  const particleCount = 8;

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12 relative overflow-hidden bg-gradient-to-b from-white to-[#FFF8F0]"
    >
      {/* Subtle static background particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#FF6B35]/20 rounded-full"
              style={{
                left: `${(i * 15) % 100}%`,
                top: `${(i * 20) % 100}%`,
              }}
            />
          ))}
        </div>
      )}
      <motion.div
        className="max-w-6xl w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Live Preview Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FFF8F0] border border-[#FF6B35]/20 text-[#FF6B35] mb-4 sm:mb-6 md:mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Live Preview</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 sm:mb-6 md:mb-8 text-gray-900 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Multi-Agent Leadgen
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-12 max-w-2xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          AI-powered lead generation with automated sourcing, enrichment, outreach, and analysis.
          See it live in action.
        </motion.p>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        >
          {[
            { label: 'Leads', value: stats.totalLeads, suffix: '' },
            { label: 'Conversion', value: stats.conversionRate, suffix: '%' },
            { label: 'Avg Score', value: stats.avgScore, suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8 + index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={!reducedMotion ? { 
                scale: 1.05,
                y: -4,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              } : {}}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              <div className="text-xs text-gray-600 mb-1 sm:mb-2">{stat.label}</div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
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
