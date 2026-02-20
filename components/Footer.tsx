"use client";

import Link from "next/link";
import { Pizza, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-12 bg-[var(--pizzeria-charcoal)] px-[60px] pb-8 pt-[60px]">
      {/* Top Section */}
      <div className="flex justify-between gap-12">
        {/* Brand Column */}
        <div className="flex w-80 flex-col gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Pizza className="h-7 w-7 text-[var(--pizzeria-red)]" />
            <span className="font-display text-xl font-bold tracking-[2px] text-white">
              PIZZERIA MESSINA
            </span>
          </Link>
          <p className="text-sm leading-[1.6] text-white/60">
            Autentisk italiensk pizzeria i Tyresö sedan 1980. Gott, färskt och
            smarrigt — alltid med kärlek.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold tracking-[1px] text-[var(--pizzeria-gold)]">
            Navigation
          </span>
          <Link
            href="/meny"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Meny
          </Link>
          <Link
            href="/#om-oss"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Om oss
          </Link>
          <Link
            href="/meny#lunch"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Lunch
          </Link>
          <Link
            href="/#kontakt"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Kontakt
          </Link>
          <a
            href="tel:+4684477064"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Beställ Online
          </a>
        </div>

        {/* Menu Column */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold tracking-[1px] text-[var(--pizzeria-gold)]">
            Meny
          </span>
          <Link
            href="/meny#pizzor"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Pizzor
          </Link>
          <Link
            href="/meny#kebab"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Kebab & Gyros
          </Link>
          <Link
            href="/meny#pasta"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Pasta
          </Link>
          <Link
            href="/meny#sallader"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Sallader
          </Link>
          <Link
            href="/meny#barn"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Barnmeny
          </Link>
          <Link
            href="/meny#alacarte"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            À la Carte
          </Link>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold tracking-[1px] text-[var(--pizzeria-gold)]">
            Kontakt
          </span>
          <a
            href="https://maps.google.com/?q=Trollbäcksvägen+34A+Tyresö"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm leading-[1.5] text-white/60 transition-colors hover:text-white"
          >
            Trollbäcksvägen 34A
            <br />
            135 50 Tyresö
          </a>
          <a
            href="tel:+4684477064"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            +46 8 447 70 64
          </a>
          <p className="text-sm leading-[1.5] text-white/60">
            Mån–Fre: 10–21
            <br />
            Lör–Sön: 12–21
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">
          © 2025 Pizzeria Messina. Alla rättigheter förbehållna.
        </span>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-xs text-white/40 transition-colors hover:text-white/60"
          >
            Integritetspolicy
          </a>
          <a
            href="#"
            className="text-xs text-white/40 transition-colors hover:text-white/60"
          >
            Villkor
          </a>
        </div>
      </div>
    </footer>
  );
}
