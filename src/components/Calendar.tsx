"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  date: string;
  title: string;
  type: "prova" | "aula" | "financeiro";
}

const mockEvents: Event[] = [
  { date: "2026-02-27", title: "Prova Prática B", type: "prova" },
  { date: "2026-02-27", title: "Aula Teórica", type: "aula" },
  { date: "2026-02-28", title: "Pagamento Aluguel", type: "financeiro" },
  { date: "2026-03-02", title: "Prova Teórica A", type: "prova" },
  { date: "2026-03-05", title: "Exame Médico", type: "prova" },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const hasEvents = mockEvents.filter(e => e.date === dateStr);
    
    return {
      day,
      isCurrentMonth,
      dateStr,
      events: hasEvents
    };
  });

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="bg-surface-1 rounded-2xl border border-border overflow-hidden shadow-2xl shadow-navy/20 group">
      {/* Header */}
      <div className="p-6 border-b border-border bg-navy-3/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-primary/10 text-blue-primary flex items-center justify-center shadow-lg shadow-blue-primary/10 group-hover:glow-icon transition-all">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main capitalize">{monthName}</h3>
            <p className="text-[10px] text-text-dim font-black uppercase tracking-widest">{year}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-surface-2 text-text-dim hover:text-text-main transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-lg bg-surface-2 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-blue-primary transition-all"
          >
            Hoje
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-surface-2 text-text-dim hover:text-text-main transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-px mb-2">
          {weekDays.map(d => (
            <div key={d} className="text-center text-[10px] font-black text-text-dimmer uppercase tracking-widest py-2">
              {d}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <div 
              key={i} 
              className={cn(
                "aspect-square rounded-xl p-2 flex flex-col items-center justify-between transition-all relative group/day border border-transparent",
                d.isCurrentMonth ? "bg-surface-2/50 hover:bg-surface-2 hover:border-blue-primary/30 hover:shadow-xl hover:shadow-blue-primary/5 cursor-pointer" : "opacity-0 pointer-events-none"
              )}
            >
              <span className={cn(
                "text-xs font-bold",
                d.isCurrentMonth ? "text-text-main" : "text-text-dimmer"
              )}>
                {d.day}
              </span>
              
              <div className="flex gap-0.5 mt-auto">
                {d.events.slice(0, 3).map((e, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-sm",
                      e.type === 'prova' ? "bg-red" : e.type === 'aula' ? "bg-mint" : "bg-gold"
                    )}
                    title={e.title}
                  />
                ))}
                {d.events.length > 3 && <MoreHorizontal className="w-2 h-2 text-text-dimmer" />}
              </div>
              
              {/* Tooltip on hover */}
              {d.events.length > 0 && (
                <div className="absolute inset-0 opacity-0 group-hover/day:opacity-100 transition-opacity z-10 pointer-events-none">
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-navy text-white text-[9px] p-2 rounded-lg shadow-2xl border border-white/10 hidden group-hover/day:block">
                      {d.events.map((e, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 mb-1 last:mb-0">
                          <div className={cn("w-1 h-1 rounded-full", e.type === 'prova' ? "bg-red" : e.type === 'aula' ? "bg-mint" : "bg-gold")} />
                          <span className="truncate">{e.title}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
