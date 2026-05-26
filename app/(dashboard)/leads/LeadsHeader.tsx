"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createManualLead } from "./actions";
import { Plus, X, Calendar, Users, MapPin, Wine, Sparkles } from "lucide-react";

export function LeadsHeader() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      district: formData.get("district") as string,
      date: formData.get("date") as string,
      guests: formData.get("guests") as string,
      type: formData.get("type") as string,
      details: formData.get("details") as string,
    };

    const result = await createManualLead(data);

    if (result.success) {
      setIsOpen(false);
      router.refresh();
    } else {
      setError(result.error || "Ocurrió un error.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Gestión de Leads (CRM)</h1>
          <p className="text-muted-foreground mt-1">Administra tus prospectos y da seguimiento a tus cotizaciones.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="btn-primary py-2.5 px-4 text-sm flex items-center gap-2 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)] rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Agregar Lead Manual
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />

          {/* Modal box */}
          <div className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-gold)]/20 rounded-xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 animate-fade-in-up">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-[0.02] rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Registrar Prospecto
                </span>
                <h2 className="text-2xl font-bold font-display text-foreground mt-1">Nuevo Lead Manual</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-[var(--color-surface-light)] border border-[var(--color-border)] text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Nombre del Cliente</label>
                  <input name="name" required type="text" className="form-input text-sm" placeholder="Ej. Carlos Mendoza" />
                </div>
                <div>
                  <label className="form-label">Teléfono / WhatsApp</label>
                  <input name="phone" required type="tel" className="form-input text-sm" placeholder="Ej. +51999999999" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="form-label flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Distrito
                  </label>
                  <select name="district" required className="form-select text-sm">
                    <option value="">Selecciona...</option>
                    <option value="Miraflores">Miraflores</option>
                    <option value="San Isidro">San Isidro</option>
                    <option value="Surco">Surco</option>
                    <option value="La Molina">La Molina</option>
                    <option value="Barranco">Barranco</option>
                    <option value="Otro">Otro (Lima/Callao)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Fecha del Evento
                  </label>
                  <input name="date" type="date" className="form-input text-sm" />
                </div>
                <div>
                  <label className="form-label flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Invitados
                  </label>
                  <select name="guests" required className="form-select text-sm">
                    <option value="">Cantidad...</option>
                    <option value="20-50">20 - 50</option>
                    <option value="50-100">50 - 100</option>
                    <option value="100-200">100 - 200</option>
                    <option value="200+">Más de 200</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Tipo de Evento
                </label>
                <select name="type" required className="form-select text-sm">
                  <option value="">Selecciona tipo...</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="fiesta_privada">Fiesta Privada</option>
                  <option value="reunion">Reunión</option>
                  <option value="xv_anos">XV Años</option>
                  <option value="baby_shower">Baby Shower</option>
                  <option value="graduacion">Graduación</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="form-label">Notas e Indicaciones</label>
                <textarea 
                  name="details"
                  rows={3}
                  className="form-textarea text-sm" 
                  placeholder="Detalles sobre el bar móvil, tragos clásicos o coctelería de autor..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--color-border)]">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary py-2 px-5 text-sm"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary py-2 px-6 text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registrando..." : "Guardar Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
