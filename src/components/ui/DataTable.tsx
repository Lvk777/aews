"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, MoreHorizontal, Eye, 
  Star, Edit2, Trash2, Shield, 
  User, CheckCircle2, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T = unknown> {
  header: string;
  accessor: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T = unknown> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  accentColor?: string;
  isLoading?: boolean;
}

export function DataTable<T extends { id?: string | number, vip?: string, rating?: number }>({ 
  columns, 
  data, 
  onRowClick, 
  isLoading,
  accentColor = "blue"
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 w-full bg-surface-1 animate-pulse rounded-2xl border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2.5rem] border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-surface-1/50 backdrop-blur-sm overflow-hidden group/table">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-navy-3/40 dark:bg-navy-3/40">
            <th className="p-6 pl-8 w-12 border-b border-border/50">
               <div className="w-4 h-4 border-2 border-border rounded flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-border rounded-sm" />
               </div>
            </th>
            {columns.map((column, i) => (
              <th
                key={i}
                className={cn(
                  "p-6 text-[10px] font-black text-text-dim uppercase tracking-[0.3em] border-b border-border/50 whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
            <th className="p-6 text-[10px] font-black text-text-dim uppercase tracking-[0.3em] border-b border-border/50 w-24 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          <AnimatePresence>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={row.id || rowIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.03, duration: 0.4 }}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "group relative transition-all duration-500 cursor-pointer",
                  "hover:bg-surface-2/60"
                )}
              >
                <td className="p-6 pl-8 border-b border-transparent">
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-dim group-hover:scale-110 group-hover:border-primary/50 group-hover:text-primary transition-all">
                    <User className="w-5 h-5" />
                  </div>
                </td>
                {columns.map((column, i) => (
                  <td
                    key={i}
                    className={cn(
                      "p-6 text-sm font-bold text-text-main transition-all group-hover:translate-x-1",
                      column.className
                    )}
                  >
                    {column.render ? column.render(row) : (row as any)[column.accessor]}
                  </td>
                ))}
                
                  <td className="p-6 text-sm font-semibold text-center border-b border-transparent">
                    <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button className="p-3 rounded-xl bg-surface-1 border-2 border-border text-text-dim hover:text-blue-primary hover:border-blue-primary/50 hover:shadow-[0_0_20px_rgba(26,108,247,0.2)] transition-all active:scale-90">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-xl bg-surface-1 border-2 border-border text-text-dim hover:text-green hover:border-green/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all active:scale-90">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-xl bg-surface-1 border-2 border-border text-text-dim hover:text-red hover:border-red/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all active:scale-90">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="p-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-surface-2 flex items-center justify-center mx-auto mb-6 border border-border shadow-inner">
            <Search className="w-10 h-10 text-text-dimmer" />
          </div>
          <h3 className="text-lg font-black text-text-main uppercase tracking-widest">Nenhum registro encontrado</h3>
          <p className="text-xs text-text-dim mt-2 max-w-xs mx-auto">Tente ajustar seus filtros ou pesquisar por outro termo de busca.</p>
        </div>
      )}
    </div>
  );
}
