"use client";

import { useState, useEffect } from "react";
import { Martini, Menu, X } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Servicios", href: "#servicios" },
    { name: "Carta Base", href: "#carta" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-[var(--color-border)] py-4 shadow-lg"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-gold)/30] flex items-center justify-center transition-transform group-hover:scale-105 duration-300 bg-[var(--color-surface)]">
            <img 
              src="/images/logo.png" 
              alt="Logo LUMEN OPEN BAR" 
              className="w-full h-full object-cover scale-[1.05]"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-widest text-gradient-gold uppercase select-none">
            LUMEN <span className="font-light">OPEN BAR</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-[var(--color-gold-light)] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          
          {/* Social Icons in Navbar */}
          <div className="flex items-center gap-4 border-l border-[var(--color-border)] pl-6">
            <a 
              href="https://facebook.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-colors duration-200 flex items-center gap-1.5 group"
              aria-label="Facebook de LUMEN OPEN BAR"
            >
              <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-wider hidden lg:inline-block">LUMEN OPEN BAR</span>
            </a>
            <a 
              href="https://instagram.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-colors duration-200 flex items-center gap-1.5 group"
              aria-label="Instagram de LUMEN OPEN BAR"
            >
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-wider hidden lg:inline-block">@lumenopenbar</span>
            </a>
          </div>

          <a
            href="#cotizar"
            className="btn-primary py-2 px-6 text-sm font-semibold rounded-lg shadow-sm"
          >
            Cotizar Evento
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Menu de navegación"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-[var(--color-border)] px-6 py-6 absolute top-full left-0 right-0 z-40 flex flex-col gap-4 animate-slide-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-[var(--color-border-light)] text-muted-foreground hover:text-[var(--color-gold-light)]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cotizar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary py-3 text-center mt-2 font-semibold"
          >
            Cotizar Evento
          </a>
          {/* Mobile Social Icons */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-[var(--color-border)] mt-2">
            <a 
              href="https://facebook.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-colors duration-200 flex flex-col items-center gap-1.5 text-xs font-semibold"
            >
              <FacebookIcon className="w-5 h-5" /> LUMEN OPEN BAR
            </a>
            <a 
              href="https://instagram.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-colors duration-200 flex flex-col items-center gap-1.5 text-xs font-semibold"
            >
              <InstagramIcon className="w-5 h-5" /> @lumenopenbar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
