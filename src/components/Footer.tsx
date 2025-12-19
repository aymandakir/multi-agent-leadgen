'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FFF8F0] to-white border-t border-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col items-center justify-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 text-gray-600 text-sm sm:text-base font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span>Made by</span>
            <motion.span
              className="text-gray-900 font-semibold"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Ayman
            </motion.span>
            <span>with</span>
            <motion.div
              className="relative inline-flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-red-500/20 rounded-full blur-md"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <Heart
                className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500 relative z-10"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))',
                }}
              />
            </motion.div>
          </motion.div>
          <motion.p
            className="text-xs sm:text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Crafted with attention to detail and passion for excellence
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

