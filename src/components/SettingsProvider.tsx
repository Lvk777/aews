"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AccentColor = "mint" | "blue" | "orange" | "purple" | "red" | "pink" | null;
export type InterfaceDensity = "compact" | "standard" | "wide";

export interface ZapTemplate {
  id: string;
  name: string;
  content: string;
  boxStyle?: string;
}

interface SettingsContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  language: string;
  setLanguage: (lang: string) => void;
  density: InterfaceDensity;
  setDensity: (d: InterfaceDensity) => void;
  brandName: string;
  setBrandName: (name: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (enabled: boolean) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  notifications: any;
  setNotifications: (n: any) => void;
  preferences: any;
  setPreferences: (p: any) => void;
  zapTemplates: ZapTemplate[];
  setZapTemplates: (t: ZapTemplate[]) => void;
  adminProfile: { name: string; role: string; email: string };
  setAdminProfile: (p: { name: string; role: string; email: string }) => void;
  activeSessions: any[];
  globalAccentHex: string | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const accentColorMap: Record<Exclude<AccentColor, null>, string> = {
  mint: "#00E5A0",
  blue: "#1A6CF7",
  orange: "#F59E0B",
  purple: "#7C3AED",
  red: "#EF4444",
  pink: "#ec4899",
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState<AccentColor>(null);
  const globalAccentHex = accentColor ? accentColorMap[accentColor as Exclude<AccentColor, null>] : null;

  const [language, setLanguage] = useState("pt");
  const [density, setDensity] = useState<InterfaceDensity>("standard");
  const [brandName, setBrandName] = useState("Pardim Rezende");
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({ 
    push: true, 
    email: true, 
    sms: false,
    visualAlerts: true,
    inboxReports: true
  });
  const [preferences, setPreferences] = useState({
    cloudBackup: true,
    privacy: false
  });
  const [zapTemplates, setZapTemplates] = useState<ZapTemplate[]>([
    { id: "1", name: "Lembrete de Aula", content: "Olá {{nome}}, passando para lembrar da sua aula no dia {{data}}." },
    { id: "2", name: "Confirmação de Matrícula", content: "Bem-vindo {{nome}}! Sua matrícula foi confirmada." }
  ]);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin Pardim",
    role: "Gerente Administrativo",
    email: "admin@pardim.com.br"
  });

  const activeSessions = [
    { id: "1", device: "MacBook Pro - Chrome", location: "Belo Horizonte, BR", time: "Ativo agora", active: true },
    { id: "2", device: "iPhone 15 - Safari", location: "Belo Horizonte, BR", time: "Há 2 horas", active: false }
  ];

  useEffect(() => {
    const savedColor = localStorage.getItem("pardim-accent-color") as AccentColor;
    if (savedColor && accentColorMap[savedColor as Exclude<AccentColor, null>]) setAccentColor(savedColor);
    else if (savedColor === "null") setAccentColor(null);
    
    const savedLang = localStorage.getItem("pardim-language");
    if (savedLang) setLanguage(savedLang);

    const savedDensity = localStorage.getItem("pardim-density") as InterfaceDensity;
    if (savedDensity) setDensity(savedDensity);

    const savedBrand = localStorage.getItem("pardim-brand");
    if (savedBrand) setBrandName(savedBrand);

    const savedLogo = localStorage.getItem("pardim-logo");
    if (savedLogo) setLogoUrl(savedLogo);

    const savedMaintenance = localStorage.getItem("pardim-maintenance");
    if (savedMaintenance) setMaintenanceMode(JSON.parse(savedMaintenance));

    const savedNotifs = localStorage.getItem("pardim-notifications");
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

    const savedPrefs = localStorage.getItem("pardim-preferences");
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));

    const savedZap = localStorage.getItem("pardim-zap-templates");
    if (savedZap) setZapTemplates(JSON.parse(savedZap));

    const saved2FA = localStorage.getItem("pardim-2fa");
    if (saved2FA) setTwoFactorEnabled(JSON.parse(saved2FA));

    const savedProfile = localStorage.getItem("pardim-profile");
    if (savedProfile) setAdminProfile(JSON.parse(savedProfile));
  }, []);

  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
    localStorage.setItem("pardim-accent-color", color);
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("pardim-language", lang);
  };

  const handleSetDensity = (d: InterfaceDensity) => {
    setDensity(d);
    localStorage.setItem("pardim-density", d);
  };

  const handleSetBrandName = (name: string) => {
    setBrandName(name);
    localStorage.setItem("pardim-brand", name);
  };

  const handleSetLogoUrl = (url: string) => {
    setLogoUrl(url);
    localStorage.setItem("pardim-logo", url);
  };

  const handleSetMaintenanceMode = (enabled: boolean) => {
    setMaintenanceMode(enabled);
    localStorage.setItem("pardim-maintenance", JSON.stringify(enabled));
  };

  const handleSet2FA = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    localStorage.setItem("pardim-2fa", JSON.stringify(enabled));
  };

  const handleSetNotifications = (n: any) => {
    setNotifications(n);
    localStorage.setItem("pardim-notifications", JSON.stringify(n));
  };

  const handleSetPreferences = (p: any) => {
    setPreferences(p);
    localStorage.setItem("pardim-preferences", JSON.stringify(p));
  };

  const handleSetZapTemplates = (t: ZapTemplate[]) => {
    setZapTemplates(t);
    localStorage.setItem("pardim-zap-templates", JSON.stringify(t));
  };

  const handleSetAdminProfile = (p: { name: string; role: string; email: string }) => {
    setAdminProfile(p);
    localStorage.setItem("pardim-profile", JSON.stringify(p));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (accentColor && accentColorMap[accentColor as Exclude<AccentColor, null>]) {
      const hex = accentColorMap[accentColor as Exclude<AccentColor, null>];
        root.style.setProperty("--primary-main", hex);
        root.style.setProperty("--primary-glow", `${hex}B3`);
      } else {
      root.style.removeProperty("--primary-main");
      root.style.removeProperty("--primary-glow");
    }
    
    if (density === "compact") {
      root.style.setProperty("--spacing-multiplier", "0.8");
    } else if (density === "wide") {
      root.style.setProperty("--spacing-multiplier", "1.2");
    } else {
      root.style.setProperty("--spacing-multiplier", "1");
    }
  }, [accentColor, density]);

  return (
    <SettingsContext.Provider value={{ 
      accentColor, 
      setAccentColor: handleSetAccentColor,
      language,
      setLanguage: handleSetLanguage,
      density,
      setDensity: handleSetDensity,
      brandName, 
      setBrandName: handleSetBrandName,
      logoUrl,
      setLogoUrl: handleSetLogoUrl,
      maintenanceMode,
      setMaintenanceMode: handleSetMaintenanceMode,
      twoFactorEnabled, 
      setTwoFactorEnabled: handleSet2FA,
      notifications,
      setNotifications: handleSetNotifications,
      preferences,
      setPreferences: handleSetPreferences,
      zapTemplates,
      setZapTemplates: handleSetZapTemplates,
      adminProfile,
      setAdminProfile: handleSetAdminProfile,
      activeSessions,
      globalAccentHex
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
