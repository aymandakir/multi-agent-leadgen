'use client';

import { motion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import LeadsPipeline from './LeadsPipeline';
import AgentPerformance from './AgentPerformance';
import ConversionFunnel from './ConversionFunnel';

export default function DashboardGrid() {
  const { stats } = useLiveStats();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-black dark:text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live Dashboard
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <LeadsPipeline stats={stats} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AgentPerformance />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ConversionFunnel stats={stats} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

