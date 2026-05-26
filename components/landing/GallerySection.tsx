"use client";

import { useState } from "react";
import { Martini, GlassWater, Sparkles } from "lucide-react";

interface GalleryItem {
  src: string;
  name: string;
  category: "cocktails" | "mocktails";
  description: string;
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "cocktails" | "mocktails">("all");

  const items: GalleryItem[] = [
    {
      src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
      name: "Negroni de Autor",
      category: "cocktails",
      description: "Gin premium macerado en cítricos con vermouth artesanal y Campari."
    },
    {
      src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
      name: "Whisky Sour Premium",
      category: "cocktails",
      description: "Textura sedosa con Bourbon añejado, limón norteño y perfume de naranja."
    },
    {
      src: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=800&auto=format&fit=crop",
      name: "Dry Martini Elegante",
      category: "cocktails",
      description: "El rey indiscutible de la coctelería clásica, servido a temperatura glacial."
    },
    {
      src: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=800&auto=format&fit=crop",
      name: "Berry Lemonade",
      category: "mocktails",
      description: "Explosión burbujeante de frutos rojos seleccionados y limón fresco."
    },
    {
      src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop",
      name: "Cucumber Mint Refresher",
      category: "mocktails",
      description: "Frescura botánica pura con notas herbales y agua tónica artesanal."
    },
    {
      src: "https://images.unsplash.com/photo-1595981267035-7b04ec82a897?q=80&w=800&auto=format&fit=crop",
      name: "Sunset Cooler Tropical",
      category: "mocktails",
      description: "Un deleite visual cítrico y dulce elaborado en capas perfectas."
    }
  ];

  const filteredItems = items.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="experiencia" className="section-padding bg-background relative overflow-hidden border-t border-[var(--color-border)]">
      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[var(--color-gold)] opacity-[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="text-xs font-semibold tracking-wider text-[var(--color-gold-light)] uppercase">
              Visualiza el Arte
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">La Experiencia</h2>
          <div className="divider-gold"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Déjate cautivar por la presentación impecable de nuestras creaciones. Un deleite visual que anticipa una combinación de sabores inolvidable.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap animate-fade-in-up delay-200">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeCategory === "all"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)] animate-fade-in"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            Ver Todo
          </button>
          <button
            onClick={() => setActiveCategory("cocktails")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeCategory === "cocktails"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)] animate-fade-in"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            <Martini className="w-3.5 h-3.5" />
            Cócteles Premium
          </button>
          <button
            onClick={() => setActiveCategory("mocktails")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeCategory === "mocktails"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)] animate-fade-in"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            <GlassWater className="w-3.5 h-3.5" />
            Mocteles de Autor
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-[var(--color-border)] hover:border-[var(--color-gold)/40] transition-all duration-500 shadow-lg"
            >
              {/* Dynamic Badges */}
              <div className="absolute top-4 right-4 z-20">
                <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border ${
                  item.category === "cocktails" 
                    ? "bg-red-500/10 text-red-400 border-red-500/20" 
                    : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                }`}>
                  {item.category === "cocktails" ? "Con Alcohol" : "Sin Alcohol"}
                </span>
              </div>

              {/* Gold Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10 flex flex-col justify-end p-6" />
              
              {/* Image */}
              <img 
                src={item.src}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-[1.06] transition-transform duration-700"
              />

              {/* Hover Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-display font-bold text-[var(--color-gold-light)] mb-1.5 drop-shadow">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
