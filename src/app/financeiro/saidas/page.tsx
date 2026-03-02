"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { DetailModal } from "@/components/ui/DetailModal";
import { TrendingDown, Plus, Fuel, UserMinus, ShieldAlert, Settings, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mockSaidas } from "@/lib/data";

import { Saida } from "@/lib/types";
import { FormModal } from "@/components/ui/FormModal";

export default function SaidasPage() {
  const [selectedRow, setSelectedRow] = useState<Saida | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSaida = (data: Record<string, string | File>) => {
    console.log("Nova Saída:", data);
    alert("Saída registrada com sucesso!");
  };

  const columns = [
    { header: "Data", accessor: "data" },
    { header: "Descrição", accessor: "descricao", className: "min-w-[200px]" },
    { 
      header: "Categoria", 
      accessor: "categoria",
      render: (row: Saida) => (
        <div className="flex items-center gap-2">
          {row.categoria === 'Veículo' ? <Fuel className="w-3.5 h-3.5 text-orange" /> :
           row.categoria === 'Administrativo' ? <Settings className="w-3.5 h-3.5 text-blue-primary" /> :
           row.categoria === 'Pessoal' ? <UserMinus className="w-3.5 h-3.5 text-mint" /> :
           row.categoria === 'Taxas/Detran' ? <ShieldAlert className="w-3.5 h-3.5 text-gold" /> :
           <Package className="w-3.5 h-3.5 text-text-dim" />}
          <span className="text-xs font-bold text-text-dim uppercase tracking-widest">{row.categoria}</span>
        </div>
      )
    },
    { header: "Fornecedor", accessor: "fornecedor", className: "text-text-dim" },
    { 
      header: "Valor", 
      accessor: "valor",
      render: (row: Saida) => (
        <span className="text-sm font-black text-red font-mono">
          {formatCurrency(row.valor)}
        </span>
      )
    },
    { header: "NF/Recibo", accessor: "doc", className: "text-center" },
  ];

  const filteredData = mockSaidas.filter(s => 
    s.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = filteredData.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <PageHeader 
          icon={TrendingDown} 
          title="Controle de Saídas" 
          subtitle="Monitore todas as despesas, pagamentos a fornecedores e custos operacionais."
          accentColor="red"
        />
        <div className="flex items-center gap-4">
          <div className="px-6 py-2.5 rounded-2xl bg-surface-1 border border-border flex flex-col items-end shadow-sm">
            <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Total no Período</span>
            <span className="text-xl font-black text-red tracking-tight">{formatCurrency(total)}</span>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-4 px-10 py-5 bg-red/10 text-red hover:bg-red hover:text-white border-2 border-red/20 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-red/5 hover:shadow-red/30 active:scale-95 group h-full"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" /> NOVA SAÍDA
          </button>
        </div>
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="Pesquisar por descrição ou fornecedor..." 
        accentColor="red"
        filters={[
          { label: "Veículo", value: "veic" },
          { label: "Pessoal", value: "pess" },
          { label: "Adm", value: "adm" },
          { label: "Taxas", value: "taxa" },
        ]}
      />

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onRowClick={(row) => setSelectedRow(row)}
        accentColor="red"
      />

      <DetailModal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.descricao}
        subtitle="Detalhamento da Despesa"
        accentColor="red"
        data={selectedRow ? {
          "Data do Pagamento": selectedRow.data,
          "Fornecedor / Beneficiário": selectedRow.fornecedor,
          "Categoria da Despesa": selectedRow.categoria,
          "Forma de Pagamento": selectedRow.forma,
          "Valor Pago": formatCurrency(selectedRow.valor),
          "Documento (NF/Recibo)": selectedRow.doc,
          "Observações": selectedRow.obs || "Nenhuma observação",
          "ID do Lançamento": `#${selectedRow.id.toString().padStart(5, '0')}`,
        } : {}}
      />

      <FormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Registrar Saída"
        subtitle="Fluxo Financeiro de Despesas"
        accentColor="red"
        fields={[
          { label: "Descrição da Operação", name: "descricao", type: "text", placeholder: "Ex: Pagamento Fornecedor Combustível" },
          { label: "Fornecedor / Favorecido", name: "fornecedor", type: "text", placeholder: "Ex: Posto Pardim" },
          { label: "Valor da Saída (R$)", name: "valor", type: "number", placeholder: "0,00" },
          { label: "Data do Pagamento", name: "data", type: "date" },
          { label: "NF / Documento", name: "doc", type: "text", placeholder: "Ex: NF-12345" },
          { label: "Categoria de Custo", name: "categoria", type: "select", options: [
            { label: "Custos Operacionais Veiculares", value: "Veículo" },
            { label: "Administrativo / Sede", value: "Administrativo" },
            { label: "Folha de Pagamento / Pessoal", value: "Pessoal" },
            { label: "Taxas Governamentais / Detran", value: "Taxas/Detran" },
            { label: "Manutenção e Equipamentos", value: "Manutenção" }
          ]},
          { label: "Observações do Lançamento", name: "obs", type: "textarea" }
        ]}
        onSubmit={handleAddSaida}
      />
    </DashboardLayout>
  );
}

