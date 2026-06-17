import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { MenuSection } from "@/components/landing/MenuSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <MenuSection />
        <LeadForm />
      </main>
      <WhatsAppButton />
      
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-12 text-muted-foreground text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-base tracking-widest text-gradient-gold uppercase block mb-1">
              LUMEN <span className="font-light">OPEN BAR</span>
            </span>
            <p className="text-xs">© {new Date().getFullYear()} Servicio premium en Lima y Callao. Todos los derechos reservados.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-all duration-300 p-2.5 rounded-full border border-[var(--color-border)] bg-background/40 hover:bg-background/80 shadow-md flex items-center justify-center hover:scale-105"
              aria-label="Facebook de LUMEN OPEN BAR"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/lumenopenbar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-[var(--color-gold-light)] transition-all duration-300 p-2.5 rounded-full border border-[var(--color-border)] bg-background/40 hover:bg-background/80 shadow-md flex items-center justify-center hover:scale-105"
              aria-label="Instagram de LUMEN OPEN BAR"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

