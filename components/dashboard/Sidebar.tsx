"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, LogOut, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

import { logout } from "@/app/login/actions";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads (CRM)", href: "/leads", icon: Users },
    { name: "Contenido", href: "/posts", icon: Calendar },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-[var(--color-border)]">
        <div className="w-8 h-8 rounded bg-[var(--color-gold)] flex items-center justify-center">
          <Wine className="w-5 h-5 text-black" />
        </div>
        <span className="font-display font-bold text-lg tracking-wider text-gradient-gold uppercase select-none">
          LA MEZCLA PERFECTA
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "sidebar-link",
                isActive ? "active" : ""
              )}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-border)]">
        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[var(--color-surface-light)] rounded-md transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
