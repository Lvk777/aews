"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Printer, Calendar, ChevronLeft, ChevronRight, User, FileText, Download, Star } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const mockAlunosSemana = Array.from({ length: 60 }).map((_, i) => ({
  id: i + 1,
  nome: [
    "Gabriel Santos", "Juliana Lima", "Rodrigo Costa", "Mariana Silva", "Marcos Oliveira",
    "Ana Paula", "Lucas Ferreira", "Beatriz Souza", "Tiago Mendes", "Clara Rocha"
  ][i % 10] + ` ${Math.floor(i / 10) + 1}`,
  cpf: `000.000.000-${(i + 10).toString().padStart(2, '0')}`,
  cat: i % 3 === 0 ? "A" : i % 3 === 1 ? "B" : "D",
  data: "27/02/2026",
  hora: `${8 + (i % 8)}:00`,
  instrutor: ["Carlos", "Roberto", "Sandra"][i % 3],
  valorPendente: (i % 4) * 150,
  vip: i % 7 === 0,
  status: i % 5 === 0 ? "Pendente" : "Confirmado"
}));

export default function ImprimirSemanaPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const handlePrint = () => {
    window.print();
  };

  const formatDateRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`;
  };

  return (
    <DashboardLayout>
      <div className="no-print space-y-10">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <PageHeader 
            icon={Printer} 
            title="Relatório de Provas" 
            subtitle="Listagem compacta para exames práticos e teóricos da semana."
            accentColor="purple"
          />
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 bg-surface-1 p-2 rounded-[1.5rem] border border-border shadow-2xl">
              <button 
                onClick={() => {
                  const d = new Date(currentWeek);
                  d.setDate(d.getDate() - 7);
                  setCurrentWeek(d);
                }}
                className="p-3 hover:bg-surface-2 rounded-2xl text-text-dim transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="px-8 py-3 flex items-center gap-4 text-xs font-black text-text-main uppercase tracking-[0.2em] border-x border-border/50">
                <Calendar className="w-5 h-5 text-purple glow-icon" />
                {formatDateRange(currentWeek)}
              </div>
              <button 
                onClick={() => {
                  const d = new Date(currentWeek);
                  d.setDate(d.getDate() + 7);
                  setCurrentWeek(d);
                }}
                className="p-3 hover:bg-surface-2 rounded-2xl text-text-dim transition-all active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-4.5 rounded-2xl bg-surface-1 border border-border text-text-dim hover:text-text-main transition-all shadow-xl active:scale-90">
                  <Download className="w-6 h-6" />
               </button>
               <button 
                onClick={handlePrint}
                className="flex items-center gap-4 px-10 py-5 bg-purple text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-purple/30 hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <Printer className="w-6 h-6 group-hover:animate-bounce" /> IMPRIMIR RELATÓRIO
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl relative overflow-hidden group hover:shadow-purple/20 transition-all duration-500">
             <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-purple/10 text-purple flex items-center justify-center border border-purple/20 shadow-xl shadow-purple/10">
                   <FileText className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-60">Layout</div>
                   <div className="text-xl font-black text-text-main uppercase tracking-tight">Compacto v3</div>
                </div>
             </div>
             <p className="text-xs font-bold text-text-dim leading-relaxed opacity-80">Otimizado para 25 alunos por folha A4 com todas as informações financeiras e cadastrais.</p>
          </div>
          
          <div className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl relative overflow-hidden group hover:shadow-mint/20 transition-all duration-500">
             <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-mint/10 text-mint flex items-center justify-center border border-mint/20 shadow-xl shadow-mint/10">
                   <User className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-60">Total Alunos</div>
                   <div className="text-xl font-black text-text-main uppercase tracking-tight">{mockAlunosSemana.length} Inscritos</div>
                </div>
             </div>
             <p className="text-xs font-bold text-text-dim leading-relaxed opacity-80">Distribuição inteligente em {Math.ceil(mockAlunosSemana.length / 25)} páginas de alta densidade.</p>
          </div>

          <div className="p-10 rounded-[2.5rem] border border-border bg-surface-1 shadow-2xl relative overflow-hidden group hover:shadow-gold/20 transition-all duration-500">
             <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gold/10 text-gold flex items-center justify-center border border-gold/20 shadow-xl shadow-gold/10">
                   <Star className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-60">Destaque</div>
                   <div className="text-xl font-black text-text-main uppercase tracking-tight">VIP & Pendentes</div>
                </div>
             </div>
             <p className="text-xs font-bold text-text-dim leading-relaxed opacity-80">Identificação visual instantânea de alunos VIP e valores pendentes para cobrança na recepção.</p>
          </div>
        </div>
      </div>

      {/* Print Preview Container */}
      <div className="mt-12 bg-surface-2/50 p-6 md:p-16 rounded-[4rem] border-4 border-dashed border-border/50 no-print flex justify-center">
        <div className="bg-white text-black shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] w-full max-w-[900px] rounded-lg overflow-hidden border border-black/10 origin-top transform scale-[0.85] lg:scale-100">
          <PrintContent currentWeek={currentWeek} />
        </div>
      </div>

      {/* Actual Print Content (Visible only during print) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] overflow-visible">
         <PrintContent currentWeek={currentWeek} />
      </div>
    </DashboardLayout>
  );
}

function PrintContent({ currentWeek }: { currentWeek: Date }) {
  const formatDateRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`;
  };

  const itemsPerPage = 25;
  const pages = [];
  for (let i = 0; i < mockAlunosSemana.length; i += itemsPerPage) {
    pages.push(mockAlunosSemana.slice(i, i + itemsPerPage));
  }

  return (
    <div className="bg-white text-black font-sans leading-none">
      {pages.map((pageAlunos, pageIdx) => (
        <div key={pageIdx} className={cn(
          "p-8 min-h-[297mm] flex flex-col bg-white",
          pageIdx > 0 && "print:break-before-page"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b-[5px] border-black pb-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                 <div className="text-white font-black text-3xl leading-none">P</div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Pardim Rezende</h1>
                <p className="text-[8px] font-black text-gray-500 tracking-[0.4em] uppercase mt-2">Centro de Formação de Condutores • MG</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black uppercase text-gray-400 tracking-tighter">Pauta de Exames</div>
              <div className="text-xs font-black tabular-nums mt-1">{formatDateRange(currentWeek)}</div>
              <div className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Página {pageIdx + 1} / {pages.length}</div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1">
            <table className="w-full border-collapse border-[3px] border-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-left w-6">#</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-left">Aluno(a)</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center w-24">CPF</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center w-8">Cat</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center w-20">Data</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center w-24">Pendente</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center w-8">VIP</th>
                  <th className="border-[2px] border-black p-2 text-[8px] font-black uppercase text-center">Assinatura</th>
                </tr>
              </thead>
              <tbody>
                {pageAlunos.map((aluno, i) => (
                  <tr key={aluno.id} className={cn(
                    "border-b border-black/10",
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  )}>
                    <td className="border-x border-black p-2 text-[9px] font-black tabular-nums">{aluno.id}</td>
                    <td className="border-r border-black p-2 text-[9px] font-black uppercase tracking-tight truncate max-w-[200px]">{aluno.nome}</td>
                    <td className="border-r border-black p-2 text-[8px] tabular-nums font-bold text-gray-600 text-center">{aluno.cpf}</td>
                    <td className="border-r border-black p-2 text-[9px] font-black text-center">{aluno.cat}</td>
                    <td className="border-r border-black p-2 text-[8px] font-bold text-center">{aluno.data}</td>
                    <td className={cn(
                        "border-r border-black p-2 text-[9px] font-black text-center tabular-nums",
                        aluno.valorPendente > 0 ? "text-red" : "text-green"
                    )}>
                        {aluno.valorPendente > 0 ? formatCurrency(aluno.valorPendente) : 'QUITADO'}
                    </td>
                    <td className="border-r border-black p-2 text-center">
                        {aluno.vip && <div className="w-2 h-2 rounded-full bg-black mx-auto" />}
                    </td>
                    <td className="border-r border-black p-2">
                      <div className="w-full h-4 border-b border-gray-300 mt-1"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-8 grid grid-cols-4 gap-10 border-t-2 border-black pt-6">
            <div className="text-center col-span-1">
              <div className="border-b border-black h-10"></div>
              <p className="text-[7px] font-black uppercase mt-2">Assinatura Aluno</p>
            </div>
            <div className="text-center col-span-1">
              <div className="border-b border-black h-10"></div>
              <p className="text-[7px] font-black uppercase mt-2">Visto Instrutor</p>
            </div>
            <div className="text-center col-span-1">
              <div className="border-b border-black h-10"></div>
              <p className="text-[7px] font-black uppercase mt-2">Diretor de Ensino</p>
            </div>
            <div className="text-right col-span-1">
                <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                    Data: {new Date().toLocaleDateString('pt-BR')}<br/>
                    Hora: {new Date().toLocaleTimeString('pt-BR')}<br/>
                    Pardim Gestão v2.5
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
