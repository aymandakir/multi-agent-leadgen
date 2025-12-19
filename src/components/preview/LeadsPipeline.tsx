'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';

interface LeadsPipelineProps {
  stats: {
    totalLeads: number;
    conversionRate: number;
    avgScore: number;
  };
}

export default function LeadsPipeline({ stats }: LeadsPipelineProps) {
  const pipeline = [
    { stage: 'Sourced', count: stats.totalLeads, color: 'bg-[#FF6B35]' },
    { stage: 'Qualified', count: Math.round(stats.totalLeads * 0.4), color: 'bg-[#FF6B35]/80' },
    { stage: 'Contacted', count: Math.round(stats.totalLeads * 0.25), color: 'bg-[#FF6B35]/60' },
  ];

  return (
    <motion.div
      className="bg-[#FFF8F0] rounded-2xl p-8 border border-gray-100 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">Leads Pipeline</h3>
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
              <span className="text-sm font-medium text-gray-600">
                {item.stage}
              </span>
              <span className="text-lg font-semibold text-gray-900">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${item.color} rounded-full`}
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
        className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600"
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
