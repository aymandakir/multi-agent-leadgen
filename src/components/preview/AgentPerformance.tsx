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
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Enrichment',
    icon: Brain,
    performance: 89,
    data: [82, 85, 87, 88, 89, 88, 89],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Outreach',
    icon: Mail,
    performance: 91,
    data: [86, 88, 89, 90, 91, 90, 91],
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Analysis',
    icon: TrendingUp,
    performance: 87,
    data: [83, 85, 86, 87, 86, 87, 87],
    color: 'from-orange-500 to-orange-600',
  },
];

export default function AgentPerformance() {
  return (
    <motion.div
      className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10 h-full"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-white">Agent Performance</h3>
      </div>

      <div className="space-y-6">
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
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-black dark:text-white">{agent.name}</span>
                </div>
                <span className="text-lg font-bold text-black dark:text-white">
                  {agent.performance}%
                </span>
              </div>
              <div className="h-12 mb-2">
                <SparklineChart data={agent.data} color={agent.color} />
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${agent.color} rounded-full`}
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
