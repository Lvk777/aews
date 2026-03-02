"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

import { useSettings } from "@/components/SettingsProvider";

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color: "blue" | "red" | "gold" | "green" | "mint";
  delay?: number;
  href?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-primary/10",
    text: "text-blue-primary",
    border: "border-blue-primary/20",
    glow: "hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    accent: "#3b82f6"
  },
  red: {
    bg: "bg-red/10",
    text: "text-red",
    border: "border-red/20",
    glow: "hover:shadow-[0_0_50px_rgba(239,68,68,0.3)] shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    accent: "#ef4444"
  },
  gold: {
    bg: "bg-gold/10",
    text: "text-gold",
    border: "border-gold/20",
    glow: "hover:shadow-[0_0_50px_rgba(255,191,0,0.3)] shadow-[0_0_20px_rgba(255,191,0,0.1)]",
    accent: "#ffbf00"
  },
  green: {
    bg: "bg-green/10",
    text: "text-green",
    border: "border-green/20",
    glow: "hover:shadow-[0_0_50px_rgba(46,213,115,0.3)] shadow-[0_0_20px_rgba(46,213,115,0.1)]",
    accent: "#2ed573"
  },
  mint: {
    bg: "bg-mint/10",
    text: "text-mint",
    border: "border-mint/20",
    glow: "hover:shadow-[0_0_50px_rgba(0,229,160,0.3)] shadow-[0_0_20px_rgba(0,229,160,0.1)]",
    accent: "#00E5A0"
  }
};

export function KPICard({ label, value, icon: Icon, trend, color, delay = 0, href = "#" }: KPICardProps) {
  const { accentColor } = useSettings();
  const styles = colorMap[color];
  const useGlobal = accentColor !== null;

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: "easeOut" }}
        className={cn(
          "p-6 rounded-2xl border bg-surface-1 transition-all duration-700 group hover:scale-[1.05] relative overflow-hidden cursor-pointer",
          useGlobal ? "border-primary-main/20 hover:shadow-primary-glow" : styles.border,
          !useGlobal && styles.glow,
          "shadow-2xl"
        )}
        style={useGlobal ? { boxShadow: `0 0 20px var(--primary-glow)` } : {}}
      >
        {/* Decorative background icon */}
        <div className={cn(
            "absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 pointer-events-none",
            useGlobal ? "text-primary-main" : styles.text
        )}>
            <Icon className="w-24 h-24" />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:glow-icon shadow-2xl border border-white/10",
              useGlobal ? "bg-primary-main/10 text-primary-main" : cn(styles.bg, styles.text),
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          {trend !== undefined && (
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500",
              trend >= 0 ? "bg-green/10 text-green group-hover:bg-green group-hover:text-white" : "bg-red/10 text-red group-hover:bg-red group-hover:text-white"
            )}>
              {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div className="mt-8 relative z-10">
          <div className={cn("text-[9px] font-black text-text-dim uppercase tracking-[0.3em] mb-2 transition-colors opacity-60", useGlobal ? "group-hover:text-primary-main" : "group-hover:text-text-main")}>
            {label}
          </div>
          <div className={cn(
            "text-4xl font-black tabular-nums tracking-tighter transition-all duration-700 text-text-main",
            useGlobal ? "group-hover:text-primary-main group-hover:drop-shadow-[0_0_12px_var(--primary-glow)]" : (
              color === 'blue' ? 'group-hover:text-blue-primary group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]' :
              color === 'red' ? 'group-hover:text-red group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]' :
              color === 'gold' ? 'group-hover:text-gold group-hover:drop-shadow-[0_0_12px_rgba(255,191,0,0.6)]' :
              color === 'green' ? 'group-hover:text-green group-hover:drop-shadow-[0_0_12px_rgba(46,213,115,0.6)]' :
              'group-hover:text-mint group-hover:drop-shadow-[0_0_12px_rgba(0,229,160,0.6)]'
            )
          )}>
            {value}
          </div>
        </div>
        
        {/* Glow point */}
        <div 
          className={cn(
            "absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-[0.08] blur-[80px] pointer-events-none transition-all duration-1000 group-hover:scale-150 group-hover:opacity-20",
            !useGlobal && styles.bg
          )} 
          style={useGlobal ? { backgroundColor: 'var(--primary-main)' } : {}}
        />
      </motion.div>
    </Link>
  );
}
