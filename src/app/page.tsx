'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Sparkles, Zap, Target, TrendingUp, Shield, CheckCircle2 
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  // Disable parallax on mobile and reduced motion
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    reducedMotion || isMobile ? ['0%', '0%'] : ['0%', '50%']
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Multi-Agent Leadgen
          </motion.div>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link href="/preview" className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors font-medium whitespace-nowrap">
              View Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF8F0] relative overflow-hidden"
      >
        {/* Animated background elements - optimized for mobile */}
        {!reducedMotion && (
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ opacity }}
          >
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/5 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ 
                willChange: 'transform', 
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ 
                willChange: 'transform', 
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>
        )}
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center"
            style={{ 
              y: reducedMotion || isMobile ? undefined : y,
              transform: 'translateZ(0)',
              willChange: reducedMotion || isMobile ? 'opacity' : 'transform, opacity',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold mb-6 sm:mb-8 text-gray-900 leading-tight tracking-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            >
              Create a lead generation
              <br className="hidden sm:block" />
              <span className="text-[#FF6B35]">without limits</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            >
              Bring your sales pipeline to life with AI-powered multi-agent automation.
            </motion.p>

            <motion.div
              className="flex justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/preview">
                <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg h-auto w-full sm:w-auto">
                  View Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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

      {/* Features Grid */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-12 sm:mb-16 md:mb-20 text-center text-gray-900 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  className="bg-[#FFF8F0] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div 
                    className={`w-12 h-12 ${feature.color} mb-6`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F8F8]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
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
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-12 sm:mb-16 text-center text-gray-900 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Multi-Agent Leadgen?
          </motion.h2>

          <div className="space-y-4 sm:space-y-6">
            {[
              'Automated lead sourcing saves 20+ hours per week',
              'AI-powered personalization increases response rates by 3x',
              'Real-time lead scoring prioritizes your best opportunities',
              'Multi-agent orchestration handles complex workflows',
              'Enterprise-grade security and data privacy',
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-start gap-3 sm:gap-4 bg-[#FFF8F0] rounded-xl p-4 sm:p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  x: 8,
                  transition: { type: 'spring', stiffness: 400, damping: 17 }
                }}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B35] flex-shrink-0 mt-0.5 sm:mt-1" />
                </motion.div>
                <p className="text-base sm:text-lg text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with glossy effects */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-12 sm:mb-16 md:mb-20 text-center text-gray-900 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Glossy background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-[#FFF8F0] to-white opacity-60 rounded-2xl" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm" />
                
                <div className="relative">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 sm:p-6 md:p-8 flex items-center justify-between text-left hover:bg-white/50 transition-all duration-300 rounded-2xl group"
                  >
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pr-4 sm:pr-6 leading-relaxed">
                      {faq.question}
                    </span>
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center group-hover:bg-[#FF6B35]/20 transition-colors"
                      animate={{ 
                        rotate: openFaq === index ? 45 : 0,
                        scale: openFaq === index ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <span className="text-xl text-[#FF6B35] font-light">+</span>
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 pt-0">
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ 
                          opacity: openFaq === index ? 1 : 0,
                          y: openFaq === index ? 0 : -10
                        }}
                        transition={{ 
                          delay: openFaq === index ? 0.2 : 0,
                          duration: 0.3
                        }}
                        className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF8F0]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 text-gray-900 px-4">
              Your vision. Your goals. Your pipeline.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 px-4">
              Join thousands of companies using AI to find and connect with their ideal customers.
            </p>
            <Link href="/preview" className="inline-block px-4">
              <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg font-medium rounded-lg h-auto w-full sm:w-auto">
                View Dashboard
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
