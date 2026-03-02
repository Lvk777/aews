"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { DetailModal } from "@/components/ui/DetailModal";
import { Users, Plus, Star, ShieldCheck, Clock, UserX, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAlunos } from "@/lib/data";

import { Aluno } from "@/lib/types";
import { FormModal } from "@/components/ui/FormModal";

export default function AlunosPage() {
  const [selectedRow, setSelectedRow] = useState<Aluno | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const handleAddAluno = (data: Record<string, string | File>) => {
    console.log("Novo Aluno:", data);
    alert("Aluno cadastrado com sucesso!");
  };

  const columns = [
    { header: "Nome", accessor: "nome", className: "min-w-[200px]" },
    { header: "CPF", accessor: "cpf", className: "text-text-dim hidden md:table-cell" },
    { header: "Telefone", accessor: "telefone" },
      { 
        header: "Rating", 
        accessor: "vip",
        render: (row: Aluno) => (
          <div className="flex items-center gap-1 group/stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={cn(
                  "w-4 h-4 transition-all duration-500", 
                  row.vip === 'SIM' 
                    ? (star <= 5 ? "fill-gold text-gold drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] group-hover/stars:scale-110" : "text-text-dimmer") 
                    : (star <= 3 ? "fill-gold/20 text-gold/40" : "text-text-dimmer")
                )} 
              />
            ))}
          </div>
        )
      },
    { 
      header: "VIP", 
      accessor: "vip",
      render: (row: Aluno) => (
        <span className={cn(
          "flex items-center gap-1.5 text-xs font-black uppercase tracking-widest",
          row.vip === 'SIM' ? "text-gold glow-icon" : "text-text-dimmer"
        )}>
          <Heart className={cn("w-3.5 h-3.5", row.vip === 'SIM' && "fill-gold")} />
          {row.vip}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: Aluno) => (
        <div className={cn(
          "px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit",
          row.status === 'Ativo' ? "bg-green/10 text-green border-green/20" :
          row.status === 'Pendente' ? "bg-orange/10 text-orange border-orange/20" :
          row.status === 'Inativo' ? "bg-navy-3 text-text-dimmer border-border" :
          "bg-red/10 text-red border-red/20"
        )}>
          {row.status === 'Ativo' ? <ShieldCheck className="w-3 h-3" /> :
           row.status === 'Pendente' ? <Clock className="w-3 h-3" /> :
           <UserX className="w-3 h-3" />}
          {row.status}
        </div>
      )
    },
    { header: "Matrícula", accessor: "matricula", className: "text-text-dim hidden lg:table-cell" },
  ];

  const filteredData = mockAlunos.filter(a => {
    const matchesSearch = a.nome.toLowerCase().includes(searchTerm.toLowerCase()) || a.cpf.includes(searchTerm);
    const matchesFilter = !activeFilter || 
      (activeFilter === 'vip' && a.vip === 'SIM') ||
      (activeFilter === 'ativo' && a.status === 'Ativo') ||
      (activeFilter === 'pendente' && a.status === 'Pendente');
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <PageHeader 
          icon={Users} 
          title="Gestão de Alunos" 
          subtitle="Visualize e gerencie o cadastro completo de todos os alunos matriculados."
          accentColor="blue"
        />
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-primary/30 active:scale-95 group h-fit"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> CADASTRAR ALUNO
        </button>
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        onFilter={setActiveFilter}
        activeFilter={activeFilter}
        placeholder="Pesquisar por nome, CPF ou e-mail..." 
        accentColor="blue"
        filters={[
          { label: "Alunos VIP", value: "vip" },
          { label: "Status: Ativo", value: "ativo" },
          { label: "Status: Pendente", value: "pendente" },
        ]}
      />

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onRowClick={(row) => setSelectedRow(row)}
        accentColor="blue"
      />

      <DetailModal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.nome}
        subtitle="Ficha Cadastral do Aluno"
        accentColor="blue"
        data={selectedRow ? {
          "CPF": selectedRow.cpf,
          "Data de Nascimento": selectedRow.nascimento,
          "Telefone para Contato": selectedRow.telefone,
          "E-mail": selectedRow.email,
          "Categoria Desejada": selectedRow.cat,
          "Status VIP": selectedRow.vip,
          "Status da Matrícula": selectedRow.status,
          "Data de Matrícula": selectedRow.matricula,
        } : {}}
      />

      <FormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Cadastrar Aluno"
        subtitle="Adicionar Novo Aluno ao Sistema"
        accentColor="blue"
        fields={[
          { label: "Nome Completo", name: "nome", type: "text", placeholder: "Ex: João Silva" },
          { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00" },
          { label: "Data de Nascimento", name: "nascimento", type: "date" },
          { label: "Telefone", name: "telefone", type: "text", placeholder: "(00) 00000-0000" },
          { label: "E-mail", name: "email", type: "text", placeholder: "exemplo@email.com" },
          { label: "Categoria", name: "cat", type: "select", options: [
            { label: "Categoria A", value: "A" },
            { label: "Categoria B", value: "B" },
            { label: "Categoria AB", value: "AB" },
            { label: "Categoria D", value: "D" },
            { label: "Categoria E", value: "E" }
          ]},
          { label: "É Aluno VIP?", name: "vip", type: "select", options: [
            { label: "NÃO", value: "NÃO" },
            { label: "SIM", value: "SIM" }
          ]}
        ]}
        onSubmit={handleAddAluno}
      />
    </DashboardLayout>
  );
}
