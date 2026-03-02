"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { DataTable } from "@/components/ui/DataTable";
import { FormModal } from "@/components/ui/FormModal";
import { DetailModal } from "@/components/ui/DetailModal";
import { 
  Shield, 
  Users, 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Mail,
  Key,
  Trash2,
  MoreVertical,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface LoginRequest {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  motivo: string;
  data: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

const mockRequests: LoginRequest[] = [
  { id: 1, nome: "Carlos Alberto", email: "carlos@exemplo.com", cargo: "Instrutor", motivo: "Necessito de acesso para lançar notas das aulas práticas.", data: "01/03/2026", status: 'pendente' },
  { id: 2, nome: "Fernanda Lima", email: "fernanda@exemplo.com", cargo: "Secretária", motivo: "Acesso para agendamento de provas.", data: "02/03/2026", status: 'pendente' },
];

const mockUsers = [
  { id: 1, nome: "Admin Master", email: "admin@autoescola.com", cargo: "Administrador", status: "Ativo" },
  { id: 2, nome: "João Silva", email: "joao@autoescola.com", cargo: "Financeiro", status: "Ativo" },
  { id: 3, nome: "Maria Santos", email: "maria@autoescola.com", cargo: "Secretaria", status: "Ativo" },
];

export default function SalaAdminPage() {
  const [requests, setRequests] = useState<LoginRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<LoginRequest | null>(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const handleApprove = (request: LoginRequest) => {
    toast.success("Solicitação Aprovada!", {
      description: `Um e-mail com usuário e senha foi enviado para ${request.email}.`,
      duration: 5000,
    });
    setRequests(requests.filter(r => r.id !== request.id));
    setSelectedRequest(null);
  };

  const handleReject = (request: LoginRequest) => {
    toast.error("Solicitação Rejeitada", {
      description: `O pedido de acesso de ${request.nome} foi descartado.`,
    });
    setRequests(requests.filter(r => r.id !== request.id));
    setSelectedRequest(null);
  };

  const handleCreateUser = (data: Record<string, string | File>) => {
    console.log("Novo Usuário:", data);
    toast.success("Usuário Criado com Sucesso!", {
        description: `O acesso para ${data.nome} foi configurado no sistema.`,
    });
  };

  const requestColumns = [
    { header: "Nome", accessor: "nome", className: "min-w-[150px]" },
    { header: "Cargo", accessor: "cargo" },
    { header: "Data", accessor: "data" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: LoginRequest) => (
        <span className="px-3 py-1 rounded-full bg-blue-primary/10 text-blue-primary text-[10px] font-black uppercase tracking-widest">
          {row.status}
        </span>
      )
    },
  ];

  const userColumns = [
    { header: "Nome", accessor: "nome" },
    { header: "E-mail", accessor: "email" },
    { header: "Permissão", accessor: "cargo" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: any) => (
        <span className="px-3 py-1 rounded-full bg-green/10 text-green text-[10px] font-black uppercase tracking-widest">
          {row.status}
        </span>
      )
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <PageHeader 
          icon={Shield} 
          title="Sala do Administrador" 
          subtitle="Controle de acessos, permissões e solicitações de novos usuários."
          accentColor="red"
        />

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => setIsNewUserModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-blue-primary text-white hover:bg-blue-primary/90 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-primary/20 active:scale-95 group"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" /> NOVO USUÁRIO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <KPICard 
          label="Total Usuários" 
          value={mockUsers.length.toString()} 
          icon={Users} 
          color="blue" 
          delay={0.1}
        />
        <KPICard 
          label="Solicitações Pendentes" 
          value={requests.length.toString()} 
          icon={Clock} 
          color="gold" 
          delay={0.2}
        />
        <KPICard 
          label="Nível de Segurança" 
          value="Máximo" 
          icon={ShieldCheck} 
          color="green" 
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Solicitações de Acesso */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gold/10 text-gold flex items-center justify-center border border-gold/20">
                <Clock className="w-8 h-8 glow-icon animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-main group-hover:text-gold transition-colors uppercase tracking-tight">Solicitações</h3>
                <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Pedidos de acesso ao sistema</p>
              </div>
            </div>
          </div>

          <DataTable 
            columns={requestColumns} 
            data={requests} 
            accentColor="gold" 
            onRowClick={(row) => setSelectedRequest(row as LoginRequest)} 
          />

          {requests.length === 0 && (
            <div className="py-20 text-center">
              <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4 opacity-20" />
              <p className="text-xs font-black text-text-dim uppercase tracking-widest opacity-40">Nenhuma solicitação pendente</p>
            </div>
          )}
        </motion.div>

        {/* Lista de Usuários */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl group"
        >
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-primary/10 text-blue-primary flex items-center justify-center border border-blue-primary/20">
              <ShieldCheck className="w-8 h-8 glow-icon" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-text-main group-hover:text-blue-primary transition-colors uppercase tracking-tight">Usuários Ativos</h3>
              <p className="text-[10px] text-text-dim font-black uppercase tracking-[0.2em] mt-2 opacity-60">Gerenciamento de permissões</p>
            </div>
          </div>

          <DataTable columns={userColumns} data={mockUsers} accentColor="blue" />
        </motion.div>
      </div>

      <DetailModal 
        isOpen={!!selectedRequest} 
        onClose={() => setSelectedRequest(null)}
        title={selectedRequest?.nome}
        subtitle="Detalhes da Solicitação de Acesso"
        accentColor="gold"
        data={selectedRequest ? {
          "Nome": selectedRequest.nome,
          "E-mail": selectedRequest.email,
          "Cargo Pretendido": selectedRequest.cargo,
          "Motivo": selectedRequest.motivo,
          "Data do Pedido": selectedRequest.data,
          "Status Atual": "PENDENTE DE APROVAÇÃO",
        } : {}}
      >
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => selectedRequest && handleReject(selectedRequest)}
            className="flex-1 py-4 rounded-xl bg-red/10 text-red border border-red/20 text-[10px] font-black uppercase tracking-widest hover:bg-red hover:text-white transition-all"
          >
            Rejeitar Pedido
          </button>
          <button 
            onClick={() => selectedRequest && handleApprove(selectedRequest)}
            className="flex-[2] py-4 rounded-xl bg-green text-white shadow-xl shadow-green/20 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4" /> Aprovar e Enviar E-mail
          </button>
        </div>
      </DetailModal>

      <FormModal 
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        title="Novo Usuário"
        subtitle="Criar acesso direto ao painel"
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
        onSubmit={handleCreateUser}
      />
    </DashboardLayout>
  );
}
