'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useDemoLeads } from '@/hooks/usePreviewData';
import { Lead } from '@/lib/types';
import { Search, ArrowUpDown, Building2, User, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LeadsTable() {
  const { leads, loading } = useDemoLeads();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'company_name',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
          >
            Company
            <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {row.original.company_name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-black dark:text-white">
                {row.original.company_name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.original.industry || 'Technology'}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Contact',
        cell: ({ row }) => (
          <div>
            <div className="flex items-center gap-2 text-black dark:text-white">
              <User className="w-4 h-4 text-gray-400" />
              {row.original.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {row.original.role}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {row.original.location || 'San Francisco, CA'}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const colors = {
            qualified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            contacted: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            responded: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            new: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
          };
          return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || colors.new}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'score',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
          >
            Score
            <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            <div className="text-lg font-bold text-black dark:text-white">
              {row.original.score || 0}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: leads,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="backdrop-blur-[20px] bg-white/60 dark:bg-white/5 rounded-2xl p-8 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">Generated Leads</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-white/5 border-white/20"
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
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-white/10"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      className="border-b border-white/5 hover:bg-white/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ x: 4 }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-4 px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
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

