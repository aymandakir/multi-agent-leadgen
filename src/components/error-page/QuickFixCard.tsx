'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/theme-store';

export default function QuickFixCard() {
  const [copied, setCopied] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const { theme } = useThemeStore();

  const envVars = `NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(envVars);
    setCopied(true);
    setShowSparkles(true);
    setTimeout(() => {
      setCopied(false);
      setShowSparkles(false);
    }, 2000);
  };

  return (
    <section className="px-4 py-16">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="backdrop-blur-[40px] bg-white/90 dark:bg-white/5 rounded-[20px] p-8 md:p-12 border border-white/20 dark:border-white/10 shadow-xl relative overflow-hidden">
          {/* Sparkle Effect */}
          <AnimatePresence>
            {showSparkles && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: '50%',
                      y: '50%',
                      scale: 0,
                      rotate: Math.random() * 360,
                    }}
                    animate={{
                      x: `${50 + (Math.random() - 0.5) * 100}%`,
                      y: `${50 + (Math.random() - 0.5) * 100}%`,
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360 + 360,
                    }}
                    transition={{
                      duration: 1,
                      delay: Math.random() * 0.5,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Quick Fix
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Copy these environment variables to your <code className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">.env.local</code> file
          </p>

          <div className="relative">
            <motion.pre
              className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 overflow-x-auto text-sm text-gray-100 font-mono relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <code>{envVars}</code>
            </motion.pre>

            <motion.button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-3 rounded-xl bg-indigo-600 dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700 text-white transition-all duration-300 flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy All</span>
                </>
              )}
            </motion.button>
          </div>

          {copied && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                ✨ Environment variables copied! Paste them into your .env.local file.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

