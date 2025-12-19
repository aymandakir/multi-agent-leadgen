'use client';

import { motion } from 'framer-motion';
import { Brain, Mail, Search, TrendingUp } from 'lucide-react';

const agents = [
  {
    name: 'Sourcing Agent',
    icon: Search,
    performance: 94,
    leadsGenerated: 247,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Enrichment Agent',
    icon: Brain,
    performance: 89,
    dataEnriched: 223,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Outreach Agent',
    icon: Mail,
    performance: 91,
    emailsSent: 198,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Analysis Agent',
    icon: TrendingUp,
    performance: 87,
    leadsScored: 223,
    color: 'from-orange-500 to-orange-600',
  },
];

export default function AgentPerformance() {
  return (
    <section className="px-4 py-16">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Agent Performance
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                className="backdrop-blur-[32px] bg-white/60 dark:bg-white/5 rounded-[24px] p-8 border border-gray-200/50 dark:border-white/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${agent.color} opacity-10 rounded-full blur-xl`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {agent.name}
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {agent.performance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${agent.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${agent.performance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {agent.leadsGenerated && `${agent.leadsGenerated} leads generated`}
                  {agent.dataEnriched && `${agent.dataEnriched} leads enriched`}
                  {agent.emailsSent && `${agent.emailsSent} emails sent`}
                  {agent.leadsScored && `${agent.leadsScored} leads scored`}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

