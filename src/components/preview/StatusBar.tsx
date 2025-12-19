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
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            type="button"
          >
            ← Back to Home
          </button>
          <span className="text-xs font-medium text-gray-500 tracking-wide">
            leadgen-demo
          </span>
          <motion.span
            className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Live
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
