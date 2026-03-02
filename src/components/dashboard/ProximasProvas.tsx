"use client";

import React from "react";
import { Calendar, User, Clock, ChevronRight, ClipboardList, MapPin, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

import { mockProvas } from "@/lib/data";

const catColorMap = {
  A: "text-mint border-mint/20 bg-mint/5",
  "Prática A": "text-mint border-mint/20 bg-mint/5",
  B: "text-blue-light border-blue-light/20 bg-blue-light/5",
  "Prática B": "text-blue-light border-blue-light/20 bg-blue-light/5",
  "Legislação": "text-purple border-purple/20 bg-purple/5",
  D: "text-purple border-purple/20 bg-purple/5",
  E: "text-gold border-gold/20 bg-gold/5",
};

import { useSettings } from "@/components/SettingsProvider";

export function ProximasProvas() {
  const { accentColor } = useSettings();
  const useGlobal = accentColor !== null;

  return (
    <div className={cn("p-8 rounded-3xl border bg-surface-1 shadow-2xl h-full flex flex-col group transition-all duration-700 relative overflow-hidden", 
      useGlobal ? "border-primary-main/20 hover:shadow-primary-glow hover:border-primary-main/30 hover:scale-[1.01]" : "border-border hover:shadow-blue-primary/20 hover:border-blue-primary/30 hover:scale-[1.01]")}
      style={useGlobal ? { boxShadow: `0 0 20px var(--primary-glow)` } : {}}
    >
      {/* Background Icon */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
          <ClipboardList className={cn("w-64 h-64", useGlobal ? "text-primary-main" : "text-blue-primary")} />
      </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h3 className={cn("text-xl font-black transition-colors uppercase tracking-tight", useGlobal ? "text-primary-main" : "text-text-main group-hover:text-blue-primary")}>
              Próximas Provas
            </h3>
            <p className="text-[9px] text-text-dim font-black uppercase tracking-[0.2em] mt-1 opacity-60">Agenda da Semana</p>
          </div>
          <Link href="/provas">
            <button className={cn("flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 text-[10px] font-black transition-all border border-border shadow-sm group/btn uppercase tracking-widest", 
              useGlobal ? "text-primary-main hover:text-primary-main/80" : "text-text-dim hover:text-blue-primary")}>
              Ver Tudo <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        {mockProvas.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn("p-5 rounded-2xl bg-surface-2/40 border relative overflow-hidden group/item cursor-pointer hover:bg-surface-2 transition-all duration-500", 
              useGlobal ? "border-primary-main/10 hover:border-primary-main/30" : "border-border/50 hover:border-blue-primary/30")}
          >
            {/* Glow on hover */}
            <div className={cn("absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500", 
              useGlobal ? "bg-gradient-to-r from-primary-main/5 via-transparent to-transparent" : "bg-gradient-to-r from-blue-primary/5 via-transparent to-transparent")} />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className={cn("w-12 h-12 rounded-2xl bg-surface-1 border border-border flex items-center justify-center text-text-dim transition-all duration-500 shadow-xl group-hover/item:scale-110", 
                    useGlobal ? "group-hover/item:text-primary-main group-hover/item:shadow-primary-glow" : "group-hover/item:text-blue-primary group-hover/item:shadow-blue-primary/20")}>
                    <User className="w-6 h-6" />
                  </div>
                  {item.status === 'VIP' && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center border-2 border-surface-1 shadow-lg animate-pulse">
                      <span className="text-[8px] font-black text-white">★</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className={cn("text-sm font-black tracking-tight uppercase transition-colors", 
                    useGlobal ? "group-hover/item:text-primary-main text-text-main" : "text-text-main group-hover/item:text-blue-primary")}>
                    {item.aluno}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-text-dim uppercase tracking-wider">
                      <Calendar className={cn("w-3 h-3", useGlobal ? "text-primary-main" : "text-blue-primary")} /> {item.data}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-text-dim uppercase tracking-wider">
                      <Clock className={cn("w-3 h-3", useGlobal ? "text-primary-main" : "text-blue-primary")} /> {item.hora}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end gap-1">
                   <div className="flex items-center gap-1 text-[8px] font-black text-text-dimmer uppercase tracking-widest">
                     <MapPin className="w-2.5 h-2.5" /> Sede Principal
                   </div>
                   {item.status === 'Pendente' && (
                     <div className="flex items-center gap-1 text-[8px] font-black text-orange uppercase tracking-widest animate-pulse">
                       <AlertTriangle className="w-2.5 h-2.5" /> Confirmar Presença
                     </div>
                   )}
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all shadow-sm",
                    useGlobal ? "text-primary-main border-primary-main/20 bg-primary-main/5" : (catColorMap[item.tipo as keyof typeof catColorMap] || "text-text-dim border-border bg-surface-1")
                  )}>
                    {item.tipo}
                  </div>
                  
                  <div className={cn(
                    "px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-[0.1em] transition-all min-w-[100px] text-center shadow-xl",
                    item.status === 'Agendado' ? (useGlobal ? "bg-primary-main text-white border-primary-main shadow-primary-glow" : "bg-blue-primary text-white border-blue-primary shadow-blue-primary/20") :
                    item.status === 'Pendente' ? "bg-orange text-white border-orange shadow-orange/20" :
                    item.status === 'VIP' ? "bg-gold text-white border-gold shadow-gold/30 animate-glow" :
                    "bg-surface-1 text-text-dimmer border-border"
                  )}>
                    {item.status}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer hint */}
      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between relative z-10">
        <div className="text-[9px] font-black text-text-dimmer uppercase tracking-[0.15em]">
          Total de {mockProvas.length} Provas hoje
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="text-[9px] font-black text-green uppercase tracking-[0.15em]">Sistema Online</span>
        </div>
      </div>
    </div>
  );
}
