"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Send, Upload, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["facebook", "instagram"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const togglePlatform = (platform: string) => {
    setPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");

      setMediaUrl(data.url);
    } catch (err: any) {
      setError(err.message || "No se pudo subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || platforms.length === 0) {
      setError("Debes escribir un mensaje y elegir al menos una plataforma.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          media_url: mediaUrl || null,
          platforms,
          publish_now: true, // Por ahora publicaremos de inmediato
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al publicar");

      router.push("/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/posts" className="p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="text-2xl font-bold font-display text-foreground">Crear Publicación</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="card space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm border border-red-500/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Plataformas</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => togglePlatform("facebook")}
                className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors ${platforms.includes("facebook") ? 'bg-[#3b5998]/10 border-[#3b5998] text-[#3b5998]' : 'bg-[var(--color-surface)] border-[var(--color-border)] text-muted-foreground'}`}
              >
                <Facebook className="w-4 h-4" /> Facebook
              </button>
              <button 
                type="button"
                onClick={() => togglePlatform("instagram")}
                className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors ${platforms.includes("instagram") ? 'bg-[#E1306C]/10 border-[#E1306C] text-[#E1306C]' : 'bg-[var(--color-surface)] border-[var(--color-border)] text-muted-foreground'}`}
              >
                <Instagram className="w-4 h-4" /> Instagram
              </button>
            </div>
            {platforms.includes("instagram") && !mediaUrl && (
              <p className="text-xs text-yellow-500 mt-2">⚠️ Instagram requiere obligatoriamente una imagen.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Texto de la publicación</label>
            <textarea
              className="form-input min-h-[150px] resize-y"
              placeholder="¿Qué quieres compartir hoy con tus clientes?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Imagen de la Publicación</label>
            
            {mediaUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-light)] p-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded bg-cover bg-center border border-[var(--color-border)]"
                    style={{ backgroundImage: `url(${mediaUrl})` }}
                  />
                  <div className="text-xs text-muted-foreground max-w-[200px] truncate">
                    Imagen subida con éxito
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMediaUrl("")}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <label
                  htmlFor="image-upload"
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    isUploading 
                      ? "border-[var(--color-gold)] bg-[var(--color-surface-light)] opacity-70" 
                      : "border-[var(--color-border)] hover:border-[var(--color-gold)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-light)]"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-8 h-8 text-[var(--color-gold)] animate-spin mb-2" />
                      <span className="text-sm font-medium text-foreground">Subiendo imagen a Storage...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-[var(--color-gold)]" />
                      <span className="text-sm font-medium text-foreground">Subir imagen</span>
                      <span className="text-xs text-muted-foreground mt-1">Formatos permitidos: PNG, JPG, WEBP (Máx. 5MB)</span>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary w-full py-3 flex justify-center items-center gap-2"
          >
            {isSubmitting ? "Publicando..." : <><Send className="w-4 h-4" /> Publicar Ahora</>}
          </button>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Vista Previa (Móvil)</h3>
          <div className="mx-auto w-[320px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header fb fake */}
            <div className="p-3 flex items-center gap-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-[10px] text-black font-bold">LMP</div>
              <div>
                <div className="text-xs font-bold text-gray-900">Lumen Restobar</div>
                <div className="text-[10px] text-gray-500">Justo ahora • 🌎</div>
              </div>
            </div>
            {/* Texto */}
            <div className="p-3 text-sm text-gray-800 whitespace-pre-wrap">
              {content || "Escribe algo para ver cómo se verá tu publicación..."}
            </div>
            {/* Imagen */}
            {mediaUrl ? (
              <div className="w-full aspect-square bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${mediaUrl})` }}></div>
            ) : (
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center flex-col text-gray-400">
                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-xs">Sin imagen</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
