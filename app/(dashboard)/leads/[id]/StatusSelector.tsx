"use client";

import { useState } from "react";
import { updateLeadStatus } from "./actions";
import { Check, ChevronDown } from "lucide-react";

interface StatusSelectorProps {
  leadId: string;
  currentStatus: string;
}

const STATUS_OPTIONS = ["Nuevo", "Contactado", "Cotizado", "Ganado", "Perdido"];

const STATUS_STYLES: Record<string, string> = {
  Nuevo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contactado: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Cotizado: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Ganado: "bg-green-500/10 text-green-400 border-green-500/20",
  Perdido: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function StatusSelector({ leadId, currentStatus }: StatusSelectorProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }
    setIsSubmitting(true);
    setStatus(newStatus);
    setIsOpen(false);

    const result = await updateLeadStatus(leadId, newStatus);
    if (!result.success) {
      alert(result.error || "Ocurrió un error.");
      setStatus(currentStatus); // revert
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      <label className="form-label mb-2">Estado del Lead</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSubmitting}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
          STATUS_STYLES[status] || "bg-[var(--color-surface)] border-[var(--color-border)] text-foreground"
        }`}
      >
        <span>{isSubmitting ? "Actualizando..." : status}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 left-0 mt-2 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-light)] shadow-xl z-20 overflow-hidden">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleStatusChange(option)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-[var(--color-surface-lighter)] transition-colors ${
                  option === status ? 'text-[var(--color-gold)] font-medium' : 'text-muted-foreground'
                }`}
              >
                <span>{option}</span>
                {option === status && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
