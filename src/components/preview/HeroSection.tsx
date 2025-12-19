'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLiveStats } from '@/hooks/usePreviewData';
import { Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection() {
  const { stats } = useLiveStats();
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  // Disable parallax on mobile and reduced motion
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    reducedMotion || isMobile ? ['0%', '0%'] : ['0%', '30%']
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Reduce particle count on mobile
  const particleCount = isMobile ? 8 : 20;

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12 relative overflow-hidden bg-gradient-to-b from-white to-[#FFF8F0]"
    >
      {/* Animated background particles - optimized for mobile */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ opacity }}
        >
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FF6B35]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      )}
      <motion.div
        className="max-w-6xl w-full relative z-10"
        style={{ 
          y: reducedMotion || isMobile ? undefined : y,
          transform: 'translateZ(0)',
          willChange: reducedMotion || isMobile ? 'opacity' : 'transform, opacity',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Live Preview Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FFF8F0] border border-[#FF6B35]/20 text-[#FF6B35] mb-6 sm:mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Live Preview</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold mb-6 sm:mb-8 text-gray-900 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        >
          Multi-Agent Leadgen
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 sm:mb-12 max-w-2xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        >
          AI-powered lead generation with automated sourcing, enrichment, outreach, and analysis.
          See it live in action.
        </motion.p>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        >
          {[
            { label: 'Leads', value: stats.totalLeads, suffix: '' },
            { label: 'Conversion', value: stats.conversionRate, suffix: '%' },
            { label: 'Avg Score', value: stats.avgScore, suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8 + index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={!reducedMotion ? { 
                scale: 1.05,
                y: -4,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              } : {}}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{stat.label}</div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
                {stat.value}
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
