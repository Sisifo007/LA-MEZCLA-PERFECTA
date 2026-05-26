import { createAdminClient } from "@/lib/supabase/server";
import { Calendar, Plus, Image as ImageIcon } from "lucide-react";
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

export const revalidate = 0;

export default async function PostsPage() {
  const supabase = await createAdminClient();

  const { data: postsData } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = postsData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Gestión de Contenido</h1>
          <p className="text-muted-foreground mt-1">Programa y publica posts en tus redes sociales.</p>
        </div>
        <Link href="/posts/new" className="btn-primary py-2.5 px-4 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nuevo Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de posts */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold font-display mb-4">Historial y Programados</h2>
          
          {posts.length === 0 ? (
            <div className="card p-8 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No tienes publicaciones. ¡Crea una nueva!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="card p-5 flex gap-4">
                {post.media_url ? (
                  <div className="w-24 h-24 rounded bg-[var(--color-surface-lighter)] flex-shrink-0 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${post.media_url})` }}></div>
                ) : (
                  <div className="w-24 h-24 rounded bg-[var(--color-surface-lighter)] flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {post.platforms.includes("facebook") && <Facebook className="w-4 h-4 text-[#3b5998]" />}
                      {post.platforms.includes("instagram") && <Instagram className="w-4 h-4 text-[#E1306C]" />}
                      
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ml-2 ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-500' :
                        post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2 mt-2">{post.content}</p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-3">
                    {post.status === 'published' 
                      ? `Publicado el: ${new Date(post.published_at).toLocaleString()}` 
                      : post.scheduled_at 
                        ? `Programado para: ${new Date(post.scheduled_at).toLocaleString()}`
                        : 'Borrador'
                    }
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div className="card bg-[var(--color-surface-light)] border-[var(--color-gold)]/20">
            <h3 className="font-bold font-display text-[var(--color-gold)] mb-2">Conectado a Meta</h3>
            <p className="text-sm text-muted-foreground mb-4">Tus cuentas de Facebook e Instagram están vinculadas correctamente para publicación automática.</p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Facebook className="w-4 h-4 text-[#3b5998]" /> La Mezcla Perfecta (Página)
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground mt-2">
              <Instagram className="w-4 h-4 text-[#E1306C]" /> @lamezclaperfecta
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
