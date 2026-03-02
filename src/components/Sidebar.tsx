"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSettings } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Printer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Car,
  StickyNote,
  Settings,
  LogOut,
  Calendar as CalendarIcon,
  ChevronRight,
  Bell,
  Shield
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", color: "text-mint", glow: "shadow-mint/60 hover:bg-mint/30" },
  { icon: Shield, label: "Sala Admin", href: "/admin/sala", color: "text-red", glow: "shadow-red/60 hover:bg-red/30" },
  { icon: CalendarIcon, label: "Calendário", href: "/calendario", color: "text-indigo-400", glow: "shadow-indigo-400/60 hover:bg-indigo-400/30" },

  { icon: ClipboardList, label: "Lista Provas", href: "/provas", color: "text-blue-primary", glow: "shadow-blue-primary/60 hover:bg-blue-primary/30" },
  { icon: Printer, label: "Imprimir Semana", href: "/imprimir", color: "text-pink-500", glow: "shadow-pink-500/60 hover:bg-pink-500/30" },
  { icon: TrendingUp, label: "Entradas", href: "/financeiro/entradas", color: "text-green", glow: "shadow-green/60 hover:bg-green/30" },
  { icon: TrendingDown, label: "Saídas", href: "/financeiro/saidas", color: "text-red", glow: "shadow-red/60 hover:bg-red/30" },
  { icon: DollarSign, label: "Fluxo Caixa", href: "/financeiro/fluxo", color: "text-gold", glow: "shadow-gold/60 hover:bg-gold/30" },
  { icon: Users, label: "Alunos", href: "/alunos", color: "text-blue-light", glow: "shadow-blue-light/60 hover:bg-blue-light/30" },
  { icon: Car, label: "Instrutores", href: "/instrutores", color: "text-orange", glow: "shadow-orange/60 hover:bg-orange/30" },
  { icon: Bell, label: "ZapNotify", href: "/whatsapp", color: "text-green", glow: "shadow-green/60 hover:bg-green/30" },
  { icon: StickyNote, label: "Bloco de Notas", href: "/notas", color: "text-gold", glow: "shadow-gold/70 hover:bg-gold/40" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { brandName, accentColor, globalAccentHex } = useSettings();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

      return (
          <aside className={cn("w-64 fixed top-0 left-0 h-screen flex flex-col z-50 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-r border-border/10 transition-all duration-500",
            theme === 'dark' ? "bg-navy/80 backdrop-blur-2xl" : "bg-[#F3F6FA] backdrop-blur-2xl")}>
          {/* Brand */}
          <div className="p-8">
              <Link href="/dashboard" className="flex items-center gap-4 group cursor-pointer">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                          className="w-12 h-12 bg-gradient-to-br from-primary-main/10 to-primary-main/5 rounded-2xl flex items-center justify-center transition-all duration-500"
                          style={{ 
                              // @ts-ignore
                              "--primary-glow": (globalAccentHex || "#00E5A0") + "90"
                          }}
                      >
                    <Car className="w-6 h-6 text-primary-main group-hover:drop-shadow-[0_0_20px_var(--primary-main)]" style={{ color: globalAccentHex || "#00E5A0" }} />
                </motion.div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 group-hover:drop-shadow-[0_0_8px_var(--primary-main)] transition-all" style={{ color: globalAccentHex || "#00E5A0" }}>Auto Escola</div>
                <div className="text-sm font-black text-text-main leading-none uppercase tracking-tight group-hover:text-primary-main transition-colors" style={{ "--primary-main": globalAccentHex || "#00E5A0" } as any}>{brandName}</div>
              </div>
            </Link>
          </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hide">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const useGlobalAccent = accentColor !== null;
                
                // Define a cor base para o item
                const accentHex = useGlobalAccent 
                  ? (globalAccentHex || "#00E5A0") 
                  : (item.color.includes('mint') ? "#00E5A0" : 
                     item.color.includes('blue-primary') ? "#1A6CF7" :
                     item.color.includes('blue-light') ? "#3B82F6" :
                     item.color.includes('indigo') ? "#818cf8" :
                     item.color.includes('pink') ? "#ec4899" :
                     item.color.includes('green') ? "#10B981" :
                     item.color.includes('red') ? "#EF4444" :
                     item.color.includes('gold') ? "#F59E0B" :
                     item.color.includes('orange') ? "#FB923C" : "#00E5A0");
              
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 overflow-hidden",
                        isActive 
                          ? "bg-surface-2/15 text-text-main shadow-2xl" 
                          : "text-text-dim hover:text-text-main hover:bg-surface-2/10"
                      )}
                        style={isActive ? { 
                          boxShadow: `inset 0 0 45px ${accentHex}30, 0 15px 40px -5px ${accentHex}80`,
                        } : {}}
                    >
                        {/* Hover Glow Overlay - Refined */}
                        <div 
                          className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                            isActive ? "hidden" : ""
                          )}
                          style={{ 
                            background: `radial-gradient(circle at 50% 50%, ${accentHex}${theme === 'dark' ? '25' : '45'} 0%, transparent 70%)`,
                            filter: "blur(15px)"
                          }}
                        />
    
                        {/* Active Glow - Dimensioned */}
                        {isActive && (
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{ 
                              background: `radial-gradient(circle at 30% 50%, ${accentHex}${theme === 'dark' ? '35' : '55'} 0%, transparent 60%)`,
                              filter: "blur(12px)"
                            }}
                          />
                        )}
    
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 w-2 h-10 rounded-r-full z-20"
                          style={{ 
                            backgroundColor: accentHex,
                            boxShadow: `0 0 35px 8px ${accentHex}` 
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <item.icon 
                        className={cn(
                          "w-5 h-5 transition-all duration-500 relative z-10",
                          isActive ? "scale-110 rotate-0" : "group-hover:scale-120 group-hover:rotate-6",
                          useGlobalAccent ? "text-primary-main" : item.color
                        )} 
                        style={{ 
                            color: useGlobalAccent ? accentHex : undefined,
                            filter: `drop-shadow(0 0 12px ${useGlobalAccent ? accentHex : 'currentColor'})` 
                        }}
                      />
                      <span className="text-sm font-black tracking-tight relative z-10 transition-colors group-hover:text-text-main">{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-auto"
                        >
                            <ChevronRight className="w-4 h-4 text-text-dim/50" />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
  
                {/* Bottom Section */}
                <div className={cn("p-4 mt-auto border-t space-y-2 transition-all duration-500",
                  theme === 'dark' ? "bg-navy/80 border-white/5 backdrop-blur-2xl" : "bg-transparent border-slate-200")}>
                  {[
                    { icon: Bell, label: "Notificações", href: "/notificacoes", color: "#1A6CF7" }, 
                    { icon: Settings, label: "Configurações", href: "/configuracoes", color: "#1A6CF7" }
                  ].map((item) => {
                    const isActive = pathname === item.href;
                    const isSettings = item.label === "Configurações";
                    const isDarkMode = theme === "dark";
                    
                    // Se for Configurações, o glow é sempre branco
                    // No dark mode o ícone é branco, no light mode é cinza escuro
                    const accentHex = isSettings ? "#FFFFFF" : (globalAccentHex || "#1A6CF7");
                    const iconColor = isSettings 
                      ? (isDarkMode ? "#FFFFFF" : "#475569") 
                      : accentHex;
  
                return (
  
                  <Link key={item.href} href={item.href}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 overflow-hidden",
                          isActive 
                            ? "bg-surface-2/15 text-text-main shadow-2xl" 
                            : "text-text-dim hover:text-text-main hover:bg-surface-2/10"
                        )}
                        style={isActive ? { 
                          boxShadow: `inset 0 0 45px ${accentHex}30, 0 15px 40px -5px ${accentHex}80`,
                        } : {}}
                      >
                           {/* Hover Glow Overlay */}
                           <div 
                            className={cn(
                              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                              isActive ? "hidden" : ""
                            )}
                            style={{ 
                              background: `radial-gradient(circle at 50% 50%, ${accentHex}${theme === 'dark' ? '25' : '45'} 0%, transparent 70%)`,
                              filter: "blur(15px)"
                            }}
                          />
      
                          {/* Active Glow */}
                          {isActive && (
                            <div 
                              className="absolute inset-0 pointer-events-none"
                              style={{ 
                                background: `radial-gradient(circle at 30% 50%, ${accentHex}${theme === 'dark' ? '35' : '55'} 0%, transparent 60%)`,
                                filter: "blur(12px)"
                              }}
                            />
                          )}
      
                         {isActive && (
                          <motion.div
                            layoutId="active-pill-bottom"
                            className="absolute left-0 w-2 h-10 rounded-r-full z-20"
                            style={{ 
                              backgroundColor: accentHex,
                              boxShadow: `0 0 35px 8px ${accentHex}` 
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <item.icon 
                          className={cn(
                            "w-5 h-5 transition-all duration-500 relative z-10",
                            isActive ? "scale-110 rotate-0" : "group-hover:scale-120 group-hover:rotate-6",
                            !isSettings && "text-primary-main"
                          )} 
                          style={{ 
                              color: iconColor,
                              filter: `drop-shadow(0 0 12px ${accentHex})` 
                          }}
                        />
                      <span className="text-sm font-black tracking-tight relative z-10 transition-colors group-hover:text-text-main">{item.label}</span>
                  
                          {isActive && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="ml-auto"
                            >
                                <ChevronRight className="w-4 h-4 text-text-dim/50" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}

          <div className="pt-2">
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-red/5 text-red hover:bg-red hover:text-white transition-all duration-500 group shadow-lg shadow-red/5 hover:shadow-[0_15px_30px_rgba(239,68,68,0.4)] active:scale-95"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sair do Sistema</span>
            </button>
          </div>
      </div>
    </aside>
  );
}
