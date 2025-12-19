'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Rocket } from 'lucide-react';

const steps = [
  { id: 1, title: 'Get Supabase Credentials', description: 'Copy your project URL and anon key from Supabase dashboard' },
  { id: 2, title: 'Add to .env.local', description: 'Paste the environment variables into your project root' },
  { id: 3, title: 'Restart Dev Server', description: 'Stop and restart your Next.js development server' },
  { id: 4, title: 'Deploy to Vercel', description: 'Add the same env vars to your Vercel project settings' },
];

export default function RocketTimeline() {
  return (
    <section className="px-4 py-16">
      <motion.div
        className="max-w-4xl mx-auto"
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
          Next Steps
        </motion.h2>

        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 dark:from-purple-400 dark:via-indigo-400 dark:to-teal-400" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 border-indigo-500 dark:border-purple-500 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-teal-400" />
                </div>

                {/* Content */}
                <div className="backdrop-blur-[40px] bg-white/90 dark:bg-white/5 rounded-[20px] p-6 border border-white/20 dark:border-white/10 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-indigo-500 dark:text-purple-400">
                      {String(step.id).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rocket at the end */}
          <motion.div
            className="relative pl-20 mt-12"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              delay: 0.5,
              type: 'spring',
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="backdrop-blur-[40px] bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-600 dark:to-indigo-600 rounded-[20px] p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-2">
                🚀 You're Ready to Launch!
              </h3>
              <p className="text-white/90 text-lg">
                Your multi-agent AI lead generation platform is ready to go.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

