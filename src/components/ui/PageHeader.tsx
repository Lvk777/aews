"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { useSettings } from "@/components/SettingsProvider";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  accentColor?: "mint" | "blue" | "green" | "red" | "gold" | "purple" | "orange";
}

const colorMap = {
  mint: "text-mint bg-mint/10 border-mint/20 shadow-mint/20 shadow-top-green",
  blue: "text-blue-primary bg-blue-primary/10 border-blue-primary/20 shadow-blue-primary/20 shadow-top-blue",
  green: "text-green bg-green/10 border-green/20 shadow-green/20 shadow-top-green",
  red: "text-red bg-red/10 border-red/20 shadow-red/20 shadow-top-red",
  gold: "text-gold bg-gold/10 border-gold/20 shadow-gold/20 shadow-top-gold",
  purple: "text-purple bg-purple/10 border-purple/20 shadow-purple/20 shadow-top-blue",
  orange: "text-orange bg-orange/10 border-orange/20 shadow-orange/20 shadow-top-orange",
};

export function PageHeader({ icon: Icon, title, subtitle, accentColor: localAccent = "mint" }: PageHeaderProps) {
  const { accentColor: globalAccent } = useSettings();
  
  const useGlobal = globalAccent !== null;
  const accent = useGlobal ? "primary-main" : localAccent;

  return (
    <div className="flex items-center gap-6 mb-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl relative overflow-hidden group transition-all duration-500",
          useGlobal 
            ? "text-primary-main bg-primary-main/10 border-primary-main/20 shadow-primary-glow"
            : colorMap[localAccent]
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <Icon className="w-8 h-8 glow-icon animate-glow" />
      </motion.div>
      
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-text-main dark:text-text-main drop-shadow-sm tracking-tight">
            {title}
          </h1>
          <div 
            className={cn(
              "h-1.5 w-12 rounded-full opacity-50",
              !useGlobal && `bg-${localAccent === 'mint' ? 'green' : localAccent}`
            )} 
            style={useGlobal ? { backgroundColor: 'var(--primary-main)', boxShadow: '0 0 10px var(--primary-main)' } : {}}
          />
        </div>
        {subtitle && (
          <p className="text-text-dim mt-1 font-medium">{subtitle}</p>
        )}
      </motion.div>
    </div>
  );
}
