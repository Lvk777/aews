"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { StickyNote, Plus, Clock, Star, Calendar, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FormModal } from "@/components/ui/FormModal";

const initialNotas = [
  "Ligar para Marcos Pardim sobre o novo veículo Gol 2024.",
  "Verificar documentação da aluna Mariana Silva no DETRAN.",
  "Enviar lembrete de aula prática para os alunos da turma da manhã.",
  "Solicitar orçamento de novos materiais para a recepção.",
  "Agendar manutenção preventiva do Ford Ka (ABC-1234).",
];

const initialLembretes = [
  { id: 1, data: "2026-02-28", texto: "Reunião administrativa semanal", prioridade: "Alta", feito: false },
  { id: 2, data: "2026-03-01", texto: "Vencimento taxas de licenciamento", prioridade: "Média", feito: false },
  { id: 3, data: "2026-03-02", texto: "Treinamento novos instrutores", prioridade: "Alta", feito: true },
  { id: 4, data: "2026-03-05", texto: "Compra de materiais de escritório", prioridade: "Baixa", feito: false },
  { id: 5, data: "2026-03-10", texto: "Confraternização mensal equipe", prioridade: "Média", feito: false },
];

export default function BlocoNotasPage() {
  const [notas, setNotas] = useState(initialNotas);
  const [lembretes, setLembretes] = useState(initialLembretes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  const toggleFeito = (id: number) => {
    setLembretes(prev => prev.map(l => l.id === id ? { ...l, feito: !l.feito } : l));
  };

  const removeLembrete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLembretes(prev => prev.filter(l => l.id !== id));
  };

  const removeNota = (index: number) => {
    setNotas(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLembrete = (data: Record<string, string | File>) => {
    const lembrete = {
      id: Math.max(...lembretes.map(l => l.id), 0) + 1,
      texto: data.texto as string,
      data: data.data as string,
      prioridade: data.prioridade as string,
      feito: false
    };
    setLembretes(prev => [lembrete, ...prev]);
  };

  const handleAddNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotas(prev => [newNote, ...prev]);
      setNewNote("");
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        icon={StickyNote} 
        title="Bloco de Notas" 
        subtitle="Organize suas ideias, lembretes rápidos e tarefas diárias."
        accentColor="gold"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Quick Notes Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-[2.5rem] border border-gold/20 bg-surface-1 shadow-2xl group"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gold/10 text-gold flex items-center justify-center border border-gold/20 shadow-xl shadow-gold/20">
                <Star className="w-8 h-8 glow-icon" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-main group-hover:text-gold transition-colors uppercase tracking-tight">Notas Rápidas</h3>
                <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Ideias e rascunhos</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddNota} className="mb-8">
            <div className="relative group/input">
               <input 
                type="text" 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escreva uma nota rápida e pressione Enter..." 
                className="w-full p-6 bg-surface-2 border border-border rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold/30 outline-none text-sm font-bold text-text-main transition-all pr-20"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gold text-white rounded-xl shadow-lg shadow-gold/20 hover:scale-110 active:scale-90 transition-all"
              >
                <Plus className="w-5 h-5 stroke-[3px]" />
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            <AnimatePresence>
              {notas.map((nota, i) => (
                <motion.div 
                  key={nota + i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "p-6 rounded-2xl text-sm font-bold border transition-all flex items-center justify-between group/note",
                    "bg-surface-2 border-border hover:bg-gold/5 hover:border-gold/20 hover:text-gold shadow-sm hover:shadow-xl"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold/30 group-hover/note:bg-gold transition-all group-hover/note:scale-150 shadow-[0_0_8px_rgba(255,191,0,0.5)]" />
                    {nota}
                  </div>
                  <button 
                    onClick={() => removeNota(i)}
                    className="p-2 opacity-0 group-hover/note:opacity-100 hover:bg-red/10 hover:text-red rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {notas.length === 0 && (
              <div className="p-10 text-center border-2 border-dashed border-border rounded-2xl text-text-dimmer font-bold italic">
                Nenhuma nota rápida encontrada.
              </div>
            )}
          </div>
        </motion.div>

        {/* Lembretes Datados Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-10 rounded-[2.5rem] border border-blue-primary/20 bg-surface-1 shadow-2xl group"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-primary/10 text-blue-primary flex items-center justify-center border border-blue-primary/20 shadow-xl shadow-blue-primary/20">
                <Calendar className="w-8 h-8 glow-icon" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-main group-hover:text-blue-primary transition-colors uppercase tracking-tight">Lembretes Datados</h3>
                <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Tarefas agendadas</p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-4 rounded-2xl bg-blue-primary text-white hover:scale-110 active:scale-95 transition-all shadow-xl shadow-blue-primary/30"
            >
              <Plus className="w-6 h-6 stroke-[3px]" />
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            <AnimatePresence>
              {lembretes.map((l) => (
                <motion.div 
                  key={l.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group/item",
                    l.feito ? "bg-surface-2 border-border opacity-50" : "bg-surface-2 border-border hover:bg-surface-1 hover:border-blue-primary/30 hover:shadow-2xl hover:translate-x-1"
                  )}
                  onClick={() => toggleFeito(l.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500",
                      l.feito ? "bg-green border-green text-white" : "border-border hover:border-green group-hover/item:border-green/50"
                    )}>
                      {l.feito ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4 text-transparent" />}
                    </div>
                    <div>
                      <div className={cn(
                        "text-base font-black transition-all tracking-tight",
                        l.feito ? "line-through text-text-dimmer" : "text-text-main group-hover/item:text-blue-primary"
                      )}>
                        {l.texto}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-[0.15em] opacity-60 bg-navy-3 px-2 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5" /> {new Date(l.data).toLocaleDateString('pt-BR')}
                        </div>
                        <div className={cn(
                          "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border shadow-sm",
                          l.prioridade === 'Alta' ? 'bg-red/10 text-red border-red/20' :
                          l.prioridade === 'Média' ? 'bg-orange/10 text-orange border-orange/20' :
                          'bg-blue-light/10 text-blue-light border-blue-light/20'
                        )}>
                          {l.prioridade}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => removeLembrete(l.id, e)}
                    className="p-3 opacity-0 group-hover/item:opacity-100 hover:bg-red/10 hover:text-red rounded-xl transition-all hover:rotate-12 active:scale-90"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {lembretes.length === 0 && (
              <div className="p-16 text-center border-2 border-dashed border-border rounded-[2rem] text-text-dimmer font-black italic opacity-50">
                Nenhum lembrete datado pendente.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <FormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Lembrete"
        subtitle="Agendamento de Tarefa"
        accentColor="blue"
        fields={[
          { label: "O que precisa ser feito?", name: "texto", type: "text", placeholder: "Ex: Comprar pneus novos para o Gol" },
          { label: "Para quando?", name: "data", type: "date" },
          { label: "Qual a urgência?", name: "prioridade", type: "select", options: [
            { label: "Alta", value: "Alta" },
            { label: "Média", value: "Média" },
            { label: "Baixa", value: "Baixa" }
          ]}
        ]}
        onSubmit={handleAddLembrete}
      />
    </DashboardLayout>
  );
}
