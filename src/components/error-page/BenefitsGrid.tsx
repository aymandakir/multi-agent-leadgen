'use client';

import { motion } from 'framer-motion';
import { Database, Shield, Zap, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Database,
    title: 'PostgreSQL Power',
    description: 'Enterprise-grade database with real-time subscriptions and row-level security.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Built-in Auth',
    description: 'Secure authentication and authorization out of the box with Supabase Auth.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Real-time Sync',
    description: 'Live data synchronization across all your clients with minimal latency.',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function BenefitsGrid() {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Supabase?
        </motion.h2>
        <motion.p
          className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Everything you need to build production-ready applications
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="backdrop-blur-[40px] bg-white/90 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl h-full p-8">
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

