'use client';

import { motion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import LeadsPipeline from './LeadsPipeline';
import AgentPerformance from './AgentPerformance';
import ConversionFunnel from './ConversionFunnel';

export default function DashboardGrid() {
  const { stats } = useLiveStats();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-12 sm:mb-16 md:mb-20 text-center text-gray-900 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            style={{ willChange: 'transform' }}
          >
            <LeadsPipeline stats={stats} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            style={{ willChange: 'transform' }}
          >
            <AgentPerformance />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            style={{ willChange: 'transform' }}
          >
            <ConversionFunnel stats={stats} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
