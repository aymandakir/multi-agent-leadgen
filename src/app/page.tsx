'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does the multi-agent system work?',
      answer: 'Our platform uses four specialized AI agents working in orchestration: a Sourcing Agent finds leads based on your ICP, an Enrichment Agent gathers contact data and company information, an Outreach Agent generates personalized emails, and an Analysis Agent scores leads and optimizes campaigns.',
    },
    {
      question: 'What data sources do you use for lead enrichment?',
      answer: 'We integrate with LinkedIn, company databases, email verification services, and public web data to enrich leads with accurate contact information, company details, and social profiles.',
    },
    {
      question: 'Can I customize the AI-generated outreach emails?',
      answer: 'Yes, you can set your messaging tone, brand voice, and specific talking points. The AI will personalize each email while maintaining your style and including your key messages.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Clean and minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            className="text-2xl font-semibold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Multi-Agent Leadgen
          </motion.div>
          <nav className="flex items-center gap-6">
            <Link href="/preview" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              View Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Spacious and warm */}
      <section className="pt-40 pb-32 px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF8F0]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 text-gray-900 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create a lead generation
              <br />
              <span className="text-[#FF6B35]">without limits</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Bring your sales pipeline to life with AI-powered multi-agent automation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/preview">
                <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-6 text-lg font-medium rounded-lg h-auto">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/preview">
                <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-medium rounded-lg h-auto">
                  View Dashboard
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Start for free. No credit card required.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Clean grid */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-5xl md:text-6xl font-semibold mb-6 text-center text-gray-900 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Source Leads',
                description: 'AI agent finds potential leads based on your Ideal Customer Profile',
                color: 'text-[#FF6B35]',
              },
              {
                icon: Target,
                title: 'Enrich Data',
                description: 'Automatically enrich leads with emails, LinkedIn profiles, and company data',
                color: 'text-[#FF6B35]',
              },
              {
                icon: TrendingUp,
                title: 'Personalize Outreach',
                description: 'Generate personalized cold emails tailored to each lead',
                color: 'text-[#FF6B35]',
              },
              {
                icon: Shield,
                title: 'Analyze & Score',
                description: 'AI analyzes lead quality and outreach effectiveness',
                color: 'text-[#FF6B35]',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-[#FFF8F0] rounded-2xl p-8 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 ${feature.color} mb-6`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Minimal */}
      <section className="py-24 px-6 lg:px-8 bg-[#F8F8F8]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
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
                <div className="text-5xl md:text-6xl font-semibold mb-3 text-gray-900">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Clean list */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-5xl md:text-6xl font-semibold mb-16 text-center text-gray-900"
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
                className="flex items-start gap-4 bg-[#FFF8F0] rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 lg:px-8 bg-[#F8F8F8]">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            className="text-5xl md:text-6xl font-semibold mb-16 text-center text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-400">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF8F0]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-gray-900">
              Your vision. Your goals. Your pipeline.
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of companies using AI to find and connect with their ideal customers.
            </p>
            <Link href="/preview">
              <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-10 py-7 text-lg font-medium rounded-lg h-auto">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
