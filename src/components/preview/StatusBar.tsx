'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function StatusBar() {
  const router = useRouter();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ willChange: 'transform' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => router.push('/')}
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap"
            type="button"
          >
            ← Back to Home
          </button>
          <span className="text-xs font-medium text-gray-500 tracking-wide hidden sm:inline">
            leadgen-demo
          </span>
          <motion.span
            className="px-2 sm:px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-1.5 sm:gap-2"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
            Live
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
