'use server'

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const supabase = await createAdminClient();
    
    // 1. Update the status on the lead
    const { error: updateError } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    if (updateError) {
      console.error("Error updating lead status in Supabase:", updateError);
      return { success: false, error: "No se pudo actualizar el estado." };
    }

    // 2. Add an interaction entry recording this change
    const { error: interactionError } = await supabase
      .from("interactions")
      .insert([
        {
          lead_id: leadId,
          type: "nota",
          content: `Estado actualizado a: ${status}`,
          direction: "saliente"
        }
      ]);

    if (interactionError) {
      console.error("Error creating status change interaction:", interactionError);
    }

    revalidatePath(`/leads/${leadId}`);
    revalidatePath("/leads");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Excepción en updateLeadStatus:", error);
    return { success: false, error: "Error inesperado del servidor." };
  }
}

export async function addLeadNote(leadId: string, content: string) {
  if (!content || content.trim() === "") {
    return { success: false, error: "El contenido de la nota no puede estar vacío." };
  }

  try {
    const supabase = await createAdminClient();

    // Insert new interaction note
    const { error } = await supabase
      .from("interactions")
      .insert([
        {
          lead_id: leadId,
          type: "nota",
          content: content.trim(),
          direction: "saliente"
        }
      ]);

    if (error) {
      console.error("Error al insertar nota en Supabase:", error);
      return { success: false, error: "No se pudo guardar la nota." };
    }

    revalidatePath(`/leads/${leadId}`);
    return { success: true };
  } catch (error) {
    console.error("Excepción en addLeadNote:", error);
    return { success: false, error: "Error inesperado del servidor." };
  }
}
