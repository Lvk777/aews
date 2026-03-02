"use client";

import React, { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
  activeFilter?: string;
  placeholder?: string;
  filters?: { label: string; value: string }[];
  accentColor?: string;
}

export function SearchBar({ onSearch, onFilter, activeFilter, placeholder = "Pesquisar...", filters, accentColor = "mint" }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
      <div className="relative flex-1 group w-full">
        <div className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
          isFocused ? `bg-${accentColor}/10 ring-2 ring-${accentColor}/50 shadow-lg shadow-${accentColor}/10` : "bg-surface-1 dark:bg-surface-1 border border-border"
        )} />
        
        <div className="relative flex items-center px-5 py-4">
          <Search className={cn(
            "w-5 h-5 mr-4 transition-all duration-300",
            isFocused ? `text-${accentColor} scale-110 glow-icon` : "text-text-dim group-hover:text-text-main"
          )} />
          
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-text-main placeholder:text-text-dimmer font-medium"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onSearch(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="p-1.5 hover:bg-surface-2 rounded-lg text-text-dim hover:text-red transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {filters && (
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-black text-text-dim uppercase tracking-[0.2em] whitespace-nowrap opacity-60">
            <Filter className="w-3.5 h-3.5" /> Filtrar por:
          </div>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilter?.(filter.value === activeFilter ? "" : filter.value)}
              className={cn(
                "px-5 py-3 rounded-[1.2rem] border transition-all text-xs font-black uppercase tracking-widest whitespace-nowrap active:scale-95",
                activeFilter === filter.value 
                  ? `bg-${accentColor} text-white border-${accentColor} shadow-xl shadow-${accentColor}/30`
                  : "bg-surface-1 text-text-dim hover:text-text-main border-border hover:border-border/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
