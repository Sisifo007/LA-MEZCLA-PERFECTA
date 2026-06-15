"use client";

import { useState } from "react";
import { Martini, GlassWater, Sparkles } from "lucide-react";

interface MenuItem {
  name: string;
  category: "cocktails" | "mocktails";
  ingredients: string;
  description: string;
  image: string;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "cocktails" | "mocktails">("all");

  const menuItems: MenuItem[] = [
    // Cócteles con alcohol
    {
      name: "Pisco Sour",
      category: "cocktails",
      ingredients: "Pisco Quebranta, limón norteño, jarabe de goma, clara de huevo y amargo de Angostura.",
      description: "La joya de la coctelería peruana. Un balance perfecto entre la acidez del limón, el dulzor del jarabe y el carácter del pisco.",
      image: "/images/pisco-sour-v2.png"
    },
    {
      name: "Mojito Clásico",
      category: "cocktails",
      ingredients: "Ron blanco, hierba buena fresca, jugo de lima, jarabe de goma y agua con gas.",
      description: "Directamente desde el Caribe, un trago sumamente refrescante con el aroma inconfundible de la hierba buena macerada al instante.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Margarita Clásica",
      category: "cocktails",
      ingredients: "Tequila reposado, triple sec, jugo de lima fresca y borde escarchado de sal.",
      description: "Un clásico mexicano sofisticado y cítrico que resalta las notas herbales del agave azul con el balance del licor de naranja.",
      image: "/images/margarita-clasica-v2.png"
    },
    {
      name: "Old Fashioned",
      category: "cocktails",
      ingredients: "Whisky Bourbon, azúcar, amargo de Angostura y piel de naranja fresca.",
      description: "Para los amantes de los sabores intensos y maduros. El cóctel más icónico de la historia, perfumado con cítricos.",
      image: "/images/old-fashioned.png"
    },
    {
      name: "Negroni",
      category: "cocktails",
      ingredients: "Gin premium, Campari, Vermouth Rosso y twist de naranja.",
      description: "El balance italiano perfecto entre el amargor de las hierbas, el dulzor del vermut y la potencia de la ginebra.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Daiquiri de Lima",
      category: "cocktails",
      ingredients: "Ron blanco, jugo de lima exprimido y jarabe de goma.",
      description: "Simple, elegante y refrescante. Un trago puramente cítrico batido en coctelera para lograr una textura ideal.",
      image: "/images/daiquiri-lima-v2.png"
    },
    {
      name: "Cosmopolitan",
      category: "cocktails",
      ingredients: "Vodka, triple sec, jugo de arándano y jugo de lima fresca.",
      description: "Fino y glamoroso, de un color rosa vibrante y un equilibrio exacto entre el sabor cítrico y afrutado.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Whisky Sour",
      category: "cocktails",
      ingredients: "Whisky Bourbon, limón, jarabe de goma y clara de huevo para la espuma.",
      description: "Suave textura sedosa y espuma persistente que equilibra la potencia del Bourbon con las notas cítricas del limón.",
      image: "/images/whisky-sour.png"
    },
    // Mocktails (Sin alcohol)
    {
      name: "Virgin Mojito",
      category: "mocktails",
      ingredients: "Hierba buena seleccionada, limones frescos, jarabe de goma y soda helada.",
      description: "Toda la frescura cítrica y aromática del mojito tradicional, pero 100% libre de alcohol. Ideal para cualquier momento.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Virgin Piña Colada",
      category: "mocktails",
      ingredients: "Pulpa de piña madura, crema de coco gourmet, hielo licuado y fresas frescas.",
      description: "Textura cremosa y un sabor tropical insuperable. Un clásico sin alcohol dulce, refrescante y reconfortante.",
      image: "/images/virgin-pina-colada.png"
    },
    {
      name: "Berry Lemonade",
      category: "mocktails",
      ingredients: "Mix de frutos rojos (fresa y arándano), jugo de limón, jarabe y soda.",
      description: "Una explosión burbujeante y frutal de color intenso que combina la acidez del limón con el dulzor natural de las bayas.",
      image: "/images/berry-lemonade.png"
    },
    {
      name: "Sunset Cooler Tropical",
      category: "mocktails",
      ingredients: "Jugo de maracuyá, néctar de mango, un toque de granadina y ginger ale.",
      description: "Los hermosos colores del atardecer capturados en una bebida dulce, vibrante y refrescante con todo el sabor del trópico.",
      image: "/images/sunset-cooler-tropical.png"
    },

  ];

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="carta" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-gold)] opacity-[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="text-xs font-semibold tracking-wider text-[var(--color-gold-light)] uppercase">
              Catálogo de Eventos
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestra Carta Base</h2>
          <div className="divider-gold"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Explora una selección exclusiva de cócteles clásicos y mocktails (sin alcohol) preparados con insumos de primera calidad y técnicas artesanales.
          </p>
        </div>

        {/* Category Tabs Selector */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap animate-fade-in-up delay-200">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === "all"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)]"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            Todo el Menú
          </button>
          <button
            onClick={() => setActiveCategory("cocktails")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeCategory === "cocktails"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)]"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            <Martini className="w-4 h-4" />
            Coctelería Clásica
          </button>
          <button
            onClick={() => setActiveCategory("mocktails")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeCategory === "mocktails"
                ? "bg-[var(--color-gold)] text-[var(--color-background)] font-bold shadow-[0_4px_15px_rgba(201,168,76,0.35)]"
                : "bg-[var(--color-surface)] text-muted-foreground hover:text-foreground border border-[var(--color-border)]"
            }`}
          >
            <GlassWater className="w-4 h-4" />
            Moctelería (Sin alcohol)
          </button>
        </div>

        {/* Menu Grid - Highly Visual Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="card-glass hover:scale-[1.02] flex flex-col justify-between overflow-hidden group transition-all duration-300 h-full border border-[var(--color-border)] hover:border-[var(--color-gold)] p-0"
            >
              {/* Card Image Header */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border ${
                    item.category === "cocktails" 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                  }`}>
                    {item.category === "cocktails" ? "Con Alcohol" : "Sin Alcohol"}
                  </span>
                </div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Card Details Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-gold-light)] transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border-light)] mt-auto">
                  <span className="text-xs font-semibold text-[var(--color-gold-light)] block mb-1">
                    Ingredientes principales:
                  </span>
                  <p className="text-xs text-muted-foreground italic">
                    {item.ingredients}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
