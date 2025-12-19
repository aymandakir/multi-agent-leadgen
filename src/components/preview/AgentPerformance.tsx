'use client';

import { motion } from 'framer-motion';
import SparklineChart from './SparklineChart';
import { Search, Brain, Mail, TrendingUp } from 'lucide-react';

const agents = [
  {
    name: 'Sourcing',
    icon: Search,
    performance: 94,
    data: [85, 88, 90, 92, 91, 93, 94],
  },
  {
    name: 'Enrichment',
    icon: Brain,
    performance: 89,
    data: [82, 85, 87, 88, 89, 88, 89],
  },
  {
    name: 'Outreach',
    icon: Mail,
    performance: 91,
    data: [86, 88, 89, 90, 91, 90, 91],
  },
  {
    name: 'Analysis',
    icon: TrendingUp,
    performance: 87,
    data: [83, 85, 86, 87, 86, 87, 87],
  },
];

export default function AgentPerformance() {
  return (
    <motion.div
      className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Agent Performance</h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{agent.name}</span>
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0 ml-2">
                  {agent.performance}%
                </span>
              </div>
              <div className="h-12 mb-2">
                <SparklineChart data={agent.data} color="#FF6B35" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-[#FF6B35] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${agent.performance}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
