'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Sparkles, Zap, Target, TrendingUp, Shield, CheckCircle2, 
  Users, Building2, BarChart3, Globe, Lock, Clock, Mail, Brain, 
  Code, Database, Settings, Rocket, Star, Quote, ChevronDown
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ThemeToggle = dynamic(() => import('@/components/preview/ThemeToggle'), { ssr: false });

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
    {
      question: 'How accurate is the lead scoring system?',
      answer: 'Our AI analyzes multiple factors including company fit, contact quality, engagement likelihood, and historical conversion data. The scoring model continuously improves based on your campaign results.',
    },
    {
      question: 'What integrations are available?',
      answer: 'We integrate with popular CRM platforms (Salesforce, HubSpot), email tools (Gmail, Outlook), marketing automation platforms, and data enrichment services. Full API access is available for custom integrations.',
    },
    {
      question: 'Is my data secure and compliant?',
      answer: 'Yes, we use enterprise-grade encryption, SOC 2 compliance, GDPR compliance, and regular security audits. Your data is stored securely and never shared with third parties.',
    },
  ];

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
              <span className="text-sm font-medium">AI-Powered Lead Generation Platform</span>
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
              Transform your sales pipeline with intelligent automation.
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
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Four specialized AI agents work together to automate your entire lead generation process
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: 'Source Leads',
                description: 'AI agent finds potential leads based on your Ideal Customer Profile, industry, company size, and location',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Target,
                title: 'Enrich Data',
                description: 'Automatically enrich leads with emails, LinkedIn profiles, company data, and firmographic information',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: TrendingUp,
                title: 'Personalize Outreach',
                description: 'Generate personalized cold emails tailored to each lead, incorporating your brand voice and messaging',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Shield,
                title: 'Analyze & Score',
                description: 'AI analyzes lead quality, outreach effectiveness, and provides actionable insights for optimization',
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
              { value: '247+', label: 'Leads Generated', icon: Users },
              { value: '23.4%', label: 'Conversion Rate', icon: TrendingUp },
              { value: '84.2', label: 'Avg Lead Score', icon: BarChart3 },
              { value: '4', label: 'AI Agents', icon: Brain },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built for Every Team
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Whether you're a startup or enterprise, our platform scales with your needs
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Startups & SMBs',
                description: 'Get started quickly with automated lead generation. No large sales team required.',
                features: ['Quick setup', 'Affordable pricing', 'Essential features'],
              },
              {
                icon: Building2,
                title: 'Growing Companies',
                description: 'Scale your sales pipeline as you grow. Advanced features for expanding teams.',
                features: ['Team collaboration', 'Advanced analytics', 'Custom workflows'],
              },
              {
                icon: Globe,
                title: 'Enterprises',
                description: 'Enterprise-grade security, compliance, and dedicated support for large organizations.',
                features: ['SSO & security', 'Dedicated support', 'Custom integrations'],
              },
            ].map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={useCase.title}
                  className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
              { icon: Clock, text: 'Automated lead sourcing saves 20+ hours per week' },
              { icon: Mail, text: 'AI-powered personalization increases response rates by 3x' },
              { icon: Target, text: 'Real-time lead scoring prioritizes your best opportunities' },
              { icon: Brain, text: 'Multi-agent orchestration handles complex workflows' },
              { icon: Lock, text: 'Enterprise-grade security and data privacy' },
              { icon: Database, text: 'Seamless CRM integrations and data sync' },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  className="flex items-start gap-4 backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 pt-2">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Integrations That Work
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Connect with the tools you already use
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Salesforce', 'HubSpot', 'Gmail', 'Outlook', 'Slack', 'Zapier', 'API', 'Webhooks'].map((integration, index) => (
              <motion.div
                key={integration}
                className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-xl p-6 border border-white/10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-semibold text-black dark:text-white">{integration}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by Teams Worldwide
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Multi-Agent Leadgen transformed our sales pipeline. We went from manual prospecting to automated lead generation in days.',
                author: 'Sarah Chen',
                role: 'VP of Sales, TechCorp',
                rating: 5,
              },
              {
                quote: 'The AI personalization is incredible. Our email response rates tripled within the first month.',
                author: 'Michael Rodriguez',
                role: 'Founder, Growth Labs',
                rating: 5,
              },
              {
                quote: 'Enterprise-grade security and seamless CRM integration made this a no-brainer for our team.',
                author: 'Emily Johnson',
                role: 'Sales Operations, Enterprise Inc',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-black dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-black dark:text-white"
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
                className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-black dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Multi-Agent Leadgen
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered lead generation platform for modern sales teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black dark:text-white">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/preview" className="hover:text-gray-900 dark:hover:text-white">Features</Link></li>
                <li><Link href="/preview" className="hover:text-gray-900 dark:hover:text-white">Pricing</Link></li>
                <li><Link href="/preview" className="hover:text-gray-900 dark:hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black dark:text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black dark:text-white">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Multi-Agent Leadgen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
