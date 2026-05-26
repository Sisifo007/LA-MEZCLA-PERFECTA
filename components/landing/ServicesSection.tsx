import { GlassWater, Martini, Wine } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Coctelería Clásica y de Autor",
      description: "Cócteles tradicionales y creaciones exclusivas con licores premium, jarabes artesanales e ingredientes de la mejor calidad.",
      icon: <Martini className="w-8 h-8 text-[var(--color-gold)]" />
    },
    {
      title: "Moctelería Premium",
      description: "Cócteles sofisticados sin alcohol elaborados con insumos frescos, botánicos y jarabes propios, ideales para todo tipo de público.",
      icon: <GlassWater className="w-8 h-8 text-[var(--color-gold)]" />
    },
    {
      title: "Servicio Integral",
      description: "Nos encargamos del personal de bar, insumos premium, cristalería fina, hielo y todo lo necesario. Tú solo disfrutas de la fiesta.",
      icon: <Wine className="w-8 h-8 text-[var(--color-gold)]" />
    }
  ];

  return (
    <section id="servicios" className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="divider-gold"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Adaptamos nuestro servicio de coctelería y moctelería premium a las necesidades de tu evento en cualquier distrito de Lima y Callao.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`card text-center delay-${(index + 1) * 200} animate-fade-in-up`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-surface-lighter)] flex items-center justify-center mb-6 border border-[var(--color-border-light)]">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
