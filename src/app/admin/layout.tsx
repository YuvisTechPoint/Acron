"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  CreditCard,
  Link2,
  CalendarDays,
  FolderOpen,
  BookOpen,
  GraduationCap,
  Scale,
  FileCode,
  FileCheck2,
  Eye,
  Globe,
  Image,
  FileText,
  Code,
  Search,
  Bell,
  ShieldCheck,
  Users,
  BarChart3,
  ClipboardList,
  HelpCircle,
  Settings,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    group: "Core Operations",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Service Requests", href: "/admin/requests", icon: Inbox },
      { label: "Legal Cases", href: "/admin/cases", icon: Briefcase },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Payment Links", href: "/admin/payment-links", icon: Link2 },
      { label: "Subscriptions", href: "/admin/subscriptions", icon: CalendarDays },
    ],
  },
  {
    group: "Practice & Knowledge",
    items: [
      { label: "Directory", href: "/admin/directory", icon: FolderOpen },
      { label: "Catalogue", href: "/admin/catalogue", icon: BookOpen },
      { label: "Knowledge Base", href: "/admin/kb", icon: BookOpen },
      { label: "LMS Courses", href: "/admin/lms/courses", icon: GraduationCap },
      { label: "Public Q&A", href: "/admin/questions", icon: HelpCircle },
      { label: "FAQs Manager", href: "/admin/faq", icon: HelpCircle },
      { label: "Services CMS", href: "/admin/services", icon: Briefcase },
    ],
  },
  {
    group: "Legal & Regulatory",
    items: [
      { label: "Rules Registry", href: "/admin/legal/rules", icon: Scale },
      { label: "Draft Templates", href: "/admin/legal/templates", icon: FileCheck2 },
      { label: "Precedent Watch", href: "/admin/legal/watch", icon: Eye },
      { label: "Compliance Calendars", href: "/admin/legal/calendars", icon: CalendarDays },
      { label: "POSH IC Docket", href: "/posh/ic", icon: ShieldCheck },
    ],
  },
  {
    group: "Operations & Launch",
    items: [
      { label: "Ops Command Centre", href: "/admin/ops", icon: Activity },
      { label: "Go-Live Gate", href: "/admin/ops/gate", icon: CheckCircle2 },
      { label: "DR Drills & Tamper", href: "/admin/ops/dr", icon: AlertTriangle },
      { label: "SOP Recurrence", href: "/admin/ops/sop", icon: ClipboardList },
    ],
  },
  {
    group: "System & Governance",
    items: [
      { label: "Site Configuration", href: "/admin/site", icon: Globe },
      { label: "Media Vault", href: "/admin/media", icon: Image },
      { label: "Static Pages", href: "/admin/pages", icon: FileText },
      { label: "Articles CMS", href: "/admin/posts", icon: FileCode },
      { label: "Script Injection", href: "/admin/scripts", icon: Code },
      { label: "SEO Meta", href: "/admin/seo", icon: Search },
      { label: "Audit Logs", href: "/admin/audit", icon: ShieldCheck },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Users & Roles", href: "/admin/users", icon: Users },
      { label: "Reports & KPIs", href: "/admin/reports", icon: BarChart3 },
      { label: "Surveys", href: "/admin/surveys", icon: ClipboardList },
      { label: "Helpdesk", href: "/admin/helpdesk", icon: HelpCircle },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem("acorn_admin_theme") as "light" | "dark") || "light";
    setTheme(saved);

    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("acorn_admin_theme_change", onThemeChange);
    return () => window.removeEventListener("acorn_admin_theme_change", onThemeChange);
  }, []);

  // If on login screen, render clean standalone view
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Derive current title for breadcrumb
  const currentItem = NAV_GROUPS.flatMap((g) => g.items).find(
    (item) => item.href === pathname
  );
  const currentTitle = currentItem?.label || "Admin Console";

  return (
    <div
      id="admin-root"
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-200 ${
        theme === "dark" ? "admin-dark dark bg-ink-950 text-white" : "bg-ivory-50 text-ink"
      }`}
    >
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-ink-950 text-white px-4 py-3 flex items-center justify-between border-b border-navy-800 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-btn hover:bg-navy-900 text-slate-300 hover:text-white"
            aria-label="Toggle admin navigation menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="font-serif font-bold text-base text-white">ACORN ADMIN</div>
        </div>

        <div className="flex items-center gap-2">
          <AdminThemeToggle compact />
          <Link
            href="/"
            className="text-xs text-brass-300 hover:text-white flex items-center gap-1 p-1.5"
            title="Open Public Chambers Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Admin Navy Sidebar (Desktop & Drawer on Mobile) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 w-64 bg-ink-950 text-white border-r border-navy-800/80 flex flex-col justify-between transition-transform duration-200 h-screen overflow-y-auto ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5">
          {/* Logo Monogram */}
          <Link
            href="/admin"
            className="flex items-center gap-3 pb-6 border-b border-navy-800/80 group"
          >
            <div className="w-9 h-9 rounded-btn bg-navy-800 border border-brass-500/40 flex items-center justify-center text-brass-300 shrink-0">
              <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
                <path
                  d="M16 6 L7 26 H11 L13.5 20 H18.5 L21 26 H25 L16 6 Z M14.5 17 L16 11.5 L17.5 17 H14.5 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <div className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                ACORN LEGAL
              </div>
              <div className="font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-brass-300 mt-1">
                Admin Control System
              </div>
            </div>
          </Link>

          {/* Navigation Groups */}
          <nav className="mt-5 space-y-6" aria-label="Admin Navigation">
            {NAV_GROUPS.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <div className="px-3 text-[10px] uppercase font-semibold tracking-wider text-brass-300/70 mb-2">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-all ${
                        isActive
                          ? "bg-navy-800 text-white font-semibold border-l-2 border-brass-500 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-navy-900/60"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-brass-500" : "text-slate-400"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* User Identity Footer */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-900/40">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate">
              <div className="font-semibold text-white truncate">Adv. Subhasish Mukherjee</div>
              <div className="text-[10px] text-slate-400">Managing Partner &bull; Kolkata</div>
            </div>
            <Link
              href="/admin/login"
              title="Logout"
              className="p-1.5 rounded hover:bg-navy-800 text-slate-400 hover:text-brass-300 transition"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar for Desktop */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-border shadow-card sticky top-0 z-30">
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <Link href="/admin" className="hover:text-navy-700 transition">
              Console
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <span className="font-semibold text-ink-950">{currentTitle}</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Live Operational Indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>Production Platform v2.0</span>
            </div>

            <div className="w-[1px] h-4 bg-border" />

            {/* Dark & Light Mode Toggle */}
            <AdminThemeToggle />

            <div className="w-[1px] h-4 bg-border" />

            <Link
              href="/"
              className="text-xs font-semibold text-navy-700 hover:text-blue-600 flex items-center gap-1.5 transition"
            >
              <span>Chambers Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-brass-500" />
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Concise Admin Status Footer */}
        <footer className="px-8 py-3 bg-white border-t border-border text-[11px] text-ink-muted flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            Acorn Legal Consultants &bull; Practice &amp; Redressal Docket &bull; Confidential
          </div>
          <div>
            Kolkata Chambers &bull; Park Street District &bull; Version 2.0.4
          </div>
        </footer>

      </div>

    </div>
  );
}

