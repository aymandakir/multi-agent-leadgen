'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Target } from 'lucide-react';

interface LeadsPipelineProps {
  stats: {
    totalLeads: number;
    conversionRate: number;
    avgScore: number;
  };
}

export default function LeadsPipeline({ stats }: LeadsPipelineProps) {
  const pipeline = [
    { stage: 'Sourced', count: stats.totalLeads, color: 'from-blue-500 to-blue-600' },
    { stage: 'Qualified', count: Math.round(stats.totalLeads * 0.4), color: 'from-purple-500 to-purple-600' },
    { stage: 'Contacted', count: Math.round(stats.totalLeads * 0.25), color: 'from-green-500 to-green-600' },
  ];

  return (
    <motion.div
      className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10 h-full"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-white">Leads Pipeline</h3>
      </div>

      <div className="space-y-6">
        {pipeline.map((item, index) => (
          <motion.div
            key={item.stage}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.stage}
              </span>
              <span className="text-lg font-bold text-black dark:text-white">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.count / stats.totalLeads) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <TrendingUp className="w-4 h-4" />
        <span>{stats.conversionRate}% conversion rate</span>
      </motion.div>
    </motion.div>
  );
}

