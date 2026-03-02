"use client";

import React, { useEffect, useState } from "react";
import Globe3D from "@/components/autoescola/Globe3D";
import { User, Lock, Mail, Github, Sun, Moon, Crown, Zap, Shield, Rocket, ChevronRight, Fingerprint, ShieldCheck, Key, ArrowRight, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FormModal } from "@/components/ui/FormModal";

const BackgroundIcons = ({ isDark }: { isDark: boolean }) => {
  const icons = [
    { Icon: Crown, size: 28, x: "10%", y: "15%", delay: 0 },
    { Icon: Rocket, size: 24, x: "85%", y: "20%", delay: 1.5 },
    { Icon: Shield, size: 22, x: "75%", y: "75%", delay: 0.8 },
    { Icon: Zap, size: 24, x: "20%", y: "40%", delay: 1.9 },
    { Icon: ShieldCheck, size: 20, x: "40%", y: "85%", delay: 2.2 },
    { Icon: Key, size: 18, x: "60%", y: "10%", delay: 1.1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {icons.map(({ Icon, size, x, y, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
          }}
          style={{ position: 'absolute', left: x, top: y }}
          className={isDark ? "text-blue-500/30" : "text-blue-600/20"}
        >
          <Icon size={size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
};

export default function LoginPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Erro de Autenticação", {
        description: "Por favor, preencha todos os campos para continuar.",
        duration: 4000,
      });
      return;
    }

    if (username === "admin" && password === "admin") {
      toast.success("Acesso Concluído", {
        description: "Bem-vindo de volta! Redirecionando para o painel...",
        duration: 3000,
      });
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      toast.error("Credenciais Inválidas", {
        description: "O usuário ou a senha informados estão incorretos.",
        duration: 5000,
      });
    }
  };

  const handleRequestLogin = (data: Record<string, string | File>) => {
    console.log("Solicitação de Acesso:", data);
    toast.success("Solicitação Enviada!", {
      description: "Seus dados foram enviados para o administrador. Você receberá um e-mail em breve.",
      duration: 6000,
    });
  };

  if (!mounted) return null;

  const isDark = theme === "dark";
  const accentColor = "#1A6CF7";

  return (
  <div className={`h-screen w-full transition-colors duration-1000 relative overflow-hidden flex items-center justify-center lg:justify-start lg:pl-40 p-4 ${
  isDark ? "bg-black text-white" : "bg-[#f0f7ff] text-slate-900"
}`}>
{/* Enhanced Cursor Glow Effect */}
<motion.div
className="pointer-events-none fixed inset-0 z-[18] opacity-60 overflow-hidden"
animate={{
background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? "rgba(255,255,255,0.08)" : "rgba(26,108,247,0.15)"}, transparent 100%)`,
}}
/>
<motion.div
className="pointer-events-none fixed inset-0 z-[19] opacity-40 overflow-hidden"
animate={{
background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? "rgba(255,255,255,0.12)" : "rgba(26,108,247,0.25)"}, transparent 100%)`,
}}
/>

          {/* Background Decor */}
<BackgroundIcons isDark={isDark} />

{/* Immersive Ambient Glows */}
<div className={`absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 transition-all duration-1000 z-0 ${
isDark 
? "bg-[radial-gradient(circle_at_20%_20%,#1e3a8a_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#0f172a_0%,transparent_50%)]" 
: "bg-[radial-gradient(circle_at_20%_20%,#eff6ff_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#f1f5f9_0%,transparent_50%)]"
}`} />

{/* Large Globe Background */}
<div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end opacity-90 md:opacity-100 overflow-hidden pointer-events-none">
<motion.div
initial={{ opacity: 0, scale: 0.6 }}
animate={{ opacity: 1, scale: 0.85 }}
transition={{ duration: 2.5, ease: "easeOut" }}
className="w-full h-full max-w-[2000px] flex items-center justify-center lg:translate-x-[45%] -translate-y-[15%]"
>
<Globe3D isDark={isDark} />
</motion.div>

{/* Seamless Overlay */}
<div className={`absolute inset-0 z-10 transition-colors duration-1000 ${
isDark 
? "bg-gradient-to-r from-black/80 via-black/20 to-transparent" 
: "bg-gradient-to-r from-[#f0f7ff]/80 via-[#f0f7ff]/20 to-transparent"
}`} />
</div>

{/* Dot Grid Background Pattern */}
<motion.div 
className={`absolute inset-0 z-[15] pointer-events-none transition-opacity duration-1000 ${
isDark ? "opacity-[0.22]" : "opacity-[0.25]"
}`} 
animate={isDark ? {
backgroundPosition: ["0px 0px", "36px 36px"],
} : {}}
transition={{
duration: 30,
repeat: Infinity,
ease: "linear"
}}
style={{ 
backgroundImage: `radial-gradient(${isDark ? accentColor : '#1A6CF7'} 1.4px, transparent 1.4px)`,
backgroundSize: '36px 36px',
maskImage: 'radial-gradient(circle at 90% 35%, transparent 22%, black 45%)',
WebkitMaskImage: 'radial-gradient(circle at 90% 35%, transparent 22%, black 45%)'
}} />


