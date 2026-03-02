"use client";

import React from "react";
import { X, Edit, Trash2, Hash, User, Calendar, FileText, Smartphone, Mail, MapPin, ShieldCheck, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  data: Record<string, string | number | boolean | null | undefined>;
  accentColor?: string;
  actions?: React.ReactNode;
}

export function DetailModal({ isOpen, onClose, title, subtitle, data, accentColor = "mint" }: DetailModalProps) {
  const accentHex = 
    accentColor === 'gold' ? '#F59E0B' :
    accentColor === 'red' ? '#EF4444' :
    accentColor === 'green' ? '#10B981' :
    accentColor === 'purple' ? '#8B5CF6' :
    accentColor === 'mint' ? '#00E5A0' :
    accentColor === 'orange' ? '#F97316' :
    '#1A6CF7'; // blue

  const accentRgb = 
    accentColor === 'gold' ? '245, 158, 11' :
    accentColor === 'red' ? '239, 68, 68' :
    accentColor === 'green' ? '16, 185, 129' :
    accentColor === 'purple' ? '139, 92, 246' :
    accentColor === 'mint' ? '0, 229, 160' :
    accentColor === 'orange' ? '249, 115, 22' :
    '26, 108, 247';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/60 dark:bg-navy/80 backdrop-blur-md z-[100]"
          />
          
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-surface-1 border-2 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] z-[110] flex flex-col overflow-hidden relative"
              style={{ 
                borderColor: `rgba(${accentRgb}, 0.2)`,
                boxShadow: `0 40px 100px -20px rgba(0,0,0,0.6), 0 0 80px rgba(${accentRgb}, 0.15)` 
              }}
            >
              {/* Decorative Background Elements */}
              <div 
                className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-[0.15] pointer-events-none rounded-full"
                style={{ backgroundColor: accentHex }}
              />
              <div 
                className="absolute -bottom-24 -left-24 w-64 h-64 blur-[100px] opacity-[0.1] pointer-events-none rounded-full"
                style={{ backgroundColor: accentHex }}
              />

              {/* Background Icon Glow */}
              <div className="absolute -right-10 -top-10 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-1000 pointer-events-none group-hover:scale-110 group-hover:rotate-6">
                <User className="w-96 h-96" style={{ color: accentHex }} />
              </div>

              {/* Header */}
              <div className="p-10 border-b border-border relative bg-gradient-to-br from-surface-1/50 to-surface-2/20 backdrop-blur-2xl">
                <button
                  onClick={onClose}
                  className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-surface-2 border-2 border-border flex items-center justify-center text-text-dim hover:text-red hover:border-red/40 transition-all active:scale-90 shadow-2xl shadow-red/5 z-20 group/close"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
                
                <div className="flex items-center gap-8 relative z-10">
                  <div 
                    className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center border-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 shrink-0 group/icon hover:rotate-6 hover:scale-110"
                    style={{ 
                      backgroundColor: `rgba(${accentRgb}, 0.15)`, 
                      borderColor: `rgba(${accentRgb}, 0.3)`,
                      color: accentHex,
                      boxShadow: `0 20px 50px rgba(${accentRgb}, 0.3), inset 0 0 20px rgba(${accentRgb}, 0.2)`
                    }}
                  >
                    <User className="w-10 h-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-text-main tracking-tighter leading-none uppercase">{title}</h2>
                    {subtitle && (
                      <div className="flex items-center gap-3 mt-4">
                        <div className="h-0.5 w-12 rounded-full" style={{ backgroundColor: accentHex, boxShadow: `0 0 10px ${accentHex}` }} />
                        <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.3em] opacity-80">
                          {subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
    
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-10 max-h-[50vh] scrollbar-hide bg-surface-1/40 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="group/item">
                      <div 
                        className="px-8 py-6 rounded-[1.5rem] bg-surface-2/50 border-2 transition-all duration-500 shadow-2xl shadow-black/5 hover:scale-[1.03] relative overflow-hidden group-hover/item:border-opacity-100"
                        style={{ 
                          borderColor: `rgba(${accentRgb}, 0.1)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.4)`;
                          e.currentTarget.style.boxShadow = `0 20px 40px rgba(${accentRgb}, 0.15), inset 0 0 15px rgba(${accentRgb}, 0.05)`;
                          e.currentTarget.style.backgroundColor = `rgba(${accentRgb}, 0.03)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.1)`;
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {/* Inner Item Glow */}
                        <div className="absolute -right-4 -bottom-4 opacity-0 group-hover/item:opacity-[0.05] transition-opacity duration-700">
                          <FileText className="w-16 h-16" style={{ color: accentHex }} />
                        </div>

                        <div className="text-[9px] font-black uppercase tracking-[0.25em] mb-2 opacity-50 flex items-center gap-2" style={{ color: accentHex }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                          {key}
                        </div>
                        <div className="text-xs font-black text-text-main break-all tracking-tight uppercase leading-tight">{String(value || '---')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Actions */}
              <div className="p-10 border-t border-border bg-surface-2/60 flex flex-col sm:flex-row gap-5">
                 <button 
                   className="flex-1 py-5 px-10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 group/btn relative overflow-hidden"
                   style={{ backgroundColor: accentHex, boxShadow: `0 20px 45px rgba(${accentRgb}, 0.4)` }}
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    <Edit className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" /> Editar Registro
                  </button>
                  <button className="flex-1 py-5 px-10 rounded-2xl bg-red/10 text-red font-black text-[10px] uppercase tracking-widest border-2 border-red/20 hover:bg-red hover:text-white hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-4 group active:scale-95">
                    <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Excluir
                  </button>
                  <button
                    onClick={onClose}
                    className="px-10 py-5 rounded-2xl bg-surface-1 text-text-dim font-black text-[10px] uppercase tracking-widest border-2 border-border hover:bg-surface-3 hover:text-text-main transition-all active:scale-95 shadow-xl"
                  >
                    Fechar
                  </button>
              </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
