"use client";

import React, { useState } from "react";
import { 
  Search, Bell, Sun, Moon, User as UserIcon, 
  Info, CheckCircle2, AlertCircle, Clock,
  Settings, UserCheck, Shield, Zap, X, BellOff,
  Trash2, Mail, ExternalLink, ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSettings } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { adminProfile, notifications: notifPrefs, accentColor, globalAccentHex } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const mockNotifications = [
    { id: 1, title: "Novo Agendamento", description: "Gabriel Santos agendou prova prática.", time: "10 min atrás", icon: Clock, color: "text-blue-primary", bg: "bg-blue-primary/10", type: 'agendamento' },
    { id: 2, title: "Pagamento Confirmado", description: "Matrícula de Juliana Lima processada.", time: "1h atrás", icon: CheckCircle2, color: "text-green", bg: "bg-green/10", type: 'financeiro' },
    { id: 3, title: "Alerta de Vencimento", description: "3 alunos possuem parcelas vencendo hoje.", time: "3h atrás", icon: AlertCircle, color: "text-red", bg: "bg-red/10", type: 'alerta' },
  ];

  const handleClearNotif = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Notificação removida");
  };

  // Se não houver cor global, usa Azul para a barra superior para um visual mais profissional
  const accentHex = globalAccentHex || "#1A6CF7";
  const useGlobal = accentColor !== null;

      return (
        <header className={cn("h-20 sticky top-0 z-40 px-8 flex items-center justify-between backdrop-blur-2xl transition-all duration-500", 
          theme === 'dark' ? "bg-surface-1/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "bg-[#F3F6FA] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-b border-border/10")}>
        {/* Search Bar */}
        <div className="flex flex-1 max-w-xl items-center mr-8">
          <div className="flex-1 relative group">
            <Search className={cn("absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim transition-all duration-700 group-focus-within:scale-125 group-focus-within:rotate-12", 
              useGlobal ? "group-focus-within:text-primary-main" : "group-focus-within:text-blue-primary")} 
              style={{ color: useGlobal ? accentHex : undefined }}
            />
                  <input 
                    type="text" 
                    placeholder="pesquisar alunos, instrutores, pagamentos..." 
                    className={cn("w-full h-14 rounded-[1.5rem] pl-14 pr-6 text-xs font-black uppercase tracking-tight outline-none transition-all border-2", 
                      theme === 'dark' 
                        ? "bg-surface-2/20 border-white/5 focus:border-primary-main/30 shadow-[0_10px_40px_rgba(0,0,0,0.3)]" 
                        : "bg-white border-slate-200 focus:border-blue-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
                      useGlobal 
                        ? "focus:ring-[12px] focus:ring-primary-main/5" 
                        : "focus:ring-[12px] focus:ring-blue-primary/5")}
                  style={useGlobal ? { 
                      // @ts-ignore
                      "--tw-ring-color": `${accentHex}0d`
                  } : {}}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
                    <span className="px-2 py-1 rounded-md bg-surface-2 text-[8px] font-black border border-border">ESC</span>
                </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
            {/* Notifications */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-text-dim transition-all duration-500 group relative border",
                      theme === 'dark' ? "bg-surface-2/30 border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
                    )}
                    style={{ 
                        boxShadow: theme === 'dark' ? `0 10px 30px -5px ${accentHex}30` : undefined,
                    }}
                  >
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.2 }}
                  >
                    <Bell className={cn("w-5 h-5 transition-all duration-500", accentColor ? "group-hover:text-primary-main group-hover:drop-shadow-[0_0_20px_var(--primary-glow)]" : "group-hover:text-blue-primary group-hover:drop-shadow-[0_0_20px_rgba(26,108,247,0.7)]")} 
                      style={{ 
                        // @ts-ignore
                        "--primary-glow": accentHex,
                        color: accentColor ? accentHex : undefined 
                      }}
                    />
                  </motion.div>
                <span className={cn("absolute top-3 right-3 w-2.5 h-2.5 rounded-full ring-2 ring-surface-2 animate-ping", accentColor ? "bg-primary-main" : "bg-blue-primary")} 
                    style={{ backgroundColor: accentColor ? accentHex : undefined }}
                />
                <span className={cn("absolute top-3 right-3 w-2.5 h-2.5 rounded-full ring-2 ring-surface-2 shadow-[0_0_20px_currentColor]", accentColor ? "bg-primary-main" : "bg-blue-primary")} 
                    style={{ 
                        backgroundColor: accentColor ? accentHex : undefined,
                        boxShadow: `0 0 15px ${accentColor ? accentHex : 'currentColor'}`
                    }}
                />
                </motion.button>
              </PopoverTrigger>
            <PopoverContent 
              align="end" 
              className="w-[450px] p-0 overflow-hidden border-2 border-border bg-surface-1/95 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.5)] rounded-[3rem] animate-in fade-in zoom-in-95 slide-in-from-top-12 duration-700"
              style={{ boxShadow: `0 40px 120px rgba(0,0,0,0.4), 0 0 60px ${accentHex}20`, borderColor: `${accentHex}30` }}
            >
              <div className="p-10 border-b border-border bg-surface-2/60 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-[0.05] pointer-events-none">
                  <Bell className="w-40 h-40" style={{ color: accentHex }} />
                </div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-text-main flex items-center gap-4">
                      <div className="w-3.5 h-3.5 rounded-full animate-pulse shadow-glow" style={{ backgroundColor: accentHex, boxShadow: `0 0 20px ${accentHex}` }} />
                      Notificações
                    </h4>
                    <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] mt-3 font-black opacity-60">Centro de Operações Auto Escola</p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/configuracoes">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-4 bg-surface-1 border-2 border-border rounded-2xl text-text-dim hover:text-primary-main transition-all shadow-xl"><Settings className="w-6 h-6" /></motion.button>
                    </Link>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(false)} className="p-4 bg-surface-1 border-2 border-border rounded-2xl text-text-dim hover:text-red transition-all shadow-xl"><X className="w-6 h-6" /></motion.button>
                  </div>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto scrollbar-hide py-4 px-2 space-y-2 bg-surface-1/50">
                <AnimatePresence>
                  {mockNotifications.map((notif, i) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-8 py-6 border-2 border-transparent hover:border-primary-main/20 hover:bg-surface-2 rounded-[2rem] mx-2 transition-all cursor-pointer group/notif relative overflow-hidden"
                      style={{ 
                        // @ts-ignore
                        "--primary-glow": `${accentHex}20`,
                        "--primary-main": accentHex
                      }}
                    >
                      <div className="flex gap-6 relative z-10">
                        <div className={cn("w-16 h-16 rounded-[1.5rem] shrink-0 flex items-center justify-center border-2 border-border group-hover/notif:scale-110 group-hover/notif:rotate-6 transition-all shadow-2xl duration-500 bg-surface-1", notif.color)}>
                          <notif.icon className="w-8 h-8" style={{ filter: `drop-shadow(0 0 10px currentColor)` }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-[13px] font-black uppercase tracking-tighter text-text-main group-hover/notif:text-primary-main transition-colors">{notif.title}</div>
                            <div className="text-[9px] text-text-dimmer font-black uppercase bg-surface-2 px-3 py-1.5 rounded-xl border border-border">{notif.time}</div>
                          </div>
                          <div className="text-[11px] text-text-dim mt-2 font-bold leading-relaxed opacity-80">{notif.description}</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-main/5 to-transparent -translate-x-full group-hover/notif:translate-x-full transition-transform duration-1000" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="p-8 bg-surface-2/90 border-t border-border flex gap-5">
                <button className="flex-1 py-5 bg-surface-1 border-2 border-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text-main transition-all shadow-xl">Limpar Tudo</button>
                <Link href="/notificacoes" className="flex-[1.5]">
                    <motion.button 
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-5 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 border-2 border-white/20"
                        style={{ backgroundColor: accentHex, boxShadow: `0 20px 40px -10px ${accentHex}80` }}
                    >
                        Painel Completo <ExternalLink className="w-5 h-5" />
                    </motion.button>
                </Link>
              </div>
            </PopoverContent>
        </Popover>

        {/* Dark/White Mode */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-text-dim transition-all duration-500 group relative overflow-hidden border",
                  theme === 'dark' ? "bg-surface-2/30 border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
                )}
              style={{
                  boxShadow: theme === "dark" 
                    ? `0 10px 30px -5px rgba(245,158,11,0.2)` 
                    : undefined
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ rotate: 12, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] transition-all duration-500 text-orange" />
                  ) : (
                    <Moon className="w-5 h-5 group-hover:drop-shadow-[0_0_15px_var(--primary-glow)] transition-all duration-500" style={{ color: accentColor ? accentHex : undefined, "--primary-glow": accentHex } as any} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>


          <div className="h-8 w-0.5 bg-border/20 mx-1 rounded-full" />

          {/* User Profile */}
          <Link href="/perfil" className="flex items-center gap-4 pl-2 group cursor-pointer transition-all">
            <div className="text-right hidden md:block">
              <div className="text-sm font-black text-text-main leading-none uppercase tracking-tight group-hover:text-primary-main transition-colors" style={accentColor ? { color: accentHex } : {}}>{adminProfile.name}</div>
              <div className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] mt-1 opacity-60">Acesso Master</div>
            </div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn("w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl relative border border-white/10")}
                    style={{ 
                        background: `linear-gradient(135deg, ${accentHex}20, ${accentHex}05)`,
                        boxShadow: `0 10px 30px -5px ${accentHex}40`
                    }}
                  >
                 <UserIcon className="w-6 h-6" style={{ color: accentHex, filter: `drop-shadow(0 0 10px ${accentHex})` }} />
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        </div>
      </header>
    );
}
