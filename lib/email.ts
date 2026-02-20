import nodemailer from 'nodemailer';

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
  orderId?: string;
}

// Create reusable transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP not configured');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// Send order notification email
export async function sendOrderEmail(order: OrderDetails): Promise<boolean> {
  const transporter = getTransporter();
  const toEmail = process.env.ORDER_EMAIL_TO;
  const ccEmails = process.env.ORDER_EMAIL_CC;
  const fromEmail = process.env.SMTP_USER;

  if (!transporter || !toEmail || !fromEmail) {
    console.error('Email not configured properly');
    return false;
  }

  // Format items list
  const itemsHtml = order.items
    .map(item => `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${item.quantity}x</td><td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td></tr>`)
    .join('');

  const itemsText = order.items
    .map(item => `  ${item.quantity}x ${item.name}`)
    .join('\n');

  // HTML email template
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;">
      <div style="background:#B8342E;color:white;padding:20px;text-align:center;">
        <h1 style="margin:0;font-size:24px;">🍕 Ny Beställning!</h1>
      </div>
      <div style="padding:20px;background:#fff;border:1px solid #ddd;">
        ${order.orderId ? `<p style="color:#666;font-size:14px;">Order: <strong>${order.orderId}</strong></p>` : ''}

        <h2 style="color:#2C2824;font-size:18px;margin-top:0;">Kunduppgifter</h2>
        <p><strong>Namn:</strong> ${order.customerName}</p>
        <p><strong>Telefon:</strong> <a href="tel:${order.customerPhone}">${order.customerPhone}</a></p>
        <p><strong>Hämtas:</strong> ${order.pickupTime}</p>

        <h2 style="color:#2C2824;font-size:18px;">Beställning</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${itemsHtml}
        </table>

        ${order.specialInstructions ? `
          <h2 style="color:#2C2824;font-size:18px;">Önskemål</h2>
          <p style="background:#f5f5f5;padding:10px;border-radius:4px;">${order.specialInstructions}</p>
        ` : ''}
      </div>
      <div style="padding:15px;background:#f5f5f5;text-align:center;font-size:12px;color:#666;">
        Pizzeria Messina - Online Beställning
      </div>
    </div>
  `;

  // Plain text fallback
  const text = `
NY BESTÄLLNING!
${order.orderId ? `Order: ${order.orderId}\n` : ''}
KUNDUPPGIFTER
Namn: ${order.customerName}
Telefon: ${order.customerPhone}
Hämtas: ${order.pickupTime}

BESTÄLLNING
${itemsText}
${order.specialInstructions ? `\nÖNSKEMÅL\n${order.specialInstructions}` : ''}

---
Pizzeria Messina - Online Beställning
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Pizzeria Messina" <${fromEmail}>`,
      to: toEmail,
      cc: ccEmails || undefined,
      subject: `🍕 Ny beställning - ${order.customerName} (${order.pickupTime})`,
      text,
      html,
    });

    console.log(`Order email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send order email:', error);
    return false;
  }
}