{/* Theme Toggle Button */}
<div className="absolute top-8 left-8 z-50">
<motion.button
whileHover={{ scale: 1.1, rotate: 180 }}
whileTap={{ scale: 0.9 }}
onClick={() => setTheme(isDark ? "light" : "dark")}
className={`p-4 rounded-3xl transition-all duration-500 shadow-2xl border backdrop-blur-3xl relative overflow-hidden group/theme-btn ${
isDark 
? "bg-slate-900/40 border-white/10 text-yellow-400 hover:shadow-yellow-500/20" 
: "bg-white/70 border-slate-200/60 text-slate-600 shadow-blue-500/10 hover:shadow-blue-500/20"
}`}
>
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/theme-btn:translate-x-full transition-transform duration-1000" />
{isDark ? <Sun className="w-5 h-5 relative z-10" /> : <Moon className="w-5 h-5 relative z-10" />}
</motion.button>
</div>

{/* Login Container */}
<motion.div 
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
className="relative z-20 w-full max-w-[540px]"
>
<div className={`rounded-[3rem] border shadow-2xl overflow-hidden backdrop-blur-3xl transition-all duration-700 relative ${
isDark 
? "bg-black/40 border-white/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.8)]" 
: "bg-white/80 border-slate-200/80 shadow-[0_40px_80px_rgba(15,23,42,0.15)]"
}`}>

{/* PREMIUM BANNER HEADER */}
<div className="relative h-44 overflow-hidden group/banner border-b border-white/5">
<div 
className="absolute inset-0 transition-all duration-1000 group-hover/banner:scale-105" 
style={{ 
background: isDark 
? `linear-gradient(135deg, ${accentColor} 0%, #000 100%)` 
: `linear-gradient(135deg, ${accentColor} 0%, #fff 100%)`,
}} 
/>

<div className="absolute inset-0 opacity-40">
<motion.div 
animate={{ 
scale: [1, 1.2, 1],
opacity: [0.3, 0.6, 0.3],
x: [0, 20, 0],
y: [0, -20, 0]
}}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" 
/>
<motion.div 
animate={{ 
scale: [1, 1.3, 1],
opacity: [0.2, 0.4, 0.2],
x: [0, -30, 0],
y: [0, 20, 0]
}}
transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-[100px]" 
/>
</div>

<div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-[0.08] group-hover/banner:opacity-[0.15] group-hover/banner:scale-110 transition-all duration-1000 pointer-events-none">
<Crown className="w-64 h-64 rotate-12" style={{ color: isDark ? "white" : accentColor }} />
</div>

<div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

<div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t pointer-events-none z-10 ${
isDark ? "from-black/60 to-transparent" : "from-white/60 to-transparent"
}`} />

<div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
<motion.div 
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.5, duration: 0.8 }}
className="flex items-center gap-3 mb-2"
>
<motion.div 
whileHover={{ scale: 1.1, rotate: 5 }}
className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden group/icon`}
>
<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity" />
<ShieldCheck className="w-5 h-5 text-white relative z-10" />
</motion.div>
<div className="flex flex-col">
<div className="flex items-center gap-2 mb-0.5">
<span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[6px] font-black uppercase tracking-[0.3em] border border-white/20 backdrop-blur-sm">
Secure Access
</span>
<span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
</div>
<span className="text-sm font-black tracking-tighter uppercase text-white drop-shadow-md">
Central de <span className="text-white/70">Autenticação</span>
</span>
</div>
</motion.div>

<div className="flex items-baseline gap-2">
<motion.h1 
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.7, duration: 0.8 }}
className="text-3xl font-black tracking-tighter uppercase text-white leading-none mb-1 whitespace-nowrap"
>
Pardim <span className="text-white/40">Rezende</span>
</motion.h1>
</div>
<motion.p 
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1 }}
className="text-[8px] font-black uppercase tracking-[0.4em] text-white/50"
>
Sistema Integrado de Gestão Master
</motion.p>
</div>
</div>

