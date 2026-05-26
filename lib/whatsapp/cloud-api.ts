export async function sendWhatsAppMessage(to: string, message: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error("Faltan variables de entorno para WhatsApp API");
    return { success: false, error: "Missing config" };
  }

  // Ensure the phone number doesn't have spaces or "+" character
  const cleanPhone = to.replace(/\D/g, "");

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error enviando WhatsApp:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Excepción en sendWhatsAppMessage:", error);
    return { success: false, error };
  }
}

// Function to send a pre-approved template message (usually needed to start a conversation outside the 24h window)
export async function sendWhatsAppTemplateMessage(
  to: string,
  templateName: string,
  languageCode: string = "es"
) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error("Faltan variables de entorno para WhatsApp API");
    return { success: false, error: "Missing config" };
  }

  const cleanPhone = to.replace(/\D/g, "");

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            // Here you can add components array if the template expects variables
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error enviando WhatsApp Template:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Excepción en sendWhatsAppTemplateMessage:", error);
    return { success: false, error };
  }
}
