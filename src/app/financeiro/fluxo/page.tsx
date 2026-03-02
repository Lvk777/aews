"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { DataTable } from "@/components/ui/DataTable";
import { FormModal } from "@/components/ui/FormModal";
import { DetailModal } from "@/components/ui/DetailModal";
import { DollarSign, TrendingUp, TrendingDown, Wallet, AlertCircle, Calendar, ArrowRight, UserPlus, PlusCircle, MinusCircle, LayoutGrid } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Inadimplente {
  id: number;
  aluno: string;
  cpf: string;
  valor: number;
  vencimento: string;
  dias: number;
  tel: string;
}

const mockInadimplentes: Inadimplente[] = [
  { id: 1, aluno: "Juliana Lima", cpf: "987.654.321-11", valor: 350, vencimento: "10/02/2026", dias: 17, tel: "(31) 97777-6666" },
  { id: 2, aluno: "Mateus Silva", cpf: "111.222.333-44", valor: 120, vencimento: "15/02/2026", dias: 12, tel: "(31) 98888-9999" },
  { id: 3, aluno: "Aline Ferreira", cpf: "555.666.777-88", valor: 550, vencimento: "20/02/2026", dias: 7, tel: "(31) 96666-3333" },
];

export default function FluxoCaixaPage() {
  const [selectedInadimplente, setSelectedInadimplente] = useState<Inadimplente | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [isNewExitModalOpen, setIsNewExitModalOpen] = useState(false);

  const columns = [
    { header: "Aluno", accessor: "aluno", className: "min-w-[150px]" },
    { 
      header: "Valor Devendo", 
      accessor: "valor",
      render: (row: Inadimplente) => (
        <span className="text-sm font-black text-red font-mono">
          {formatCurrency(row.valor)}
        </span>
      )
    },
    { header: "Vencimento", accessor: "vencimento" },
    { 
      header: "Atraso", 
      accessor: "dias",
      render: (row: Inadimplente) => (
        <span className="px-3 py-1 rounded-full bg-red/10 text-red text-[10px] font-black uppercase tracking-widest">
          {row.dias} dias
        </span>
      )
    },
    { header: "Telefone", accessor: "tel", className: "text-text-dim" },
  ];

  const handleCobrancaAutomatica = () => {
    toast.success("Iniciando cobrança automática via WhatsApp e E-mail para todos os inadimplentes!", {
      description: "O sistema enviará os lembretes em instantes.",
      duration: 5000,
    });
  };

  const handleGenericSubmit = (data: Record<string, string | File>) => {
    console.log("Submit:", data);
    toast.success("Registro salvo com sucesso!", {
        description: "Os dados foram atualizados no sistema.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <PageHeader 
          icon={DollarSign} 
          title="Fluxo de Caixa" 
          subtitle="Acompanhamento detalhado do saldo, previsões e contas a receber."
          accentColor="gold"
        />

        <div className="flex flex-wrap items-center gap-4">
           <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-surface-1 text-text-main hover:bg-surface-2 border border-border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-navy/5 active:scale-95 group"
          >
            <LayoutGrid className="w-4 h-4 group-hover:rotate-45 transition-transform" /> CADASTRAR
          </button>
<button 
  onClick={() => setIsNewEntryModalOpen(true)}
  className="flex items-center gap-3 px-6 py-3.5 bg-green/10 text-green hover:bg-green hover:text-white border border-green/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-green/5 hover:shadow-green/30 active:scale-95 group"
>
  <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" /> NOVA ENTRADA
</button>

          <button 
            onClick={() => setIsNewExitModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-red/10 text-red hover:bg-red hover:text-white border border-red/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-red/5 hover:shadow-red/30 active:scale-95 group"
          >
            <MinusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" /> NOVA SAÍDA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="hover:scale-[1.02] transition-all duration-500">
          <KPICard 
            label="Total Entradas" 
            value={formatCurrency(14250)} 
            icon={TrendingUp} 
            trend={18} 
            color="green" 
            delay={0.1}
          />
        </div>
        <div className="hover:scale-[1.02] transition-all duration-500">
          <KPICard 
            label="Total Saídas" 
            value={formatCurrency(8420)} 
            icon={TrendingDown} 
            trend={10} 
            color="red" 
            delay={0.2}
          />
        </div>
        <div className="hover:scale-[1.02] transition-all duration-500">
          <KPICard 
            label="Saldo Atual" 
            value={formatCurrency(5830)} 
            icon={Wallet} 
            trend={22} 
            color="gold" 
            delay={0.3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl relative overflow-hidden group hover:shadow-red/10 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-red/10 text-red flex items-center justify-center border border-red/20 shadow-xl shadow-red/20">
                <AlertCircle className="w-8 h-8 glow-icon animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-main group-hover:text-red transition-colors uppercase tracking-tight">Inadimplentes</h3>
                <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Alunos com pagamentos em atraso</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-2xl bg-surface-2 text-text-dim hover:text-red transition-all border border-border text-[10px] font-black uppercase tracking-widest active:scale-95">
              Ver Todos
            </button>
          </div>

            <div className="mb-10">
              <DataTable columns={columns} data={mockInadimplentes} accentColor="red" onRowClick={(row) => setSelectedInadimplente(row as Inadimplente)} />
            </div>
            
            <DetailModal 
              isOpen={!!selectedInadimplente} 
              onClose={() => setSelectedInadimplente(null)}
              title={selectedInadimplente?.aluno}
              subtitle="Detalhes da Pendência"
              accentColor="red"
              data={selectedInadimplente ? {
                "Nome do Aluno": selectedInadimplente.aluno,
                "CPF": selectedInadimplente.cpf,
                "Telefone para Contato": selectedInadimplente.tel,
                "Valor Total em Atraso": formatCurrency(selectedInadimplente.valor),
                "Data de Vencimento": selectedInadimplente.vencimento,
                "Dias de Atraso": `${selectedInadimplente.dias} dias`,
                "Status Financeiro": "INADIMPLENTE",
              } : {}}
            />
            
            <div className="p-8 rounded-[2rem] bg-red/5 border border-red/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-4xl font-black text-red tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">R$ 1.020,00</div>
              <div className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-50">Total em Atraso</div>
            </div>
            <button 
                onClick={handleCobrancaAutomatica}
                className="w-full sm:w-auto px-8 py-5 rounded-[1.5rem] bg-red text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-red/30 flex items-center justify-center gap-4 hover:scale-[1.05] active:scale-95 transition-all group"
            >
              COBRANÇA AUTOMÁTICA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform stroke-[3px]" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl group hover:shadow-blue-primary/10 transition-all duration-500"
        >
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-primary/10 text-blue-primary flex items-center justify-center border border-blue-primary/20 shadow-xl shadow-blue-primary/20">
              <Calendar className="w-8 h-8 glow-icon" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-text-main group-hover:text-blue-primary transition-colors uppercase tracking-tight">Previsão de Recebíveis</h3>
              <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Estimativa para os próximos 30 dias</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: "Março / 2026", value: 12500, status: "Alta", color: "mint" },
              { label: "Abril / 2026", value: 8900, status: "Média", color: "gold" },
              { label: "Maio / 2026", value: 4200, status: "Baixa", color: "blue-light" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-surface-2 border border-border hover:bg-surface-1 hover:border-blue-primary/20 transition-all cursor-pointer group/item flex items-center justify-between shadow-sm hover:shadow-xl">
                <div>
                  <div className="text-lg font-black text-text-main group-hover/item:text-blue-primary transition-colors tracking-tight uppercase">{item.label}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border shadow-sm",
                      item.color === 'mint' ? 'bg-green/10 text-green border-green/20' :
                      item.color === 'gold' ? 'bg-gold/10 text-gold border-gold/20' :
                      'bg-blue-light/10 text-blue-light border-blue-light/20'
                    )}>
                      Expectativa {item.status}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-black text-text-main font-mono tracking-tighter tabular-nums">{formatCurrency(item.value)}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-[2.5rem] bg-green/5 border border-green/10 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden group/total">
            <div className="relative z-10">
                <div className="text-4xl font-black text-green tracking-tighter drop-shadow-[0_0_15px_rgba(46,213,115,0.3)] group-hover/total:scale-110 transition-transform duration-500">R$ 25.600,00</div>
                <div className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mt-2 opacity-60">VGV Total Contratado</div>
                <div className="w-full max-w-[200px] h-2.5 rounded-full bg-navy-3 mt-6 overflow-hidden mx-auto border border-white/5">
                <div className="h-full w-2/3 bg-green shadow-[0_0_15px_#2ed573] animate-pulse" />
                </div>
            </div>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover/total:opacity-10 transition-all duration-700">
                <TrendingUp className="w-24 h-24 text-green" />
            </div>
          </div>
        </motion.div>
      </div>

      <FormModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Novo Registro"
        subtitle="Cadastro Geral do Sistema"
        accentColor="blue"
        fields={[
          { label: "Nome do Registro", name: "nome", type: "text", placeholder: "Ex: Matrícula #001" },
          { label: "Tipo de Registro", name: "tipo", type: "select", options: [
            { label: "Aluno", value: "aluno" },
            { label: "Instrutor", value: "instrutor" },
            { label: "Veículo", value: "veiculo" },
            { label: "Documento", value: "documento" }
          ]},
          { label: "Data de Início", name: "data", type: "date" },
          { label: "Observações", name: "obs", type: "textarea", placeholder: "Informações adicionais..." }
        ]}
        onSubmit={handleGenericSubmit}
      />

      <FormModal 
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        title="Novo Usuário"
        subtitle="Acesso ao Painel"
        accentColor="blue"
        fields={[
          { label: "Nome Completo", name: "nome", type: "text", placeholder: "Ex: João Silva" },
          { label: "E-mail de Acesso", name: "email", type: "text", placeholder: "joao@exemplo.com" },
          { label: "Cargo / Permissão", name: "cargo", type: "select", options: [
            { label: "Administrador", value: "admin" },
            { label: "Secretaria", value: "secretaria" },
            { label: "Financeiro", value: "financeiro" }
          ]},
          { label: "Senha Inicial", name: "senha", type: "text", placeholder: "Mínimo 8 caracteres" }
        ]}
        onSubmit={handleGenericSubmit}
      />

      <FormModal 
        isOpen={isNewEntryModalOpen}
        onClose={() => setIsNewEntryModalOpen(false)}
        title="Registrar Entrada"
        subtitle="Fluxo de Caixa / Recebimento"
        accentColor="green"
        fields={[
          { label: "Descrição", name: "desc", type: "text", placeholder: "Ex: Parcela Mariana Silva" },
          { label: "Valor", name: "valor", type: "number", placeholder: "0,00" },
          { label: "Forma de Pagamento", name: "forma", type: "select", options: [
            { label: "PIX", value: "pix" },
            { label: "Dinheiro", value: "dinheiro" },
            { label: "Cartão de Crédito", value: "cartao" },
            { label: "Boleto", value: "boleto" }
          ]},
          { label: "Data do Recebimento", name: "data", type: "date" }
        ]}
        onSubmit={handleGenericSubmit}
      />

      <FormModal 
        isOpen={isNewExitModalOpen}
        onClose={() => setIsNewExitModalOpen(false)}
        title="Registrar Saída"
        subtitle="Fluxo de Caixa / Despesa"
        accentColor="red"
        fields={[
          { label: "Descrição da Despesa", name: "desc", type: "text", placeholder: "Ex: Pagamento Energisa" },
          { label: "Valor", name: "valor", type: "number", placeholder: "0,00" },
          { label: "Categoria", name: "cat", type: "select", options: [
            { label: "Custos Fixos", value: "fixos" },
            { label: "Manutenção", value: "manutencao" },
            { label: "Marketing", value: "marketing" },
            { label: "Outros", value: "outros" }
          ]},
          { label: "Data do Vencimento", name: "data", type: "date" }
        ]}
        onSubmit={handleGenericSubmit}
      />
    </DashboardLayout>
  );
}
