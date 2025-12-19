'use client';

import { motion } from 'framer-motion';
import { useLiveStats } from '@/hooks/useDemoData';
import { Activity, Mail, Target, TrendingUp } from 'lucide-react';

export default function StatsCards() {
  const { stats } = useLiveStats();

  const cards = [
    {
      icon: Target,
      label: 'Leads Generated',
      value: stats.totalLeads,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      label: 'Outreach Sent',
      value: stats.outreachSent,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Activity,
      label: 'Avg Score',
      value: stats.avgScore,
      color: 'from-orange-500 to-orange-600',
    },
  ];

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
          Real-Time Performance
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                className="backdrop-blur-[32px] bg-white/60 dark:bg-white/5 rounded-[24px] p-8 border border-gray-200/50 dark:border-white/10 relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-full blur-2xl`} />
                <Icon className={`w-8 h-8 mb-4 text-gray-900 dark:text-white`} />
                <motion.div
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {card.value}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {card.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

