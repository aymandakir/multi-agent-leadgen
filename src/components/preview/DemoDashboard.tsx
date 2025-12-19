'use client';

import { motion } from 'framer-motion';
import { useDemoLeads } from '@/hooks/useDemoData';
import { useState } from 'react';
import { Search, User, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DemoDashboard() {
  const { leads, loading } = useDemoLeads();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(lead =>
    lead.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="px-4 py-16 bg-gray-50/50 dark:bg-gray-900/20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="backdrop-blur-[32px] bg-white/80 dark:bg-white/5 rounded-[24px] p-8 border border-gray-200/50 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Generated Leads
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              Loading leads...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Company
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Contact
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Location
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {lead.company_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.company_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {lead.industry || 'Technology'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{lead.name}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {lead.role}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {lead.location || 'San Francisco, CA'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'qualified'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : lead.status === 'contacted'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {lead.score || 0}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

