"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ProximasProvas } from "@/components/dashboard/ProximasProvas";
import { StatusDonut } from "@/components/dashboard/StatusDonut";
import { FormModal } from "@/components/ui/FormModal";
import { 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  Star, 
  CheckCircle2,
  TrendingUp,
  DollarSign,
  PlusCircle,
  MinusCircle,
  StickyNote,
  Trophy,
  Target,
  Rocket,
  Crown
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { useSettings } from "@/components/SettingsProvider";

export default function DashboardPage() {
  const { accentColor } = useSettings();
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  
  const useGlobal = accentColor !== null;

  const handleAddReminder = (data: Record<string, string | File>) => {
    console.log("Novo Lembrete:", data);
    alert("Lembrete salvo com sucesso!");
  };

  const handleAddExpense = (data: Record<string, string | File>) => {
    console.log("Nova Saída:", data);
    alert("Saída registrada com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <PageHeader 
          icon={LayoutDashboard} 
          title="Painel Administrativo" 
          subtitle="Bem-vindo de volta! Aqui está um resumo completo da sua autoescola em tempo real."
          accentColor="mint"
        />
        
        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setIsReminderModalOpen(true)}
            className={cn("flex items-center gap-2.5 px-5 py-2.5 border-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 group", 
              useGlobal ? "bg-primary-main/10 text-primary-main hover:bg-primary-main hover:text-white border-primary-main/20 shadow-primary-glow hover:shadow-primary-glow" : "bg-blue-primary/10 text-blue-primary hover:bg-blue-primary hover:text-white border-blue-primary/20 shadow-blue-primary/5 hover:shadow-blue-primary/30")}
          >
            <StickyNote className="w-4 h-4 group-hover:rotate-12 transition-transform" /> NOVO LEMBRETE
          </button>
          <button 
            onClick={() => setIsExpenseModalOpen(true)}
            className={cn("flex items-center gap-2.5 px-5 py-2.5 border-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 group", 
              useGlobal ? "bg-primary-main/10 text-primary-main hover:bg-primary-main hover:text-white border-primary-main/20 shadow-primary-glow hover:shadow-primary-glow" : "bg-red/10 text-red hover:bg-red hover:text-white border-red/20 shadow-red/5 hover:shadow-red/30")}
          >
            <MinusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" /> REGISTRAR SAÍDA
          </button>
          <Link href="/financeiro/entradas">
            <button className={cn("flex items-center gap-2.5 px-5 py-2.5 border-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 group", 
              useGlobal ? "bg-primary-main/10 text-primary-main hover:bg-primary-main hover:text-white border-primary-main/20 shadow-primary-glow hover:shadow-primary-glow" : "bg-green/10 text-green hover:bg-green hover:text-white border-green/20 shadow-green/5 hover:shadow-green/30")}>
              <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" /> NOVA ENTRADA
            </button>
          </Link>
        </div>

    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      <KPICard 
        label="Alunos na Semana" 
        value="48" 
        icon={Users} 
        trend={12} 
        color="blue" 
        delay={0.1}
        href="/alunos"
      />
      <KPICard 
        label="Inadimplentes" 
        value="07" 
        icon={AlertCircle} 
        trend={-5} 
        color="red" 
        delay={0.2}
        href="/financeiro/fluxo"
      />
      <KPICard 
        label="Alunos VIP" 
        value="12" 
        icon={Star} 
        trend={8} 
        color="gold" 
        delay={0.3}
        href="/alunos"
      />
      <KPICard 
        label="Quitados" 
        value="31" 
        icon={CheckCircle2} 
        trend={15} 
        color="green" 
        delay={0.4}
        href="/financeiro/entradas"
      />
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-stretch">
      <div className="lg:col-span-2">
        <RevenueChart />
      </div>
      <div className="lg:col-span-1">
        <StatusDonut />
      </div>
    </div>

    {/* Categories and Next Exams */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("p-6 rounded-2xl border bg-surface-1 shadow-2xl group transition-all duration-700 relative overflow-hidden", 
                useGlobal ? "border-primary-main/20 hover:shadow-primary-glow hover:border-primary-main/30 hover:scale-[1.02]" : "border-border hover:shadow-mint/20 hover:border-mint/30 hover:scale-[1.02]")}
              style={useGlobal ? { boxShadow: `0 0 20px var(--primary-glow)` } : {}}
            >
              {/* Background Icon */}
              <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
                  <Target className={cn("w-64 h-64", useGlobal ? "text-primary-main" : "text-mint")} />
              </div>

              <h3 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-60 relative z-10 transition-colors", useGlobal ? "text-primary-main group-hover:text-primary-main" : "text-text-dim group-hover:text-mint")}>
                Distribuição Categorias
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { cat: 'A', color: 'text-mint', bg: 'bg-mint/10', border: 'border-mint/30', shadow: 'hover:shadow-mint/40', icon: Rocket },
                  { cat: 'B', color: 'text-blue-primary', bg: 'bg-blue-primary/10', border: 'border-blue-primary/30', shadow: 'hover:shadow-blue-primary/40', icon: Trophy },
                  { cat: 'D', color: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/30', shadow: 'hover:shadow-orange/40', icon: Crown },
                  { cat: 'E', color: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/30', shadow: 'hover:shadow-purple/40', icon: Star }
                ].map((item, i) => (
                  <div key={item.cat} 
                    className={cn("p-5 rounded-xl bg-surface-2 border-2 flex flex-col items-center justify-center group/cat hover:bg-surface-1 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-3xl shadow-xl", 
                      useGlobal ? "border-primary-main/20 hover:shadow-primary-glow" : cn(item.border, item.shadow))}
                    style={useGlobal ? { boxShadow: `0 0 15px var(--primary-glow)` } : {}}
                  >
                    <div className={cn("text-2xl font-black transition-all duration-500 group-hover/cat:scale-110 drop-shadow-2xl", useGlobal ? "text-primary-main" : item.color)}>{item.cat}</div>
                    <div className="mt-3 text-xl font-black text-text-main tabular-nums tracking-tighter">{i * 15 + 10}</div>
                    <item.icon className={cn("w-3.5 h-3.5 mt-2 opacity-40 group-hover/cat:opacity-100 transition-all", useGlobal ? "text-primary-main" : item.color)} />
                  </div>
                ))}
              </div>
            </motion.div>

        
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className={cn("p-6 rounded-2xl border-2 bg-surface-1 shadow-2xl group transition-all duration-700 hover:scale-[1.01] overflow-hidden relative", 
             useGlobal ? "border-primary-main/30 hover:shadow-primary-glow hover:border-primary-main/50" : "border-green/30 hover:shadow-green/40 hover:border-green/50")}
           style={useGlobal ? { boxShadow: `0 0 20px var(--primary-glow)` } : {}}
        >
          <div className="relative z-10">
            <h3 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60 transition-colors", useGlobal ? "text-primary-main group-hover:text-primary-main" : "text-text-dim group-hover:text-green")}>
              Saldo de Caixa
            </h3>
            <div className={cn("text-3xl font-black tracking-tighter group-hover:scale-105 transition-all duration-700 font-mono", useGlobal ? "text-primary-main drop-shadow-primary-glow" : "text-green drop-shadow-[0_0_15px_rgba(46,213,115,0.4)]")}>R$ 14.250,00</div>
            <div className={cn("flex items-center gap-3 mt-5 text-[9px] font-black uppercase tracking-[0.15em] p-2.5 rounded-xl inline-flex border-2 shadow-xl shadow-green/5", 
              useGlobal ? "bg-primary-main/10 text-primary-main border-primary-main/20" : "bg-green/10 text-green border-green/20")}>
              <TrendingUp className={cn("w-3.5 h-3.5 group-hover:animate-bounce", useGlobal ? "text-primary-main" : "text-green")} /> 
              <span>+15.2%</span> <span className="text-text-dim opacity-50 ml-1">vencendo metas</span>
            </div>
          </div>
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
            <DollarSign className={cn("w-24 h-24", useGlobal ? "text-primary-main" : "text-green")} />
          </div>
          <div className={cn("absolute -bottom-20 -left-20 w-80 h-80 blur-[80px] rounded-full pointer-events-none transition-all duration-1000", 
            useGlobal ? "bg-primary-main/10 group-hover:bg-primary-main/20" : "bg-green/10 group-hover:bg-green/20")} />
        </motion.div>
      </div>
      
      <div className="lg:col-span-2">
        <ProximasProvas />
      </div>
    </div>

    <FormModal 
      isOpen={isReminderModalOpen}
      onClose={() => setIsReminderModalOpen(false)}
      title="Novo Lembrete"
      subtitle="Adicionar Nota Rápida ao Sistema"
      accentColor="blue"
      fields={[
        { label: "O que precisa ser lembrado?", name: "titulo", type: "text", placeholder: "Ex: Reunião com diretoria DETRAN" },
          { label: "Data Limite", name: "data", type: "date" },
          { label: "Nível de Prioridade", name: "prioridade", type: "select", options: [
            { label: "Prioridade Crítica", value: "alta" },
            { label: "Prioridade Moderada", value: "media" },
            { label: "Apenas Informativo", value: "baixa" }
          ]},
          { label: "Detalhes Adicionais", name: "descricao", type: "textarea", placeholder: "Descreva o lembrete em detalhes..." }
        ]}
        onSubmit={handleAddReminder}
      />

      <FormModal 
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        title="Registrar Saída"
        subtitle="Fluxo Financeiro de Despesas"
        accentColor="red"
        fields={[
          { label: "Descrição da Operação", name: "descricao", type: "text", placeholder: "Ex: Pagamento Fornecedor Combustível" },
          { label: "Valor da Saída (R$)", name: "valor", type: "number", placeholder: "0,00" },
          { label: "Data do Vencimento", name: "data", type: "date" },
          { label: "Categoria de Custo", name: "categoria", type: "select", options: [
            { label: "Custos Operacionais Fixos", value: "fixos" },
            { label: "Manutenção de Frota", value: "manutencao" },
            { label: "Impostos e Taxas Federais", value: "impostos" },
            { label: "Outras Despesas Variáveis", value: "outros" }
          ]},
          { label: "Observações do Lançamento", name: "obs", type: "textarea" }
        ]}
        onSubmit={handleAddExpense}
      />
    </DashboardLayout>
  );
}
