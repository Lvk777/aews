"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { 
  MessageSquare, 
  Send, 
  Users, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Smartphone,
  MessageCircle,
  FileText,
  History,
  Search,
  Check,
  Zap,
    Phone,
    Settings,
    Plus,
    Shield
  } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/SettingsProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const recentChats = [
  { id: 1, name: "João Silva", lastMsg: "Obrigado pelo aviso!", time: "10:25", status: "delivered" },
  { id: 2, name: "Maria Oliveira", lastMsg: "Pode confirmar o horário?", time: "09:40", status: "read" },
  { id: 3, name: "Pedro Santos", lastMsg: "Enviei o documento agora.", time: "Ontem", status: "sent" },
  { id: 4, name: "Ana Costa", lastMsg: "Aula cancelada.", time: "Ontem", status: "delivered" },
];

export default function WhatsAppPage() {
  const { zapTemplates, globalAccentHex } = useSettings();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!phone || !message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
      setPhone("");
      setSelectedTemplate(null);
    }, 1500);
  };

  const selectTemplate = (content: string) => {
    setMessage(content);
    setSelectedTemplate(content);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="max-w-6xl mx-auto px-4 md:px-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
          <PageHeader 
            icon={MessageCircle} 
            title="ZapNotify - Avisos WhatsApp" 
            subtitle="Comunicação instantânea e automatizada para sua autoescola."
            accentColor="green"
          />
          
          <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div 
                className="px-6 py-3 bg-green/5 text-green border-2 border-green/20 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              >
                  <div className="w-2.5 h-2.5 rounded-full bg-green animate-pulse shadow-[0_0_15px_#10B981]" />
                  SISTEMA CONECTADO
              </div>
              <Link href="/configuracoes">
                <Button variant="outline" size="icon" className="rounded-2xl border-2 hover:border-green/40 hover:text-green">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Send Message */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              variants={itemVariants}
              className="p-8 md:p-10 rounded-[2.5rem] border-2 border-border bg-surface-1 shadow-2xl relative overflow-hidden group hover:border-green/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]"
            >
               {/* Background Decoration */}
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-1000 group-hover:scale-150 pointer-events-none group-hover:rotate-12">
                  <Zap className="w-80 h-80 text-green" />
              </div>

              <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="w-16 h-16 bg-green/10 rounded-[1.5rem] flex items-center justify-center border-2 border-green/20 shadow-xl shadow-green/10 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
                  <Send className="w-8 h-8 text-green" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">Nova Mensagem Rápida</h3>
                  <p className="text-[10px] text-text-dim font-black uppercase tracking-widest opacity-60 mt-1">Envio prioritário via infraestrutura ZapNotify</p>
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-text-dim uppercase tracking-widest ml-2 opacity-60">Telefone do Destinatário</label>
                    <div className="relative group/input">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim group-focus-within/input:text-green transition-colors" />
                      <input 
                        type="text" 
                        placeholder="(00) 00000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-surface-2 border-2 border-border/50 rounded-[1.8rem] focus:ring-8 focus:ring-green/5 focus:border-green/50 outline-none text-sm font-black text-text-main transition-all shadow-inner hover:border-green/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-text-dim uppercase tracking-widest ml-2 opacity-60">Canal de Envio</label>
                    <div className="relative group/select">
                      <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim group-focus-within/select:text-green transition-colors" />
                      <select className="w-full pl-14 pr-6 py-5 bg-surface-2 border-2 border-border/50 rounded-[1.8rem] focus:ring-8 focus:ring-green/5 focus:border-green/50 outline-none text-sm font-black text-text-main transition-all appearance-none cursor-pointer shadow-inner hover:border-green/30">
                        <option>WhatsApp Direct</option>
                        <option>Automated Queue</option>
                        <option>SMS Fallback</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-text-dim uppercase tracking-widest ml-2 opacity-60">Conteúdo Personalizado</label>
                  <textarea 
                    placeholder="Digite a mensagem ou escolha um modelo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-8 bg-surface-2 border-2 border-border/50 rounded-[2.5rem] focus:ring-8 focus:ring-green/5 focus:border-green/50 outline-none text-sm font-bold text-text-main transition-all min-h-[220px] resize-none shadow-inner hover:border-green/30"
                  />
                  <div className="mt-4 flex flex-wrap gap-3 px-2">
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-green" /> Smart Tags:
                    </span>
                    {['{{nome}}', '{{data}}', '{{hora}}', '{{instrutor}}'].map(v => (
                      <motion.button 
                        key={v}
                        whileHover={{ scale: 1.1, translateY: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMessage(message + v)}
                        className="px-3 py-1.5 bg-surface-1 border-2 border-border rounded-xl text-[10px] font-black text-green hover:border-green/40 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      >
                        {v}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-6">
                  <div className="flex items-center gap-3 text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-80">
                    <ShieldCircle className="w-5 h-5 text-green animate-pulse" />
                    Criptografia Ativa E2EE
                  </div>
                  <motion.button 
                    onClick={handleSend}
                    disabled={isSending}
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-16 py-6 text-white rounded-[2.2rem] text-[13px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center gap-4 relative overflow-hidden group/btn-zap",
                      isSending ? "bg-green/70 cursor-not-allowed" : "bg-green"
                    )}
                    style={{ 
                        boxShadow: `0 30px 60px -15px rgba(16,185,129,0.5)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn-zap:translate-x-full transition-transform duration-1000" />
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ENVIANDO...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10" /> <span className="relative z-10">Disparar Agora</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Disparar em Massa", sub: "Automação para 100+ alunos", icon: Users },
                  { title: "Histórico Global", sub: "Logs de envios e recebidos", icon: History },
                ].map((item, i) => (
                  <motion.div 
                      key={i}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, translateY: -8, boxShadow: `0 30px 60px -15px rgba(16,185,129,0.3)` }}
                      className="p-8 rounded-[2.5rem] border-2 border-border bg-surface-1 shadow-xl hover:border-green/40 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Shimmer for Mini Card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    
                    {/* Hover Glow for Mini Card */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 40px #10B9811a` }} />

                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-16 bg-green/10 rounded-2xl flex items-center justify-center border-2 border-green/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <item.icon className="w-8 h-8 text-green relative z-10" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-text-main uppercase tracking-tight group-hover:text-green transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-text-dim font-black uppercase tracking-widest opacity-60 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Sidebar - Templates & Chats */}
          <div className="space-y-8">
            {/* Templates Section */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-[3rem] border-2 border-border bg-surface-1 shadow-2xl hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] transition-all duration-700"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center shadow-inner">
                    <FileText className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="text-base font-black text-text-main uppercase tracking-tight">Templates Master</h3>
                </div>
                <Link href="/configuracoes">
                    <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-green/5 text-green border-2 border-green/20 rounded-xl hover:bg-green hover:text-white transition-all shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    >
                        <Plus className="w-4 h-4" />
                    </motion.button>
                </Link>
              </div>

                <div className="space-y-4">
                  {zapTemplates.map((tpl) => (
                    <motion.div 
                      key={tpl.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectTemplate(tpl.content)}
                      className={cn(
                        "p-6 rounded-[1.8rem] border-2 transition-all duration-500 cursor-pointer group relative overflow-hidden",
                        selectedTemplate === tpl.content 
                          ? "bg-green/10 border-green/50 shadow-[0_15px_30px_rgba(16,185,129,0.2)]" 
                          : "bg-surface-2 border-transparent hover:border-green/30 hover:bg-surface-1 hover:shadow-xl"
                      )}
                    >
                      {/* Shimmer for Template Item */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Hover Glow for Template Item */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px #10B98126` }} />

                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-[11px] font-black text-text-main uppercase tracking-tight group-hover:text-green transition-colors">{tpl.name}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[10px] text-text-dim line-clamp-3 leading-relaxed italic font-medium relative z-10 group-hover:text-text-main transition-colors">{tpl.content}</p>
                      
                      <div className="absolute bottom-0 left-0 h-1 bg-green transition-all duration-500" style={{ width: selectedTemplate === tpl.content ? '100%' : '0%' }} />
                    </motion.div>
                  ))}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-[3rem] border-2 border-border bg-surface-1 shadow-2xl hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] transition-all duration-700"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center shadow-inner">
                    <MessageSquare className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="text-base font-black text-text-main uppercase tracking-tight">Atividade Recente</h3>
                </div>
                <button className="text-[10px] font-black text-text-dim hover:text-green transition-colors uppercase tracking-[0.2em] opacity-80">LOGS</button>
              </div>

                <div className="space-y-5">
                  {recentChats.map((chat) => (
                    <motion.div 
                      key={chat.id} 
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-center justify-between p-5 rounded-[1.8rem] bg-surface-2/30 backdrop-blur-sm border-2 border-transparent transition-all cursor-pointer group hover:border-green/20 hover:shadow-2xl relative overflow-hidden"
                    >
                      {/* Shimmer for Chat Item */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Hover Glow for Chat Item */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 30px #10B98126` }} />

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-background border-2 border-border flex items-center justify-center text-text-dim group-hover:text-green group-hover:border-green/30 transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:rotate-6 shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <User className="w-7 h-7 relative z-10" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-text-main tracking-tight group-hover:text-green transition-colors">{chat.name}</div>
                          <div className="text-[10px] text-text-dim font-bold mt-1 opacity-70 line-clamp-1 group-hover:text-text-main transition-colors">{chat.lastMsg}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 relative z-10">
                        <div className="text-[9px] font-black text-text-dimmer uppercase tracking-widest">{chat.time}</div>
                        <div className="flex gap-0.5">
                          {chat.status === 'read' && (
                              <div className="flex drop-shadow-[0_0_8px_rgba(26,108,247,0.6)]">
                                  <Check className="w-3.5 h-3.5 text-blue-primary" />
                                  <Check className="w-3.5 h-3.5 -ml-1.5 text-blue-primary" />
                              </div>
                          )}
                          {chat.status === 'delivered' && (
                              <div className="flex opacity-50">
                                  <Check className="w-3.5 h-3.5 text-text-dim" />
                                  <Check className="w-3.5 h-3.5 -ml-1.5 text-text-dim" />
                              </div>
                          )}
                          {chat.status === 'sent' && <Check className="w-3.5 h-3.5 text-text-dim opacity-50" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              
              <Button variant="outline" className="w-full mt-8 rounded-[1.5rem] border-2 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green/5 hover:border-green/30 hover:text-green">
                Ver Monitoramento Completo
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function ShieldCircle({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <Shield className="w-full h-full" />
            <div className="absolute w-1.5 h-1.5 bg-current rounded-full" />
        </div>
    )
}
