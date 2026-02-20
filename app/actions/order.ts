'use server';

import { sendOrderEmail, OrderDetails } from '@/lib/email';

export interface OrderItem {
  name: string;
  quantity: number;
  price?: string;
}

export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  items: OrderItem[];
  specialInstructions?: string;
}

export interface OrderResult {
  success: boolean;
  message: string;
  orderId?: string;
}

export async function submitOrder(formData: OrderFormData): Promise<OrderResult> {
  // Validate required fields
  if (!formData.customerName || !formData.customerPhone || !formData.pickupTime) {
    return {
      success: false,
      message: 'Vänligen fyll i alla obligatoriska fält.',
    };
  }

  if (!formData.items || formData.items.length === 0) {
    return {
      success: false,
      message: 'Vänligen lägg till minst en vara i din beställning.',
    };
  }

  // Validate phone number (Swedish format)
  const phoneRegex = /^(\+46|0)[0-9]{8,10}$/;
  const cleanPhone = formData.customerPhone.replace(/[\s-]/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    return {
      success: false,
      message: 'Vänligen ange ett giltigt telefonnummer.',
    };
  }

  // Generate order ID
  const orderId = `M${Date.now().toString(36).toUpperCase()}`;

  // Prepare order details
  const orderDetails: OrderDetails = {
    customerName: formData.customerName,
    customerPhone: cleanPhone,
    pickupTime: formData.pickupTime,
    items: formData.items,
    specialInstructions: formData.specialInstructions,
    orderId,
  };

  // Send email notification
  const emailSent = await sendOrderEmail(orderDetails);

  if (!emailSent) {
    console.error(`Failed to send email for order ${orderId}`);

    return {
      success: true,
      message: 'Din beställning är mottagen! Vi ringer dig för att bekräfta.',
      orderId,
    };
  }

  return {
    success: true,
    message: 'Tack för din beställning! Vi förbereder din mat.',
    orderId,
  };
}
