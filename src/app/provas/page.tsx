"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { DetailModal } from "@/components/ui/DetailModal";
import { FormModal } from "@/components/ui/FormModal";
import { ClipboardList, Plus, BadgeCheck, XCircle, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProvaAgendada {
  id: number;
  data: string;
  aluno: string;
  cpf: string;
  cat: string;
  tipo: string;
  turno: string;
  vip: string;
  devendo: string;
  status: string;
  telefone: string;
  entrada: number;
  saida: number;
}

const mockProvas: ProvaAgendada[] = [
  { id: 1, data: "28/02/2026", aluno: "Gabriel Santos", cpf: "123.456.789-00", cat: "B", tipo: "Prática", turno: "Manhã", vip: "SIM", devendo: "NÃO", status: "Agendado", telefone: "(31) 98888-7777", entrada: 150, saida: 0 },
  { id: 2, data: "28/02/2026", aluno: "Juliana Lima", cpf: "987.654.321-11", cat: "A", tipo: "Prática", turno: "Tarde", vip: "NÃO", devendo: "SIM", status: "Pendente", telefone: "(31) 97777-6666", entrada: 0, saida: 0 },
  { id: 3, data: "01/03/2026", aluno: "Rodrigo Costa", cpf: "456.789.123-22", cat: "B", tipo: "Prática", turno: "Manhã", vip: "NÃO", devendo: "NÃO", status: "Aprovado", telefone: "(31) 96666-5555", entrada: 150, saida: 50 },
  { id: 4, data: "02/03/2026", aluno: "Mariana Silva", cpf: "321.654.987-33", cat: "D", tipo: "Prática", turno: "Noite", vip: "SIM", devendo: "NÃO", status: "Agendado", telefone: "(31) 95555-4444", entrada: 200, saida: 0 },
  { id: 5, data: "02/03/2026", aluno: "Marcos Oliveira", cpf: "159.357.258-44", cat: "A", tipo: "Prática", turno: "Tarde", vip: "NÃO", devendo: "NÃO", status: "Reprovado", telefone: "(31) 94444-3333", entrada: 150, saida: 0 },
];

export default function ListaProvasPage() {
  const [selectedRow, setSelectedRow] = useState<ProvaAgendada | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const columns = [
    { header: "Data", accessor: "data" },
    { header: "Aluno", accessor: "aluno", className: "min-w-[200px]" },
    { 
      header: "Cat", 
      accessor: "cat",
      render: (row: ProvaAgendada) => (
        <span className={cn(
          "px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest",
          row.cat === 'A' ? "text-mint border-mint/20 bg-mint/5" :
          row.cat === 'B' ? "text-blue-light border-blue-light/20 bg-blue-light/5" :
          row.cat === 'C' ? "text-orange border-orange/20 bg-orange/5" :
          row.cat === 'D' ? "text-purple border-purple/20 bg-purple/5" :
          "text-gold border-gold/20 bg-gold/5"
        )}>
          {row.cat}
        </span>
      )
    },
    { header: "Turno", accessor: "turno" },
    { 
      header: "VIP", 
      accessor: "vip",
      render: (row: ProvaAgendada) => (
        <span className={cn(
          "text-xs font-black uppercase tracking-widest",
          row.vip === 'SIM' ? "text-gold glow-icon" : "text-text-dimmer"
        )}>
          {row.vip}
        </span>
      )
    },
    { 
      header: "Débito", 
      accessor: "devendo",
      render: (row: ProvaAgendada) => (
        <span className={cn(
          "flex items-center gap-1.5 text-xs font-black uppercase tracking-widest",
          row.devendo === 'SIM' ? "text-red" : "text-green"
        )}>
          {row.devendo === 'SIM' ? <AlertTriangle className="w-3.5 h-3.5" /> : <BadgeCheck className="w-3.5 h-3.5" />}
          {row.devendo}
        </span>
      )
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: ProvaAgendada) => (
        <div className={cn(
          "px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit shadow-sm shadow-black/20",
          row.status === 'Aprovado' ? "bg-green/10 text-green border-green/20" :
          row.status === 'Reprovado' ? "bg-red/10 text-red border-red/20" :
          row.status === 'Agendado' ? "bg-blue-primary/10 text-blue-primary border-blue-primary/20" :
          "bg-orange/10 text-orange border-orange/20"
        )}>
          {row.status === 'Aprovado' ? <BadgeCheck className="w-3 h-3" /> :
           row.status === 'Reprovado' ? <XCircle className="w-3 h-3" /> :
           row.status === 'Agendado' ? <Clock className="w-3 h-3" /> :
           <AlertTriangle className="w-3 h-3" />}
          {row.status}
        </div>
      )
    },
  ];

  const filteredData = mockProvas.filter(p => 
    p.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <PageHeader 
          icon={ClipboardList} 
          title="Lista de Provas" 
          subtitle="Gerencie todos os agendamentos e resultados de exames práticos."
          accentColor="blue"
        />
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-primary text-white font-black text-[10px] rounded-xl shadow-lg shadow-blue-primary/30 hover:scale-[1.02] hover:glow-icon transition-all h-fit group uppercase tracking-widest"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> Novo Agendamento
        </button>
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Pesquisar por aluno ou CPF..." 
        accentColor="blue-primary"
        filters={[
          { label: "Categoria A", value: "cat-a" },
          { label: "Categoria B", value: "cat-b" },
          { label: "Status: Agendado", value: "status-ag" },
          { label: "Status: Pendente", value: "status-pe" },
        ]}
      />

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onRowClick={(row) => setSelectedRow(row)}
        accentColor="blue-primary"
      />

      <DetailModal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.aluno}
        subtitle="Detalhes do Agendamento"
        accentColor="blue-primary"
        data={selectedRow ? {
          "Data do Exame": selectedRow.data,
          "CPF do Aluno": selectedRow.cpf,
          "Telefone": selectedRow.telefone,
          "Categoria": selectedRow.cat,
          "Tipo de Prova": selectedRow.tipo,
          "Turno": selectedRow.turno,
          "Aluno VIP": selectedRow.vip,
          "Possui Débitos": selectedRow.devendo,
          "Status Atual": selectedRow.status,
          "Valor Pago": `R$ ${selectedRow.entrada.toFixed(2)}`,
          "Custos de Saída": `R$ ${selectedRow.saida.toFixed(2)}`,
        } : {}}
      />

      <FormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Novo Agendamento de Prova"
        subtitle="Preencha os dados do exame prático"
        accentColor="blue"
        fields={[
          { label: "Nome do Aluno", name: "aluno", type: "text", placeholder: "Ex: Gabriel Santos" },
          { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00" },
          { label: "Data do Exame", name: "data", type: "date" },
          { label: "Categoria", name: "cat", type: "select", options: [
            { label: "A (Moto)", value: "A" },
            { label: "B (Carro)", value: "B" },
            { label: "C (Caminhão)", value: "C" },
            { label: "D (Ônibus)", value: "D" },
            { label: "E (Articulado)", value: "E" }
          ]},
          { label: "Turno", name: "turno", type: "select", options: [
            { label: "Manhã", value: "Manhã" },
            { label: "Tarde", value: "Tarde" },
            { label: "Noite", value: "Noite" }
          ]},
          { label: "Aluno VIP?", name: "vip", type: "select", options: [
            { label: "Não", value: "NÃO" },
            { label: "Sim", value: "SIM" }
          ]},
          { label: "Observações", name: "obs", type: "textarea", placeholder: "Informações adicionais..." }
        ]}
        onSubmit={(data) => {
          console.log("Novo agendamento:", data);
          setIsFormOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
