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
import { Search, ArrowUpDown, User, MapPin } from 'lucide-react';

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
            className="flex items-center gap-2 hover:text-gray-900 text-gray-700 font-medium"
          >
            Company
            <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
              {row.original.company_name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {row.original.company_name}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">
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
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-900">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{row.original.name}</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
              {row.original.role}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{row.original.location || 'San Francisco, CA'}</span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const colors = {
            qualified: 'bg-green-50 text-green-700 border border-green-200',
            contacted: 'bg-blue-50 text-blue-700 border border-blue-200',
            responded: 'bg-purple-50 text-purple-700 border border-purple-200',
            new: 'bg-gray-50 text-gray-700 border border-gray-200',
          };
          return (
            <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${colors[status as keyof typeof colors] || colors.new}`}>
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
            className="flex items-center gap-2 hover:text-gray-900 text-gray-700 font-medium"
          >
            Score
            <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            <div className="text-base sm:text-lg font-semibold text-gray-900">
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
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Generated Leads</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F8F8F8] border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-600">
              Loading leads...
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {table.getRowModel().rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      className="hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.02,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                      }}
                      whileHover={{ 
                        x: 4,
                        transition: { type: 'spring', stiffness: 400, damping: 17 }
                      }}
                      style={{ willChange: 'transform' }}
                    >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-3 px-3 sm:px-4 text-sm">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
