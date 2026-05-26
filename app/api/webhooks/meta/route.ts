import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsAppMessage } from "@/lib/whatsapp/cloud-api";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;
const APP_SECRET = process.env.META_APP_SECRET;

// 1. Verificación del Webhook (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return new NextResponse("Bad Request", { status: 400 });
}

// 2. Recepción de eventos (POST)
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-hub-signature-256");

    // Opcional pero recomendado: Verificar la firma de Meta
    if (APP_SECRET && signature) {
      const hmac = crypto.createHmac("sha256", APP_SECRET);
      const digest = "sha256=" + hmac.update(rawBody).digest("hex");
      if (signature !== digest) {
        console.error("Firma de Meta inválida");
        return new NextResponse("Invalid signature", { status: 401 });
      }
    }

    const body = JSON.parse(rawBody);

    if (body.object === "page") {
      for (const entry of body.entry) {
        // Podría ser un mensaje o un cambio en leadgen
        for (const change of entry.changes || []) {
          if (change.field === "leadgen") {
            // Es un Lead de Facebook Ads
            const leadData = change.value;
            console.log("Nuevo lead recibido de Meta:", leadData);

            // 1. Obtener detalles reales del Lead desde la Graph API de Meta
            let name = "Lead de Facebook";
            let phone = "";
            let email = "";
            let location = "";
            let additionalNotes = "";
            let event_type = "Por definir";

            const metaToken = process.env.META_ACCESS_TOKEN;
            if (metaToken && leadData.leadgen_id) {
              try {
                const leadDetailsRes = await fetch(
                  `https://graph.facebook.com/v19.0/${leadData.leadgen_id}?access_token=${metaToken}`
                );
                if (leadDetailsRes.ok) {
                  const leadDetails = await leadDetailsRes.json();
                  console.log("Detalles del lead de Meta obtenidos con éxito:", leadDetails);
                  
                  if (leadDetails.field_data) {
                    for (const field of leadDetails.field_data) {
                      const fieldName = field.name.toLowerCase();
                      const value = field.values ? field.values[0] : "";
                      
                      if (fieldName === "full_name" || fieldName === "name" || fieldName === "nombre") {
                        name = value;
                      } else if (fieldName === "phone_number" || fieldName === "phone" || fieldName === "telefono") {
                        phone = value;
                      } else if (fieldName === "email" || fieldName === "correo") {
                        email = value;
                      } else if (fieldName === "location" || fieldName === "district" || fieldName === "distrito" || fieldName === "select_district") {
                        location = value;
                      } else if (fieldName === "event_type" || fieldName === "tipo_evento") {
                        event_type = value;
                      } else {
                        additionalNotes += `${field.name}: ${value}\n`;
                      }
                    }
                  }
                } else {
                  console.error("Error al consultar Lead Details en Meta:", await leadDetailsRes.text());
                }
              } catch (fetchError) {
                console.error("Excepción consultando Lead Details en Meta:", fetchError);
              }
            }

            // Fallback para teléfono obligatorio
            if (!phone) {
              phone = "+51999999999";
            }

            // 2. Guardar en base de datos
            const { data, error } = await supabase
              .from("leads")
              .insert([
                {
                  name,
                  phone,
                  email: email || null,
                  location: location || null,
                  source: "facebook_lead_ad",
                  status: "Nuevo",
                  event_type: event_type,
                  message: additionalNotes ? `Campos adicionales de Lead Ads:\n${additionalNotes}` : null,
                  whatsapp_sent: false
                }
              ])
              .select()
              .single();

            if (!error && data) {
              // 3. Crear interacción inicial
              await supabase
                .from("interactions")
                .insert([
                  {
                    lead_id: data.id,
                    type: "nota",
                    content: `Lead capturado automáticamente desde Facebook Lead Ads (Leadgen ID: ${leadData.leadgen_id}).`,
                    direction: "saliente"
                  }
                ]);

              // 4. Enviar WhatsApp automático
              const wsMsg = `¡Hola ${name}! 🍸 Vimos que solicitaste información en Facebook sobre nuestro servicio premium de coctelería para eventos LA MEZCLA PERFECTA. En breve un asesor te contactará. ¿Cuéntanos de qué tipo es tu evento y en qué fecha aproximada?`;
              const wsResult = await sendWhatsAppMessage(phone, wsMsg);
              
              if (wsResult.success) {
                await supabase
                  .from("leads")
                  .update({ whatsapp_sent: true, whatsapp_sent_at: new Date().toISOString() })
                  .eq("id", data.id);

                await supabase
                  .from("interactions")
                  .insert([
                    {
                      lead_id: data.id,
                      type: "whatsapp_auto",
                      content: `Mensaje automático de WhatsApp enviado: "${wsMsg}"`,
                      direction: "saliente"
                    }
                  ]);
              }
            }
          }
        }
      }

      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error procesando Webhook de Meta:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
