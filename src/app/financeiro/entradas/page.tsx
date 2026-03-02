"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { DetailModal } from "@/components/ui/DetailModal";
import { TrendingUp, Plus, CreditCard, Banknote, Smartphone, Receipt } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mockEntradas } from "@/lib/data";

import { Entrada } from "@/lib/types";
import { FormModal } from "@/components/ui/FormModal";

export default function EntradasPage() {
  const [selectedRow, setSelectedRow] = useState<Entrada | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEntrada = (data: Record<string, string | File>) => {
    console.log("Nova Entrada:", data);
    alert("Entrada registrada com sucesso!");
  };

  const columns = [
    { header: "Data", accessor: "data" },
    { header: "Descrição/Aluno", accessor: "descricao", className: "min-w-[200px]" },
    { 
      header: "Forma", 
      accessor: "forma",
      render: (row: Entrada) => (
        <div className="flex items-center gap-2">
          {row.forma === 'PIX' ? <Smartphone className="w-3.5 h-3.5 text-mint" /> :
           row.forma === 'Cartão' ? <CreditCard className="w-3.5 h-3.5 text-blue-light" /> :
           row.forma === 'Dinheiro' ? <Banknote className="w-3.5 h-3.5 text-green" /> :
           <Receipt className="w-3.5 h-3.5 text-gold" />}
          <span className="text-xs font-bold text-text-dim uppercase tracking-widest">{row.forma}</span>
        </div>
      )
    },
    { 
      header: "Valor", 
      accessor: "valor",
      render: (row: Entrada) => (
        <span className="text-sm font-black text-green font-mono">
          {formatCurrency(row.valor)}
        </span>
      )
    },
    { header: "Parcela", accessor: "parcela", className: "text-center" },
    { header: "Vencimento", accessor: "vencimento", className: "text-text-dim" },
  ];

  const filteredData = mockEntradas.filter(e => 
    e.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cpf.includes(searchTerm)
  );

  const total = filteredData.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <PageHeader 
          icon={TrendingUp} 
          title="Controle de Entradas" 
          subtitle="Acompanhe todos os recebimentos, matrículas e taxas pagas pelos alunos."
          accentColor="green"
        />
        <div className="flex items-center gap-4">
          <div className="px-6 py-2.5 rounded-2xl bg-surface-1 border border-border flex flex-col items-end shadow-sm">
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Total no Período</span>
            <span className="text-xl font-black text-green tracking-tight">{formatCurrency(total)}</span>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-4 px-10 py-5 bg-green/10 text-green hover:bg-green hover:text-white border-2 border-green/20 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-green/5 hover:shadow-green/30 active:scale-95 group h-full"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" /> NOVA ENTRADA
          </button>
        </div>
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Pesquisar por descrição, aluno ou CPF..." 
        accentColor="green"
        filters={[
          { label: "PIX", value: "pix" },
          { label: "Cartão", value: "cartao" },
          { label: "Dinheiro", value: "dinheiro" },
          { label: "Boleto", value: "boleto" },
        ]}
      />

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onRowClick={(row) => setSelectedRow(row)}
        accentColor="green"
      />

      <DetailModal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.descricao}
        subtitle="Detalhamento do Recebimento"
        accentColor="mint"
        data={selectedRow ? {
          "Data do Lançamento": selectedRow.data,
          "CPF do Pagador": selectedRow.cpf,
          "Categoria Vinculada": selectedRow.cat,
          "Forma de Pagamento": selectedRow.forma,
          "Valor Recebido": formatCurrency(selectedRow.valor),
          "Número da Parcela": selectedRow.parcela,
          "Data de Vencimento": selectedRow.vencimento,
          "ID da Transação": `#${selectedRow.id.toString().padStart(5, '0')}`,
        } : {}}
      />

      <FormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Registrar Entrada"
        subtitle="Fluxo Financeiro de Recebimentos"
        accentColor="green"
        fields={[
          { label: "Nome do Aluno / Descrição", name: "descricao", type: "text", placeholder: "Ex: Matrícula João Silva" },
          { label: "Valor Recebido (R$)", name: "valor", type: "number", placeholder: "0,00" },
          { label: "Data do Pagamento", name: "data", type: "date" },
          { label: "Forma de Pagamento", name: "forma", type: "select", options: [
            { label: "PIX", value: "PIX" },
            { label: "Dinheiro", value: "Dinheiro" },
            { label: "Cartão de Crédito/Débito", value: "Cartão" },
            { label: "Boleto Bancário", value: "Boleto" }
          ]},
          { label: "Categoria", name: "cat", type: "select", options: [
            { label: "Matrícula", value: "Matrícula" },
            { label: "Aula Prática", value: "Aula" },
            { label: "Taxa DETRAN", value: "Taxa" },
            { label: "Exame", value: "Exame" }
          ]},
          { label: "Observações", name: "obs", type: "textarea" }
        ]}
        onSubmit={handleAddEntrada}
      />
    </DashboardLayout>
  );
}

