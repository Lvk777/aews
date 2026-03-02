"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { 
  Settings, Shield, Bell, Layout, Moon, Sun, Monitor, 
  Trash2, User as UserIcon, Mail, Key, Globe, Eye, Save,
  Smartphone, Database, Cloud, Languages, Type, Palette,
    Fingerprint, Clock, HelpCircle, Info, Zap, Lock, Sliders, Users, Plus, RefreshCw,
    ChevronRight, Laptop, MapPin, Search, Edit2, Check, X, BellOff, EyeOff,
  ShieldCheck, Share2, FileText, Database as DBIcon, HardDrive, History,
  TrendingUp, DollarSign, Target, Rocket, Trophy, Crown, MessageSquare,
  AlertTriangle, CreditCard, UserPlus, UserMinus, Activity, LifeBuoy,
    BookOpen, MessageCircle, Star, Send, Copy
  } from "lucide-react";

import { useTheme } from "next-themes";
import { useSettings, ZapTemplate } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { 
    accentColor, setAccentColor, 
    language, setLanguage,
    density, setDensity,
    notifications: notifPrefs, setNotifications,
    preferences, setPreferences,
    adminProfile, setAdminProfile,
    brandName, setBrandName,
    logoUrl, setLogoUrl,
    maintenanceMode, setMaintenanceMode,
    twoFactorEnabled, setTwoFactorEnabled,
    zapTemplates, setZapTemplates,
    activeSessions
  } = useSettings();

  const accentColorMap: Record<string, string> = {
    mint: "#00E5A0",
    blue: "#1A6CF7",
    orange: "#F59E0B",
    red: "#EF4444",
    purple: "#7C3AED",
    pink: "#ec4899"
  };

  const globalAccentHex = accentColor ? accentColorMap[accentColor] : null;

  const [activeSection, setActiveSection] = useState("profile");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [isClearCacheModalOpen, setIsClearCacheModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
    const [isResetDBModalOpen, setIsResetDBModalOpen] = useState(false);
    const [isUpdateSystemModalOpen, setIsUpdateSystemModalOpen] = useState(false);
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<ZapTemplate | null>(null);

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
    const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [sessionToDisconnect, setSessionToDisconnect] = useState<any>(null);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);
    const [dangerAction, setDangerAction] = useState<'reset' | 'delete' | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [accessTime, setAccessTime] = useState("ilimitado");

    const handleAction = (label: string) => {
      toast.success(`${label} atualizado com sucesso!`, {
          description: "Suas alterações foram salvas.",
          icon: <Save className="w-4 h-4 text-green" />
      });
    };

    const [users, setUsers] = useState([
      { id: 1, name: "João Silva", role: "Instrutor", email: "joao@pardim.com.br", status: "Ativo", phone: "(11) 98888-7777", since: "15/01/2024", lastLogin: "Hoje, 08:30" },
      { id: 2, name: "Maria Oliveira", role: "Secretária", email: "maria@pardim.com.br", status: "Ativo", phone: "(11) 97777-6666", since: "10/03/2023", lastLogin: "Ontem, 14:20" },
      { id: 3, name: "Pedro Santos", role: "Instrutor", email: "pedro@pardim.com.br", status: "Inativo", phone: "(11) 96666-5555", since: "22/11/2023", lastLogin: "Há 1 mês" },
    ]);


  const [historyItems] = useState([
    { id: 1, type: "WhatsApp", recipient: "Gabriel Santos", status: "Enviado", time: "10:30", date: "27/02/2026" },
    { id: 2, type: "Email", recipient: "Juliana Lima", status: "Enviado", time: "09:15", date: "27/02/2026" },
    { id: 3, type: "SMS", recipient: "Ricardo Motta", status: "Falhou", time: "08:45", date: "26/02/2026" },
  ]);

    const sections = [
    {
      id: "profile",
      title: "Meu Perfil",
      icon: UserIcon,
      accent: accentColor || "blue",
      accentHex: globalAccentHex || "#1A6CF7",
      bgIcon: UserIcon,
        content: (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 bg-white/60 dark:bg-navy/40 backdrop-blur-2xl rounded-[2.5rem] border transition-all relative overflow-hidden group hover:scale-[1.01] shadow-2xl active:scale-[0.99] duration-500 cursor-default"
              style={{ 
                borderColor: (globalAccentHex || "#1A6CF7") + "40", 
                boxShadow: `0 30px 60px -15px rgba(0,0,0,0.1), 0 0 40px ${(globalAccentHex || "#1A6CF7")}26, inset 0 0 40px ${(globalAccentHex || "#1A6CF7")}1a`,
              }}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,var(--glow-color),transparent_70%)] opacity-30 group-hover:opacity-50 transition-opacity duration-1000" style={{ "--glow-color": globalAccentHex || "#1A6CF7" } as any} />
                <div className="absolute -right-20 top-20 w-80 h-80 bg-blue/10 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute -left-20 bottom-20 w-80 h-80 bg-purple/10 blur-[100px] rounded-full animate-pulse [animation-delay:1s]" />
              </div>
              
              <div className="absolute -right-10 -top-10 opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 pointer-events-none">
                <Crown className="w-64 h-64 text-blue" style={{ color: globalAccentHex || "#1A6CF7" }} />
              </div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div 
                    className="w-32 h-32 rounded-[2.8rem] flex items-center justify-center shadow-2xl relative overflow-hidden group/avatar border border-transparent hover:border-white/20 group-hover:border-white/30 transition-all duration-700 hover:rotate-6 active:scale-90"
                    style={{ backgroundColor: (globalAccentHex || "#1A6CF7") + "1a", color: globalAccentHex || "#1A6CF7" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity bg-gradient-to-tr from-blue/30 via-transparent to-white/10" style={{ background: `linear-gradient(45deg, ${(globalAccentHex || "#1A6CF7")}40, transparent, white/10)` }} />
                    <UserIcon className="w-16 h-16 relative z-10 drop-shadow-[0_0_15px_rgba(26,108,247,0.6)] group-hover:scale-110 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 15px ${globalAccentHex || "#1A6CF7"})` }} />
                    
                    {/* Floating Glow */}
                    <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                  </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <h4 className="text-4xl font-black text-text-main uppercase tracking-tighter drop-shadow-lg">{adminProfile.name}</h4>
                        <motion.span 
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          className="w-fit px-5 py-2 bg-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 shadow-[0_10px_30px_rgba(26,108,247,0.6)] mx-auto md:mx-0 cursor-default" 
                          style={{ backgroundColor: globalAccentHex || "#1A6CF7", boxShadow: `0 0 25px ${globalAccentHex || "#1A6CF7"}80` }}
                        >
                          Administrador Master
                        </motion.span>
                      </div>
                      <p className="text-[11px] text-text-dim uppercase tracking-[0.5em] font-black drop-shadow-sm" style={{ color: (globalAccentHex || "#1A6CF7") + "CC" }}>{adminProfile.email}</p>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                        {[
                          { icon: Shield, label: "Acesso Total", color: globalAccentHex || "#1A6CF7" },
                          { icon: Activity, label: "Status Online", color: "#10B981" },
                          { icon: Lock, label: "2FA Ativo", color: "#F59E0B" }
                        ].map((badge, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-3 px-5 py-2.5 bg-surface-1/50 rounded-2xl border border-transparent hover:border-border/20 hover:bg-surface-1 hover:border-border/50 transition-all duration-300 group/badge cursor-default hover:scale-105 shadow-sm"
                          >
                            <badge.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: badge.color }} />
                            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">{badge.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                      <Link 
                        href="/perfil" 
                        className={cn("px-8 py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500", 
                        "text-white flex items-center gap-3",
                        "hover:scale-105 active:scale-95 border border-transparent hover:border-white/20 relative overflow-hidden group/edit-profile shadow-2xl")}
                        style={{ 
                          backgroundColor: globalAccentHex || "#1A6CF7", 
                          boxShadow: `0 15px 30px ${(globalAccentHex || "#1A6CF7")}66`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/edit-profile:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10 flex items-center gap-3"><Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Editar Perfil</span>
                      </Link>
                  </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Permissões", icon: ShieldCheck, value: "Nível 5", color: "blue", desc: "Acesso administrativo completo" },
                { label: "Atividade", icon: History, value: "15 Atos", color: "purple", desc: "Ações realizadas hoje" },
                { label: "Segurança", icon: Fingerprint, value: "Forte", color: "green", desc: "Proteção biométrica ativa" },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="p-8 bg-surface-2/40 rounded-[2.5rem] border space-y-4 hover:scale-[1.05] hover:bg-surface-2/60 transition-all duration-500 group relative overflow-hidden cursor-default active:scale-95"
                  style={{ 
                    borderColor: (globalAccentHex || (stat.color === 'blue' ? "#1A6CF7" : stat.color === 'purple' ? "#7C3AED" : "#10B981")) + "26",
                    boxShadow: `0 15px 35px rgba(0,0,0,0.2), inset 0 0 30px ${(globalAccentHex || (stat.color === 'blue' ? "#1A6CF7" : stat.color === 'purple' ? "#7C3AED" : "#10B981"))}10`,
                  }}
                >
                  <div className="absolute -right-8 -top-8 opacity-[0.05] group-hover:opacity-[0.15] group-hover:rotate-12 transition-all duration-700 scale-125">
                    <stat.icon className="w-32 h-32" style={{ color: globalAccentHex || (stat.color === 'blue' ? "#1A6CF7" : stat.color === 'purple' ? "#7C3AED" : "#10B981") }} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-surface-1 border border-transparent hover:border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <stat.icon className="w-7 h-7 relative z-10" style={{ color: globalAccentHex || (stat.color === 'blue' ? "#1A6CF7" : stat.color === 'purple' ? "#7C3AED" : "#10B981") }} />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-widest text-text-dim group-hover:text-text-main transition-colors">{stat.label}</h5>
                      <p className="text-2xl font-black text-text-main uppercase tracking-tighter group-hover:scale-105 origin-left transition-transform duration-500">{stat.value}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-text-dim font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">{stat.desc}</p>
                  
                  {/* Glow Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(to right, transparent, ${globalAccentHex || (stat.color === 'blue' ? "#1A6CF7" : stat.color === 'purple' ? "#7C3AED" : "#10B981")}, transparent)` }} />
                </div>
              ))}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border space-y-4 hover:scale-[1.02] transition-all group relative overflow-hidden"
            style={{ 
              borderColor: "transparent",
              boxShadow: `0 0 15px ${(globalAccentHex || "#1A6CF7")}0d`,
            }}
          >
            <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-500">
              <Languages className="w-24 h-24" style={{ color: globalAccentHex || "#1A6CF7" }} />
            </div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim block relative z-10">Idioma do Sistema</label>
            <select 
              value={language}
              onChange={(e) => { setLanguage(e.target.value as any); handleAction("Idioma"); }}
              className="w-full bg-surface-1 border border-transparent hover:border-border/20 p-4 rounded-2xl text-xs outline-none focus:ring-4 focus:ring-opacity-5 transition-all relative z-10 font-black"
              style={{ 
                // @ts-ignore
                "--tw-ring-color": globalAccentHex || "#1A6CF7",
              }}
            >
              <option value="pt">Português (Brasil)</option>
              <option value="en">English (United States)</option>
              <option value="es">Español (España)</option>
            </select>
          </div>
          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border space-y-4 hover:scale-[1.02] transition-all group relative overflow-hidden"
            style={{ 
              borderColor: "transparent",
              boxShadow: `0 0 15px ${(globalAccentHex || "#1A6CF7")}0d`,
            }}
          >
            <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-500">
              <Mail className="w-24 h-24" style={{ color: globalAccentHex || "#1A6CF7" }} />
            </div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim block relative z-10">Email de Recuperação</label>
            <div className="flex gap-3 relative z-10">
              <input 
                type="email" 
                defaultValue={adminProfile.email} 
                className="flex-1 bg-surface-1 border border-transparent hover:border-border/20 p-4 rounded-2xl text-xs outline-none transition-all font-black"
              />
                <button 
                  onClick={() => handleAction("Email")} 
                  className="p-4 rounded-2xl transition-all shadow-xl active:scale-95 relative overflow-hidden group/save-email border"
                  style={{ 
                    backgroundColor: (globalAccentHex || "#1A6CF7") + "1a", 
                    color: globalAccentHex || "#1A6CF7",
                    borderColor: "transparent"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/save-email:translate-x-full transition-transform duration-1000" />
                  <Save className="w-5 h-5 relative z-10" />
                </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
    {
      id: "appearance",
      title: "Aparência",
      icon: Layout,
      accent: accentColor || "mint",
      accentHex: globalAccentHex || "#00E5A0",
      bgIcon: Palette,
      content: (
        <div className="space-y-6">
          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02]"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}1a`,
            }}
          >
            <div className="absolute -right-10 -top-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
              <Palette className="w-64 h-64" style={{ color: globalAccentHex || "#00E5A0" }} />
            </div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
              >
                <Palette className="w-4 h-4" />
              </div> Tema do Sistema
            </h4>
            <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
              {[
                { id: "light", icon: Sun, label: "Claro" },
                { id: "dark", icon: Moon, label: "Escuro" },
                { id: "system", icon: Monitor, label: "Sistema" },
              ].map((t) => {
                const isSelected = theme === t.id;
                return (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); handleAction("Tema"); }}
                      className={cn(
                        "flex flex-col items-center gap-3 p-6 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border relative overflow-hidden group/theme",
                        isSelected 
                          ? "text-white scale-105 shadow-2xl" 
                          : "bg-surface-1 text-text-dim border-border hover:bg-surface-3 hover:scale-105 shadow-xl"
                      )}
                      style={isSelected ? { 
                        backgroundColor: globalAccentHex || "#00E5A0",
                        borderColor: globalAccentHex || "#00E5A0",
                        boxShadow: `0 15px 30px ${(globalAccentHex || "#00E5A0")}66`,
                      } : {}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/theme:translate-x-full transition-transform duration-1000" />
                      <t.icon className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">{t.label}</span>
                    </button>
                );
              })}
            </div>
          </div>

          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02]"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}1a`,
            }}
          >
            <div className="absolute -left-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
              <Zap className="w-64 h-64" style={{ color: globalAccentHex || "#00E5A0" }} />
            </div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
              >
                <Zap className="w-4 h-4" />
              </div> Cores de Destaque
            </h4>
            <div className="flex flex-wrap gap-4 mt-6 relative z-10">
              {/* Reset Color Button */}
              <button 
                onClick={() => { setAccentColor(null); handleAction("Resetar Cores"); }}
                className={cn(
                  "w-14 h-14 rounded-2xl border transition-all shrink-0 flex items-center justify-center group relative bg-surface-1",
                  accentColor === null 
                    ? "scale-110" 
                    : "border-border/40 opacity-60 hover:opacity-100 hover:scale-110"
                )} 
                style={accentColor === null ? {
                  borderColor: globalAccentHex || "#00E5A0",
                  boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}4d`,
                } : {}}
              >
                <X className={cn("w-6 h-6 transition-colors", accentColor === null ? "text-mint" : "text-text-dim group-hover:text-mint")} style={accentColor === null ? { color: globalAccentHex || "#00E5A0" } : {}} />
                {accentColor === null && (
                  <motion.div 
                    layoutId="color-ring"
                    className="absolute -inset-1.5 border rounded-[1.25rem]"
                    style={{ borderColor: (globalAccentHex || "#00E5A0") + "4d" }}
                    initial={false}
                  />
                )}
              </button>

              {[
                { name: 'Mint', color: 'mint', hex: '#00E5A0' },
                { name: 'Blue', color: 'blue', hex: '#1A6CF7' },
                { name: 'Orange', color: 'orange', hex: '#F59E0B' },
                { name: 'Red', color: 'red', hex: '#EF4444' },
                { name: 'Purple', color: 'purple', hex: '#7C3AED' },
                { name: 'Pink', color: 'pink', hex: '#ec4899' }
              ].map((c) => {
                const isActive = accentColor === c.color;
                return (
                  <button 
                    key={c.color} 
                    onClick={() => { setAccentColor(c.color as any); handleAction(`Cor ${c.name}`); }}
                    className={cn(
                      "w-14 h-14 rounded-2xl border transition-all shrink-0 flex items-center justify-center group relative shadow-lg overflow-hidden",
                      isActive 
                        ? "border-white/50 scale-110" 
                        : "border-white/10 opacity-70 hover:opacity-100 hover:scale-110"
                    )} 
                    style={{ 
                      backgroundColor: c.hex,
                      boxShadow: isActive ? `0 10px 25px -5px ${c.hex}80, 0 0 15px ${c.hex}40` : `0 4px 12px ${c.hex}20`
                    }} 
                  >
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {isActive && (
                      <>
                        <Check className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10" />
                        <motion.div 
                          layoutId="color-ring"
                          className="absolute -inset-1.5 border rounded-[1.25rem]"
                          style={{ borderColor: `${c.hex}80` }}
                          initial={false}
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02]"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}1a`,
            }}
          >
            <div className="absolute right-0 bottom-0 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 pointer-events-none">
              <Sliders className="w-64 h-64" style={{ color: globalAccentHex || "#00E5A0" }} />
            </div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
              >
                <Sliders className="w-4 h-4" />
              </div> Densidade da Interface
            </h4>
            <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
              {[
                { id: "compact", label: "Compacto" },
                { id: "standard", label: "Padrão" },
                { id: "wide", label: "Espaçado" },
              ].map((d) => {
                const isSelected = density === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => { setDensity(d.id as any); handleAction("Densidade"); }}
                    className={cn(
                      "p-5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border relative overflow-hidden group/density",
                      isSelected 
                        ? "scale-105 shadow-xl" 
                        : "bg-surface-1 text-text-dim border-border hover:bg-surface-3 hover:scale-105 shadow-lg"
                    )}
                    style={isSelected ? { 
                      backgroundColor: (globalAccentHex || "#00E5A0") + "1a",
                      color: globalAccentHex || "#00E5A0",
                      borderColor: globalAccentHex || "#00E5A0",
                      boxShadow: `0 10px 20px ${(globalAccentHex || "#00E5A0")}33`,
                    } : {}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/density:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "security",
      title: "Segurança",
      icon: Shield,
      accent: accentColor || "red",
      accentHex: globalAccentHex || "#EF4444",
      bgIcon: Lock,
      content: (
        <div className="space-y-6">
            <div 
              className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02] hover:bg-surface-2/60"
              style={{ 
                borderColor: (globalAccentHex || "#EF4444") + "26", 
                boxShadow: `0 20px 40px -10px rgba(0,0,0,0.1), inset 0 0 40px ${(globalAccentHex || "#EF4444")}1a`,
              }}
            >
              <div className="absolute -right-20 -top-20 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
                <Shield className="w-80 h-80" style={{ color: globalAccentHex || "#EF4444" }} />
              </div>
              
              {/* Top Glow */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, ${(globalAccentHex || "#EF4444")}1a, transparent)` }} />
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#EF4444") + "1a", color: globalAccentHex || "#EF4444" }}
              >
                <Lock className="w-4 h-4" />
              </div> Proteção e Acesso
            </h4>
            
            <div className="space-y-4 mt-6 relative z-10">
                  <button 
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      handleAction("Autenticação 2FA");
                    }}
                    className="flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm border border-transparent rounded-2xl hover:border-border/30 transition-all group/2fa shadow-xl hover:scale-[1.01] relative overflow-hidden"
                    style={{ 
                      // @ts-ignore
                      "--tw-border-opacity": 0.3,
                      borderColor: twoFactorEnabled ? (globalAccentHex || "#EF4444") : undefined,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/2fa:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div 
                        className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover/2fa:rotate-3 shadow-lg")}
                        style={{ 
                          backgroundColor: twoFactorEnabled ? (globalAccentHex || "#EF4444") + "33" : undefined,
                          color: twoFactorEnabled ? (globalAccentHex || "#EF4444") : undefined,
                        }}
                      >
                        <Smartphone className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-main block">Autenticação em Duas Etapas</span>
                        <span className="text-[9px] text-text-dim uppercase tracking-tight font-black">{twoFactorEnabled ? "Ativado - Sua conta está protegida" : "Desativado - Recomendamos ativar"}</span>
                      </div>
                    </div>
                    <div 
                      className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg relative z-10")}
                      style={{ backgroundColor: twoFactorEnabled ? "rgba(34,197,94,0.1)" : (globalAccentHex || "#EF4444") + "1a", color: twoFactorEnabled ? "#22c55e" : (globalAccentHex || "#EF4444") }}
                    >
                      {twoFactorEnabled ? "Ativo" : "Desativo"}
                    </div>
                  </button>

                  <button 
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="w-full flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm border border-transparent hover:border-border/20 rounded-2xl hover:border-opacity-30 transition-all group/password shadow-xl hover:scale-[1.01] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/password:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-surface-2 text-text-dim flex items-center justify-center group-hover/password:bg-opacity-10 transition-all group-hover/password:rotate-3 shadow-lg" style={{ color: globalAccentHex || "#EF4444" }}>
                        <Key className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-main block">Alterar Senha de Acesso</span>
                        <span className="text-[9px] text-text-dim uppercase tracking-tight font-black">Última alteração há 3 meses</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-dim relative z-10 group-hover/password:translate-x-1 transition-transform" />
                  </button>
              </div>
            </div>

            <div 
              className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
              style={{ 
                borderColor: "transparent", 
                boxShadow: `0 0 20px ${(globalAccentHex || "#EF4444")}1a`,
              }}
            >
              <div className="absolute -left-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 pointer-events-none">
                <Monitor className="w-64 h-64" style={{ color: globalAccentHex || "#EF4444" }} />
              </div>
                <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: (globalAccentHex || "#EF4444") + "1a", color: globalAccentHex || "#EF4444" }}
                  >
                    <Monitor className="w-4 h-4" />
                  </div> Sessões Ativas
                </h4>
                  <div className="space-y-3 mt-6 relative z-10">
                    {activeSessions.map((session) => (
                          <button 
                            key={session.id} 
                            onClick={() => setSelectedSession(session)}
                            className="w-full flex items-center justify-between p-5 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 shadow-xl hover:scale-[1.01] active:scale-[0.98] text-left group/session transition-all relative overflow-hidden"
                          >
                            {/* Shimmer for session button */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/session:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            
                            {/* Hover Glow for session button */}
                            <div className="absolute inset-0 opacity-0 group-hover/session:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${(globalAccentHex || "#EF4444")}26` }} />

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-surface-2 text-text-dim flex items-center justify-center group-hover/session:scale-110 group-hover/session:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10" style={{ color: globalAccentHex || "#EF4444" }}>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/session:opacity-100 transition-opacity" />
                            <Laptop className="w-6 h-6 relative z-10" />
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-text-main uppercase tracking-widest">{session.device}</div>
                            <div className="flex items-center gap-2 text-[8px] text-text-dim uppercase tracking-[0.2em] font-black mt-1">
                              <MapPin className="w-3 h-3" style={{ color: globalAccentHex || "#EF4444" }} /> {session.location} • {session.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                          {session.active && (
                            <span className="text-[9px] font-black uppercase text-green bg-green/10 px-3 py-1 rounded-full border border-green/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Atual</span>
                          )}
                          <ChevronRight className="w-4 h-4 text-text-dim group-hover/session:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>

            </div>

            <div className="p-8 bg-red/5 rounded-[2.5rem] border border-red/20 shadow-[0_0_20px_rgba(239,68,68,0.05)] hover:bg-red/10 transition-all group relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-32 h-32 text-red" />
              </div>
              <div className="flex items-center gap-3 text-red relative z-10">
                <Trash2 className="w-5 h-5" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Zona de Perigo</h4>
              </div>
              <p className="text-[9px] text-text-dim uppercase tracking-wider font-black mt-4 relative z-10 leading-relaxed">Ações que podem apagar dados permanentemente ou redefinir o sistema. Use com cautela.</p>
                    <div className="flex gap-4 mt-6 relative z-10">
                      <button 
                        onClick={() => setDangerAction('reset')} 
                        className="flex-1 px-6 py-4 bg-red text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_25px_50px_rgba(239,68,68,0.6)] transition-all active:scale-95 hover:scale-[1.05] border border-white/10 hover:border-white/30 relative overflow-hidden group/reset-all"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/reset-all:translate-x-full transition-transform duration-1000" />
                        <div className="absolute inset-0 opacity-0 group-hover/reset-all:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]" />
                        
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/reset-all:opacity-100 transition-opacity" />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2"><RefreshCw className="w-3 h-3 group-hover/reset-all:rotate-180 transition-transform duration-700" /> Redefinir Tudo</span>
                      </button>
                      <button 
                        onClick={() => setDangerAction('delete')} 
                        className="flex-1 px-6 py-4 border-2 border-red/40 text-red text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red hover:text-white transition-all active:scale-95 hover:scale-[1.05] hover:shadow-[0_25px_50px_rgba(239,68,68,0.4)] relative overflow-hidden group/delete-account"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/delete-account:translate-x-full transition-transform duration-1000" />
                        <div className="absolute inset-0 opacity-0 group-hover/delete-account:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(239,68,68,0.1)]" />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2"><Trash2 className="w-3 h-3 group-hover/delete-account:scale-110 transition-transform" /> Excluir Conta</span>
                      </button>
                    </div>
            </div>
        </div>
      )
    },
    {
      id: "preferences",
      title: "Preferências",
      icon: Sliders,
      accent: accentColor || "gold",
      accentHex: globalAccentHex || "#F59E0B",
      bgIcon: Sliders,
      content: (
        <div className="space-y-6">
          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#F59E0B")}1a`,
            }}
          >
            <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
              <Database className="w-80 h-80" style={{ color: globalAccentHex || "#F59E0B" }} />
            </div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#F59E0B") + "1a", color: globalAccentHex || "#F59E0B" }}
              >
                <Sliders className="w-4 h-4" />
              </div> Sistema e Dados
            </h4>
            
            <div className="space-y-4 mt-6 relative z-10">
              {[
                { id: 'cloudBackup', label: 'Backup em Nuvem', icon: Cloud, desc: 'Sincronizar dados automaticamente com servidor seguro' },
                { id: 'privacy', label: 'Modo de Privacidade', icon: ShieldCheck, desc: 'Ocultar dados sensíveis em telas públicas' },
                ].map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setPreferences({ ...preferences, [item.id]: !(preferences as any)[item.id] });
                        handleAction(item.label);
                      }}
                      className="flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 group/item transition-all shadow-xl hover:border-opacity-30 cursor-pointer relative overflow-hidden hover:scale-[1.01]" 
                      style={{ borderColor: "transparent" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Hover Glow for Preference Item */}
                      <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${(globalAccentHex || "#F59E0B")}26` }} />

                      <div className="flex items-center gap-4 relative z-10">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10"
                          style={{ backgroundColor: (globalAccentHex || "#F59E0B") + "1a", color: globalAccentHex || "#F59E0B" }}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          <item.icon className="w-7 h-7 relative z-10" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-text-main group-hover/item:text-gold transition-colors" style={{ color: activeSection === 'preferences' ? globalAccentHex : undefined }}>{item.label}</div>
                          <div className="text-[9px] text-text-dim mt-1 font-bold uppercase tracking-tight">{item.desc}</div>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <Switch 
                          checked={(preferences as any)[item.id]} 
                        />
                      </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02]"
              style={{ 
                borderColor: "transparent", 
                boxShadow: `0 0 20px ${(globalAccentHex || "#F59E0B")}1a`,
              }}
            >
              <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
                <HardDrive className="w-24 h-24" style={{ color: globalAccentHex || "#F59E0B" }} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-2 relative z-10">
                <DBIcon className="w-4 h-4" style={{ color: globalAccentHex || "#F59E0B" }} /> Armazenamento
              </h4>
              <div className="space-y-3 mt-4 relative z-10">
                <div className="flex justify-between text-[9px] uppercase font-black">
                  <span className="text-text-dim">Uso de Disco</span>
                  <span className="text-text-main">2.4GB / 10GB</span>
                </div>
                <div className="h-3 w-full bg-surface-1 rounded-full overflow-hidden border border-transparent hover:border-border/20">
                  <div className="h-full w-[24%] shadow-lg transition-all" style={{ background: `linear-gradient(to right, ${globalAccentHex || "#F59E0B"}, ${globalAccentHex || "#FB923C"})` }} />
                </div>
                <p className="text-[8px] text-text-dim uppercase tracking-widest font-black">24% utilizado • 7.6GB disponíveis</p>
              </div>
            </div>
            <div 
              className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02]"
              style={{ 
                borderColor: "transparent", 
                boxShadow: `0 0 20px ${(globalAccentHex || "#F59E0B")}1a`,
              }}
            >
              <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
                <History className="w-24 h-24" style={{ color: globalAccentHex || "#F59E0B" }} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-2 relative z-10">
                <History className="w-4 h-4" style={{ color: globalAccentHex || "#F59E0B" }} /> Cache Local
              </h4>
              <p className="text-[9px] text-text-dim uppercase tracking-tight font-black mt-4 relative z-10 leading-relaxed">Limpe o cache local para resolver problemas de carregamento e interface.</p>
                      <button 
                        onClick={() => setIsClearCacheModalOpen(true)} 
                        className="w-full mt-6 py-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 relative z-10 font-black shadow-lg hover:scale-105 group/cache overflow-hidden"
                        style={{ 
                          // @ts-ignore
                          "--tw-border-opacity": 0.3,
                          borderColor: (globalAccentHex || "#F59E0B"),
                          color: (globalAccentHex || "#F59E0B"),
                        }}
                      >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/cache:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10">Limpar Cache</span>
                    </button>
              </div>
            </div>
          </div>
      )
    },
    {
      id: "admin",
      title: "Sala Admin",
      icon: Lock,
      accent: accentColor || "purple",
      accentHex: globalAccentHex || "#7C3AED",
      bgIcon: Crown,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand & Logo */}
                <div 
                  className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02] hover:bg-surface-2/60"
                  style={{ 
                    borderColor: (globalAccentHex || "#7C3AED") + "26", 
                    boxShadow: `0 20px 40px -10px rgba(0,0,0,0.1), inset 0 0 40px ${(globalAccentHex || "#7C3AED")}1a`,
                  }}
                >
                  <div className="absolute -right-20 -top-20 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
                    <Layout className="w-80 h-80" style={{ color: globalAccentHex || "#7C3AED" }} />
                  </div>
                  
                  {/* Glow effect at top */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, ${(globalAccentHex || "#7C3AED")}1a, transparent)` }} />
                <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                  >
                    <Palette className="w-4 h-4" />
                  </div> Identidade Visual
                </h4>
                
                <div className="space-y-6 mt-6 relative z-10">
                  <div className="flex flex-col items-center gap-4 p-4 bg-surface-1/50 rounded-2xl border border-dashed border-border group/logo transition-all">
                    <div className="w-20 h-20 rounded-xl bg-surface-2 flex items-center justify-center overflow-hidden border border-transparent hover:border-border/20 shadow-inner">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" /> : <Plus className="w-8 h-8 text-text-dim" />}
                    </div>
                    <button 
                      onClick={() => setIsLogoModalOpen(true)}
                      className="px-6 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 relative overflow-hidden group/logo-btn border border-transparent hover:border-white/10"
                      style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/logo-btn:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10">Alterar Logo Principal</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim ml-1">Nome da Auto Escola</label>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="flex-1 bg-surface-1 border border-transparent hover:border-border/20 p-4 rounded-2xl text-xs outline-none transition-all font-black"
                      />
                      <button 
                        onClick={() => handleAction("Nome")} 
                        className="p-4 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all relative overflow-hidden group/save-brand border border-transparent hover:border-white/20"
                        style={{ backgroundColor: globalAccentHex || "#7C3AED" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/save-brand:translate-x-full transition-transform duration-1000" />
                        <Save className="w-5 h-5 relative z-10" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings & Tools */}
                <div 
                  className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02] hover:bg-surface-2/60"
                  style={{ 
                    borderColor: (globalAccentHex || "#7C3AED") + "26", 
                    boxShadow: `0 20px 40px -10px rgba(0,0,0,0.1), inset 0 0 40px ${(globalAccentHex || "#7C3AED")}1a`,
                  }}
                >
                  <div className="absolute -left-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                    <Sliders className="w-64 h-64" style={{ color: globalAccentHex || "#7C3AED" }} />
                  </div>

                  {/* Glow Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `linear-gradient(to right, transparent, ${globalAccentHex || "#7C3AED"}, transparent)` }} />
                <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                  >
                    <Settings className="w-4 h-4" />
                  </div> Ferramentas do Sistema
                </h4>

                <div className="space-y-4 mt-6 relative z-10">
                    <div 
                      onClick={() => {
                        setMaintenanceMode(!maintenanceMode);
                        handleAction(!maintenanceMode ? "Manutenção Ativada" : "Manutenção Desativada");
                      }}
                      className="flex items-center justify-between p-5 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 group/tool transition-all shadow-xl cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/tool:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center group-hover/tool:scale-110 transition-transform shadow-lg">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-text-main">Modo Manutenção</div>
                          <div className="text-[9px] text-text-dim mt-0.5 font-bold uppercase">Bloquear acesso geral</div>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <Switch 
                          checked={maintenanceMode}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                      <button 
                        onClick={() => setIsLogsModalOpen(true)}
                        className="flex items-center justify-center gap-2 p-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 hover:scale-105 group/log-btn relative overflow-hidden"
                        style={{ color: globalAccentHex || "#7C3AED", borderColor: "transparent" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/log-btn:translate-x-full transition-transform duration-1000" />
                        <History className="w-4 h-4 group-hover:rotate-12 transition-transform relative z-10" /> <span className="relative z-10">Ver Logs</span>
                      </button>
                      <button 
                        onClick={() => setIsResetDBModalOpen(true)}
                        className="flex items-center justify-center gap-2 p-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-[9px] font-black uppercase tracking-widest text-text-dim hover:text-red hover:border-red/30 transition-all shadow-xl active:scale-95 hover:scale-105 group/reset-db-btn relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/10 to-transparent -translate-x-full group-hover/reset-db-btn:translate-x-full transition-transform duration-1000" />
                          <Trash2 className="w-4 h-4 relative z-10" /> <span className="relative z-10">Reset DB</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setIsUpdateSystemModalOpen(true)}
                      className="w-full flex items-center justify-center gap-3 p-5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 border border-transparent hover:border-white/20 hover:scale-[1.02] group/update-btn relative overflow-hidden"
                      style={{ backgroundColor: globalAccentHex || "#7C3AED", boxShadow: `0 10px 20px ${(globalAccentHex || "#7C3AED")}4d` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/update-btn:translate-x-full transition-transform duration-1000" />
                      <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform relative z-10" /> <span className="relative z-10">Atualizar Sistema</span>
                    </button>
                </div>
              </div>

          </div>

            {/* User Management */}
              <div 
                className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.01] hover:bg-surface-2/60"
                style={{ 
                  borderColor: (globalAccentHex || "#7C3AED") + "26", 
                  boxShadow: `0 20px 40px -10px rgba(0,0,0,0.1), inset 0 0 40px ${(globalAccentHex || "#7C3AED")}1a`,
                }}
              >
                <div className="absolute -left-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-6 pointer-events-none">
                  <Users className="w-64 h-64" style={{ color: globalAccentHex || "#7C3AED" }} />
                </div>
                
                {/* Float Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "0d" }} />
              <div className="flex items-center justify-between relative z-10">
                <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                  >
                    <Users className="w-4 h-4" />
                  </div> Gerenciamento de Usuários
                </h4>
                  <button 
                    onClick={() => setIsUserModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-4 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl relative overflow-hidden group/add-user border border-transparent hover:border-white/20"
                    style={{ 
                      backgroundColor: globalAccentHex || "#7C3AED",
                      boxShadow: `0 10px 20px ${(globalAccentHex || "#7C3AED")}4d`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/add-user:translate-x-full transition-transform duration-1000" />
                    <UserPlus className="w-4 h-4 relative z-10" /> <span className="relative z-10">Adicionar Usuário</span>
                  </button>
              </div>

                  <div className="space-y-3 mt-6 relative z-10">
                      {users.map((u) => (
                        <div 
                          key={u.id} 
                            onClick={() => {
                              setSelectedUser(u);
                              setShowPassword(false);
                              setIsUserDetailsModalOpen(true);
                            }}
                          className="flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 group/user transition-all shadow-xl hover:scale-[1.01] hover:bg-surface-2 cursor-pointer relative overflow-hidden" 
                          style={{ 
                            borderColor: "transparent",
                            boxShadow: `0 10px 30px rgba(0,0,0,0.1)`
                          }}
                        >
                          {/* Shimmer for List Item */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/user:translate-x-full transition-transform duration-1000 pointer-events-none" />

                          {/* Hover Glow for List Item */}
                          <div className="absolute inset-0 opacity-0 group-hover/user:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${(globalAccentHex || "#7C3AED")}26` }} />

                          <div className="flex items-center gap-5 relative z-10">
                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover/user:scale-110 group-hover/user:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10"
                              style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                            >
                              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/user:opacity-100 transition-opacity" />
                              <UserIcon className="w-7 h-7 relative z-10" />
                            </div>
                            <div>
                              <div className="text-[11px] font-black text-text-main uppercase tracking-widest group-hover/user:text-purple transition-colors" style={{ color: activeSection === 'admin' ? globalAccentHex : undefined }}>{u.name}</div>
                              <div className="flex items-center gap-3 text-[9px] text-text-dim uppercase tracking-widest font-black mt-1.5 opacity-70">
                                <span className="flex items-center gap-1 group-hover/user:text-text-main transition-colors"><Shield className="w-3 h-3" /> {u.role}</span>
                                <span className="w-1 h-1 rounded-full bg-text-dim/30" />
                                <span className="flex items-center gap-1 group-hover/user:text-text-main transition-colors"><Mail className="w-3 h-3" /> {u.email}</span>
                              </div>
                            </div>
                          </div>
                        <div className="flex items-center gap-4 relative z-10">
                          <span className={cn("px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm border", u.status === "Ativo" ? "bg-green/10 text-green border-green/20" : "bg-red/10 text-red border-red/20")}>{u.status}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setUsers(users.filter(user => user.id !== u.id));
                              handleAction("Usuário removido");
                            }}
                            className="p-3 text-text-dim hover:text-white hover:bg-red transition-all hover:scale-110 active:scale-95 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/50 hover:border-red/30 shadow-lg group/del-user relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/del-user:translate-x-full transition-transform duration-1000" />
                            <Trash2 className="w-5 h-5 relative z-10" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

            </div>
        </div>
      )
    },
    {
      id: "zapnotify",
      title: "ZapNotify",
      icon: MessageCircle,
      accent: accentColor || "purple",
      accentHex: globalAccentHex || "#7C3AED",
      bgIcon: Send,
      content: (
        <div className="space-y-6">
          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#7C3AED")}1a`,
            }}
          >
            <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
              <MessageCircle className="w-80 h-80" style={{ color: globalAccentHex || "#7C3AED" }} />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                >
                  <Zap className="w-4 h-4" />
                </div> Modelos ZapNotify
              </h4>
                  <button 
                    onClick={() => setEditingTemplate({ id: Math.random().toString(), name: "", content: "" })}
                      className="flex items-center gap-2 px-6 py-4 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-xl relative overflow-hidden group/new-template border border-white/5"

                    style={{ backgroundColor: globalAccentHex || "#7C3AED", boxShadow: `0 10px 20px ${(globalAccentHex || "#7C3AED")}4d` }}
                  >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/new-template:translate-x-full transition-transform duration-1000" />
                  <Plus className="w-4 h-4 relative z-10" /> <span className="relative z-10">Criar Novo Modelo</span>
                </button>
            </div>

              <div className="space-y-3 mt-8 relative z-10">
                {zapTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    onClick={() => setEditingTemplate(template)}
                    className="flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 group/template transition-all shadow-xl hover:scale-[1.01] hover:bg-surface-2 cursor-pointer relative overflow-hidden" 
                    style={{ borderColor: "transparent" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/template:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover/template:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${(globalAccentHex || "#7C3AED")}26` }} />

                    <div className="flex items-center gap-5 relative z-10 flex-1 min-w-0">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover/template:scale-110 group-hover/template:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10"
                        style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/template:opacity-100 transition-opacity" />
                        <MessageSquare className="w-7 h-7 relative z-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-black text-text-main uppercase tracking-widest group-hover/template:text-purple transition-colors">{template.name}</div>
                        <div className="text-[9px] text-text-dim uppercase tracking-widest font-black mt-1.5 opacity-70 line-clamp-1 italic">
                          "{template.content}"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 relative z-10">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTemplate(template);
                        }}
                        className="p-3 text-text-dim hover:text-white hover:bg-purple transition-all hover:scale-110 active:scale-95 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/50 hover:border-purple/30 shadow-lg relative overflow-hidden group/edit-btn"
                        style={{ "--hover-bg": globalAccentHex || "#7C3AED" } as any}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/edit-btn:translate-x-full transition-transform duration-700" />
                        <Edit2 className="w-4 h-4 relative z-10" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setZapTemplates(zapTemplates.filter(t => t.id !== template.id));
                          handleAction("Modelo removido");
                        }}
                        className="p-3 text-text-dim hover:text-white hover:bg-red transition-all hover:scale-110 active:scale-95 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/50 hover:border-red/30 shadow-lg relative overflow-hidden group/del-btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/del-btn:translate-x-full transition-transform duration-700" />
                        <Trash2 className="w-4 h-4 relative z-10" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

          </div>

            <div 
              className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
              style={{ 
                borderColor: "transparent", 
                boxShadow: `0 0 20px ${(globalAccentHex || "#7C3AED")}1a`,
              }}
            >
              <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
                <History className="w-48 h-48" style={{ color: globalAccentHex || "#7C3AED" }} />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                    >
                      <History className="w-4 h-4" />
                    </div> Monitoramento Global
                  </h4>
                    <p className="text-[9px] text-text-dim mt-2 uppercase tracking-widest font-black">Consulte logs detalhados de todos os disparos automáticos.</p>
                  </div>
                          <button 
                            onClick={() => setIsHistoryOpen(true)}
                            className="px-10 py-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl font-black hover:scale-110 group/history-btn overflow-hidden relative"
                            style={{ 
                              color: globalAccentHex || "#7C3AED", 
                              borderColor: "transparent",
                              boxShadow: `0 20px 60px -10px ${(globalAccentHex || "#7C3AED")}80, 0 0 35px ${(globalAccentHex || "#7C3AED")}66, inset 0 0 25px ${(globalAccentHex || "#7C3AED")}26`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/history-btn:translate-x-full transition-transform duration-1000" />
                            
                            {/* Internal Pulsing Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover/history-btn:opacity-100 transition-opacity duration-500" style={{ boxShadow: `inset 0 0 45px ${(globalAccentHex || "#7C3AED")}66, 0 0 20px ${(globalAccentHex || "#7C3AED")}4d` }} />
                            
                            <span className="relative z-10 flex items-center justify-center gap-3"><History className="w-4 h-4 group-hover/history-btn:rotate-12 transition-transform" /> Visualizar Histórico</span>
                          </button>

              </div>
            </div>

            <div 
                className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
                style={{ 
                  borderColor: (globalAccentHex || "#7C3AED") + "26", 
                  boxShadow: `0 20px 40px -10px rgba(0,0,0,0.1), inset 0 0 40px ${(globalAccentHex || "#7C3AED")}1a`,
                }}
              >
                <div className="absolute -left-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-6 pointer-events-none">
                  <Users className="w-64 h-64" style={{ color: globalAccentHex || "#7C3AED" }} />
                </div>
                
                <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                  >
                    <Users className="w-4 h-4" />
                  </div> Usuários com Acesso
                </h4>

                <div className="space-y-3 mt-6 relative z-10">
                    {users.map((u) => (
                      <div 
                        key={u.id} 
                        onClick={() => {
                          setSelectedUser(u);
                          setIsUserDetailsModalOpen(true);
                        }}
                        className="flex items-center justify-between p-6 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 group/user transition-all shadow-xl hover:scale-[1.01] hover:bg-surface-2 cursor-pointer relative overflow-hidden" 
                        style={{ 
                          borderColor: "transparent",
                          boxShadow: `0 10px 30px rgba(0,0,0,0.1)`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/user:translate-x-full transition-transform duration-1000 pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover/user:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${(globalAccentHex || "#7C3AED")}26` }} />

                        <div className="flex items-center gap-5 relative z-10">
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover/user:scale-110 group-hover/user:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10"
                            style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}
                          >
                            <UserIcon className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="text-[11px] font-black text-text-main uppercase tracking-widest">{u.name}</div>
                            <div className="flex items-center gap-3 text-[9px] text-text-dim uppercase tracking-widest font-black mt-1.5">
                              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {u.role}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                          <span className={cn("px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border", u.status === "Ativo" ? "bg-green/10 text-green border-green/20" : "bg-red/10 text-red border-red/20")}>{u.status}</span>
                          <ChevronRight className="w-5 h-5 text-text-dim group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
        </div>
      )
    },
    {
      id: "help",
      title: "Central de Ajuda",
      icon: HelpCircle,
      accent: accentColor || "mint",
      accentHex: globalAccentHex || "#00E5A0",
      bgIcon: LifeBuoy,
      content: (
        <div className="space-y-6">
          <div 
            className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}1a`,
            }}
          >
            <div className="absolute -right-10 -top-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 pointer-events-none">
              <HelpCircle className="w-64 h-64" style={{ color: globalAccentHex || "#00E5A0" }} />
            </div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
              >
                <HelpCircle className="w-4 h-4" />
              </div> Dúvidas Frequentes
            </h4>
            <div className="space-y-3 mt-6 relative z-10">
              {[
                { q: "Como configurar o 2FA?", a: "Vá na aba Segurança e ative a Autenticação em Duas Etapas." },
                { q: "Onde vejo o histórico de envios?", a: "Na aba ZapNotify, clique em Abrir Histórico." },
                { q: "Como alterar as cores do sistema?", a: "Acesse a aba Aparência e escolha sua col preferida." }
              ].map((faq, i) => (
                <div key={i} className="p-5 bg-surface-1/80 backdrop-blur-sm rounded-2xl border border-transparent hover:border-border/20 hover:border-opacity-30 transition-all shadow-xl" style={{ borderColor: "transparent" }}>
                  <div className="text-[10px] font-black uppercase text-text-main mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: globalAccentHex || "#00E5A0" }} /> {faq.q}
                  </div>
                  <div className="text-[9px] text-text-dim uppercase tracking-widest font-black leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02] duration-500"
                  style={{ 
                    borderColor: "transparent", 
                    boxShadow: `0 15px 35px rgba(0,0,0,0.1), inset 0 0 30px ${(globalAccentHex || "#00E5A0")}0d`,
                  }}
                >
                  <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 scale-125">
                    <BookOpen className="w-40 h-40" style={{ color: globalAccentHex || "#00E5A0" }} />
                  </div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-3 relative z-10">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden relative"
                        style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <BookOpen className="w-5 h-5 relative z-10" />
                      </div> Documentação
                    </h4>
                      <p className="text-[10px] text-text-dim uppercase tracking-tight font-black mt-4 relative z-10 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">Guia completo de uso para instrutores e administradores.</p>
                          <button 
                            onClick={() => setIsManualOpen(true)} 
                            className="w-full mt-8 py-5 bg-surface-1 border border-transparent hover:border-border/20 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 relative z-10 hover:scale-[1.03] group/manual overflow-hidden shadow-2xl"
                            style={{ color: globalAccentHex || "#00E5A0", borderColor: (globalAccentHex || "#00E5A0") + "40" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/manual:translate-x-full transition-transform duration-1000" />
                            <span className="relative z-10 flex items-center justify-center gap-3"><FileText className="w-4 h-4" /> Acessar Manual</span>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: `0 0 30px ${(globalAccentHex || "#00E5A0")}33, inset 0 0 20px ${(globalAccentHex || "#00E5A0")}1a` }} />
                          </button>
                        </div>
                        <div 
                          className="p-8 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden hover:scale-[1.02] duration-500"
                          style={{ 
                            borderColor: "transparent", 
                            boxShadow: `0 15px 35px rgba(0,0,0,0.1), inset 0 0 30px ${(globalAccentHex || "#00E5A0")}0d`,
                          }}
                        >
                          <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 scale-125">
                            <MessageSquare className="w-40 h-40" style={{ color: globalAccentHex || "#00E5A0" }} />
                          </div>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-3 relative z-10">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden relative"
                              style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                              <MessageSquare className="w-5 h-5 relative z-10" />
                            </div> Suporte Técnico
                          </h4>
                          <p className="text-[10px] text-text-dim uppercase tracking-tight font-black mt-4 relative z-10 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">Fale diretamente com nossa equipe de suporte pelo WhatsApp.</p>
                          
                          <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                            <button 
                              onClick={() => setIsChatOpen(true)} 
                              className="py-5 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-white/20 shadow-2xl hover:scale-[1.05] relative overflow-hidden group/chat-btn"
                              style={{ backgroundColor: globalAccentHex || "#00E5A0", boxShadow: `0 15px 30px ${(globalAccentHex || "#00E5A0")}66` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/chat-btn:translate-x-full transition-transform duration-1000" />
                              <span className="relative z-10 flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Abrir Chat</span>
                            </button>
                            <button 
                              onClick={() => setIsTicketsModalOpen(true)} 
                              className="py-5 bg-surface-1 border border-transparent hover:border-border/20 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text-main transition-all active:scale-95 hover:scale-[1.05] relative overflow-hidden group/tickets-btn shadow-xl"
                              style={{ color: globalAccentHex || "#00E5A0", borderColor: (globalAccentHex || "#00E5A0") + "40" }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/tickets-btn:translate-x-full transition-transform duration-1000" />
                              <span className="relative z-10 flex items-center justify-center gap-2"><LifeBuoy className="w-4 h-4" /> Chamados</span>
                            </button>
                          </div>
                        </div>


            </div>
          </div>
      )
    },
    {
      id: "about",
      title: "Sobre o Pardim",
      icon: Info,
      accent: accentColor || "mint",
      accentHex: globalAccentHex || "#00E5A0",
      bgIcon: Rocket,
      content: (
        <div className="space-y-6">
          <div 
            className="p-10 bg-surface-2/40 rounded-[2.5rem] border transition-all group relative overflow-hidden text-center"
            style={{ 
              borderColor: "transparent", 
              boxShadow: `0 0 20px ${(globalAccentHex || "#00E5A0")}1a`,
            }}
          >
            <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 pointer-events-none">
              <Rocket className="w-80 h-80" style={{ color: globalAccentHex || "#00E5A0" }} />
            </div>
            <div className="relative z-10">
              <div 
                className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}
              >
                <Rocket className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-text-main uppercase tracking-tighter">Pardim Rezende Admin</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black mt-2" style={{ color: globalAccentHex || "#00E5A0" }}>Versão 2.4.0 • Enterprise Edition</p>
              
              <div className="mt-8 p-6 bg-surface-1/50 rounded-2xl border border-transparent hover:border-border/20 text-left">
                <p className="text-[10px] text-text-dim uppercase tracking-widest font-black leading-relaxed opacity-80">Desenvolvido para revolucionar a gestão de autoescolas. O sistema Pardim foca em automação, segurança e experiência do usuário, integrando faturamento, agendamentos e comunicação via WhatsApp em um só lugar.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, label: "Segurança", value: "SSL / 2FA" },
              { icon: Activity, label: "Performance", value: "99.9% Uptime" },
              { icon: Globe, label: "Hospedagem", value: "AWS Cloud" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface-2/40 rounded-2xl border transition-all text-center space-y-3 group hover:scale-[1.05]" style={{ borderColor: "transparent", boxShadow: `0 0 15px ${(globalAccentHex || "#00E5A0")}0d` }}>
                <item.icon className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform" style={{ color: globalAccentHex || "#00E5A0" }} />
                <div className="text-[9px] font-black uppercase text-text-main tracking-widest">{item.label}</div>
                <div className="text-[8px] font-black uppercase text-text-dim tracking-widest">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        icon={Settings} 
        title="Configurações" 
        subtitle="Gerencie suas preferências, conta e usuários do sistema."
        accentColor="blue"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
        {/* Menu Lateral */}
          <div className="lg:col-span-1 space-y-3">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              const hexColor = s.accentHex;
              
              return (
                  <button 
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={cn(
                        "w-full group relative flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-500 overflow-hidden active:scale-95 border border-white/5",
                        isActive 
                          ? "bg-surface-1 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] scale-[1.02]" 
                          : "text-text-dim hover:text-text-main hover:bg-surface-1/30"
                      )}

                    style={isActive ? { 
                      boxShadow: `inset 0 0 45px ${hexColor}30, 0 15px 40px -5px ${hexColor}60`
                    } : {}}
                  >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  
                  {/* Hover Glow Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                      isActive ? "hidden" : ""
                    )}
                    style={{ 
                      background: `radial-gradient(circle at center, ${hexColor}26 0%, transparent 70%)`,
                      boxShadow: `inset 0 0 20px ${hexColor}1a`
                    }}
                  />

                  {isActive && (
                    <motion.div
                      layoutId="active-pill-settings"
                      className="absolute left-0 w-1.5 h-8 rounded-r-full z-20"
                      style={{ backgroundColor: hexColor, boxShadow: `0 0 20px 4px ${hexColor}` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div 
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10",
                      isActive ? "scale-110 shadow-lg" : "scale-100 group-hover:scale-110"
                    )}
                    style={{ 
                      backgroundColor: isActive ? hexColor : `${hexColor}15`,
                      color: isActive ? '#fff' : hexColor
                    }}
                  >
                    <s.icon 
                      className={cn("w-5 h-5 transition-all duration-500", isActive ? "scale-110" : "group-hover:scale-110")} 
                      style={{ filter: `drop-shadow(0 0 8px ${hexColor}80)` }}
                    />
                  </div>
                  
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] relative z-10 transition-colors",
                    isActive ? "text-text-main" : "text-text-dim group-hover:text-text-main"
                  )}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

        {/* Conteúdo Central */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {sections.map((s) => activeSection === s.id && (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="bg-surface-1/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-transparent hover:border-border/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] min-h-[600px] relative overflow-hidden"
              >
                {/* Background Glow */}
                <div 
                  className="absolute -top-40 -right-40 w-96 h-96 blur-[150px] opacity-[0.08] pointer-events-none rounded-full"
                  style={{ backgroundColor: s.accentHex }}
                />
                <div 
                  className="absolute -bottom-40 -left-40 w-96 h-96 blur-[150px] opacity-[0.05] pointer-events-none rounded-full"
                  style={{ backgroundColor: s.accentHex }}
                />

                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl relative overflow-hidden group/icon" style={{ backgroundColor: s.accentHex }}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                    <s.icon className="w-8 h-8 relative z-10 drop-shadow-xl group-hover/icon:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none">{s.title}</h3>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="h-2 w-16 rounded-full" style={{ backgroundColor: s.accentHex, boxShadow: `0 0 10px ${s.accentHex}` }} />
                      <div className="h-2 w-3 rounded-full opacity-30" style={{ backgroundColor: s.accentHex }} />
                      <div className="h-2 w-3 rounded-full opacity-10" style={{ backgroundColor: s.accentHex }} />
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  {s.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

        {/* Modals Container */}
        <AnimatePresence>
          {/* ZapNotify Template Modal */}
          {editingTemplate && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setEditingTemplate(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-surface-1 rounded-[2.5rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl"><MessageSquare className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Configurar Modelo</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Estilo e variáveis do WhatsApp</p>
                    </div>
                  </div>
                      <button onClick={() => setEditingTemplate(null)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Título do Modelo</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Confirmação de Matrícula"
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                      className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-4 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl shadow-purple/5"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Conteúdo da Mensagem</label>
                      <div className="flex gap-2">
                        {['{{nome}}', '{{data}}', '{{hora}}', '{{instrutor}}'].map(v => (
                          <button 
                            key={v}
                            onClick={() => setEditingTemplate({...editingTemplate, content: (editingTemplate.content || "") + v})}
                            className="px-2 py-1 bg-purple/10 text-purple rounded-md text-[8px] font-black hover:bg-purple hover:text-white transition-all"
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                      <textarea 
                        placeholder="Escreva sua mensagem aqui..."
                        value={editingTemplate.content}
                        onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                        rows={6}
                        className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-purple/50 resize-none font-bold shadow-xl shadow-purple/5"
                      />
                    </div>

                    {/* Live Preview */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Live Preview (WhatsApp)</label>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-green">Visualização em Tempo Real</span>
                        </div>
                      </div>
                      <div 
                        className={cn(
                          "p-8 rounded-[2rem] transition-all duration-700 min-h-[160px] flex flex-col justify-center relative overflow-hidden group/preview",
                          editingTemplate.boxStyle === 'standard' ? "bg-surface-2/50" :
                          editingTemplate.boxStyle === 'focus' ? "bg-purple/5 border-purple/20 border shadow-[0_0_40px_rgba(124,58,237,0.05)]" :
                          editingTemplate.boxStyle === 'soft' ? "bg-mint/5 border-mint/20 border shadow-[0_0_40px_rgba(0,229,160,0.05)]" :
                          "bg-blue/5 border-blue/20 border shadow-[0_0_40px_rgba(26,108,247,0.05)]"
                        )}
                      >
                        {/* Abstract Background for Preview */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-purple/20 blur-3xl rounded-full" />
                           <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint/20 blur-3xl rounded-full" />
                        </div>

                        <motion.div 
                          layout
                          className="bg-white dark:bg-navy p-5 rounded-2xl rounded-tr-none self-end max-w-[90%] shadow-2xl relative z-10 border border-black/5 dark:border-white/5"
                        >
                          <p className="text-[11px] text-text-main leading-relaxed whitespace-pre-wrap font-medium">
                            {editingTemplate.content ? (editingTemplate.content)
                              .replace(/{{nome}}/g, "Gabriel Santos")
                              .replace(/{{data}}/g, "15/03/2026")
                              .replace(/{{hora}}/g, "14:30")
                              .replace(/{{instrutor}}/g, "Ricardo Silva") : "Aguardando conteúdo..."}
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-2">
                            <span className="text-[8px] text-text-dim font-black opacity-60">10:45</span>
                            <Check className="w-2.5 h-2.5 text-blue" />
                          </div>
                          {/* Triangle tail */}
                          <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[10px] border-t-white dark:border-t-navy border-r-[10px] border-r-transparent" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="p-6 bg-surface-2 rounded-2xl border border-transparent hover:border-border/20 space-y-4">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-text-main">Estilo do Box (Preview)</h6>
                    <div className="flex gap-4">
                      {[
                        { label: "Padrão", color: "bg-surface-1", value: "standard" },
                        { label: "Foco", color: "bg-purple/10 border-purple/30", value: "focus" },
                        { label: "Suave", color: "bg-mint/10 border-mint/30", value: "soft" },
                        { label: "Funcional", color: "bg-blue/10 border-blue/30", value: "functional" },
                      ].map(style => (
                        <button 
                          key={style.label} 
                          onClick={() => setEditingTemplate({...editingTemplate, boxStyle: style.value as any})}
                          className={cn(
                            "flex-1 p-3 rounded-xl border text-[9px] font-black uppercase transition-all hover:scale-105 relative overflow-hidden group/style-btn", 
                            style.color,
                            editingTemplate.boxStyle === style.value && "ring-2 ring-purple shadow-lg"
                          )}
                          style={editingTemplate.boxStyle === style.value ? { ringColor: globalAccentHex || "#7C3AED" } as any : {}}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/style-btn:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={() => setEditingTemplate(null)} 
                        className="flex-1 py-4 bg-surface-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-dim hover:bg-surface-3 transition-all active:scale-95 hover:scale-[1.02] shadow-lg relative overflow-hidden group/cancel-template"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/cancel-template:translate-x-full transition-transform duration-700" />
                        <span className="relative z-10">Cancelar</span>
                      </button>
                        <button 
                          onClick={() => {
                            if (editingTemplate.name && editingTemplate.content) {
                              const exists = zapTemplates.find(t => t.id === editingTemplate.id);
                              if (exists) {
                                setZapTemplates(zapTemplates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
                              } else {
                                setZapTemplates([...zapTemplates, editingTemplate]);
                              }
                              setEditingTemplate(null);
                              handleAction("Modelo salvo");
                            }
                          }}
                          className="flex-[2] py-4 bg-purple text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-purple/40 hover:scale-[1.02] active:scale-95 transition-all font-black relative overflow-hidden group/save-template"
                          style={{ backgroundColor: globalAccentHex || "#7C3AED" }}
                        >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/save-template:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Salvar Modelo</span>
                      </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* History Modal */}
          {isHistoryOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsHistoryOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-surface-1 rounded-[2.5rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl"><History className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Histórico de Envios</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Logs de comunicação recentes</p>
                    </div>
                  </div>
                    <button onClick={() => setIsHistoryOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                  <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-3">
                    {historyItems.map((h) => (
                      <div 
                        key={h.id} 
                        onClick={() => setSelectedHistoryItem(h)}
                        className="flex items-center justify-between p-5 bg-surface-2/50 rounded-2xl border border-transparent hover:border-border/20 group hover:border-purple/30 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-sm relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-[9px] group-hover:scale-110 transition-transform", 
                            h.type === "WhatsApp" ? "bg-green/10 text-green" : 
                            h.type === "Email" ? "bg-blue/10 text-blue" : "bg-orange/10 text-orange"
                          )}>
                            {h.type === "WhatsApp" ? <MessageCircle className="w-5 h-5" /> : h.type === "Email" ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-text-main uppercase group-hover:text-purple transition-colors">{h.recipient}</div>
                            <div className="text-[8px] text-text-dim font-black uppercase tracking-widest mt-0.5">{h.type} • {h.date} às {h.time}</div>
                          </div>
                        </div>
                        <div className={cn("px-3 py-1 rounded-md text-[8px] font-black uppercase relative z-10 shadow-sm", h.status === "Enviado" ? "bg-green/10 text-green" : "bg-red/10 text-red")}>
                          {h.status}
                        </div>
                      </div>
                    ))}
                  </div>
              </motion.div>
            </div>
          )}

          {/* History Detail Modal */}
          {selectedHistoryItem && (
            <div 
              className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-xl"
              onClick={() => setSelectedHistoryItem(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[3rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-purple/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl shadow-purple/10">
                      {selectedHistoryItem.type === "WhatsApp" ? <MessageCircle className="w-6 h-6" /> : selectedHistoryItem.type === "Email" ? <Mail className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                    </div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Detalhes do Envio</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Logs de Comunicação</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedHistoryItem(null)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                  <div className="p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-6 p-8 bg-surface-2/50 rounded-3xl border border-transparent hover:border-purple/20 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div 
                        className={cn(
                          "w-20 h-20 rounded-[1.8rem] flex items-center justify-center relative z-10 shadow-2xl transition-transform duration-700 group-hover:rotate-6",
                          selectedHistoryItem.type === "WhatsApp" ? "bg-green/10 text-green" : 
                          selectedHistoryItem.type === "Email" ? "bg-blue/10 text-blue" : "bg-orange/10 text-orange"
                        )}
                        style={{ boxShadow: `0 15px 30px -5px ${selectedHistoryItem.type === "WhatsApp" ? "rgba(34,197,94,0.3)" : selectedHistoryItem.type === "Email" ? "rgba(59,130,246,0.3)" : "rgba(249,115,22,0.3)"}` }}
                      >
                        {selectedHistoryItem.type === "WhatsApp" ? <MessageCircle className="w-10 h-10" /> : selectedHistoryItem.type === "Email" ? <Mail className="w-10 h-10" /> : <Smartphone className="w-10 h-10" />}
                      </div>
                      <div className="relative z-10">
                        <h6 className="text-2xl font-black text-text-main uppercase tracking-tighter leading-tight group-hover:text-purple transition-colors">{selectedHistoryItem.recipient}</h6>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-black">{selectedHistoryItem.type}</span>
                          <span className="w-1 h-1 rounded-full bg-text-dim/30" />
                          <span className="text-[10px] text-purple font-black uppercase tracking-widest">ID #8273{selectedHistoryItem.id}</span>
                        </div>
                      </div>
                    </motion.div>
  
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Data e Hora", value: `${selectedHistoryItem.date} às ${selectedHistoryItem.time}`, icon: Clock },
                        { label: "Status Final", value: selectedHistoryItem.status, icon: Check, color: selectedHistoryItem.status === "Enviado" ? "text-green" : "text-red" }
                      ].map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="p-5 bg-surface-2 rounded-2xl border border-transparent hover:border-border/20 group/stat transition-all hover:bg-surface-3 shadow-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="w-3.5 h-3.5 text-text-dim" />
                            <div className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em]">{item.label}</div>
                          </div>
                          <div className={cn("text-xs font-black uppercase tracking-tight", item.color || "text-text-main")}>{item.value}</div>
                        </motion.div>
                      ))}
                    </div>
  
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-8 bg-surface-2/50 rounded-3xl border border-transparent hover:border-purple/20 space-y-5 shadow-2xl relative overflow-hidden group/content"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 blur-3xl rounded-full" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-main">
                          <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center text-purple shadow-lg">
                            <FileText className="w-4 h-4" />
                          </div> Conteúdo do Disparo
                        </div>
                        <button className="p-2 text-text-dim hover:text-purple transition-colors"><Copy className="w-4 h-4" /></button>
                      </div>
                      <div className="p-6 bg-surface-1/50 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/5 text-[11px] text-text-main font-bold italic leading-relaxed shadow-inner relative z-10 group-hover/content:bg-surface-1 transition-all">
                        "Olá {selectedHistoryItem.recipient}, sua aula de amanhã está confirmada para as 09:30 com o instrutor Ricardo. Por favor, traga seu documento original."
                      </div>
                    </motion.div>
  
                    <div className="flex gap-4 pt-2">
                        <button className="flex-[2] py-5 bg-purple text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.05] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 border border-white/5 relative overflow-hidden group/reenviar" style={{ backgroundColor: globalAccentHex || "#7C3AED", boxShadow: `0 20px 40px ${(globalAccentHex || "#7C3AED")}4d` }}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/reenviar:translate-x-full transition-transform duration-1000" />

                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> <span className="relative z-10">Reenviar Mensagem</span>
                      </button>
                      <button onClick={() => setSelectedHistoryItem(null)} className="flex-1 py-5 bg-surface-2 text-text-main rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all active:scale-95 hover:scale-[1.02] shadow-lg">
                        Fechar
                      </button>
                    </div>
                  </div>
              </motion.div>
            </div>
          )}

          {/* Manual Modal */}
          {isManualOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsManualOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl bg-surface-1 rounded-[2.5rem] border border-blue/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center shadow-xl shadow-blue/10"><BookOpen className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Manual do Sistema</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Guia de utilização e melhores práticas</p>
                    </div>
                  </div>
                    <button onClick={() => setIsManualOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h6 className="text-sm font-black text-blue uppercase tracking-widest border-b-2 border-blue/10 pb-2">Início Rápido</h6>
                      <ul className="space-y-4">
                        {[
                          "Como cadastrar novos alunos",
                          "Gerenciamento de instrutores",
                          "Configuração de horários de aula",
                          "Uso do ZapNotify para lembretes"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase text-text-dim hover:text-blue cursor-pointer transition-colors group">
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h6 className="text-sm font-black text-blue uppercase tracking-widest border-b-2 border-blue/10 pb-2">Avançado</h6>
                      <ul className="space-y-4">
                        {[
                          "Relatórios financeiros detalhados",
                          "Integração com órgãos de trânsito",
                          "Personalização de temas e cores",
                          "Segurança e backup de dados"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase text-text-dim hover:text-blue cursor-pointer transition-colors group">
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-12 p-8 bg-blue/5 rounded-[2rem] border border-blue/10">
                    <div className="flex items-center gap-4 mb-4">
                      <Info className="w-6 h-6 text-blue" />
                      <h6 className="text-xs font-black uppercase tracking-widest text-text-main">Dica do Especialista</h6>
                    </div>
                    <p className="text-[10px] text-text-dim uppercase tracking-widest font-black leading-relaxed opacity-80">
                      Mantenha o ZapNotify configurado corretamente para reduzir em até 40% as faltas em aulas práticas. Utilize as variáveis dinâmicas para personalizar o atendimento.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Chat Modal */}
          {isChatOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsChatOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[2.5rem] border shadow-2xl overflow-hidden relative"
                style={{ borderColor: "transparent" }}
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl" style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}>
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Suporte em Tempo Real</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Estamos aqui para ajudar</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-xl text-text-dim hover:text-red hover:border-red/30 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-10 text-center space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse" 
                    style={{ 
                      backgroundColor: (globalAccentHex || "#00E5A0") + "1a", 
                      boxShadow: `0 0 30px ${(globalAccentHex || "#00E5A0")}33`,
                      color: globalAccentHex || "#00E5A0"
                    }}
                  >
                    <MessageCircle className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black text-text-main uppercase tracking-tighter">Falar com Atendente</h4>
                    <p className="text-xs text-text-dim uppercase tracking-widest font-black leading-relaxed">
                      Você será redirecionado para o WhatsApp de nossa equipe técnica. Tempo médio de resposta: <span style={{ color: globalAccentHex || "#00E5A0" }}>5 minutos</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                      <button 
                        className="w-full py-5 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-transparent hover:border-white/20 font-black relative overflow-hidden group/chat-btn-modal"
                        style={{ 
                          backgroundColor: globalAccentHex || "#00E5A0", 
                          boxShadow: `0 20px 40px ${(globalAccentHex || "#00E5A0")}4d` 
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/chat-btn-modal:translate-x-full transition-transform duration-1000" />
                        <MessageCircle className="w-5 h-5 relative z-10" /> <span className="relative z-10">Iniciar Chat no WhatsApp</span>
                      </button>
                      <button className="w-full py-5 bg-surface-2 text-text-main rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all font-black border border-transparent hover:border-border/20 active:scale-95 hover:scale-[1.02]">
                        Ver Chamados Abertos
                      </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Password Change Modal */}
          {isPasswordModalOpen && (
            <div 
              className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-xl"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[3rem] border border-red/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-red/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red/10 text-red flex items-center justify-center shadow-xl shadow-red/10"><Key className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Alterar Senha</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Segurança da Conta</p>
                    </div>
                  </div>
                    <button onClick={() => setIsPasswordModalOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-10 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-red/50 font-black shadow-xl shadow-red/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Nova Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-red/50 font-black shadow-xl shadow-red/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Confirmar Nova Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-red/50 font-black shadow-xl shadow-red/5" />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setIsPasswordModalOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text-main transition-colors font-black">Cancelar</button>
                      <button 
                        onClick={() => {
                          setIsPasswordModalOpen(false);
                          handleAction("Senha alterada");
                        }}
                        className="flex-[2] py-4 bg-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-red/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-white/20 font-black relative overflow-hidden group/update-pass-btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/update-pass-btn:translate-x-full transition-transform duration-1000" />
                        <Check className="w-4 h-4 relative z-10" /> <span className="relative z-10">Atualizar Senha</span>
                      </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Session Detail Modal */}
          {selectedSession && (
            <div 
              className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-xl"
              onClick={() => setSelectedSession(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[3rem] border border-red/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-red/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red/10 text-red flex items-center justify-center shadow-xl shadow-red/10"><Monitor className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Detalhes da Sessão</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Informações de Acesso</p>
                    </div>
                  </div>
                    <button onClick={() => setSelectedSession(null)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="flex items-center gap-6 p-6 bg-surface-2 rounded-2xl border border-transparent hover:border-border/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 bg-red/10 rounded-2xl flex items-center justify-center text-red relative z-10">
                      <Laptop className="w-8 h-8" />
                    </div>
                    <div className="relative z-10">
                      <h6 className="text-xl font-black text-text-main uppercase tracking-tighter">{selectedSession.device}</h6>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black">{selectedSession.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-2 rounded-xl border border-transparent hover:border-border/20">
                      <div className="text-[8px] font-black text-text-dim uppercase tracking-widest mb-1">Último Acesso</div>
                      <div className="text-[10px] font-black text-text-main uppercase">{selectedSession.time}</div>
                    </div>
                    <div className="p-4 bg-surface-2 rounded-xl border border-transparent hover:border-border/20">
                      <div className="text-[8px] font-black text-text-dim uppercase tracking-widest mb-1">Status</div>
                      <div className={cn("text-[10px] font-black uppercase", selectedSession.active ? "text-green" : "text-text-dim")}>
                        {selectedSession.active ? "Sessão Atual" : "Inativa"}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-surface-2 rounded-2xl border border-transparent hover:border-border/20 space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-main">
                      <Shield className="w-4 h-4 text-red" /> Ações de Segurança
                    </div>
                          <div className="grid grid-cols-1 gap-2">
                               <button 
                                onClick={() => {
                                  setSessionToDisconnect(selectedSession);
                                  setSelectedSession(null);
                                }}
                                className="w-full py-4 bg-red/10 text-red border border-red/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red hover:text-white transition-all active:scale-95 shadow-lg shadow-red/5 relative overflow-hidden group/disconnect-btn"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/disconnect-btn:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                <span className="relative z-10">Desconectar Dispositivo</span>
                              </button>
                              <button className="w-full py-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-text-dim hover:text-text-main transition-all relative overflow-hidden group/ignore-btn">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/ignore-btn:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                <span className="relative z-10">Ignorar Sessão</span>
                              </button>
                            </div>
                          </div>
        
                          {!selectedSession.active && (
                            <button className="w-full py-4 bg-red/5 text-red rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed border-red/30 hover:bg-red/10 transition-all flex items-center justify-center gap-2 relative overflow-hidden group/report-btn">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/20 to-transparent -translate-x-full group-hover/report-btn:translate-x-full transition-transform duration-1000 pointer-events-none" />
                              <AlertTriangle className="w-4 h-4 relative z-10" /> <span className="relative z-10">Reportar Atividade Suspeita</span>
                            </button>
                          )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Session Confirmation Modal */}
          {sessionToDisconnect && (
            <div 
              className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-xl"
              onClick={() => setSessionToDisconnect(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-surface-1 rounded-[2.5rem] border border-red/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-red/10 rounded-[2.5rem] flex items-center justify-center mx-auto text-red shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    <Laptop className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-text-main uppercase tracking-tighter leading-none">Desconectar Sessão?</h4>
                    <p className="text-xs text-text-dim uppercase tracking-widest font-black leading-relaxed mt-2">
                      Você deseja encerrar a conexão em <span className="text-red">{sessionToDisconnect.device}</span> ({sessionToDisconnect.location})?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setSessionToDisconnect(null)} className="py-4 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all font-black">Manter</button>
                    <button 
                      onClick={() => {
                        setSessionToDisconnect(null);
                        handleAction("Sessão desconectada");
                      }}
                      className="py-4 bg-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red/40 hover:scale-105 active:scale-95 transition-all border border-transparent hover:border-white/20 font-black"
                    >
                      Encerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Danger Zone Modal */}
          {dangerAction && (
            <div 
              className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-2xl"
              onClick={() => setDangerAction(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[3rem] border-4 border-red/40 shadow-2xl overflow-hidden relative"
              >
                <div className="p-10 text-center space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="w-24 h-24 bg-red/10 rounded-[2rem] flex items-center justify-center mx-auto text-red shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-bounce">
                    <AlertTriangle className="w-12 h-12" />
                  </div>
                  
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none">
                        {dangerAction === 'reset' ? 'Redefinir Tudo?' : 'Excluir Conta?'}
                      </h4>
                      <p className="text-xs text-text-dim uppercase tracking-widest font-black leading-relaxed px-4">
                        {dangerAction === 'reset' 
                          ? 'Esta ação apagará todas as configurações e dados do sistema. Esta operação NÃO pode ser desfeita.'
                          : 'Sua conta e todos os dados associados serão removidos permanentemente de nossos servidores.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setDangerAction(null)} 
                      className="absolute top-8 right-8 p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                      <X className="w-5 h-5" />
                    </button>

                  <div className="p-6 bg-red/5 rounded-2xl border border-red/10 text-[10px] font-black uppercase tracking-widest text-red flex items-center gap-3">
                    <Info className="w-5 h-5" /> Confirme digitando "CONFIRMAR" abaixo
                  </div>
                  <input type="text" placeholder="CONFIRMAR" className="w-full bg-surface-2 border border-red/20 p-5 rounded-2xl text-xs outline-none focus:border-red font-black text-center tracking-[0.5em]" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setDangerAction(null)} className="py-5 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all order-2 md:order-1 font-black">Abortar Missão</button>
                    <button 
                      onClick={() => {
                        setDangerAction(null);
                        handleAction(dangerAction === 'reset' ? "Sistema redefinido" : "Conta excluída");
                      }}
                      className="py-5 bg-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all border border-transparent hover:border-white/20 order-1 md:order-2 font-black"
                    >
                      {dangerAction === 'reset' ? 'REDEFINIR AGORA' : 'EXCLUIR PERMANENTEMENTE'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* System Logs Modal */}
          {isLogsModalOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsLogsModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-surface-1 rounded-[2.5rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl shadow-purple/10"><History className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Logs do Sistema</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Registros de atividade interna</p>
                    </div>
                  </div>
                    <button onClick={() => setIsLogsModalOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-3 font-mono">
                  {[
                    { time: "14:22:10", event: "Autenticação bem-sucedida", user: "Admin Pardim", ip: "192.168.0.1" },
                    { time: "14:15:45", event: "Backup automático concluído", user: "Sistema", ip: "Server-AWS" },
                    { time: "13:50:12", event: "Alteração de tema", user: "Admin Pardim", ip: "192.168.0.1" },
                    { time: "12:30:05", event: "Disparo em massa ZapNotify", user: "Sistema", ip: "Zap-API" },
                    { time: "10:15:22", event: "Login detectado em novo dispositivo", user: "Admin Pardim", ip: "177.20.45.12" },
                    { time: "09:45:30", event: "Atualização de parâmetros de faturamento", user: "Financeiro", ip: "192.168.1.5" },
                    { time: "08:12:15", event: "Exportação de dados (PDF)", user: "Admin Pardim", ip: "192.168.0.1" },
                  ].map((log, i) => (
                    <div key={i} className="p-4 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/50 text-[10px] space-y-1 hover:border-purple/30 transition-all group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-purple font-black">[{log.time}]</span>
                        <span className="px-2 py-0.5 bg-purple/10 rounded text-purple border border-purple/20 text-[8px]">{log.ip}</span>
                      </div>
                      <div className="text-text-main font-black uppercase tracking-wider group-hover:text-purple transition-colors">{log.event}</div>
                      <div className="text-text-dim uppercase tracking-widest text-[8px] font-bold">Iniciado por: {log.user}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Reset DB Modal */}
          {isResetDBModalOpen && (
            <div 
              className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-2xl"
              onClick={() => setIsResetDBModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[3rem] border-4 border-red/40 shadow-2xl overflow-hidden relative"
              >
                <div className="p-10 text-center space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="w-24 h-24 bg-red/10 rounded-[2rem] flex items-center justify-center mx-auto text-red shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-pulse">
                    <Database className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none">Limpar Banco de Dados?</h4>
                    <p className="text-xs text-text-dim uppercase tracking-widest font-black leading-relaxed px-4">
                      Esta ação irá remover todos os registros de alunos, instrutores e faturamento. Esta operação é IRREVERSÍVEL.
                    </p>
                  </div>

                  <div className="p-6 bg-red/5 rounded-2xl border border-red/10 text-[10px] font-black uppercase tracking-widest text-red flex items-center gap-3">
                    <Info className="w-5 h-5" /> Digite "RESETAR" para continuar
                  </div>
                  <input type="text" placeholder="RESETAR" className="w-full bg-surface-2 border border-red/20 p-5 rounded-2xl text-xs outline-none focus:border-red font-black text-center tracking-[0.5em]" />

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button onClick={() => setIsResetDBModalOpen(false)} className="py-5 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all font-black">Cancelar</button>
                    <button 
                      onClick={() => {
                        setIsResetDBModalOpen(false);
                        handleAction("Database Resetada");
                      }}
                      className="py-5 bg-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all border border-transparent hover:border-white/20 font-black"
                    >
                      RESETAR DB
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Update System Modal */}
          {isUpdateSystemModalOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsUpdateSystemModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[2.5rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-10 text-center space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="w-24 h-24 bg-purple/10 rounded-[2rem] flex items-center justify-center mx-auto text-purple shadow-[0_0_40px_rgba(124,58,237,0.3)] group-hover:scale-110 transition-transform">
                    <Rocket className="w-12 h-12 animate-pulse" />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none">Atualizar Sistema</h4>
                    <p className="text-xs text-text-dim uppercase tracking-widest font-black leading-relaxed">
                      Nova versão disponível: <span className="text-purple">v2.5.0-beta</span>. Deseja realizar a migração e atualização de pacotes agora?
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                      <span className="text-text-dim">Preparando pacotes...</span>
                      <span className="text-purple">85%</span>
                    </div>
                    <div className="h-4 w-full bg-surface-2 rounded-full overflow-hidden border border-transparent hover:border-border/20 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-gradient-to-r from-purple to-pink shadow-[0_0_20px_rgba(124,58,237,0.5)]" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-6">
                    <button 
                      onClick={() => {
                        setIsUpdateSystemModalOpen(false);
                        handleAction("Sistema Atualizado");
                      }}
                      className="w-full py-5 bg-purple text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(124,58,237,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-transparent hover:border-white/20 font-black"
                    >
                      Confirmar Atualização
                    </button>
                    <button onClick={() => setIsUpdateSystemModalOpen(false)} className="w-full py-4 bg-transparent text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-text-main transition-all font-black">Lembrar mais tarde</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Logo Upload Modal */}
          {isLogoModalOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
              onClick={() => setIsLogoModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-surface-1 rounded-[2.5rem] border border-purple/30 shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl shadow-purple/10"><Palette className="w-6 h-6" /></div>
                    <div>
                      <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Identidade Visual</h5>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Gestão de Logo e Marca</p>
                    </div>
                  </div>
                    <button onClick={() => setIsLogoModalOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-10 space-y-8 text-center max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="w-32 h-32 bg-surface-2 rounded-[2rem] border-4 border-dashed border-border flex flex-col items-center justify-center mx-auto group hover:border-purple/50 transition-all cursor-pointer">
                    <Plus className="w-10 h-10 text-text-dim group-hover:scale-110 group-hover:text-purple transition-all" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-text-dim mt-2">Clique aqui</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-text-main uppercase tracking-tighter">Alterar Logo Principal</h4>
                    <p className="text-[10px] text-text-dim uppercase tracking-widest font-black leading-relaxed">
                      Recomendamos imagens .PNG ou .SVG de alta resolução com fundo transparente.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setIsLogoModalOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text-main transition-colors font-black">Cancelar</button>
                    <button 
                      onClick={() => {
                        setIsLogoModalOpen(false);
                        handleAction("Logo Atualizado");
                      }}
                      className="flex-[2] py-4 bg-purple text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-purple/40 hover:scale-[1.02] active:scale-95 transition-all border border-transparent hover:border-white/20 font-black"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

            {/* User Management Modal */}
            {isUserModalOpen && (
              <div 
                className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
                onClick={() => setIsUserModalOpen(false)}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl bg-surface-1 rounded-[3rem] border border-purple/30 shadow-2xl overflow-hidden relative"
                    style={{ borderColor: "transparent" }}
                  >
                    {/* Shimmer Overlay removed from main frame */}
                    {/* <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none" /> */}

                  <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center shadow-xl shadow-purple/10" style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}>
                        <UserPlus className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Adicionar Usuário</h5>
                        <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Novo membro na equipe administrativa</p>
                      </div>
                    </div>
                      <button onClick={() => setIsUserModalOpen(false)} className="p-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Nome Completo</label>
                        <input type="text" placeholder="Ex: João da Silva" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl transition-all" style={{ "--tw-shadow-color": (globalAccentHex || "#7C3AED") + "0d" } as any} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Cargo / Função</label>
                        <div className="relative group/select">
                          <select className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl appearance-none transition-all">
                            <option>Instrutor</option>
                            <option>Secretária</option>
                            <option>Gerente</option>
                            <option>Administrador</option>
                          </select>
                          <ChevronRight className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-text-dim pointer-events-none group-hover/select:text-purple transition-colors" style={{ color: globalAccentHex || "#7C3AED" }} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">E-mail de Acesso</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" />
                          <input type="email" placeholder="email@exemplo.com.br" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 pl-12 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl transition-all" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Telefone / WhatsApp</label>
                        <div className="relative">
                          <Smartphone className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" />
                          <input type="text" placeholder="(11) 99999-9999" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 pl-12 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl transition-all" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Senha de Acesso</label>
                        <div className="relative">
                          <Key className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" />
                          <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 pl-12 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl transition-all" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Confirmar Senha</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" />
                          <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-transparent hover:border-border/20 p-5 pl-12 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-xl transition-all" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-surface-2 rounded-[2.5rem] border border-transparent hover:border-border/20 space-y-6 relative overflow-hidden group/perms-add">
                      <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover/perms-add:opacity-[0.08] transition-all duration-1000 group-hover/perms-add:scale-125">
                        <Shield className="w-48 h-48" style={{ color: globalAccentHex || "#7C3AED" }} />
                      </div>
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-2">
                            <Shield className="w-4 h-4" style={{ color: globalAccentHex || "#7C3AED" }} /> Permissões de Acesso
                          </h6>
                          <p className="text-[8px] text-text-dim uppercase tracking-widest mt-1 font-black">Defina o que o usuário pode gerenciar</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                        {['Dashboard', 'Alunos', 'Aulas', 'Financeiro'].map(perm => (
                          <label key={perm} className="flex flex-col items-center gap-3 p-4 bg-surface-1 rounded-2xl border border-transparent hover:border-border/20 cursor-pointer hover:border-purple/30 transition-all group/perm shadow-lg">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 group-hover/perm:bg-purple/10 transition-colors">
                               <input type="checkbox" className="w-4 h-4 rounded border border-transparent hover:border-border/20 accent-purple" defaultChecked />
                            </div>
                            <span className="text-[9px] font-black uppercase text-text-dim group-hover/perm:text-text-main transition-colors">{perm}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button onClick={() => setIsUserModalOpen(false)} className="flex-1 py-5 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 hover:text-text-main transition-all font-black border border-transparent hover:border-border/20 active:scale-95">Cancelar</button>
                      <button 
                        onClick={() => {
                          setIsUserModalOpen(false);
                          handleAction("Usuário criado");
                        }}
                        className="flex-[2] py-5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border border-transparent hover:border-white/20 font-black relative overflow-hidden group/create-user-btn"
                        style={{ backgroundColor: globalAccentHex || "#7C3AED", boxShadow: `0 20px 40px ${(globalAccentHex || "#7C3AED")}4d` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/create-user-btn:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Criar Usuário Administrador</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Tickets Modal */}
            {isTicketsModalOpen && (
              <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
                onClick={() => setIsTicketsModalOpen(false)}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-3xl bg-surface-1 rounded-[2.5rem] border shadow-2xl overflow-hidden relative"
                  style={{ borderColor: "transparent" }}
                >
                  <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl" style={{ backgroundColor: (globalAccentHex || "#00E5A0") + "1a", color: globalAccentHex || "#00E5A0" }}>
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Chamados de Suporte</h5>
                        <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Acompanhe suas solicitações</p>
                      </div>
                    </div>
                    <button onClick={() => setIsTicketsModalOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-4">
                    {[
                      { id: "#TK-882", subject: "Problema no acesso Mobile", status: "Em Aberto", date: "28/02/2026", priority: "Alta" },
                      { id: "#TK-875", subject: "Dúvida sobre Faturamento", status: "Concluído", date: "25/02/2026", priority: "Média" },
                      { id: "#TK-860", subject: "Sugestão de Nova Funcionalidade", status: "Em Análise", date: "20/02/2026", priority: "Baixa" },
                    ].map((ticket) => (
                      <div key={ticket.id} className="p-5 bg-surface-2/50 rounded-2xl border border-transparent hover:border-border/20 group hover:border-green/30 transition-all flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-surface-1 flex items-center justify-center font-black text-[9px] text-text-dim group-hover:text-green transition-colors">{ticket.id}</div>
                          <div>
                            <div className="text-[10px] font-black text-text-main uppercase tracking-widest">{ticket.subject}</div>
                            <div className="text-[8px] text-text-dim font-black uppercase tracking-widest mt-1">Criado em: {ticket.date} • Prioridade: {ticket.priority}</div>
                          </div>
                        </div>
                        <div className={cn("px-3 py-1 rounded-md text-[8px] font-black uppercase", 
                          ticket.status === "Concluído" ? "bg-green/10 text-green" : 
                          ticket.status === "Em Aberto" ? "bg-blue/10 text-blue" : "bg-orange/10 text-orange"
                        )}>
                          {ticket.status}
                        </div>
                      </div>
                    ))}
                  </div>

                    <div className="p-6 bg-surface-2 border-t border-border flex justify-end">
                      <button 
                        className="px-8 py-3 bg-green text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all relative overflow-hidden group/new-ticket-btn border border-transparent hover:border-white/20" 
                        style={{ backgroundColor: globalAccentHex || "#00E5A0" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/new-ticket-btn:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Abrir Novo Chamado</span>
                      </button>
                    </div>
                </motion.div>
              </div>
            )}

            {/* User Details Modal */}
            {isUserDetailsModalOpen && selectedUser && (
              <div 
                className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-xl"
                onClick={() => setIsUserDetailsModalOpen(false)}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-4xl bg-surface-1 rounded-[3rem] border shadow-2xl overflow-hidden relative"
                    style={{ borderColor: "transparent" }}
                  >
                    {/* Shimmer Overlay removed from main frame */}
                    {/* <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none" /> */}

                  <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group/icon-header overflow-hidden relative" style={{ backgroundColor: (globalAccentHex || "#7C3AED") + "1a", color: globalAccentHex || "#7C3AED" }}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/icon-header:opacity-100 transition-opacity" />
                        <UserIcon className="w-7 h-7 relative z-10 group-hover/icon-header:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h5 className="text-2xl font-black uppercase tracking-tighter text-text-main">Gestão Avançada de Usuário</h5>
                        <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-black mt-1">Configurações completas de perfil, segurança e acesso</p>
                      </div>
                    </div>
                      <button onClick={() => setIsUserDetailsModalOpen(false)} className="p-4 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="p-10 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left Side: Profile Summary & Stats */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 bg-surface-2/60 rounded-[2.5rem] border border-transparent hover:border-border/20 relative overflow-hidden group/profile-card">
                          <div 
                            className="absolute inset-0 opacity-[0.05] pointer-events-none transition-all duration-1000 group-hover/profile-card:scale-125 group-hover/profile-card:rotate-6"
                            style={{ color: globalAccentHex || "#7C3AED" }}
                          >
                             <ShieldCheck className="w-full h-full" />
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 bg-surface-1 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl group-hover/profile-card:scale-105 transition-transform duration-500 border mb-6" style={{ borderColor: "transparent", color: globalAccentHex || "#7C3AED" }}>
                              <UserIcon className="w-16 h-16 relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
                            </div>

                            <div className="space-y-2">
                              <h6 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none">{selectedUser.name}</h6>
                              <div className="flex items-center justify-center gap-3">
                                <div className={cn("px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-lg", selectedUser.status === "Ativo" ? "bg-green/10 text-green border-green/20" : "bg-red/10 text-red border-red/20")}>
                                  {selectedUser.status}
                                </div>
                                <span className="px-4 py-1.5 bg-surface-1 text-text-main text-[9px] font-black uppercase tracking-widest rounded-full border border-transparent hover:border-border/20 shadow-md" style={{ color: globalAccentHex || "#7C3AED" }}>{selectedUser.role}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                              <div className="p-4 bg-surface-1/50 rounded-2xl border border-transparent hover:border-border/50 text-center">
                                <div className="text-[8px] text-text-dim uppercase font-black mb-1">Membro Desde</div>
                                <div className="text-[10px] text-text-main font-black uppercase">{selectedUser.since || "Jan 2024"}</div>
                              </div>
                              <div className="p-4 bg-surface-1/50 rounded-2xl border border-transparent hover:border-border/50 text-center">
                                <div className="text-[8px] text-text-dim uppercase font-black mb-1">Último Acesso</div>
                                <div className="text-[10px] text-text-main font-black uppercase">{selectedUser.lastLogin || "Hoje"}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                            {/* Security Actions Card */}
                            <div className="p-8 bg-surface-2/40 rounded-[2.5rem] border border-transparent hover:border-border/20 space-y-6 relative overflow-hidden group/security-card" style={{ borderColor: (globalAccentHex || "#7C3AED") + "26" }}>
                              <div className="absolute -left-10 -bottom-10 opacity-[0.02] group-hover/security-card:opacity-[0.06] transition-all duration-1000 group-hover/security-card:scale-150">
                                <Shield className="w-64 h-64" style={{ color: globalAccentHex || "#7C3AED" }} />
                              </div>
                              
                              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-main relative z-10">
                                <Lock className="w-5 h-5" style={{ color: globalAccentHex || "#7C3AED" }} /> Ações de Segurança e Acesso
                              </div>
                              
                              <div className="grid grid-cols-1 gap-4 relative z-10">
                                <button 
                                  onClick={() => {
                                    toast.info("Link de redefinição enviado!", {
                                        description: `Um e-mail foi enviado para ${selectedUser.email}`,
                                        icon: <Mail className="w-4 h-4 text-blue" />
                                    });
                                  }}
                                  className="w-full flex items-center justify-between p-6 bg-surface-1 border border-transparent hover:border-blue/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-main hover:text-blue transition-all shadow-xl active:scale-95 group/pass-btn relative overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue/5 to-transparent -translate-x-full group-hover/pass-btn:translate-x-full transition-transform duration-700" />
                                  <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center shadow-inner group-hover/pass-btn:scale-110 transition-transform">
                                      <Key className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                      <span className="block">Redefinir Senha</span>
                                      <span className="text-[8px] text-text-dim lowercase tracking-normal font-bold">Enviar link de recuperação</span>
                                    </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-blue group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </button>

                                <button 
                                  onClick={() => {
                                    handleAction(selectedUser.status === "Ativo" ? "Acesso Suspenso" : "Acesso Reativado");
                                    setSelectedUser({...selectedUser, status: selectedUser.status === "Ativo" ? "Inativo" : "Ativo"});
                                  }}
                                  className={cn(
                                    "w-full flex items-center justify-between p-6 bg-surface-1 border border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 group/deactivate-btn relative overflow-hidden",
                                    selectedUser.status === "Ativo" ? "hover:border-red/40 hover:text-red" : "hover:border-green/40 hover:text-green"
                                  )}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/10 to-transparent -translate-x-full group-hover/deactivate-btn:translate-x-full transition-transform duration-700" />
                                  <div className="flex items-center gap-4 relative z-10">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-inner group-hover/deactivate-btn:scale-110 transition-transform", 
                                      selectedUser.status === "Ativo" ? "bg-red/10 text-red" : "bg-green/10 text-green"
                                    )}>
                                      {selectedUser.status === "Ativo" ? <UserMinus className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                    </div>
                                    <div className="text-left">
                                      <span className="block">{selectedUser.status === "Ativo" ? "Suspender Acesso" : "Ativar Acesso"}</span>
                                      <span className="text-[8px] text-text-dim lowercase tracking-normal font-bold">{selectedUser.status === "Ativo" ? "Bloquear entrada no sistema" : "Restaurar acesso do usuário"}</span>
                                    </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <AlertTriangle className={cn("w-4 h-4 group-hover:rotate-12 transition-transform", selectedUser.status === "Ativo" ? "text-red" : "text-green")} />
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Right Side: Contact & Permissions */}
                          <div className="lg:col-span-7 space-y-6">
                            {/* Visualizar Senha e Tempo de Acesso */}
                            <div className="p-8 bg-surface-2/40 rounded-[2.5rem] border border-transparent hover:border-border/20 space-y-6 relative overflow-hidden group/access-controls" style={{ borderColor: (globalAccentHex || "#7C3AED") + "26" }}>
                                <div className="absolute -right-20 -top-20 opacity-[0.02] group-hover/access-controls:opacity-[0.06] transition-all duration-1000">
                                   <Zap className="w-48 h-48" style={{ color: globalAccentHex || "#7C3AED" }} />
                                </div>
                                
                                <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-2 relative z-10">
                                   <Zap className="w-5 h-5" style={{ color: globalAccentHex || "#7C3AED" }} /> Controles de Credenciais
                                </h6>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                  {/* Visualizar Senha */}
                                  <div className="space-y-3 group/pass transition-all">
                                     <div className="flex items-center justify-between ml-1">
                                       <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Senha de Acesso</span>
                                       <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[8px] font-black uppercase text-purple flex items-center gap-1 hover:underline"
                                        style={{ color: globalAccentHex || "#7C3AED" }}
                                       >
                                         {showPassword ? <><EyeOff className="w-3 h-3" /> Ocultar</> : <><Eye className="w-3 h-3" /> Visualizar</>}
                                       </button>
                                     </div>
                                     <div className="text-xs font-black text-text-main bg-surface-1 p-5 rounded-2xl border border-transparent hover:border-border/20 shadow-lg group-hover/pass:border-purple/30 transition-all flex items-center justify-between">
                                       <span className="tracking-widest">{showPassword ? "Pardim@2026!" : "••••••••••••"}</span>
                                       <button onClick={() => {
                                         navigator.clipboard.writeText("Pardim@2026!");
                                         toast.success("Senha copiada!");
                                       }} className="p-2 hover:bg-surface-2 rounded-lg transition-all"><Copy className="w-3.5 h-3.5 text-text-dim" /></button>
                                     </div>
                                  </div>

                                  {/* Tempo de Acesso */}
                                  <div className="space-y-3 group/time transition-all">
                                     <span className="text-[9px] font-black text-text-dim uppercase tracking-widest ml-1">Tempo de Acesso</span>
                                     <div className="relative">
                                       <Clock className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" />
                                       <select 
                                        value={accessTime}
                                        onChange={(e) => setAccessTime(e.target.value)}
                                        className="w-full bg-surface-1 border border-transparent hover:border-border/20 p-5 pl-12 rounded-2xl text-xs outline-none focus:border-purple/50 font-black shadow-lg appearance-none transition-all"
                                       >
                                         <option value="ilimitado">Ilimitado</option>
                                         <option value="24h">Próximas 24 horas</option>
                                         <option value="7d">7 Dias</option>
                                         <option value="30d">30 Dias</option>
                                         <option value="custom">Personalizado...</option>
                                       </select>
                                       <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-text-dim pointer-events-none" />
                                     </div>
                                  </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                          <div className="p-8 bg-surface-2/40 rounded-[2.5rem] border border-transparent hover:border-border/20 space-y-6 relative overflow-hidden group/contact-info" style={{ borderColor: (globalAccentHex || "#7C3AED") + "26" }}>
                            <div className="absolute -right-10 -top-10 opacity-[0.02] group-hover/contact-info:opacity-[0.06] transition-all duration-1000">
                               <Mail className="w-48 h-48" style={{ color: globalAccentHex || "#7C3AED" }} />
                            </div>
                            <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main flex items-center gap-2 relative z-10">
                               <Mail className="w-4 h-4" style={{ color: globalAccentHex || "#7C3AED" }} /> Informações de Contato
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                              <div className="space-y-3 group/info transition-all">
                                 <span className="text-[9px] font-black text-text-dim uppercase tracking-widest ml-1">E-mail Corporativo</span>
                                 <div className="text-xs font-black text-text-main truncate bg-surface-1 p-5 rounded-2xl border border-transparent hover:border-border/20 shadow-lg group-hover/info:border-purple/30 transition-all flex items-center justify-between">
                                   <span>{selectedUser.email}</span>
                                   <button className="p-2 hover:bg-surface-2 rounded-lg transition-all"><Copy className="w-3.5 h-3.5 text-text-dim" /></button>
                                 </div>
                              </div>
                              <div className="space-y-3 group/info transition-all">
                                 <span className="text-[9px] font-black text-text-dim uppercase tracking-widest ml-1">Telefone / WhatsApp</span>
                                 <div className="text-xs font-black text-text-main bg-surface-1 p-5 rounded-2xl border border-transparent hover:border-border/20 shadow-lg group-hover/info:border-purple/30 transition-all flex items-center justify-between">
                                   <span>{selectedUser.phone || "(11) 98888-7777"}</span>
                                   <button className="p-2 hover:bg-surface-2 rounded-lg transition-all"><MessageCircle className="w-3.5 h-3.5 text-text-dim" /></button>
                                 </div>
                              </div>
                            </div>
                          </div>

                          {/* Permissions Grid */}
                          <div className="p-8 bg-surface-2/40 rounded-[2.5rem] border border-transparent hover:border-border/20 space-y-6 relative overflow-hidden group/perms-view" style={{ borderColor: (globalAccentHex || "#7C3AED") + "26" }}>
                              <div className="absolute -right-20 -top-20 opacity-[0.02] group-hover/perms-view:opacity-[0.06] transition-all duration-1000 group-hover/perms-view:scale-150 group-hover/perms-view:rotate-12">
                                <Shield className="w-80 h-80" style={{ color: globalAccentHex || "#7C3AED" }} />
                              </div>
                              
                              <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-main">
                                  <Shield className="w-5 h-5" style={{ color: globalAccentHex || "#7C3AED" }} /> Módulos Autorizados
                                </div>
                                <button className="text-[9px] font-black uppercase text-white bg-blue px-6 py-2.5 rounded-xl border border-transparent hover:border-white/20 hover:scale-105 transition-all shadow-xl shadow-blue/20 active:scale-95 relative overflow-hidden group/mod-perms">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/mod-perms:translate-x-full transition-transform duration-700" />
                                  <span className="relative z-10">Modificar Permissões</span>
                                </button>
                              </div>


                            <div className="grid grid-cols-2 gap-4 relative z-10">
                              {['Dashboard de Controle', 'Gestão de Alunos', 'Agendamento de Aulas', 'Controle Financeiro'].map((perm, i) => (
                                <div key={perm} className="p-5 bg-surface-1/80 backdrop-blur-sm border border-transparent hover:border-border/20 rounded-[1.5rem] flex items-center justify-between group/perm-item transition-all hover:scale-[1.02] shadow-xl" style={{ borderColor: (globalAccentHex || "#7C3AED") + "1a" }}>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center text-green shadow-inner">
                                      <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-text-main">{perm}</span>
                                  </div>
                                  <div className="text-[8px] font-black uppercase text-green opacity-50">Ativo</div>
                                </div>
                              ))}
                            </div>

                            <div className="p-6 bg-surface-1/30 rounded-2xl border border-dashed border-border/50 relative z-10 text-center">
                               <p className="text-[9px] text-text-dim uppercase tracking-widest font-black italic opacity-60">"Este usuário possui permissões de nível Administrativo Padrão"</p>
                            </div>
                        </div>
                      </div>
                    </div>

                      <div className="flex gap-6 pt-4 relative z-10 border-t border-border pt-10">
                        <button 
                          onClick={() => setIsUserDetailsModalOpen(false)} 
                          className="px-10 py-5 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 hover:text-red transition-all font-black border border-transparent hover:border-border/20 shadow-xl active:scale-95 hover:scale-105 relative overflow-hidden group/close-view"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red/10 to-transparent -translate-x-full group-hover/close-view:translate-x-full transition-transform duration-700" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px rgba(239,68,68,0.15), 0 0 20px rgba(239,68,68,0.1)` }} />
                          <span className="relative z-10 flex items-center gap-2"><EyeOff className="w-4 h-4" /> Fechar Visualização</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsUserDetailsModalOpen(false);
                            handleAction("Usuário atualizado");
                          }}
                          className="flex-1 py-5 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border border-transparent hover:border-white/20 font-black relative overflow-hidden group/save-details-btn"
                          style={{ backgroundColor: globalAccentHex || "#7C3AED", boxShadow: `0 20px 40px ${(globalAccentHex || "#7C3AED")}4d` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/save-details-btn:translate-x-full transition-transform duration-1000" />
                          <div className="flex items-center justify-center gap-3 relative z-10">
                             <Save className="w-5 h-5" /> <span>Confirmar e Salvar Alterações</span>
                          </div>
                        </button>
                      </div>

                  </div>
                </motion.div>
              </div>
              )}
  
            {isClearCacheModalOpen && (
              <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
                onClick={() => setIsClearCacheModalOpen(false)}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-surface-1 rounded-[2.5rem] border shadow-2xl overflow-hidden relative"
                  style={{ borderColor: "transparent" }}
                >
                  <div className="p-8 border-b border-border bg-surface-2/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl" style={{ backgroundColor: (globalAccentHex || "#F59E0B") + "1a", color: globalAccentHex || "#F59E0B" }}>
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Limpar Cache Local</h5>
                        <p className="text-[10px] text-text-dim uppercase tracking-widest font-black mt-1">Otimize a performance do seu sistema</p>
                      </div>
                    </div>
                    <button onClick={() => setIsClearCacheModalOpen(false)} className="p-3 bg-surface-1 border border-transparent hover:border-border/20 rounded-2xl text-text-dim hover:text-red hover:border-red/30 transition-all active:scale-95 hover:scale-105 shadow-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-10 space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-orange/5 rounded-2xl border border-orange/10">
                      <AlertTriangle className="w-6 h-6 text-orange shrink-0 mt-1" />
                      <div>
                        <h6 className="text-xs font-black uppercase tracking-widest text-orange mb-2">Atenção!</h6>
                        <p className="text-[10px] text-text-dim uppercase tracking-widest font-black leading-relaxed opacity-80">
                          Esta ação irá remover todos os dados temporários armazenados localmente. Você precisará fazer login novamente em alguns serviços e o primeiro carregamento após a limpeza pode ser um pouco mais lento.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/20">
                        <div className="flex items-center gap-3">
                          <Database className="w-4 h-4 text-text-dim" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-text-main">Banco de dados Local</span>
                        </div>
                        <span className="text-[10px] font-black text-text-dim">4.2 MB</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-surface-2/50 rounded-xl border border-transparent hover:border-border/20">
                        <div className="flex items-center gap-3">
                          <Palette className="w-4 h-4 text-text-dim" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-text-main">Assets & Imagens</span>
                        </div>
                        <span className="text-[10px] font-black text-text-dim">12.8 MB</span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={() => setIsClearCacheModalOpen(false)} 
                        className="flex-1 py-4 bg-surface-2 text-text-dim rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-3 transition-all border border-transparent hover:border-border/20"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={() => {
                          setIsClearCacheModalOpen(false);
                          toast.success("Cache limpo com sucesso!", {
                              description: "O sistema foi otimizado.",
                              icon: <Zap className="w-4 h-4 text-orange" />
                          });
                        }}
                        className="flex-[2] py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all border border-transparent hover:border-white/20 relative overflow-hidden group/clear-btn"
                        style={{ backgroundColor: globalAccentHex || "#F59E0B" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover/clear-btn:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Confirmar Limpeza</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

          </AnimatePresence>
      </DashboardLayout>
    );
  }
