import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { publishToFacebook, publishToInstagram } from "@/lib/meta/graph-api";

export async function POST(request: Request) {
  try {
    const supabase = await createAdminClient();
    
    // Validar sesión
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { content, media_url, platforms, scheduled_at, publish_now } = body;

    if (!content || !platforms || platforms.length === 0) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    let status = publish_now ? "published" : "scheduled";
    let published_at = publish_now ? new Date().toISOString() : null;

    // Si es publish_now, publicar en las plataformas
    let fbResult, igResult;
    if (publish_now) {
      if (platforms.includes("facebook")) {
        try {
          fbResult = await publishToFacebook(content, media_url);
        } catch (e: any) {
          console.error("Facebook publish error in API:", e);
          status = "failed";
        }
      }
      if (platforms.includes("instagram")) {
        try {
          igResult = await publishToInstagram(content, media_url);
        } catch (e: any) {
          console.error("Instagram publish error in API:", e);
          status = "failed";
        }
      }
    }

    // Guardar en base de datos
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          content,
          media_url,
          platforms,
          scheduled_at: publish_now ? null : scheduled_at,
          published_at,
          status,
          meta_post_id: fbResult?.id || igResult?.id || null // simplificado
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error guardando post:", error);
      return NextResponse.json({ error: "Error al guardar el post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });

  } catch (error: any) {
    console.error("Error en API de posts:", error);
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}
