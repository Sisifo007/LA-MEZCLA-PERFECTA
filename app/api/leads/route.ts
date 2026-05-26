import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsAppMessage } from "@/lib/whatsapp/cloud-api";

// Usamos el cliente base de supabase con Service Role para bypass RLS si es necesario,
// o simplemente para insertar sin problemas de permisos desde el servidor.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar datos básicos
    const { name, phone, district, date, guests, type, details } = body;
    
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nombre y teléfono son requeridos." },
        { status: 400 }
      );
    }

    // Guardar en Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          phone,
          location: district,
          event_date: date || null,
          guests_count: guests,
          event_type: type,
          message: details,
          source: "landing_page",
          status: "Nuevo"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error al guardar lead en Supabase:", error);
      return NextResponse.json(
        { error: "No se pudo guardar la cotización. Intenta más tarde." },
        { status: 500 }
      );
    }

    // Disparar WhatsApp automático
    // Idealmente usar sendWhatsAppTemplateMessage ("bienvenida_lead")
    // Por ahora usamos un mensaje de texto simple si ya hubiese una sesión de 24h,
    // o puedes cambiarlo a sendWhatsAppTemplateMessage("hello_world", "en_US") para probar.
    
    const wsMsg = `¡Hola ${name}! 🍸 Hemos recibido tu solicitud de cotización en LA MEZCLA PERFECTA. En breve uno de nuestros expertos se pondrá en contacto contigo para darte todos los detalles de tu evento${type ? ` (${type})` : ''}.`;
    
    const wsResult = await sendWhatsAppMessage(phone, wsMsg);

    // Si se envió, podemos actualizar la base de datos para marcar whatsapp_sent
    if (wsResult.success) {
      await supabase
        .from("leads")
        .update({ whatsapp_sent: true, whatsapp_sent_at: new Date().toISOString() })
        .eq("id", data.id);
    }

    return NextResponse.json({ success: true, lead: data, whatsapp_status: wsResult });

  } catch (error) {
    console.error("Error inesperado en API leads:", error);
    return NextResponse.json(
      { error: "Error de servidor." },
      { status: 500 }
    );
  }
}
