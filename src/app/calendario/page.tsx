"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Users, 
  Car, 
  DollarSign,
  AlertCircle,
  Trash2,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FormModal } from "@/components/ui/FormModal";

interface Event {
  id: number;
  date: string;
  time: string;
  title: string;
  type: "prova" | "aula" | "financeiro" | "manutencao";
  description?: string;
}

const initialEvents: Event[] = [
  { id: 1, date: "2026-02-27", time: "09:00", title: "Prova Prática B - Mariana Silva", type: "prova", description: "DETRAN - Local X" },
  { id: 2, date: "2026-02-27", time: "14:00", title: "Aula Teórica - Turma Manhã", type: "aula", description: "Sala 02" },
  { id: 3, date: "2026-02-28", time: "10:00", title: "Pagamento Aluguel Sede", type: "financeiro", description: "Imobiliária Central" },
  { id: 4, date: "2026-03-02", time: "08:30", title: "Prova Teórica A - João Carlos", type: "prova", description: "Sede" },
  { id: 5, date: "2026-03-05", time: "11:00", title: "Revisão Ford Ka (ABC-1234)", type: "manutencao", description: "Oficina do Toninho" },
];

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(new Date().toISOString().split('T')[0]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = events.filter(e => e.date === dateStr);
    
    return { day, isCurrentMonth, dateStr, events: dayEvents };
  });

  const selectedDayEvents = events.filter(e => e.date === selectedDay).sort((a, b) => a.time.localeCompare(b.time));

  const handleAddEvent = (data: Record<string, string | File>) => {
    const newEvent: Event = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      date: data.date as string,
      time: data.time as string,
      title: data.titulo as string,
      type: data.tipo as "prova" | "aula" | "financeiro" | "manutencao",
      description: data.descricao as string
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const removeEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <PageHeader 
          icon={CalendarIcon} 
          title="Agenda e Calendário" 
          subtitle="Gerencie aulas, provas e compromissos da autoescola."
          accentColor="purple"
        />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-purple text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple/30 hover:shadow-purple/50 active:scale-95 transition-all group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform stroke-[3px]" /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Calendar Grid */}
        <div className="xl:col-span-2 space-y-8">
           <div className="p-10 rounded-[3rem] border border-border bg-surface-1 shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-purple/10 text-purple flex items-center justify-center border border-purple/20 shadow-xl shadow-purple/20">
                    <CalendarIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-text-main capitalize tracking-tighter">{monthName}</h3>
                    <p className="text-[11px] text-text-dim font-black uppercase tracking-[0.3em] opacity-60 mt-1">{year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={prevMonth} className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-text-dim hover:text-text-main hover:border-purple/30 transition-all active:scale-90">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={() => setCurrentDate(new Date())} className="px-6 py-3 rounded-2xl bg-surface-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-dim hover:text-purple border border-border transition-all active:scale-90">
                    Hoje
                  </button>
                  <button onClick={nextMonth} className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-text-dim hover:text-text-main hover:border-purple/30 transition-all active:scale-90">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
                  <div key={d} className="text-center text-[11px] font-black text-text-dim uppercase tracking-[0.2em] py-4 opacity-50">
                    {d}
                  </div>
                ))}
                {days.map((d, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: d.isCurrentMonth ? 1.05 : 1 }}
                    onClick={() => d.isCurrentMonth && setSelectedDay(d.dateStr)}
                    className={cn(
                      "aspect-square rounded-[2rem] p-4 flex flex-col items-center justify-between transition-all relative border-2",
                      !d.isCurrentMonth ? "opacity-0 pointer-events-none" : 
                      selectedDay === d.dateStr ? "bg-purple text-white border-purple shadow-2xl shadow-purple/40" : 
                      "bg-surface-2 border-transparent hover:border-purple/30 hover:bg-surface-1 cursor-pointer"
                    )}
                  >
                    <span className={cn("text-lg font-black", selectedDay === d.dateStr ? "text-white" : "text-text-main")}>
                      {d.day}
                    </span>
                    
                    <div className="flex flex-wrap gap-1.5 justify-center mt-auto">
                      {d.events.slice(0, 4).map((e, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "w-2 h-2 rounded-full shadow-sm ring-2 ring-white/10",
                            e.type === 'prova' ? "bg-red" : e.type === 'aula' ? "bg-mint" : e.type === 'financeiro' ? "bg-gold" : "bg-purple-300"
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>

        {/* Selected Day Events */}
        <div className="space-y-8">
          <div className="p-10 rounded-[3rem] border border-border bg-surface-1 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-text-main uppercase tracking-tighter">Eventos do Dia</h3>
              <div className="px-4 py-2 bg-purple/10 text-purple text-[10px] font-black uppercase tracking-widest rounded-xl border border-purple/20">
                {selectedDay ? new Date(selectedDay).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }) : 'Selecione um dia'}
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide min-h-[500px]">
              <AnimatePresence mode="popLayout">
                {selectedDayEvents.map((e) => (
                  <motion.div 
                    key={e.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 rounded-[2rem] bg-surface-2 border border-border hover:border-purple/30 hover:shadow-xl transition-all group/event"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center",
                           e.type === 'prova' ? "bg-red/10 text-red" : 
                           e.type === 'aula' ? "bg-mint/10 text-mint" : 
                           e.type === 'financeiro' ? "bg-gold/10 text-gold" : 
                           "bg-purple/10 text-purple"
                         )}>
                            {e.type === 'prova' ? <AlertCircle className="w-5 h-5" /> : 
                             e.type === 'aula' ? <Users className="w-5 h-5" /> : 
                             e.type === 'financeiro' ? <DollarSign className="w-5 h-5" /> : 
                             <Car className="w-5 h-5" />}
                         </div>
                         <div className="text-xs font-black text-text-main uppercase tracking-widest">{e.time}</div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover/event:opacity-100 transition-all">
                        <button className="p-2 hover:bg-surface-1 rounded-lg text-text-dim transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeEvent(e.id)} className="p-2 hover:bg-red/10 hover:text-red rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-sm font-black text-text-main mb-2 uppercase tracking-tight">{e.title}</h4>
                    {e.description && <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest opacity-60 leading-relaxed">{e.description}</p>}
                  </motion.div>
                ))}
              </AnimatePresence>

              {selectedDayEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                  <CalendarIcon className="w-16 h-16 mb-6 stroke-[1px]" />
                  <p className="text-xs font-black uppercase tracking-widest">Nenhum evento agendado para este dia.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Agendamento"
        subtitle="Adicionar à Agenda"
        accentColor="purple"
        fields={[
          { label: "Título do Compromisso", name: "titulo", type: "text", placeholder: "Ex: Prova Mariana Silva" },
          { label: "Data", name: "date", type: "date" },
          { label: "Horário", name: "time", type: "text", placeholder: "09:00" },
          { label: "Tipo de Evento", name: "tipo", type: "select", options: [
            { label: "Prova Prática/Teórica", value: "prova" },
            { label: "Aula Prática/Teórica", value: "aula" },
            { label: "Compromisso Financeiro", value: "financeiro" },
            { label: "Manutenção Veicular", value: "manutencao" }
          ]},
          { label: "Descrição Adicional", name: "descricao", type: "textarea", placeholder: "Local, observações, etc..." }
        ]}
        onSubmit={handleAddEvent}
      />
    </DashboardLayout>
  );
}
