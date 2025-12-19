'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StatusBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] bg-white/80 dark:bg-black/80 border-b border-gray-200/30 dark:border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wide">
            leadgen-demo
          </span>
          <motion.span
            className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium flex items-center gap-1.5"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
            Live
          </motion.span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity">
            Back to Home →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
