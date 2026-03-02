"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { DetailModal } from "@/components/ui/DetailModal";
import { Car, Plus, Calendar, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockInstrutores } from "@/lib/data";

import { Instrutor } from "@/lib/types";
import { FormModal } from "@/components/ui/FormModal";

export default function InstrutoresPage() {
  const [selectedRow, setSelectedRow] = useState<Instrutor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddInstrutor = (data: Record<string, string | File>) => {
    console.log("Novo Instrutor:", data);
    alert("Instrutor cadastrado com sucesso!");
  };

  const columns = [
    { header: "Nome", accessor: "nome", className: "min-w-[200px]" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: Instrutor) => (
        <span className={cn(
          "px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit",
          row.status === 'Ativo' ? "bg-green/10 text-green border-green/20" :
          row.status === 'Férias' ? "bg-blue-light/10 text-blue-light border-blue-light/20" :
          "bg-navy-3 text-text-dimmer border-border"
        )}>
          {row.status}
        </span>
      )
    },
      { 
        header: "Rating", 
        accessor: "nome",
        render: (row: Instrutor) => (
          <div className="flex items-center gap-1 group/stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={cn("w-4 h-4 transition-all duration-500", s <= 4 ? "fill-gold text-gold drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] group-hover/stars:scale-110" : "fill-gold/20 text-gold/20")} />
            ))}
          </div>
        )
      },
    { header: "Categorias", accessor: "categorias", className: "text-center font-black text-blue-light" },
    { header: "Validade CNH", accessor: "validade", className: "text-text-dim hidden lg:table-cell" },
    { header: "Turno", accessor: "turno" },
    { 
      header: "Escala", 
      accessor: "id",
      render: (row: Instrutor) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert(`Acessando escala de ${row.nome}`);
          }}
          className="p-2 rounded-lg bg-surface-2 hover:bg-navy-3 border border-border transition-all group"
        >
          <Calendar className="w-4 h-4 text-text-dim group-hover:text-primary" />
        </button>
      )
    }
  ];


  const filteredData = mockInstrutores.filter(i => 
    i.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.categorias.includes(searchTerm.toUpperCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <PageHeader 
          icon={Car} 
          title="Corpo de Instrutores" 
          subtitle="Gerencie a equipe de instrutores, qualificações e escalas de trabalho."
          accentColor="orange"
        />
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange/30 active:scale-95 group h-fit"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> NOVO INSTRUTOR
        </button>
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Pesquisar por nome ou categorias..." 
        accentColor="orange"
        filters={[
          { label: "Categoria A", value: "cat-a" },
          { label: "Categoria D/E", value: "cat-de" },
          { label: "Turno: Manhã", value: "turno-m" },
        ]}
      />

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onRowClick={(row) => setSelectedRow(row)}
        accentColor="orange"
      />

      <DetailModal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.nome}
        subtitle="Dados do Profissional"
        accentColor="orange"
        data={selectedRow ? {
          "CPF": selectedRow.cpf,
          "Nº da CNH": selectedRow.cnh,
          "Categorias Habilitadas": selectedRow.categorias,
          "Validade da CNH": selectedRow.validade,
          "Telefone Celular": selectedRow.telefone,
          "Turno de Trabalho": selectedRow.turno,
          "Status Atual": selectedRow.status,
          "Proprietário": selectedRow.nome.includes("Pardim") ? "SIM" : "NÃO",
        } : {}}
      />

      <FormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Novo Instrutor"
        subtitle="Adicionar Profissional ao Sistema"
        accentColor="orange"
        fields={[
          { label: "Nome Completo", name: "nome", type: "text", placeholder: "Ex: Pedro Oliveira" },
          { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00" },
          { label: "Nº da CNH", name: "cnh", type: "text", placeholder: "00000000000" },
          { label: "Categorias", name: "categorias", type: "text", placeholder: "Ex: A, B, D" },
          { label: "Validade CNH", name: "validade", type: "date" },
          { label: "Telefone", name: "telefone", type: "text", placeholder: "(00) 00000-0000" },
          { label: "Turno", name: "turno", type: "select", options: [
            { label: "Manhã", value: "Manhã" },
            { label: "Tarde", value: "Tarde" },
            { label: "Noite", value: "Noite" },
            { label: "Integral", value: "Integral" }
          ]}
        ]}
        onSubmit={handleAddInstrutor}
      />
    </DashboardLayout>
  );
}