{/* FORM CONTENT */}
<div className="p-8">
<form onSubmit={handleLogin} className="space-y-6">
<div className="space-y-4">
<div className="space-y-2">
<div className="flex items-center justify-between px-2">
<label className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
<User className="w-3 h-3" /> Usuário
</label>
</div>
<div className="relative group">
<div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 pointer-events-none ${
isDark ? "text-slate-700 group-focus-within:text-blue-500" : "text-slate-300 group-focus-within:text-blue-600"
}`}>
<Fingerprint className="w-5 h-5 group-focus-within:scale-110 transition-transform" />
</div>
<input 
type="text" 
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="USUÁRIO DE ACESSO"
className={`w-full pl-14 pr-6 py-6 rounded-[1.8rem] outline-none transition-all border font-black text-base ${
isDark 
? "bg-white/[0.03] border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-800 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/5" 
: "bg-slate-50/50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-300 shadow-inner focus:bg-white focus:ring-4 focus:ring-blue-500/5"
}`}
/>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center px-2">
<label className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
<Lock className="w-3 h-3" /> Senha
</label>
<motion.a 
href="#" 
whileHover={{ x: -2, color: accentColor }}
className={`text-[8px] font-black uppercase tracking-widest transition-all ${
isDark ? "text-slate-600" : "text-slate-400"
}`}
>
Esqueceu a senha?
</motion.a>
</div>
<div className="relative group">
<div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 pointer-events-none ${
isDark ? "text-slate-700 group-focus-within:text-blue-500" : "text-slate-300 group-focus-within:text-blue-600"
}`}>
<Key className="w-5 h-5 group-focus-within:scale-110 transition-transform" />
</div>
<input 
type="password" 
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="••••••••••••"
className={`w-full pl-14 pr-6 py-6 rounded-[1.8rem] outline-none transition-all border font-black text-base ${
isDark 
? "bg-white/[0.03] border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-800 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/5" 
: "bg-slate-50/50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-300 shadow-inner focus:bg-white focus:ring-4 focus:ring-blue-500/5"
}`}
/>
</div>
</div>
</div>

<div className="space-y-6">
<motion.button 
type="submit"
whileHover={{ 
scale: 1.02, 
y: -4, 
boxShadow: `0 25px 50px -12px ${isDark ? 'rgba(26,108,247,0.6)' : 'rgba(26,108,247,0.4)'}, 0 0 30px ${accentColor}40` 
}}
whileTap={{ scale: 0.98 }}
className={`w-full py-5 rounded-[2rem] font-black transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden shadow-xl border border-white/20 bg-[#1A6CF7] text-white`}
>
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
<span className="relative z-10 tracking-[0.3em] uppercase text-[8px] font-black">Validar Credenciais</span>
<div className="relative z-10 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 shadow-xl backdrop-blur-sm border border-white/30">
<ArrowRight className="w-3.5 h-3.5 text-white" />
</div>
<Zap className="absolute -left-4 -bottom-4 w-16 h-16 text-white/10 group-hover:scale-125 transition-transform duration-700" />
</motion.button>

<div className="relative flex items-center gap-4 py-2">
<div className={`flex-1 h-[1px] ${isDark ? "bg-white/10" : "bg-slate-900/10"}`} />
<span className={`text-[8px] font-black uppercase tracking-[0.6em] transition-all duration-500 px-5 py-2 rounded-full ${
isDark ? "text-slate-600 bg-white/5 shadow-inner border border-white/5" : "text-slate-500 bg-white shadow-lg border border-blue-500/10"
}`}>
Novo por aqui?
</span>
<div className={`flex-1 h-[1px] ${isDark ? "bg-white/10" : "bg-slate-900/10"}`} />
</div>

<motion.button 
type="button"
onClick={() => setIsRequestModalOpen(true)}
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.98 }}
className={`w-full py-4 rounded-[1.8rem] font-black transition-all duration-500 flex items-center justify-center gap-3 border-2 ${
isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
}`}
>
<UserPlus className="w-4 h-4 text-blue-500" />
<span className="tracking-[0.2em] uppercase text-[8px] font-black">Solicitar Acesso ao Sistema</span>
</motion.button>
</div>
</form>

<div className="mt-8 pt-8 border-t border-white/[0.05] flex flex-col items-center gap-4">
<div className="flex items-center gap-3 w-full px-4">
<div className={`flex-1 h-[1px] ${isDark ? "bg-white/10" : "bg-slate-900/10"}`} />
<span className={`text-[8px] font-black tracking-[0.5em] uppercase transition-all duration-500 px-5 py-2 rounded-full ${
isDark ? "text-slate-100/30 bg-white/5" : "text-slate-900/40 bg-white shadow-md"
}`}>
Auto Escola Hub
</span>
<div className={`flex-1 h-[1px] ${isDark ? "bg-white/10" : "bg-slate-900/10"}`} />
</div>
</div>
</div>
</div>
</motion.div>

<FormModal 
isOpen={isRequestModalOpen}
onClose={() => setIsRequestModalOpen(false)}
title="Solicitar Acesso"
subtitle="Preencha seus dados para solicitar acesso ao administrador"
accentColor="blue"
fields={[
{ label: "Nome Completo", name: "nome", type: "text", placeholder: "Seu nome completo" },
{ label: "E-mail para Contato", name: "email", type: "text", placeholder: "seu@email.com" },
{ label: "Cargo / Função", name: "cargo", type: "text", placeholder: "Ex: Instrutor, Secretária..." },
{ label: "Motivo do Acesso", name: "motivo", type: "textarea", placeholder: "Descreva por que você precisa de acesso ao sistema..." }
]}
onSubmit={handleRequestLogin}
/>
</div>
);
}
