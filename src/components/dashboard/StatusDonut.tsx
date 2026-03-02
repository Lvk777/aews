"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { PieChart as PieIcon, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Aprovado", value: 65, color: "#00E5A0", glow: "rgba(0, 229, 160, 0.4)" },
  { name: "Pendente", value: 20, color: "#FB923C", glow: "rgba(251, 146, 60, 0.4)" },
  { name: "Negado", value: 15, color: "#EF4444", glow: "rgba(239, 68, 68, 0.4)" },
];

export function StatusDonut() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-6 rounded-3xl border border-border bg-surface-1 shadow-2xl h-[520px] flex flex-col group transition-all duration-700 hover:shadow-mint/20 hover:border-mint/30 hover:scale-[1.01] relative overflow-hidden">
      {/* Decorative Background Element (Circle like in image) */}
      <div className="absolute top-0 right-0 w-32 h-32 border-[10px] border-mint/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:border-mint/10 transition-all duration-1000" />
      
      {/* Decorative Background Icon */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
          <PieIcon className="w-48 h-48 text-mint" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-black text-text-main group-hover:text-mint transition-colors uppercase tracking-tight">
            Status dos Alunos
          </h3>
          <p className="text-[8px] text-text-dim font-black uppercase tracking-[0.2em] mt-0.5 opacity-60">Resultados e Aproveitamento</p>
        </div>
        <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center border border-mint/20 shadow-xl shadow-mint/10 group-hover:scale-110 group-hover:shadow-mint/20 transition-all duration-500">
            <Activity className="w-5 h-5 text-mint" />
        </div>
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center mb-4 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={12}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: `drop-shadow(0 0 12px ${entry.glow})` }}
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <div className="text-4xl font-black text-text-main drop-shadow-2xl">100</div>
          <div className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] mt-0.5 opacity-60">Total Alunos</div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        {data.map((item) => (
          <div 
            key={item.name} 
            className={cn(
              "flex items-center justify-between p-2.5 rounded-xl bg-surface-2/40 border border-border group/item transition-all duration-500 cursor-pointer overflow-hidden relative",
              item.name === "Aprovado" ? "hover:bg-green/5 hover:border-green/20" :
              item.name === "Pendente" ? "hover:bg-orange/5 hover:border-orange/20" :
              "hover:bg-red/5 hover:border-red/20"
            )}
          >
            {/* Background color glow on hover */}
            <div 
                className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ 
                    background: `linear-gradient(to right, transparent, ${item.glow.replace('0.4', '0.05')}, transparent)` 
                }}
            />

            <div className="flex items-center gap-3 relative z-10">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.glow}` }} 
              />
              <span className="text-[9px] font-black text-text-dim uppercase tracking-widest group-hover/item:text-text-main transition-colors">{item.name}</span>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-xs font-black text-text-main">{item.value}%</span>
              <div className="w-16 h-1.5 rounded-full bg-navy-3/50 overflow-hidden border border-border/20">
                <div 
                  className="h-full rounded-full transition-all duration-2000 ease-out" 
                  style={{ width: `${item.value}%`, backgroundColor: item.color, boxShadow: `0 0 8px ${item.glow}` }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
