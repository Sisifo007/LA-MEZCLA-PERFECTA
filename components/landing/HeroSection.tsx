import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="hero-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
        {/* Brand Logo - Centered and highly visible */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] flex items-center justify-center animate-float mb-2 drop-shadow-[0_0_45px_rgba(201,168,76,0.35)]">
            <img 
              src="/images/logo.png" 
              alt="Logo LUMEN OPEN BAR" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold animate-fade-in delay-200">
            <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse-gold"></span>
            <span className="text-sm font-medium tracking-wide text-[var(--color-gold-light)] uppercase">
              Servicio Premium en Lima y Callao
            </span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Elevamos el nivel de <br />
          <span className="text-gradient-gold font-style-italic">tu celebración</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in delay-300">
          Coctelería y moctelería artesanal para bodas, eventos corporativos y fiestas privadas. Cócteles con y sin alcohol preparados por bartenders profesionales.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
          <a href="#cotizar" className="btn-primary w-full sm:w-auto">
            Cotiza tu evento <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <a href="#servicios" className="btn-secondary w-full sm:w-auto">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
