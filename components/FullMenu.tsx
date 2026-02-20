"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pizzaCategories } from "@/data/menu";

// Show a preview of popular pizzas from different classes
const previewItems = [
  { ...pizzaCategories[0].items[0], class: "Klass 1", classPrice: "137 kr" }, // Margherita
  { ...pizzaCategories[1].items[8], class: "Klass 2", classPrice: "147 kr" }, // Kebab Pizza
  { ...pizzaCategories[2].items[1], class: "Klass 3", classPrice: "155 kr" }, // Messina Special
  { ...pizzaCategories[3].items[2], class: "Delikates", classPrice: "159 kr" }, // Honung
  { ...pizzaCategories[4].items[1], class: "Gourmet", classPrice: "168 kr" }, // Diavola
  { ...pizzaCategories[6].items[1], class: "Vegetarisk", classPrice: "149 kr" }, // Vegetarisk
];

const menuCategories = [
  { name: "Lunch", count: "137 kr", href: "/meny#lunch" },
  { name: "Pizzor", count: "56 sorter", href: "/meny#pizzor" },
  { name: "Kebab & Gyros", count: "3 varianter", href: "/meny#kebab" },
  { name: "Pasta", count: "12 rätter", href: "/meny#pasta" },
  { name: "Sallader", count: "14 sorter", href: "/meny#sallader" },
  { name: "Barnmeny", count: "6 rätter", href: "/meny#barn" },
  { name: "À la Carte", count: "2 rätter", href: "/meny#alacarte" },
];

export default function FullMenu() {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-white px-[60px] py-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[13px] font-semibold tracking-[3px] text-[var(--pizzeria-red)]">
          KOMPLETT MENY
        </span>
        <h2 className="font-display text-[42px] font-bold text-[var(--pizzeria-charcoal)]">
          Våra populära rätter
        </h2>
        <p className="text-center text-[var(--pizzeria-warm-gray)]">
          Över 90 rätter att välja mellan — här är några favoriter
        </p>
      </div>

      {/* Category Quick Links */}
      <div className="flex flex-wrap justify-center gap-3">
        {menuCategories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 transition-all hover:border-[var(--pizzeria-red)] hover:bg-[var(--pizzeria-red)]"
          >
            <span className="text-sm font-medium text-[var(--pizzeria-charcoal)] group-hover:text-white">
              {cat.name}
            </span>
            <span className="text-xs text-[var(--pizzeria-warm-gray)] group-hover:text-white/70">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Preview Grid */}
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
        {previewItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border border-[var(--border)]/50 bg-[var(--pizzeria-cream)]/30 p-5 transition-colors hover:border-[var(--pizzeria-red)]/30"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-[var(--pizzeria-red)]/10 px-3 py-1 text-xs font-medium text-[var(--pizzeria-red)]">
                {item.class}
              </span>
              <span className="text-sm font-semibold text-[var(--pizzeria-red)]">
                {item.classPrice}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {item.number && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pizzeria-charcoal)] text-xs font-bold text-white">
                  {item.number}
                </span>
              )}
              <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                {item.name}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--pizzeria-warm-gray)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* View Full Menu Button */}
      <Link
        href="/meny"
        className="flex items-center gap-2 rounded-full bg-[var(--pizzeria-red)] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
      >
        Se hela menyn
        <ArrowRight className="h-[18px] w-[18px]" />
      </Link>
    </section>
  );
}
