'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeployFooter() {
  const [copied, setCopied] = useState(false);

  const envVars = `NEXT_PUBLIC_SUPABASE_URL=https://dekupatxeglqacsrqlew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRla3VwYXR4ZWdscWFjc3JxbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDMwNDMsImV4cCI6MjA4MTYxOTA0M30.7y0y08CwKq4kGyBTRqK7g2m-bMFr2zzIhuLU7lCbAdI
SUPABASE_ORG_ID=leadgen-demo`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(envVars);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.footer
      id="deploy"
      className="sticky bottom-0 left-0 right-0 z-40 backdrop-blur-[20px] bg-white/80 dark:bg-black/80 border-t border-white/10"
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Ready to deploy your own?
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.pre
                className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto text-xs text-gray-100 font-mono max-w-md hidden md:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <code>{envVars.split('\n')[0]}...</code>
              </motion.pre>
            </div>
            <motion.button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Env Vars
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

