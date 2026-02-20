import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client: twilio.Twilio | null = null;

export function getTwilioClient() {
  if (!accountSid || !authToken) {
    console.warn('Twilio credentials not configured');
    return null;
  }

  if (!client) {
    client = twilio(accountSid, authToken);
  }

  return client;
}

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
  totalEstimate?: string;
}

export async function sendOrderSMS(order: OrderDetails): Promise<boolean> {
  const client = getTwilioClient();
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  const toNumber = process.env.RESTAURANT_PHONE_NUMBER;

  if (!client || !fromNumber || !toNumber) {
    console.error('Twilio not configured properly');
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
${order.specialInstructions ? `\nÖnskemål: ${order.specialInstructions}` : ''}
${order.totalEstimate ? `\nTotal: ca ${order.totalEstimate}` : ''}`;

  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber,
    });
    return true;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return false;
  }
}
