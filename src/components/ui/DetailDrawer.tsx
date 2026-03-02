"use client";

import React from "react";
import { X, Edit, Trash2, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  data: Record<string, string | number | boolean | null | undefined>;
  accentColor?: string;
  actions?: React.ReactNode;
}

export function DetailDrawer({ isOpen, onClose, title, subtitle, data, accentColor = "mint" }: DetailDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy dark:bg-navy z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-surface-1 dark:bg-surface-1 border-l border-border shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-border relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-surface-2 text-text-dim hover:text-red transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg",
                  `text-${accentColor} bg-${accentColor}/10 border-${accentColor}/20`
                )}>
                  <Hash className="w-6 h-6 glow-icon" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-main dark:text-text-main">{title}</h2>
                  {subtitle && (
                    <p className="text-xs text-text-dim font-medium uppercase tracking-widest">{subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-dimmer uppercase tracking-widest mb-1.5 group-hover:text-text-dim transition-colors">
                    {key}
                  </div>
                    <div className="p-4 rounded-xl bg-navy-3 border border-border group-hover:border-border/50 group-hover:bg-navy/50 transition-all relative overflow-hidden">
                      <div className="text-sm font-semibold text-text-main flex items-center justify-between gap-4">
                        {String(value)}
                        {key.toLowerCase().includes('data') && (
                          <input 
                            type="date" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => console.log(`Nova data para ${key}:`, e.target.value)}
                          />
                        )}
                        {key.toLowerCase().includes('data') && (
                          <Hash className={cn("w-3.5 h-3.5 opacity-20", `text-${accentColor}`)} />
                        )}
                      </div>
                    </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-8 border-t border-border bg-surface-2 space-y-3">
              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-xl bg-blue-primary text-white font-bold text-sm shadow-lg shadow-blue-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" /> Editar Registro
                </button>
                <button className="flex-1 py-3.5 rounded-xl bg-red/10 text-red font-bold text-sm border border-red/20 hover:bg-red hover:text-white transition-all flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" /> Excluir
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-surface-1 text-text-dim font-bold text-sm border border-border hover:text-text-main transition-all"
              >
                Fechar Detalhes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
