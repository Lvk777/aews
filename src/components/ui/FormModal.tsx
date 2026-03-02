"use client";

import React from "react";
import { X, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accentColor?: string;
  fields: {
    label: string;
    name: string;
    type: "text" | "number" | "date" | "textarea" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[];
  }[];
  onSubmit: (data: Record<string, string | File>) => void;
}

import { useSettings } from "@/components/SettingsProvider";

export function FormModal({ isOpen, onClose, title, subtitle, accentColor: localAccent = "blue", fields, onSubmit }: FormModalProps) {
  const { accentColor: globalAccent } = useSettings();
  
  const accentColor = globalAccent || localAccent;

  const accentHex = 
    accentColor === 'gold' ? '#F59E0B' :
    accentColor === 'orange' ? '#f59e0b' :
    accentColor === 'red' ? '#EF4444' :
    accentColor === 'green' ? '#10B981' :
    accentColor === 'purple' ? '#8B5CF6' :
    accentColor === 'mint' ? '#00E5A0' :
    accentColor === 'pink' ? '#ec4899' :
    '#1A6CF7'; // blue-primary

  const accentRgb = 
    accentColor === 'gold' ? '245, 158, 11' :
    accentColor === 'orange' ? '245, 158, 11' :
    accentColor === 'red' ? '239, 68, 68' :
    accentColor === 'green' ? '16, 185, 129' :
    accentColor === 'purple' ? '139, 92, 246' :
    accentColor === 'mint' ? '0, 229, 160' :
    accentColor === 'pink' ? '236, 72, 153' :
    '26, 108, 247';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string | File>;
    onSubmit(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/90 backdrop-blur-xl z-[100]"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="w-full max-w-4xl bg-surface-1 border border-border/50 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] z-[110] flex flex-col relative overflow-hidden my-auto"
            style={{ boxShadow: `0 20px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(${accentRgb}, 0.1)` }}
          >
            {/* Header */}
            <div className="p-8 border-b border-border relative bg-gradient-to-br from-surface-1 to-surface-2/30">
              <div 
                className="absolute top-0 left-0 w-full h-1 opacity-40" 
                style={{ background: `linear-gradient(to right, transparent, ${accentHex}, transparent)` }}
              />
              
              <button
                onClick={onClose}
                className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-dim hover:text-red hover:border-red/50 hover:bg-red/5 transition-all active:scale-90 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              
                <div className="flex items-center gap-4 mb-2">
                    <div 
                      className="w-2 h-8 rounded-full shadow-lg"
                      style={{ backgroundColor: accentHex, boxShadow: `0 0 15px ${accentHex}80` }}
                    />
                    <div>
                      <h2 className="text-2xl font-black text-text-main tracking-tight leading-none uppercase">{title}</h2>
                      {subtitle && (
                          <p className="text-[9px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60 flex items-center gap-2">
                              <Info className="w-3.5 h-3.5" style={{ color: accentHex }} /> {subtitle}
                          </p>
                      )}
                    </div>
                </div>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh] scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.name} className={cn(
                      field.type === "textarea" ? "md:col-span-2" : "col-span-1"
                  )}>
                    <label className="block text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-2 ml-1 opacity-60">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        className="w-full p-4 bg-surface-2 border border-border/50 rounded-xl outline-none text-sm font-bold text-text-main transition-all min-h-[120px] resize-none shadow-inner placeholder:text-text-dim/30"
                        style={{ 
                          // @ts-ignore
                          "--tw-ring-color": `rgba(${accentRgb}, 0.1)`,
                          "--tw-border-opacity": "0.5"
                        }}
                        required
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = accentHex;
                          e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${accentRgb}, 0.1)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.boxShadow = "";
                        }}
                      />
                    ) : field.type === "select" ? (
                      <div className="relative group/select">
                          <select
                            name={field.name}
                            className="w-full p-4 bg-surface-2 border border-border/50 rounded-xl outline-none text-sm font-bold text-text-main transition-all appearance-none cursor-pointer shadow-inner pr-12"
                            required
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = accentHex;
                              e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${accentRgb}, 0.1)`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "";
                              e.currentTarget.style.boxShadow = "";
                            }}
                          >
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim group-hover/select:text-mint transition-colors">
                              <Check className="w-4 h-4 rotate-90" />
                          </div>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="w-full p-4 bg-surface-2 border border-border/50 rounded-xl outline-none text-sm font-bold text-text-main transition-all shadow-inner placeholder:text-text-dim/30"
                        required
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = accentHex;
                          e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${accentRgb}, 0.1)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.boxShadow = "";
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-xl bg-surface-2 text-text-dim font-black text-[10px] uppercase tracking-[0.2em] border border-border hover:bg-navy-3 hover:text-text-main transition-all active:scale-95 shadow-md"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className={cn(
                      "flex-[1.5] py-3 px-6 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02] border-2 border-white/10",
                    )}
                    style={{ 
                      backgroundColor: accentHex,
                      boxShadow: `0 10px 25px -5px ${accentHex}80, 0 0 15px ${accentHex}40`
                    }}
                  >
                    <Check className="w-4 h-4 stroke-[3px]" /> Salvar Registro
                  </button>
                </div>

            </form>
            
            {/* Decoration */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-[0.05] blur-[120px] pointer-events-none" style={{ backgroundColor: accentHex }} />
            <div className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.05] blur-[120px] pointer-events-none" style={{ backgroundColor: accentHex }} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
