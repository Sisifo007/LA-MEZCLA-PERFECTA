import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { publishToFacebook, publishToInstagram } from "@/lib/meta/graph-api";

export const revalidate = 0; // Always dynamic

export async function GET(request: Request) {
  try {
    const supabase = await createAdminClient();

    // 1. Authorization protection (optional in development, recommended in production)
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers.get("authorization");
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.warn("Intento fallido de ejecución de Cron Job no autorizado.");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const now = new Date().toISOString();

    // 2. Fetch scheduled posts that are due for publication
    const { data: posts, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", now);

    if (fetchError) {
      console.error("Error al consultar posts programados en Supabase:", fetchError);
      return NextResponse.json({ error: "Error al consultar la base de datos" }, { status: 500 });
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: "No hay posts programados pendientes de publicación para esta fecha." 
      });
    }

    console.log(`Cron Job: Procesando ${posts.length} posts programados...`);
    const results = [];
    let publishedCount = 0;
    let failedCount = 0;

    // 3. Process each post sequentially
    for (const post of posts) {
      let finalStatus = "published";
      let fbResult = null;
      let igResult = null;
      const errorsList: string[] = [];

      // Publish on Facebook
      if (post.platforms.includes("facebook")) {
        try {
          fbResult = await publishToFacebook(post.content, post.media_url);
        } catch (fbErr: any) {
          console.error(`Error publicando post ID ${post.id} en Facebook:`, fbErr);
          errorsList.push(`Facebook: ${fbErr.message || fbErr}`);
          finalStatus = "failed";
        }
      }

      // Publish on Instagram (IG requires an image)
      if (post.platforms.includes("instagram")) {
        if (!post.media_url) {
          errorsList.push("Instagram: Publicación cancelada por falta de imagen multimedia.");
          finalStatus = "failed";
        } else {
          try {
            igResult = await publishToInstagram(post.content, post.media_url);
          } catch (igErr: any) {
            console.error(`Error publicando post ID ${post.id} en Instagram:`, igErr);
            errorsList.push(`Instagram: ${igErr.message || igErr}`);
            finalStatus = "failed";
          }
        }
      }

      // 4. Update the publication status in the database
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          status: finalStatus,
          published_at: finalStatus === "published" ? new Date().toISOString() : null,
          meta_post_id: fbResult?.id || igResult?.id || null
        })
        .eq("id", post.id);

      if (updateError) {
        console.error(`Error al actualizar el estado en DB para post ${post.id}:`, updateError);
      }

      if (finalStatus === "published") {
        publishedCount++;
      } else {
        failedCount++;
      }

      results.push({
        postId: post.id,
        status: finalStatus,
        errors: errorsList.length > 0 ? errorsList : undefined
      });
    }

    return NextResponse.json({
      success: true,
      processed: posts.length,
      published: publishedCount,
      failed: failedCount,
      results
    });

  } catch (err: any) {
    console.error("Excepción grave en Cron Job de posts:", err);
    return NextResponse.json({ error: err.message || "Error interno de servidor" }, { status: 500 });
  }
}
