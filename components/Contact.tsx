"use client";

import { MapPin, Phone, Clock, Facebook, Instagram, Send } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="flex w-full flex-col items-center gap-12 bg-[var(--pizzeria-cream)] px-[60px] py-20"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[13px] font-semibold tracking-[3px] text-[var(--pizzeria-red)]">
          KONTAKTA OSS
        </span>
        <h2 className="font-display text-[42px] font-bold text-[var(--pizzeria-charcoal)]">
          Hitta oss & hör av dig
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid w-full grid-cols-2 gap-8">
        {/* Left Column - Info Card */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(26,23,20,0.06)]">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pizzeria-red)]/10">
                <MapPin className="h-5 w-5 text-[var(--pizzeria-red)]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--pizzeria-charcoal)]">
                  Adress
                </span>
                <span className="text-sm text-[var(--pizzeria-warm-gray)]">
                  Trollbäcksvägen 34A, 135 50 Tyresö
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pizzeria-red)]/10">
                <Phone className="h-5 w-5 text-[var(--pizzeria-red)]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--pizzeria-charcoal)]">
                  Telefon
                </span>
                <span className="text-sm text-[var(--pizzeria-warm-gray)]">
                  08-447 70 64
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pizzeria-red)]/10">
                <Clock className="h-5 w-5 text-[var(--pizzeria-red)]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--pizzeria-charcoal)]">
                  Öppettider
                </span>
                <span className="text-sm text-[var(--pizzeria-warm-gray)]">
                  Mån–Fre: 10:00–21:00
                  <br />
                  Lör–Sön: 12:00–21:00
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[var(--pizzeria-charcoal)]">
                Följ oss:
              </span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pizzeria-charcoal)] text-white transition-opacity hover:opacity-80"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pizzeria-charcoal)] text-white transition-opacity hover:opacity-80"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Map & Form */}
        <div className="flex flex-col gap-6">
          {/* Map */}
          <div className="relative h-60 w-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80"
              alt="Map location"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <a
                href="https://maps.google.com/?q=Trollbäcksvägen+34A+Tyresö"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--pizzeria-charcoal)] shadow-lg transition-transform hover:scale-105"
              >
                Öppna i Google Maps
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(26,23,20,0.06)]">
            <h3 className="font-display text-[22px] font-bold text-[var(--pizzeria-charcoal)]">
              Skicka ett meddelande
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--pizzeria-charcoal)]">
                  Namn
                </label>
                <input
                  type="text"
                  placeholder="Ditt namn"
                  className="rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--pizzeria-warm-gray)]/50 focus:border-[var(--pizzeria-red)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--pizzeria-charcoal)]">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="Ditt telefonnummer"
                  className="rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--pizzeria-warm-gray)]/50 focus:border-[var(--pizzeria-red)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--pizzeria-charcoal)]">
                E-post
              </label>
              <input
                type="email"
                placeholder="din@email.se"
                className="rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--pizzeria-warm-gray)]/50 focus:border-[var(--pizzeria-red)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--pizzeria-charcoal)]">
                Meddelande
              </label>
              <textarea
                rows={4}
                placeholder="Skriv ditt meddelande här..."
                className="resize-none rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--pizzeria-warm-gray)]/50 focus:border-[var(--pizzeria-red)]"
              />
            </div>

            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--pizzeria-red)] text-base font-semibold text-white transition-opacity hover:opacity-90">
              <Send className="h-4 w-4" />
              Skicka meddelande
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
