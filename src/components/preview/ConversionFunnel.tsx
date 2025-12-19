'use client';

import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

interface ConversionFunnelProps {
  stats: {
    totalLeads: number;
    conversionRate: number;
  };
}

export default function ConversionFunnel({ stats }: ConversionFunnelProps) {
  const stages = [
    { name: 'Sourced', count: stats.totalLeads, width: 100 },
    { name: 'Qualified', count: Math.round(stats.totalLeads * 0.6), width: 60 },
    { name: 'Contacted', count: Math.round(stats.totalLeads * 0.4), width: 40 },
    { name: 'Converted', count: Math.round(stats.totalLeads * (stats.conversionRate / 100)), width: stats.conversionRate },
  ];

  return (
    <motion.div
      className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10 h-full"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-white">Conversion Funnel</h3>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stage.name}
              </span>
              <span className="text-lg font-bold text-black dark:text-white">{stage.count}</span>
            </div>
            <motion.div
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg h-8 flex items-center justify-end pr-4"
              initial={{ width: 0 }}
              whileInView={{ width: `${stage.width}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <span className="text-xs font-medium text-white">{stage.width}%</span>
            </motion.div>
            {index < stages.length - 1 && (
              <motion.div
                className="flex justify-center my-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <ArrowDown className="w-4 h-4 text-gray-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

