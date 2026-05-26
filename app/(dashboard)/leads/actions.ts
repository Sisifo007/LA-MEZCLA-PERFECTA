'use server'

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateLeadInput {
  name: string;
  phone: string;
  district: string;
  date?: string;
  guests?: string;
  type?: string;
  details?: string;
}

export async function createManualLead(input: CreateLeadInput) {
  const { name, phone, district, date, guests, type, details } = input;

  if (!name || !phone) {
    return { success: false, error: "Nombre y teléfono son obligatorios." };
  }

  try {
    const supabase = await createAdminClient();

    // 1. Insert lead in DB
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert([
        {
          name,
          phone,
          location: district || null,
          event_date: date || null,
          guests_count: guests ? parseInt(guests, 10) || null : null,
          event_type: type || "Por definir",
          message: details || null,
          source: "manual",
          status: "Nuevo",
          whatsapp_sent: false
        }
      ])
      .select()
      .single();

    if (leadError) {
      console.error("Error creating manual lead in Supabase:", leadError);
      return { success: false, error: "No se pudo crear el lead en la base de datos." };
    }

    // 2. Insert interaction recording manual registration
    const { error: interactionError } = await supabase
      .from("interactions")
      .insert([
        {
          lead_id: lead.id,
          type: "nota",
          content: "Lead registrado manualmente en el CRM.",
          direction: "saliente"
        }
      ]);

    if (interactionError) {
      console.error("Error creating manual registration interaction:", interactionError);
    }

    revalidatePath("/leads");
    revalidatePath("/dashboard");
    return { success: true, leadId: lead.id };

  } catch (error) {
    console.error("Excepción en createManualLead:", error);
    return { success: false, error: "Ocurrió un error inesperado en el servidor." };
  }
}
