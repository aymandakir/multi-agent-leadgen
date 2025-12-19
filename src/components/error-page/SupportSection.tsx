'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Book, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const supportLinks = [
  {
    title: 'Supabase Docs',
    description: 'Complete documentation and guides',
    href: 'https://supabase.com/docs',
    icon: Book,
  },
  {
    title: 'API Settings',
    description: 'Get your project credentials',
    href: 'https://supabase.com/dashboard/project/_/settings/api',
    icon: ExternalLink,
  },
  {
    title: 'Community',
    description: 'Join the Supabase Discord',
    href: 'https://discord.supabase.com',
    icon: MessageCircle,
  },
];

export default function SupportSection() {
  return (
    <section className="px-4 py-16">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Need Help?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {supportLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  <Card className="backdrop-blur-[40px] bg-white/90 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-lg h-full cursor-pointer transition-all hover:shadow-xl">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-indigo-600 dark:text-purple-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

