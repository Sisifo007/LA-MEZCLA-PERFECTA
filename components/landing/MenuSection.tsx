"use client";

import { useState } from "react";
import { Martini, GlassWater, Sparkles } from "lucide-react";

interface MenuItem {
  name: string;
  category: "cocktails" | "mocktails";
  icon: string;
  ingredients: string;
  description: string;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "cocktails" | "mocktails">("all");

  const menuItems: MenuItem[] = [
    // Cócteles con alcohol
    {
      name: "Pisco Sour",
      category: "cocktails",
      icon: "🍸",
      ingredients: "Pisco Quebranta, limón norteño, jarabe de goma, clara de huevo y amargo de Angostura.",
      description: "La joya de la coctelería peruana. Un balance perfecto entre la acidez del limón, el dulzor del jarabe y el carácter del pisco."
    },
    {
      name: "Mojito Clásico",
      category: "cocktails",
      icon: "🍃",
      ingredients: "Ron blanco, hierba buena fresca, jugo de lima, jarabe de goma y agua con gas.",
      description: "Directamente desde el Caribe, un trago sumamente refrescante con el aroma inconfundible de la hierba buena macerada al instante."
    },
    {
      name: "Margarita",
      category: "cocktails",
      icon: "🧂",
      ingredients: "Tequila reposado, triple sec, jugo de lima fresca y borde escarchado de sal.",
      description: "Un clásico mexicano sofisticado y cítrico que resalta las notas herbales del agave azul con el balance del licor de naranja."
    },
    {
      name: "Old Fashioned",
      category: "cocktails",
      icon: "🥃",
      ingredients: "Whisky Bourbon, azúcar, amargo de Angostura y piel de naranja fresca.",
      description: "Para los amantes de los sabores intensos y maduros. El cóctel más icónico de la historia, perfumado con cítricos."
    },
    {
      name: "Negroni",
      category: "cocktails",
      icon: "🍊",
      ingredients: "Gin premium, Campari, Vermouth Rosso y twist de naranja.",
      description: "El balance italiano perfecto entre el amargor de las hierbas, el dulzor del vermut y la potencia de la ginebra."
    },
    {
      name: "Daiquiri de Lima",
      category: "cocktails",
      icon: "🍋",
      ingredients: "Ron blanco, jugo de lima exprimido y jarabe de goma.",
      description: "Simple, elegante y refrescante. Un trago puramente cítrico batido en coctelera para lograr una textura ideal."
    },
    {
      name: "Cosmopolitan",
      category: "cocktails",
      icon: "🍒",
      ingredients: "Vodka, triple sec, jugo de arándano y jugo de lima fresca.",
      description: "Fino y glamoroso, de un color rosa vibrante y un equilibrio exacto entre el sabor cítrico y afrutado."
    },
    {
      name: "Whisky Sour",
      category: "cocktails",
      icon: "🥃",
      ingredients: "Whisky Bourbon, limón, jarabe de goma y clara de huevo para la espuma.",
      description: "Suave textura sedosa y espuma persistente que equilibra la potencia del Bourbon con las notas cítricas del limón."
    },
    // Mocktails (Sin alcohol)
    {
      name: "Virgin Mojito",
      category: "mocktails",
      icon: "🍹",
      ingredients: "Hierba buena seleccionada, limones frescos, jarabe de goma y soda helada.",
      description: "Toda la frescura cítrica y aromática del mojito tradicional, pero 100% libre de alcohol. Ideal para cualquier momento."
    },
    {
      name: "Virgin Piña Colada",
      category: "mocktails",
      icon: "🥥",
      ingredients: "Pulpa de piña madura, crema de coco gourmet, hielo licuado y cereza.",
      description: "Textura cremosa y un sabor tropical insuperable. Un clásico sin alcohol dulce, refrescante y reconfortante."
    },
    {
      name: "Berry Lemonade",
      category: "mocktails",
      icon: "🍓",
      ingredients: "Mix de frutos rojos (fresa, frambuesa, arándano), jugo de limón, jarabe y soda.",
      description: "Una explosión burbujeante y frutal de color intenso que combina la acidez del limón con el dulzor natural de las bayas."
    },
    {
      name: "Cucumber Mint Refresher",
      category: "mocktails",
      icon: "🥒",
      ingredients: "Pepino crujiente, hojas de menta maceradas, limón y agua tónica premium.",
      description: "La definición absoluta de frescura. Notas herbales y botánicas muy ligeras y sofisticadas, ideal para paladares exigentes."
    },
    {
      name: "Sunset Cooler",
      category: "mocktails",
      icon: "🌅",
      ingredients: "Jugo de naranja natural, jarabe de granadina artesanal y soda helada.",
      description: "Un deleite visual en capas que imita un atardecer. Cítrico, dulce y sumamente burbujeante."
    },
    {
      name: "Shirley Temple",
      category: "mocktails",
      icon: "🍒",
      ingredients: "Ginger ale premium, toque de granadina artesanal y cereza al marrasquino.",
      description: "El mocktail más famoso del mundo. Una bebida dulce y efervescente que deleita por su sencillez y sabor."
    }
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestra Carta Premium</h2>
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

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="card-glass hover:scale-[1.02] flex flex-col justify-between group transition-all duration-300 h-full border border-[var(--color-border)] hover:border-[var(--color-gold)]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl filter drop-shadow-[0_2px_8px_rgba(201,168,76,0.3)] select-none">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                    item.category === "cocktails" 
                      ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                      : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  }`}>
                    {item.category === "cocktails" ? "Con Alcohol" : "Sin Alcohol"}
                  </span>
                </div>
                
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
          ))}
        </div>
      </div>
    </section>
  );
}
