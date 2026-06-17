"use client";

import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";

export function SocialSidebar() {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-3.5 rounded-full border border-[var(--color-border)] bg-background/60 backdrop-blur-md shadow-2xl animate-fade-in hover:border-[var(--color-gold)]/40 transition-all duration-300">
      <a 
        href="https://facebook.com/lumenopenbar" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-all duration-300 p-2 rounded-full hover:bg-[var(--color-surface)] hover:scale-110 flex items-center justify-center"
        aria-label="Facebook de LUMEN OPEN BAR"
      >
        <FacebookIcon className="w-7 h-7" />
      </a>
      <div className="w-full h-[1px] bg-[var(--color-border)]" />
      <a 
        href="https://instagram.com/lumenopenbar" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-all duration-300 p-2 rounded-full hover:bg-[var(--color-surface)] hover:scale-110 flex items-center justify-center"
        aria-label="Instagram de LUMEN OPEN BAR"
      >
        <InstagramIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
