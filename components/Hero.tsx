"use client";

import Link from "next/link";
import { ShoppingBag, Utensils, Phone } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[680px] w-full">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80"
        alt="Freshly baked pizza"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C2824]/80 via-[#2C2824]/33 to-[#2C2824]/53" />

      {/* Content */}
      <div className="relative flex h-full w-full flex-col justify-center px-[120px] pb-20 pt-[120px]">
        <div className="flex flex-col gap-6">
          <span className="text-[13px] font-semibold tracking-[3px] text-[var(--pizzeria-gold)]">
            SEDAN 1980 I TYRESÖ
          </span>

          <h1 className="font-display text-[72px] font-bold leading-[1.05] text-white">
            Gott, Färskt &<br />
            Smarrigt
          </h1>

          <p className="max-w-[520px] text-lg leading-[1.6] text-white/80">
            Autentisk italiensk pizza med kärlek — snabb och vänlig service
            <br />
            varje dag i hjärtat av Tyresö.
          </p>

          {/* CTAs */}
          <div className="mt-2 flex items-center gap-4">
            <a
              href="tel:+4684477064"
              className="flex items-center gap-2 rounded-full bg-[var(--pizzeria-red)] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span>Beställ Online</span>
            </a>

            <Link
              href="/meny"
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Utensils className="h-[18px] w-[18px]" />
              <span>Se Menyn</span>
            </Link>

            <a
              href="tel:+4684477064"
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Phone className="h-[18px] w-[18px]" />
              <span>Ring & Boka</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
