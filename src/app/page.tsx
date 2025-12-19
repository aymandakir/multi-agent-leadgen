'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('@/components/preview/ThemeToggle'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] bg-white/80 dark:bg-black/80 border-b border-gray-200/30 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Multi-Agent Leadgen
          </motion.div>
          <nav className="flex items-center gap-4">
            <Link href="/preview">
              <Button variant="ghost" className="hidden sm:flex">
                View Dashboard
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90">
                Get Started
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Lead Generation</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-black dark:text-white leading-tight tracking-tight">
              Automate Your Lead
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Generation Pipeline
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Multi-agent AI system that sources, enriches, personalizes, and analyzes leads at scale.
              See it live in action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/preview">
                  <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-8 py-6 text-lg font-medium rounded-2xl">
                    View Live Preview
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 dark:border-gray-700 px-8 py-6 text-lg font-medium rounded-2xl">
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: 'Source Leads',
                description: 'AI agent finds potential leads based on your Ideal Customer Profile',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Target,
                title: 'Enrich Data',
                description: 'Automatically enrich leads with emails, LinkedIn profiles, and company data',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: TrendingUp,
                title: 'Personalize Outreach',
                description: 'Generate personalized cold emails tailored to each lead',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Shield,
                title: 'Analyze & Score',
                description: 'AI analyzes lead quality and outreach effectiveness',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { value: '247+', label: 'Leads Generated' },
              { value: '23.4%', label: 'Conversion Rate' },
              { value: '84.2', label: 'Avg Lead Score' },
              { value: '4', label: 'AI Agents' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Multi-Agent Leadgen?
          </motion.h2>

          <div className="space-y-6">
            {[
              'Automated lead sourcing saves 20+ hours per week',
              'AI-powered personalization increases response rates by 3x',
              'Real-time lead scoring prioritizes your best opportunities',
              'Multi-agent orchestration handles complex workflows',
              'Enterprise-grade security and data privacy',
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-start gap-4 backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              Ready to Scale Your Lead Generation?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of companies using AI to find and connect with their ideal customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/preview">
                  <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-8 py-6 text-lg font-medium rounded-2xl">
                    View Live Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 dark:border-gray-700 px-8 py-6 text-lg font-medium rounded-2xl">
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Multi-Agent Leadgen. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
