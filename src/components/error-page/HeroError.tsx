'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/lib/stores/theme-store';
import { CheckCircle2 } from 'lucide-react';

const glitchChars = '█▓▒░█▓▒░';

export default function HeroError() {
  const [glitchText, setGlitchText] = useState('');
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  const { theme } = useThemeStore();

  const title = 'Supabase Setup Required';
  const subtitle = 'Unlock the full power of your AI agents';

  useEffect(() => {
    // Glitch effect
    let glitchInterval: NodeJS.Timeout;
    const glitchDuration = 2000;

    const startGlitch = () => {
      let elapsed = 0;
      glitchInterval = setInterval(() => {
        elapsed += 50;
        const progress = elapsed / glitchDuration;

        if (progress < 0.3) {
          // Glitch phase
          const glitched = title
            .split('')
            .map((char, i) => {
              if (Math.random() < 0.3) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('');
          setGlitchText(glitched);
        } else if (progress < 0.5) {
          // Transition
          setGlitchText(title);
        } else {
          // Clean reveal
          clearInterval(glitchInterval);
          setGlitchText(title);
          setShowText(true);
        }
      }, 50);
    };

    startGlitch();

    // Typewriter effect for subtitle
    setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < subtitle.length) {
          setTypedText(subtitle.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    }, 2500);

    return () => {
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, []);

  const checklist = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
        className="max-w-4xl w-full"
      >
        <motion.div
          className="backdrop-blur-[40px] bg-white/80 dark:bg-white/5 rounded-[20px] p-12 md:p-16 border border-white/20 dark:border-white/10 shadow-2xl"
          whileHover={{ rotateY: 5, rotateX: 2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glitch Title */}
          <motion.h1
            className="text-[clamp(3.5rem,8vw,6rem)] font-black mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-purple-400 dark:via-indigo-400 dark:to-teal-400 bg-clip-text text-transparent leading-[1.1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? 1 : 0.7 }}
          >
            {glitchText || title}
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.p>

          {/* Animated Checklist */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Missing Environment Variables:
            </p>
            {checklist.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.5 + index * 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    delay: 3.5 + index * 0.2,
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-teal-400" />
                </motion.div>
                <code className="text-sm font-mono text-gray-800 dark:text-gray-200 flex-1">
                  {item}
                </code>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

