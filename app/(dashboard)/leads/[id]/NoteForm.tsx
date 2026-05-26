"use client";

import { useState } from "react";
import { addLeadNote } from "./actions";
import { Send, FileText } from "lucide-react";

interface NoteFormProps {
  leadId: string;
}

export function NoteForm({ leadId }: NoteFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError("");

    const result = await addLeadNote(leadId, content);
    if (result.success) {
      setContent("");
    } else {
      setError(result.error || "Ocurrió un error al guardar la nota.");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="text-xs text-red-500 bg-red-500/10 p-2.5 rounded border border-red-500/20">
          {error}
        </div>
      )}
      <div className="relative">
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe una nota de seguimiento (ej: 'El cliente prefiere cocteles dulces', 'Llamar el viernes para confirmar'...)"
          className="form-textarea w-full pl-4 pr-4 py-3 bg-[var(--color-surface)] border-[var(--color-border)] rounded-lg text-sm placeholder:text-muted focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="btn-primary py-2 px-5 text-xs flex items-center gap-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:transform-none disabled:box-shadow-none"
        >
          <Send className="w-3 h-3" />
          {isSubmitting ? "Guardando..." : "Agregar Nota"}
        </button>
      </div>
    </form>
  );
}
