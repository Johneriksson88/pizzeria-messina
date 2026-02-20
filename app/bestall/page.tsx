"use client";

import { useState } from "react";
import Link from "next/link";
import { Pizza, ArrowLeft, Plus, Minus, ShoppingBag, Check, Phone, Clock, User, MessageSquare } from "lucide-react";
import { pizzaCategories, kebabMenu, pastaMenu, salladMenu } from "@/data/menu";
import { submitOrder, OrderItem, OrderResult } from "@/app/actions/order";

// Flatten menu items for easy selection
const allMenuItems = [
  ...pizzaCategories.flatMap(cat =>
    cat.items.map(item => ({
      category: cat.name,
      name: item.name,
      description: item.description,
      price: item.price || cat.price || "",
      number: item.number,
    }))
  ),
  ...(kebabMenu.items?.map(item => ({
    category: "Kebab",
    name: item.name,
    description: item.description,
    price: item.price || "",
  })) || []),
  ...(pastaMenu.items?.map(item => ({
    category: "Pasta",
    name: item.name,
    description: item.description,
    price: item.price || "",
  })) || []),
  ...(salladMenu.items?.map(item => ({
    category: "Sallader",
    name: item.name,
    description: item.description,
    price: salladMenu.priceInfo || "",
  })) || []),
];

// Group by category for display
const menuByCategory = allMenuItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof allMenuItems>);

