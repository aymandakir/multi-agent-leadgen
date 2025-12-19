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
      className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Conversion Funnel</h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {stage.name}
              </span>
              <span className="text-base sm:text-lg font-semibold text-gray-900">{stage.count}</span>
            </div>
            <motion.div
              className="w-full bg-[#FF6B35] rounded-lg h-6 sm:h-8 flex items-center justify-end pr-2 sm:pr-4"
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
