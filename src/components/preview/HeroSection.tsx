'use client';

import { motion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import { Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { stats } = useLiveStats();

  const title = 'Multi-Agent Leadgen';
  const letters = title.split('');

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black opacity-50" />
      
      <motion.div
        className="max-w-7xl w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Live Preview Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">Live Preview</span>
        </motion.div>

        {/* Staggered Title Animation */}
        <motion.h1
          className="text-[clamp(4rem,5vw,5rem)] font-black mb-6 text-black dark:text-white leading-[1.1] tracking-[-0.02em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          AI-powered lead generation with automated sourcing, enrichment, outreach, and analysis.
          See it live in action.
        </motion.p>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-8 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { label: 'Leads', value: stats.totalLeads, suffix: '' },
            { label: 'Conversion', value: stats.conversionRate, suffix: '%' },
            { label: 'Avg Score', value: stats.avgScore, suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="backdrop-blur-[20px] bg-white/10 dark:bg-white/5 rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-black dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-8 py-6 text-lg font-medium rounded-2xl"
            >
              View Dashboard
            </Button>
          </motion.a>
          <motion.a
            href="#deploy"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 dark:border-gray-700 px-8 py-6 text-lg font-medium rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Deploy Your Own
            </Button>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1 h-8 bg-gray-400 dark:bg-gray-600 rounded-full" />
      </motion.div>
    </section>
  );
}

