// CallMeBot WhatsApp Integration
// Free WhatsApp notifications via https://www.callmebot.com/

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  items: Array<{
    name: string;
    quantity: number;
    price?: string;
  }>;
  specialInstructions?: string;
}

interface WhatsAppRecipient {
  phone: string;
  apiKey: string;
}

// Parse recipients from environment variable
// Format: "+46701234567:apikey1,+46709876543:apikey2"
function getRecipients(): WhatsAppRecipient[] {
  const recipientsEnv = process.env.WHATSAPP_RECIPIENTS;

  if (!recipientsEnv) {
    console.warn('WHATSAPP_RECIPIENTS not configured');
    return [];
  }

  return recipientsEnv.split(',').map(entry => {
    const [phone, apiKey] = entry.trim().split(':');
    return { phone, apiKey };
  }).filter(r => r.phone && r.apiKey);
}

// Send WhatsApp message via CallMeBot
async function sendWhatsAppMessage(recipient: WhatsAppRecipient, message: string): Promise<boolean> {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${recipient.phone}&apikey=${recipient.apiKey}&text=${encodedMessage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`CallMeBot error for ${recipient.phone}: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Failed to send WhatsApp to ${recipient.phone}:`, error);
    return false;
  }
}

// Format and send order notification to all recipients
export async function sendOrderWhatsApp(order: OrderDetails): Promise<boolean> {
  const recipients = getRecipients();

  if (recipients.length === 0) {
    console.error('No WhatsApp recipients configured');
    return false;
  }

  // Format the order message
  const itemsList = order.items
    .map(item => `• ${item.quantity}x ${item.name}`)
    .join('\n');

  const message = `🍕 NY BESTÄLLNING!

Kund: ${order.customerName}
Tel: ${order.customerPhone}
Hämtas: ${order.pickupTime}

${itemsList}
${order.specialInstructions ? `\nÖnskemål: ${order.specialInstructions}` : ''}`;

  // Send to all recipients in parallel
  const results = await Promise.all(
    recipients.map(recipient => sendWhatsAppMessage(recipient, message))
  );

  // Return true if at least one message was sent successfully
  const successCount = results.filter(Boolean).length;
  console.log(`WhatsApp sent to ${successCount}/${recipients.length} recipients`);

  return successCount > 0;
}
