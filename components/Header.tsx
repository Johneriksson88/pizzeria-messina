"use client";

import Link from "next/link";
import { Pizza, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { getTotalItems, cartBounce } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="flex h-20 w-full items-center justify-between bg-[var(--pizzeria-charcoal)] px-[60px]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Pizza className="h-8 w-8 text-[var(--pizzeria-red)]" />
        <span className="font-display text-[22px] font-bold tracking-[2px] text-white">
          PIZZERIA MESSINA
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8">
        <Link
          href="/meny"
          className="text-sm font-medium tracking-[0.5px] text-white/80 transition-colors hover:text-white"
        >
          Meny
        </Link>
        <Link
          href="/#om-oss"
          className="text-sm font-medium tracking-[0.5px] text-white/80 transition-colors hover:text-white"
        >
          Om oss
        </Link>
        <Link
          href="/meny#lunch"
          className="text-sm font-medium tracking-[0.5px] text-white/80 transition-colors hover:text-white"
        >
          Lunch
        </Link>
        <Link
          href="/#kontakt"
          className="text-sm font-medium tracking-[0.5px] text-white/80 transition-colors hover:text-white"
        >
          Kontakt
        </Link>

        {/* Shopping Cart */}
        <Link
          href="/bestall"
          className={`relative flex items-center gap-2 transition-transform ${cartBounce ? "cart-bounce" : ""}`}
        >
          <ShoppingCart className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--pizzeria-red)] text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Order Button */}
        <Link
          href="/bestall"
          className="flex items-center gap-2 rounded-full bg-[var(--pizzeria-red)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span>Beställ Online</span>
        </Link>

        {/* Phone */}
        <a
          href="tel:+4684477064"
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <Phone className="h-3.5 w-3.5 text-[var(--pizzeria-gold)]" />
          <span className="text-[13px] font-medium text-[var(--pizzeria-gold)]">
            08-447 70 64
          </span>
        </a>
      </nav>
    </header>
  );
}
