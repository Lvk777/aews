"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { formatCurrency, cn } from "@/lib/utils";
import { TrendingUp, Activity } from "lucide-react";

const data = [
  { name: "Seg", entradas: 4200, saidas: 2400 },
  { name: "Ter", entradas: 3500, saidas: 2100 },
  { name: "Qua", entradas: 5100, saidas: 2800 },
  { name: "Qui", entradas: 4800, saidas: 3200 },
  { name: "Sex", entradas: 6200, saidas: 3900 },
  { name: "Sab", entradas: 4000, saidas: 1800 },
  { name: "Dom", entradas: 2500, saidas: 1200 },
];

export function RevenueChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 rounded-2xl border border-border bg-surface-1 shadow-2xl h-[520px] flex flex-col group transition-all duration-700 hover:shadow-mint/20 hover:border-mint/30 hover:scale-[1.02] relative overflow-hidden">
      {/* Background Icon */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
          <Activity className="w-64 h-64 text-mint" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 relative z-10">
        <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-mint/10 rounded-2xl flex items-center justify-center border border-mint/20 shadow-xl shadow-mint/10 group-hover:scale-110 transition-all duration-500">
                <TrendingUp className="w-6 h-6 text-mint" />
            </div>
            <div>
                <h3 className="text-xl font-black text-text-main group-hover:text-mint transition-colors tracking-tight uppercase">
                    Fluxo Financeiro
                </h3>
                <p className="text-[9px] text-text-dim font-black uppercase tracking-[0.2em] mt-1 opacity-60">Movimentação Semanal Consolidada</p>
            </div>
        </div>
        <div className="flex items-center gap-6 bg-surface-2 p-3 rounded-2xl border border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-green shadow-[0_0_10px_#2ed573]" />
            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Entradas</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red shadow-[0_0_10px_#ef4444]" />
            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Saídas</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ed573" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2ed573" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "#8A96B0" : "#64748b", fontSize: 10, fontWeight: 900 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "#8A96B0" : "#64748b", fontSize: 10, fontWeight: 900 }}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? "#1C1C1C" : "#ffffff", 
                borderColor: isDark ? "#2D2D2E" : "#e2e8f0",
                borderRadius: "1.5rem",
                border: "1px solid",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
              cursor={{ stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", strokeWidth: 2 }}
              formatter={(value: number) => [formatCurrency(value), ""]}
            />

            <Area 
              type="monotone" 
              dataKey="entradas" 
              stroke="#2ed573" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorEntradas)" 
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="saidas" 
              stroke="#ef4444" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorSaidas)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
