'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeployCTA() {
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
    <section className="px-4 py-16">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="backdrop-blur-[32px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[24px] p-12 border border-blue-200/50 dark:border-blue-800/50 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring' }}
            >
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Ready to Deploy</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Connect Your Data
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Copy these environment variables to your Vercel project or .env.local file to get started
            </p>

            <div className="relative mb-6">
              <motion.pre
                className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 overflow-x-auto text-sm text-gray-100 font-mono text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <code>{envVars}</code>
              </motion.pre>

              <motion.button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2 shadow-lg"
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
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex gap-4 justify-center">
              <a href="/dashboard">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:opacity-80">
                  Open Dashboard
                </Button>
              </a>
              <a href="https://github.com/aymandakir/multi-agent-leadgen" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                  View Source
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

