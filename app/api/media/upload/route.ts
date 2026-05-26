import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createAdminClient();

    // 1. Verify session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    // 3. Optional: Safeguard to create bucket programmatically if it doesn't exist
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === "cocteleria-media");
      
      if (!bucketExists) {
        console.log("Creando el bucket 'cocteleria-media' en Supabase Storage...");
        await supabase.storage.createBucket("cocteleria-media", {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"]
        });
      }
    } catch (bucketError) {
      console.warn("No se pudo verificar o crear el bucket. Continuando con la subida...", bucketError);
    }

    // 4. Generate unique file name and path
    const fileExt = file.name.split(".").pop();
    const randomId = Math.random().toString(36).substring(2, 9);
    const fileName = `${Date.now()}-${randomId}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    // 5. Upload file buffer to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error: uploadError } = await supabase.storage
      .from("cocteleria-media")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("Error al subir archivo a Supabase Storage:", uploadError);
      return NextResponse.json({ error: "Error al subir la imagen al servidor." }, { status: 500 });
    }

    // 6. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from("cocteleria-media")
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error: any) {
    console.error("Excepción en API media/upload:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
