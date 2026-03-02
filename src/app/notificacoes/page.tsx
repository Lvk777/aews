"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Bell, CheckCircle2, Clock, AlertTriangle, Trash2, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo Aluno Matriculado',
    message: 'Carlos Eduardo finalizou sua matrícula na categoria B.',
    time: 'Há 5 minutos',
    type: 'success',
    read: false
  },
  {
    id: '2',
    title: 'Mensalidade em Atraso',
    message: 'O aluno Ricardo Silva está com a parcela de Fevereiro pendente.',
    time: 'Há 2 horas',
    type: 'alert',
    read: false
  },
  {
    id: '3',
    title: 'Prova Agendada',
    message: 'Exame prático de Maria Oliveira agendado para amanhã às 09:00.',
    time: 'Há 5 horas',
    type: 'info',
    read: true
  },
  {
    id: '4',
    title: 'Manutenção de Veículo',
    message: 'O veículo Placa ABC-1234 precisa de revisão de óleo.',
    time: 'Há 1 dia',
    type: 'warning',
    read: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success("Notificação marcada como lida");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.error("Notificação removida");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Todas as notificações marcadas como lidas");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between gap-6 mb-10">
        <PageHeader 
          icon={Bell} 
          title="Notificações" 
          subtitle="Acompanhe todas as atualizações e alertas do sistema em tempo real."
          accentColor="mint"
        />
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-3 px-6 py-3.5 bg-mint/10 text-mint hover:bg-mint hover:text-white border border-mint/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-mint/5 hover:shadow-mint/30 active:scale-95 group"
        >
          <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> MARCAR TODAS COMO LIDAS
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "p-6 rounded-[2rem] border transition-all duration-500 flex items-start gap-6 group relative overflow-hidden",
                n.read 
                  ? "bg-surface-1/50 border-border opacity-60 grayscale-[0.5]" 
                  : "bg-surface-1 border-border/50 shadow-2xl hover:border-mint/30 hover:shadow-mint/10"
              )}
            >
              {/* Type Indicator */}
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 group-hover:glow-icon transition-all duration-500 flex-shrink-0",
                n.type === 'success' ? "bg-green/10 text-green border-green/20" :
                n.type === 'alert' ? "bg-red/10 text-red border-red/20" :
                n.type === 'warning' ? "bg-orange/10 text-orange border-orange/20" :
                "bg-blue-primary/10 text-blue-primary border-blue-primary/20"
              )}>
                {n.type === 'success' ? <CheckCircle2 className="w-7 h-7" /> :
                 n.type === 'alert' ? <AlertTriangle className="w-7 h-7" /> :
                 n.type === 'warning' ? <Clock className="w-7 h-7" /> :
                 <Bell className="w-7 h-7" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={cn(
                    "text-lg font-black uppercase tracking-tight truncate",
                    !n.read ? "text-text-main" : "text-text-dim"
                  )}>
                    {n.title}
                  </h3>
                  {!n.read && <span className="w-2 h-2 bg-mint rounded-full animate-pulse" />}
                </div>
                <p className="text-sm text-text-dim font-bold leading-relaxed mb-4">{n.message}</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-dim/60">
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {n.time}</span>
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Sistema</span>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                {!n.read && (
                  <button 
                    onClick={() => markAsRead(n.id)}
                    className="p-2.5 rounded-xl bg-surface-2 border border-border text-mint hover:bg-mint hover:text-white transition-all shadow-xl hover:shadow-mint/20"
                    title="Marcar como lida"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(n.id)}
                  className="p-2.5 rounded-xl bg-surface-2 border border-border text-red hover:bg-red hover:text-white transition-all shadow-xl hover:shadow-red/20"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center opacity-40">
            <Bell className="w-20 h-20 mb-6 text-text-dim" />
            <h3 className="text-2xl font-black uppercase tracking-widest">Nenhuma Notificação</h3>
            <p className="text-sm font-bold mt-2">Você está em dia com todos os alertas!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
