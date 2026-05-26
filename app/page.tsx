import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { MenuSection } from "@/components/landing/MenuSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { LeadForm } from "@/components/landing/LeadForm";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <MenuSection />
        <GallerySection />
        <LeadForm />
      </main>
      <WhatsAppButton />
      
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8 text-center text-muted-foreground text-sm">
        <div className="max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} LA MEZCLA PERFECTA. Servicio premium en Lima y Callao.</p>
        </div>
      </footer>
    </>
  );
}