export default function OrderPage() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(menuByCategory)[0]);

  const addToCart = (item: typeof allMenuItems[0]) => {
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
      setCart(cart.map(c =>
        c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { name: item.name, quantity: 1, price: item.price }]);
    }
  };

  const removeFromCart = (itemName: string) => {
    const existing = cart.find(c => c.name === itemName);
    if (existing && existing.quantity > 1) {
      setCart(cart.map(c =>
        c.name === itemName ? { ...c, quantity: c.quantity - 1 } : c
      ));
    } else {
      setCart(cart.filter(c => c.name !== itemName));
    }
  };

  const getItemQuantity = (itemName: string) => {
    return cart.find(c => c.name === itemName)?.quantity || 0;
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate pickup time options (every 15 min for next 3 hours)
  const getPickupTimeOptions = () => {
    const options: string[] = [];
    const now = new Date();
    const start = new Date(now.getTime() + 30 * 60000); // 30 min from now
    start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);

    for (let i = 0; i < 12; i++) {
      const time = new Date(start.getTime() + i * 15 * 60000);
      options.push(time.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }));
    }
    return options;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitOrder({
      customerName,
      customerPhone,
      pickupTime,
      items: cart,
      specialInstructions: specialInstructions || undefined,
    });

    setOrderResult(result);
    setIsSubmitting(false);

    if (result.success) {
      // Clear form on success
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setPickupTime("");
      setSpecialInstructions("");
    }
  };

  // Show confirmation screen
  if (orderResult?.success) {
    return (
      <div className="min-h-screen bg-[var(--pizzeria-cream)]">
        <header className="bg-[var(--pizzeria-charcoal)] px-[60px] py-4">
          <Link href="/" className="flex items-center gap-3">
            <Pizza className="h-7 w-7 text-[var(--pizzeria-red)]" />
            <span className="font-display text-xl font-bold tracking-[2px] text-white">
              PIZZERIA MESSINA
            </span>
          </Link>
        </header>

        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <div className="rounded-2xl bg-white p-12 shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--pizzeria-olive)]">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              Tack för din beställning!
            </h1>
            <p className="mt-4 text-[var(--pizzeria-warm-gray)]">
              {orderResult.message}
            </p>
            {orderResult.orderId && (
              <p className="mt-2 text-sm text-[var(--pizzeria-warm-gray)]">
                Ordernummer: <span className="font-mono font-bold">{orderResult.orderId}</span>
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/meny"
                className="rounded-full bg-[var(--pizzeria-red)] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Beställ mer
              </Link>
              <Link
                href="/"
                className="text-sm text-[var(--pizzeria-warm-gray)] hover:text-[var(--pizzeria-charcoal)]"
              >
                Tillbaka till startsidan
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--pizzeria-cream)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--pizzeria-charcoal)] px-[60px] py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Pizza className="h-7 w-7 text-[var(--pizzeria-red)]" />
            <span className="font-display text-xl font-bold tracking-[2px] text-white">
              PIZZERIA MESSINA
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-8 text-center font-display text-4xl font-bold text-[var(--pizzeria-charcoal)]">
          Beställ Online
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Menu Selection */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.keys(menuByCategory).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[var(--pizzeria-charcoal)] text-white"
                      : "bg-white text-[var(--pizzeria-warm-gray)] hover:bg-[var(--pizzeria-charcoal)] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="grid gap-3">
                {menuByCategory[activeCategory]?.map((item, idx) => {
                  const quantity = getItemQuantity(item.name);
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                        quantity > 0
                          ? "border-[var(--pizzeria-red)] bg-[var(--pizzeria-red)]/5"
                          : "border-[var(--border)]/50 hover:border-[var(--pizzeria-red)]/30"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.number && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pizzeria-red)]/10 text-xs font-bold text-[var(--pizzeria-red)]">
                              {item.number}
                            </span>
                          )}
                          <span className="font-display font-bold text-[var(--pizzeria-charcoal)]">
                            {item.name}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                          {item.description}
                        </p>
                        {item.price && (
                          <span className="mt-1 inline-block text-sm font-semibold text-[var(--pizzeria-red)]">
                            {item.price}
                          </span>
                        )}
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        {quantity > 0 ? (
                          <>
                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--pizzeria-charcoal)] text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-bold">
                              {quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--pizzeria-red)] text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="flex h-10 items-center gap-2 rounded-full bg-[var(--pizzeria-red)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                          >
                            <Plus className="h-4 w-4" />
                            Lägg till
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary & Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-[var(--pizzeria-charcoal)]">
                <ShoppingBag className="h-5 w-5" />
                Din beställning
                {getTotalItems() > 0 && (
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pizzeria-red)] text-xs text-white">
                    {getTotalItems()}
                  </span>
                )}
              </h2>

              {cart.length === 0 ? (
                <p className="py-8 text-center text-sm text-[var(--pizzeria-warm-gray)]">
                  Välj rätter från menyn till vänster
                </p>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="mb-6 space-y-2 border-b border-[var(--border)] pb-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--pizzeria-charcoal)]">
                          {item.quantity}x {item.name}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-[var(--pizzeria-warm-gray)] hover:text-[var(--pizzeria-red)]"
                        >
                          Ta bort
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--pizzeria-charcoal)]">
                        <User className="h-4 w-4" />
                        Namn *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="Ditt namn"
                        className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--pizzeria-red)]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--pizzeria-charcoal)]">
                        <Phone className="h-4 w-4" />
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="07X XXX XX XX"
                        className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--pizzeria-red)]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--pizzeria-charcoal)]">
                        <Clock className="h-4 w-4" />
                        Hämtas kl *
                      </label>
                      <select
                        required
                        value={pickupTime}
                        onChange={e => setPickupTime(e.target.value)}
                        className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--pizzeria-red)]"
                      >
                        <option value="">Välj tid</option>
                        {getPickupTimeOptions().map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--pizzeria-charcoal)]">
                        <MessageSquare className="h-4 w-4" />
                        Önskemål
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={e => setSpecialInstructions(e.target.value)}
                        placeholder="T.ex. allergier, extra såser..."
                        rows={2}
                        className="w-full resize-none rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--pizzeria-red)]"
                      />
                    </div>

                    {orderResult && !orderResult.success && (
                      <p className="text-sm text-red-600">{orderResult.message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full rounded-full bg-[var(--pizzeria-red)] py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? "Skickar..." : "Skicka beställning"}
                    </button>
                  </form>
                </>
              )}

              {/* Contact info */}
              <p className="mt-6 text-center text-xs text-[var(--pizzeria-warm-gray)]">
                Frågor? Ring oss på{" "}
                <a href="tel:+4684477064" className="font-semibold text-[var(--pizzeria-red)]">
                  08-447 70 64
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
