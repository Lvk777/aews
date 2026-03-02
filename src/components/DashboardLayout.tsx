"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useTheme } from "next-themes";
import { useSettings } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const { density } = useSettings();

  const densityScale = 
    density === 'compact' ? 'scale-[0.98] origin-top' :
    density === 'wide' ? 'scale-[1.02] origin-top' :
    'scale-100';

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      theme === "light" ? "bg-[#f8fafc]" : "bg-navy"
    )}>
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className={cn("flex-1 p-8 relative transition-transform duration-500", densityScale)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

