"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  User as UserIcon, Mail, Phone, MapPin, Briefcase, 
  Calendar, Camera, Save, ArrowLeft, Shield, Key,
  ChevronRight, BadgeCheck, Activity, Star, Zap, TrendingUp,
  Clock, Download, Share2, MoreHorizontal, Sliders, Smartphone, Check,
  Layout, Globe, Lock, ShieldCheck, Heart, UserX,
  LifeBuoy, HelpCircle, MessageSquare, X, Info, MessageCircle, BookOpen, Crown, Fingerprint,
    RefreshCw, Terminal, Eye, AlertTriangle, Cloud, HardDrive, History, Database, Plus,
    ShieldAlert, Settings, Cpu, Network, ZapOff, Wifi, DollarSign
  } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
    const { adminProfile, setAdminProfile } = useSettings();
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    // Perfil Master sempre terá identidade AZUL conforme solicitado
    const accentColor = "#1A6CF7";
    
    const [formData, setFormData] = useState({
      name: adminProfile.name,
      role: adminProfile.role,
      email: adminProfile.email,
      phone: "(11) 98765-4321",
      location: "São Paulo, SP",
      bio: "Master Administrator do Ecossistema Integrado de Gestão Administrativa."
    });
  
    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      setAdminProfile({
        name: formData.name,
        role: formData.role,
        email: formData.email
      });
      toast.success("Perfil Master Atualizado!", {
        description: "Assinatura digital confirmada e salva nos servidores.",
        icon: <BadgeCheck className="w-5 h-5 text-blue" style={{ color: accentColor }} />
      });
    };
  
    const containerVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4, 
          staggerChildren: 0.05 
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    };

    return (
      <DashboardLayout>
        <motion.div 
          className="max-w-[1200px] mx-auto pb-20 px-4 md:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
            {/* Admin Header with Banner & Avatar */}
            <section className="relative mb-28">
                {/* Banner Area - Tamanho Normalizado */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="relative h-56 md:h-72 rounded-[2.5rem] overflow-hidden z-0 shadow-xl border-2 transition-transform duration-700"
                  style={{ 
                    borderColor: accentColor + "20",
                    boxShadow: `0 10px 40px -10px ${accentColor}40`
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br transition-all duration-700" 
                    style={{ 
                      background: `linear-gradient(135deg, ${accentColor} 0%, var(--surface-2) 100%)`,
                    }} 
                  />
                  
                  {/* Animated Particles Effect for Admin Banner */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accentColor/10 rounded-full blur-[100px] animate-pulse" style={{ backgroundColor: accentColor + '20' }} />
                  </div>

                    {/* Crown in Banner - Now BLUE and VISIBLE */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none group-hover:opacity-90 group-hover:scale-110 transition-all duration-700">
                      <Crown className="w-48 h-48 rotate-12" style={{ color: "#1A6CF7", filter: `drop-shadow(0 0 60px #1A6CF7)` }} />
                    </div>
                    
                    <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </motion.div>



            {/* Profile Info Overlay - Reposicionamento e Tamanho Normalizado */}
            <div className="absolute -bottom-16 left-0 right-0 px-4 md:px-12 flex flex-col md:flex-row items-end gap-6">
              {/* Avatar Container */}
              <motion.div 
                variants={itemVariants}
                className="relative group/avatar shrink-0"
              >
                <div 
                  className="w-40 h-40 rounded-[2.5rem] bg-surface-1 border-[6px] border-background overflow-hidden shadow-2xl relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-10" style={{ backgroundColor: accentColor + "10" }} />
                  <div className="w-full h-full bg-gradient-to-br from-surface-2 to-surface-1 flex items-center justify-center relative">
                    <UserIcon 
                        className="w-20 h-20 group-hover/avatar:scale-105 transition-transform duration-500" 
                        style={{ 
                            color: accentColor, 
                            filter: `drop-shadow(0 0 15px ${accentColor}40)` 
                        }} 
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -right-1 -bottom-1 w-12 h-12 text-white rounded-xl shadow-xl flex items-center justify-center border-4 border-background z-20 overflow-hidden"
                  style={{ 
                    backgroundColor: accentColor,
                  }}
                >
                  <Camera className="w-5 h-5 relative z-10" />
                </motion.button>
              </motion.div>

              <div className="flex-1 pb-4 text-center md:text-left">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-green/10 text-green text-[7px] font-black uppercase tracking-widest border border-green/20">Online</span>
                    <span className="px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border" style={{ backgroundColor: accentColor + "10", color: accentColor, borderColor: accentColor + "20" }}>Admin Level 5</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter uppercase drop-shadow-lg">
                    {adminProfile.name}
                  </h1>
                </motion.div>
                <motion.p 
                    variants={itemVariants}
                    className="font-black uppercase tracking-[0.3em] text-[10px] mt-2 flex items-center justify-center md:justify-start gap-3" 
                    style={{ color: accentColor }}
                >
                  {adminProfile.role} • AUTO ESCOLA PARDIM REZENDE
                </motion.p>
              </div>

              {/* Quick Stats Panel */}
              <motion.div variants={itemVariants} className="pb-4 hidden lg:flex gap-4">
                {[
                    { icon: Globe, label: "Rede", value: "Global", color: accentColor },
                    { icon: ShieldCheck, label: "Status", value: "Master", color: "#10B981" },
                ].map((stat, i) => (
                  <div key={i} className="p-0.5 rounded-2xl bg-surface-1/80 border border-border shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-3 px-6 py-3">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <div>
                        <p className="text-[8px] font-black text-text-dim uppercase tracking-widest">{stat.label}</p>
                        <p className="text-[10px] font-black text-text-main uppercase tracking-tighter">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Grid de Configurações */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
              {/* Coluna Principal */}
              <div className="lg:col-span-8 space-y-8">
                
                  {/* CARD DE CREDENCIAIS - COM ÍCONE DE COROA NO FUNDO */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -8, boxShadow: `0 35px 70px -15px ${accentColor}40` }}
                    className="bg-surface-1/80 backdrop-blur-2xl rounded-[2.5rem] border border-border/50 shadow-xl relative overflow-hidden group transition-all duration-700"
                  >
                    {/* Dynamic Glow Background */}
                    <div className="absolute -inset-20 bg-gradient-to-tr from-transparent via-accentColor/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-12 pointer-events-none" style={{ background: `linear-gradient(45deg, transparent, ${accentColor}10, transparent)` }} />
                    
                    {/* Background Crown Watermark */}
                    <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 pointer-events-none">
                      <Crown className="w-64 h-64 -rotate-12" style={{ color: accentColor, filter: `drop-shadow(0 0 60px ${accentColor})` }} />
                    </div>


                  <div className="p-8 md:p-10 relative z-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              whileHover={{ scale: 1.2, rotate: 6 }}
                              transition={{ duration: 0.3 }}
                              className="w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg cursor-pointer group/lock-icon relative overflow-hidden"
                              style={{ 
                                backgroundColor: accentColor + "10", 
                                borderColor: accentColor + "20", 
                                color: accentColor,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/lock-icon:opacity-100 transition-opacity" />
                              <Lock className="w-6 h-6 relative z-10" />
                            </motion.div>
                        <div>
                          <h3 className="text-xl font-black text-text-main uppercase tracking-tighter">Credenciais Master</h3>
                          <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] mt-1">Identificação Nível SSS</p>
                        </div>
                      </div>
                    </header>

                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] ml-2 text-text-dim">
                             Nome Admin
                          </label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full p-5 bg-surface-2/40 border border-border rounded-2xl outline-none text-[11px] font-black text-text-main focus:border-blue-primary focus:ring-4 focus:ring-blue-primary/10 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] ml-2 text-text-dim">
                             Cargo Master
                          </label>
                          <input 
                            type="text" 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="w-full p-5 bg-surface-2/40 border border-border rounded-2xl outline-none text-[11px] font-black text-text-main focus:border-blue-primary focus:ring-4 focus:ring-blue-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] ml-2 text-text-dim">
                             Email Principal
                          </label>
                          <input 
                            type="email" 
                            value={formData.email}
                            disabled
                            className="w-full p-5 bg-surface-2/20 border border-border rounded-2xl outline-none text-[11px] font-black text-text-dim opacity-50 cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] ml-2 text-text-dim">
                             Contato Emergência
                          </label>
                          <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full p-5 bg-surface-2/40 border border-border rounded-2xl outline-none text-[11px] font-black text-text-main focus:border-blue-primary focus:ring-4 focus:ring-blue-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] ml-2 text-text-dim">
                           Descrição Admin
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="w-full p-5 bg-surface-2/40 border border-border rounded-2xl outline-none text-[11px] font-bold text-text-dim resize-none transition-all focus:border-blue-primary focus:ring-4 focus:ring-blue-primary/10"
                        />
                      </div>

                        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4 p-4 bg-surface-2/40 rounded-2xl border border-border group/finger">
                            <Fingerprint className="w-6 h-6 group-hover/finger:scale-110 transition-transform" style={{ color: accentColor }} />
                            <div>
                              <p className="text-[9px] font-black text-text-main uppercase tracking-widest">Bio-Auth</p>
                              <p className="text-[8px] font-black text-green uppercase tracking-tighter mt-0.5 animate-pulse">Sessão Segura</p>
                            </div>
                          </div>
    
                            {/* BOTÃO EDITAR PERFIL - FORMATADO E DIMENSIONADO */}
                            <motion.button 
                              type="submit" 
                              whileHover={{ scale: 1.05, translateY: -2, boxShadow: `0 15px 30px ${accentColor}40` }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full md:w-auto px-10 py-4 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group/save relative overflow-hidden border border-white/20"
                              style={{ 
                                  backgroundColor: accentColor, 
                                  boxShadow: `0 10px 20px ${accentColor}40`
                              }}
                            >
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/save:translate-x-full transition-transform duration-1000" />
                              
                              <Save className="w-3.5 h-3.5 relative z-10 group-hover/save:scale-110 transition-transform" /> 
                              <span className="relative z-10">Atualizar Perfil Master</span>
                            </motion.button>
                        </div>

                    </form>
                  </div>
                </motion.div>

                  {/* MÉTRICAS - TAMANHO NORMALIZADO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -8, boxShadow: `0 25px 50px -12px ${accentColor}30` }}
                      className="p-8 bg-surface-1/90 backdrop-blur-xl rounded-[2.5rem] border border-border/50 shadow-lg relative overflow-hidden group transition-all duration-700"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accentColor/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-main mb-8 flex items-center gap-3 relative z-10">
                        <Cpu className="w-4 h-4 animate-spin-slow" style={{ color: accentColor }} /> System Status
                      </h4>
                      <div className="space-y-6 relative z-10">
                        {[
                          { label: "Cloud Sync", value: 92, icon: Cloud },
                          { label: "ZapNotify Engine", value: 68, icon: MessageCircle },
                        ].map((stat, i) => (
                          <div key={i} className="space-y-3 group/stat">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-text-dim group-hover/stat:text-text-main transition-colors">
                              <span className="flex items-center gap-2">
                                <stat.icon className="w-3.5 h-3.5 group-hover/stat:scale-110 transition-transform" /> {stat.label}
                              </span>
                              <span className="text-text-main bg-surface-2 px-2 py-0.5 rounded-lg border border-border">{stat.value}%</span>
                            </div>
                            <div className="h-3 bg-surface-2/50 rounded-full overflow-hidden border border-border/50 p-[2px] shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.value}%` }}
                                className="h-full rounded-full relative overflow-hidden" 
                                style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>


                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -8, boxShadow: `0 25px 50px -12px ${accentColor}30` }}
                    className="p-8 bg-surface-1/90 backdrop-blur-xl rounded-[2.5rem] border border-border/50 shadow-lg relative overflow-hidden transition-all duration-700 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-main mb-6 flex items-center gap-3 relative z-10">
                      <History className="w-4 h-4 group-hover:rotate-12 transition-transform" style={{ color: accentColor }} /> Logs Admin
                    </h4>
                      <div className="space-y-3 relative z-10">
                        {[
                          { msg: "Perfil sincronizado", time: "Há 2m", color: accentColor },
                          { msg: "Backup concluído", time: "Há 1h", color: "#10B981" },
                          { msg: "Acesso validado", time: "Há 3h", color: accentColor },
                        ].map((log, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ x: 8, scale: 1.02 }}
                            className="flex items-center justify-between p-4 bg-surface-2/30 backdrop-blur-sm rounded-2xl border border-border/50 text-[9px] font-black uppercase tracking-tighter transition-all cursor-pointer group/log shadow-sm relative overflow-hidden"
                          >
                            {/* Shimmer for Log Item */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/log:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            
                            {/* Hover Glow for Log Item */}
                            <div className="absolute inset-0 opacity-0 group-hover/log:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${log.color}26` }} />

                            <div className="flex items-center gap-4 relative z-10">
                              <div className="w-2 h-2 rounded-full relative">
                                 <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: log.color }} />
                                 <span className="relative block w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: log.color, color: log.color }} />
                              </div>
                              <span className="text-text-main group-hover/log:translate-x-1 transition-transform group-hover/log:text-text-main">{log.msg}</span>
                            </div>
                            <span className="text-text-dim text-[7px] tracking-widest bg-surface-1 px-2 py-1 rounded-lg relative z-10 group-hover/log:bg-surface-3 transition-colors">{log.time}</span>
                          </motion.div>
                        ))}
                      </div>
                  </motion.div>
                </div>
              </div>

                {/* Coluna Lateral */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* SECURITY GRADE */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: `0 35px 70px -15px rgba(16,185,129,0.3)` }}
                    className="p-10 bg-surface-1/90 backdrop-blur-2xl rounded-[2.5rem] border border-border/50 shadow-xl relative overflow-hidden group transition-all duration-700"
                  >
                    {/* Animated Scanning Line */}
                    <div className="absolute left-0 right-0 h-1 bg-green/20 -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none z-0" />
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 text-center mb-10">
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="w-24 h-24 bg-green/10 rounded-[2.5rem] border-2 border-green/20 flex items-center justify-center mx-auto mb-8 shadow-2xl relative group-hover:border-green/40 transition-all duration-500"
                      >
                        <ShieldCheck className="w-12 h-12 text-green relative z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
                        <div className="absolute inset-0 bg-green/30 blur-3xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700 opacity-50" />
                      </motion.div>
                      <h4 className="text-2xl font-black text-text-main uppercase tracking-tighter group-hover:scale-105 transition-transform duration-500">Security Grade A+</h4>
                      <p className="text-[10px] font-black text-green uppercase tracking-[0.3em] mt-3 flex items-center justify-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shadow-[0_0_10px_#10B981]" /> Protocolo Ativado
                      </p>
                    </div>


                    <div className="space-y-3">
                      {[
                        { label: "Firewall", icon: Lock, status: "ON", color: "#10B981" },
                        { label: "Heurística", icon: Eye, status: "LIVE", color: "#10B981" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-surface-2/40 backdrop-blur-sm rounded-2xl border border-border text-[9px] font-black uppercase tracking-widest group/sec-item hover:bg-surface-2 transition-all relative overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02]">
                          {/* Shimmer for Security Item */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/sec-item:translate-x-full transition-transform duration-1000 pointer-events-none" />
                          
                          <div className="flex items-center gap-3 text-text-dim group-hover/sec-item:text-text-main transition-colors relative z-10">
                            <item.icon className="w-4 h-4" /> {item.label}
                          </div>
                          <span className="text-green font-black relative z-10 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)] bg-green/10 px-2 py-1 rounded-lg">{item.status}</span>
                        </div>
                      ))}
                    </div>
                </motion.div>

                {/* HUB DE MÓDULOS */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: `0 35px 70px -15px ${accentColor}30` }}
                  className="p-8 bg-surface-1/90 backdrop-blur-2xl rounded-[2.5rem] border border-border/50 shadow-lg transition-all duration-700 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-accentColor/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-main mb-8 flex items-center gap-3 relative z-10">
                      <Database className="w-4 h-4 opacity-50 group-hover:rotate-12 transition-transform" /> Hub Admin
                  </h4>
                      <div className="grid grid-cols-2 gap-4 relative z-10">
                        {[
                          { name: "ZapNotify", icon: MessageCircle, bgIcon: MessageSquare },
                          { name: "Cloud", icon: Cloud, bgIcon: Database },
                          { name: "Auth", icon: Key, bgIcon: Shield },
                          { name: "Finance", icon: Star, bgIcon: DollarSign },
                        ].map((app, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.05, y: -5, boxShadow: `0 15px 30px -5px ${accentColor}40`, borderColor: `${accentColor}40` }}
                            whileTap={{ scale: 0.95 }}
                            className="p-5 bg-surface-2/40 rounded-[2rem] border border-border/50 flex flex-col items-center gap-4 text-center group/app transition-all cursor-pointer shadow-sm overflow-hidden relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/app:opacity-100 transition-opacity duration-700" />
                            
                            {/* Background Icon Watermark */}
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover/app:opacity-[0.12] group-hover/app:scale-125 group-hover/app:-rotate-12 transition-all duration-700 pointer-events-none">
                              <app.bgIcon className="w-20 h-20" style={{ color: accentColor }} />
                            </div>

                            {/* Shimmer for Hub Item */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/app:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            
                            {/* Hover Glow for Hub Item */}
                            <div className="absolute inset-0 opacity-0 group-hover/app:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px ${accentColor}45` }} />
  
                            {/* Top Glow Bar */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-accentColor to-transparent opacity-0 group-hover/app:w-full group-hover/app:opacity-100 transition-all duration-700" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)` } as any} />

                            <div className="w-14 h-14 rounded-2xl bg-surface-1 flex items-center justify-center group-hover/app:scale-110 group-hover/app:rotate-6 transition-all duration-500 shadow-lg relative overflow-hidden border border-transparent hover:border-white/10">
                              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/app:opacity-100 transition-opacity" />
                              <app.icon className="w-7 h-7 relative z-10" style={{ color: accentColor, filter: `drop-shadow(0 0 10px ${accentColor}60)` }} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-text-main relative z-10 group-hover/app:text-blue-primary transition-colors">{app.name}</span>
                          </motion.div>
                        ))}
                      </div>
                  </motion.div>

                    {/* SUPORTE */}
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -8, boxShadow: `0 35px 70px -15px ${accentColor}30` }}
                      className="p-8 bg-surface-1/80 backdrop-blur-2xl rounded-[2.5rem] border border-border/50 shadow-lg transition-all duration-700 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accentColor/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-main mb-6 flex items-center gap-3 relative z-10">
                          <HelpCircle className="w-4 h-4 opacity-50" /> Suporte Master
                      </h4>
                      <div className="space-y-4 relative z-10">
                        <motion.button 
                          onClick={() => setIsManualOpen(true)}
                          whileHover={{ scale: 1.05, x: 5, boxShadow: `0 15px 35px ${accentColor}30` }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-between p-5 bg-surface-2/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-blue-primary/40 hover:bg-surface-2/80 transition-all text-[10px] font-black uppercase tracking-widest group/btn shadow-inner relative overflow-hidden"
                        >
                          {/* Shimmer for Button */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none" />

                          <div className="flex items-center gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-blue-primary/10 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-500 shadow-lg border border-transparent hover:border-white/10">
                               <BookOpen className="w-5 h-5 text-blue-primary" />
                            </div>
                            <span className="group-hover/btn:translate-x-1 transition-transform">Acessar Manual</span>
                          </div>
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform relative z-10" />
                        </motion.button>
                        
                        <motion.button 
                          onClick={() => setIsChatOpen(true)}
                          whileHover={{ scale: 1.05, x: 5, boxShadow: `0 15px 35px rgba(16, 185, 129, 0.3)` }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-between p-5 bg-green/10 backdrop-blur-sm rounded-2xl border border-green/20 hover:border-green/40 hover:bg-green/15 transition-all text-[10px] font-black uppercase tracking-widest text-green group/chat shadow-inner relative overflow-hidden"
                        >
                          {/* Shimmer for Button */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/chat:translate-x-full transition-transform duration-1000 pointer-events-none" />

                          <div className="flex items-center gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-green/20 flex items-center justify-center group-hover/chat:scale-110 group-hover/chat:rotate-12 transition-all duration-500 shadow-lg border border-transparent hover:border-white/10">
                               <MessageSquare className="w-5 h-5" />
                            </div>
                            <span className="group-hover/chat:translate-x-1 transition-transform">Abrir Chat Técnico</span>
                          </div>
                          <div className="flex items-center relative z-10">
                            <div className="relative mr-3">
                               <span className="absolute inset-0 rounded-full bg-green animate-ping opacity-40" />
                               <span className="relative block w-2 h-2 rounded-full bg-green shadow-[0_0_15px_#10B981]" />
                            </div>
                            <ChevronRight className="w-4 h-4 group-hover/chat:translate-x-2 transition-transform" />
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>

              </div>
          </div>
        </motion.div>
    
        <AnimatePresence>
          {/* Manual Modal */}
          {isManualOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
              onClick={() => setIsManualOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl bg-surface-1 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <h5 className="text-2xl font-black uppercase tracking-tighter text-text-main">Knowledge Center</h5>
                  <button onClick={() => setIsManualOpen(false)} className="p-3 bg-surface-2 rounded-xl text-text-dim hover:text-red transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-10 max-h-[70vh] overflow-y-auto">
                   <p className="text-[11px] text-text-dim uppercase font-black leading-relaxed tracking-widest">
                     Bem-vindo ao centro de documentação administrativa Master. <br/><br/>
                     Este console permite a gestão completa do ecossistema Pardim Rezende. <br/>
                     Todas as ações são monitoradas e registradas para auditoria de segurança.
                   </p>
                </div>
              </motion.div>
            </div>
          )}
    
          {/* Chat Modal */}
          {isChatOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
              onClick={() => setIsChatOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-surface-1 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-border flex items-center justify-between bg-green/5">
                  <h5 className="text-xl font-black uppercase tracking-tighter text-text-main">Master Support</h5>
                  <button onClick={() => setIsChatOpen(false)} className="p-3 bg-surface-2 rounded-xl text-text-dim hover:text-red transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-10 text-center space-y-8">
                  <div className="w-24 h-24 bg-green/10 rounded-full flex items-center justify-center mx-auto border border-green/20">
                    <MessageCircle className="w-12 h-12 text-green" />
                  </div>
                  <h4 className="text-2xl font-black text-text-main uppercase tracking-tighter">Conexão Segura</h4>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest font-black leading-relaxed">Prioridade Master: Seu atendimento será iniciado em instantes por um especialista.</p>
                  <button 
                    className="w-full py-5 bg-green text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    Iniciar Chat Master
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </DashboardLayout>
    );
}
