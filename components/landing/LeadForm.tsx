"use client";

import { useState } from "react";
import { Calendar, Users, MapPin } from "lucide-react";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      district: formData.get("district"),
      date: formData.get("date"),
      guests: formData.get("guests"),
      details: formData.get("details"),
      type: formData.get("serviceType") || "Por definir"
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMsg("¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto por WhatsApp.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatusMsg("Hubo un error al enviar tu solicitud. Intenta más tarde.");
      }
    } catch (error) {
      setStatusMsg("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cotizar" className="section-padding relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="card-glass shadow-2xl p-8 md:p-12 border-t-4 border-t-[var(--color-gold)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cotiza tu Evento</h2>
            <p className="text-muted-foreground">
              Déjanos los detalles y te enviaremos una propuesta en Soles adaptada a lo que buscas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Nombre completo</label>
                <input name="name" required type="text" className="form-input" placeholder="Ej. Carlos Mendoza" />
              </div>
              <div>
                <label className="form-label">Teléfono / WhatsApp</label>
                <input name="phone" required type="tel" className="form-input" placeholder="+51 999 999 999" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--color-gold)]"/> Distrito (Lima/Callao)</span>
                </label>
                <select name="district" required className="form-select">
                  <option value="">Selecciona distrito...</option>
                  <option value="Miraflores">Miraflores</option>
                  <option value="San Isidro">San Isidro</option>
                  <option value="Surco">Surco</option>
                  <option value="La Molina">La Molina</option>
                  <option value="Barranco">Barranco</option>
                  <option value="San Borja">San Borja</option>
                  <option value="Jesús María">Jesús María</option>
                  <option value="Lince">Lince</option>
                  <option value="Magdalena">Magdalena</option>
                  <option value="San Miguel">San Miguel</option>
                  <option value="Otro">Otro (Lima/Callao)</option>
                </select>
              </div>
              <div>
                <label className="form-label">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[var(--color-gold)]"/> Fecha aproximada</span>
                </label>
                <input name="date" type="date" className="form-input" />
              </div>
              <div>
                <label className="form-label">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--color-gold)]"/> Cantidad de invitados</span>
                </label>
                <select name="guests" required className="form-select">
                  <option value="">Cantidad...</option>
                  <option value="20-50">20 - 50 personas</option>
                  <option value="50-100">50 - 100 personas</option>
                  <option value="100-200">100 - 200 personas</option>
                  <option value="200+">Más de 200 personas</option>
                </select>
              </div>
              <div>
                <label className="form-label">
                  <span className="flex items-center gap-2">🍸 Tipo de Servicio</span>
                </label>
                <select name="serviceType" required className="form-select">
                  <option value="">Selecciona servicio...</option>
                  <option value="Coctelería (Con alcohol)">Coctelería (Con alcohol)</option>
                  <option value="Moctelería (Sin alcohol)">Moctelería (Sin alcohol)</option>
                  <option value="Servicio Mixto (Coctelería + Moctelería)">Servicio Mixto (Coctelería y Moctelería)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="form-label mb-0">Cuéntanos sobre tu evento</label>
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-wider">Opcional</span>
              </div>
              <textarea 
                name="details"
                className="form-textarea" 
                placeholder="¿Es una boda? ¿Deseas Cocteles o Mocteles Clasicos o de autor? ¿tienes algun coctel en especifico que no este en nuestra carta? (como máximo tres por cada uno)..."
              />
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Personaliza tu servicio: dinos si prefieres opciones clásicas, de autor o si tienes hasta 3 cócteles/mocktails específicos que no figuran en nuestra carta.
              </p>
            </div>

            {statusMsg && (
              <div className="text-center text-sm font-medium text-[var(--color-gold-light)] p-3 rounded bg-[var(--color-surface-lighter)] border border-[var(--color-border-light)]">
                {statusMsg}
              </div>
            )}

            <div className="pt-4 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-12 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Solicitar Cotización"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
