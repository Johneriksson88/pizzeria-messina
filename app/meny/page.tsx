"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pizza, ArrowLeft, Clock } from "lucide-react";
import {
  pizzaCategories,
  kebabMenu,
  pastaMenu,
  salladMenu,
  barnMenu,
  alacarteMenu,
  lunchMenu,
} from "@/data/menu";

const mainCategories = [
  { id: "lunch", name: "Lunch" },
  { id: "pizzor", name: "Pizzor" },
  { id: "kebab", name: "Kebab" },
  { id: "pasta", name: "Pasta" },
  { id: "sallader", name: "Sallader" },
  { id: "barn", name: "Barnmeny" },
  { id: "alacarte", name: "À la Carte" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("lunch");
  const [activePizzaClass, setActivePizzaClass] = useState("klass1");

  // Scroll to section when category changes
  useEffect(() => {
    const element = document.getElementById(activeCategory);
    if (element) {
      const offset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[var(--pizzeria-cream)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--pizzeria-charcoal)]">
        <div className="flex h-16 items-center justify-between px-[60px]">
          <Link href="/" className="flex items-center gap-3">
            <Pizza className="h-7 w-7 text-[var(--pizzeria-red)]" />
            <span className="font-display text-xl font-bold tracking-[2px] text-white">
              PIZZERIA MESSINA
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka till startsidan
          </Link>
        </div>

        {/* Category Navigation */}
        <div className="flex items-center justify-center gap-2 bg-[var(--pizzeria-charcoal)] px-[60px] py-3">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[var(--pizzeria-red)] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold text-[var(--pizzeria-charcoal)]">
            Vår Meny
          </h1>
          <p className="mt-3 text-[var(--pizzeria-warm-gray)]">
            Autentisk italiensk mat sedan 1980
          </p>
        </div>

        {/* LUNCH SECTION */}
        <section id="lunch" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-olive)]/30" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {lunchMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-olive)]/30" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            {/* Lunch Header */}
            <div className="mb-8 flex flex-col items-center gap-4 border-b border-[var(--border)] pb-6 text-center">
              <div className="flex items-center gap-2 text-[var(--pizzeria-olive)]">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Serveras vardagar 10:00–14:00</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="rounded-full bg-[var(--pizzeria-olive)] px-6 py-2 text-lg font-bold text-white">
                  {lunchMenu.priceInfo}
                </span>
                <p className="text-sm text-[var(--pizzeria-warm-gray)]">
                  {lunchMenu.description}
                </p>
              </div>
            </div>

            {/* Lunch Options - Standard */}
            <div className="mb-8">
              <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-[2px] text-[var(--pizzeria-warm-gray)]">
                Välj från vår meny
              </h4>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {lunchMenu.items?.slice(0, 6).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-xl border border-[var(--pizzeria-olive)]/20 bg-[var(--pizzeria-olive)]/5 p-4 transition-colors hover:border-[var(--pizzeria-olive)]/40"
                  >
                    <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                      {item.name}
                    </span>
                    <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs font-semibold uppercase tracking-[2px] text-[var(--pizzeria-warm-gray)]">
                Dagens Rätter
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {/* Lunch Options - Specials */}
            <div className="grid gap-4 md:grid-cols-2">
              {lunchMenu.items?.slice(6).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-xl border border-[var(--border)]/50 p-5 transition-colors hover:border-[var(--pizzeria-olive)]/30 hover:bg-[var(--pizzeria-cream)]/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--pizzeria-olive)]/10">
                    <span className="text-lg">🍽️</span>
                  </div>
                  <div>
                    <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                      {item.name}
                    </span>
                    <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PIZZOR SECTION */}
        <section id="pizzor" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              Pizzor
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          {/* Pizza Class Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {pizzaCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActivePizzaClass(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activePizzaClass === cat.id
                    ? "bg-[var(--pizzeria-charcoal)] text-white"
                    : "bg-white text-[var(--pizzeria-warm-gray)] shadow-sm hover:bg-[var(--pizzeria-charcoal)] hover:text-white"
                }`}
              >
                {cat.name}
                {cat.price && (
                  <span className="ml-2 text-xs opacity-70">{cat.price}</span>
                )}
              </button>
            ))}
          </div>

          {/* Active Pizza Class */}
          {pizzaCategories.map(
            (category) =>
              activePizzaClass === category.id && (
                <div key={category.id} className="rounded-2xl bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--pizzeria-charcoal)]">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-1 text-sm italic text-[var(--pizzeria-warm-gray)]">
                          {category.description}
                        </p>
                      )}
                    </div>
                    {category.price && (
                      <span className="rounded-full bg-[var(--pizzeria-red)] px-4 py-2 text-sm font-bold text-white">
                        {category.price}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between rounded-lg border border-[var(--border)]/50 p-4 transition-colors hover:border-[var(--pizzeria-red)]/30 hover:bg-[var(--pizzeria-cream)]/50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {item.number && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pizzeria-red)]/10 text-xs font-bold text-[var(--pizzeria-red)]">
                                {item.number}
                              </span>
                            )}
                            <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                              {item.name}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                            {item.description}
                          </p>
                        </div>
                        {item.price && (
                          <span className="ml-4 whitespace-nowrap text-sm font-semibold text-[var(--pizzeria-red)]">
                            {item.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </section>

        {/* KEBAB SECTION */}
        <section id="kebab" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {kebabMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="mb-6 text-center text-[var(--pizzeria-warm-gray)]">
              {kebabMenu.description}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {kebabMenu.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center rounded-xl border border-[var(--border)]/50 p-6 text-center transition-colors hover:border-[var(--pizzeria-red)]/30"
                >
                  <span className="font-display text-xl font-bold text-[var(--pizzeria-charcoal)]">
                    {item.name}
                  </span>
                  <p className="mt-2 text-sm text-[var(--pizzeria-warm-gray)]">
                    {item.description}
                  </p>
                  <span className="mt-4 rounded-full bg-[var(--pizzeria-red)] px-4 py-2 text-sm font-bold text-white">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PASTA SECTION */}
        <section id="pasta" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {pastaMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              {pastaMenu.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between rounded-lg border border-[var(--border)]/50 p-4 transition-colors hover:border-[var(--pizzeria-red)]/30 hover:bg-[var(--pizzeria-cream)]/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {item.number && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pizzeria-olive)]/10 text-xs font-bold text-[var(--pizzeria-olive)]">
                          {item.number}
                        </span>
                      )}
                      <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                        {item.name}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                      {item.description}
                    </p>
                  </div>
                  <span className="ml-4 whitespace-nowrap text-sm font-semibold text-[var(--pizzeria-red)]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SALLADER SECTION */}
        <section id="sallader" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {salladMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <span className="rounded-full bg-[var(--pizzeria-red)] px-4 py-2 text-sm font-bold text-white">
                {salladMenu.priceInfo}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {salladMenu.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border)]/50 p-4 transition-colors hover:border-[var(--pizzeria-red)]/30 hover:bg-[var(--pizzeria-cream)]/50"
                >
                  {item.number && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--pizzeria-gold)]/20 text-xs font-bold text-[var(--pizzeria-gold)]">
                      {item.number}
                    </span>
                  )}
                  <div>
                    <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                      {item.name}
                    </span>
                    <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BARNMENY SECTION */}
        <section id="barn" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {barnMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {barnMenu.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-xl border border-[var(--border)]/50 p-5 transition-colors hover:border-[var(--pizzeria-red)]/30"
                >
                  <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                    {item.name}
                  </span>
                  <p className="mt-1 flex-1 text-sm text-[var(--pizzeria-warm-gray)]">
                    {item.description}
                  </p>
                  <span className="mt-3 text-sm font-semibold text-[var(--pizzeria-red)]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* À LA CARTE SECTION */}
        <section id="alacarte" className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
            <h2 className="font-display text-3xl font-bold text-[var(--pizzeria-charcoal)]">
              {alacarteMenu.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--pizzeria-red)]/20" />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              {alacarteMenu.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between rounded-lg border border-[var(--border)]/50 p-4 transition-colors hover:border-[var(--pizzeria-red)]/30 hover:bg-[var(--pizzeria-cream)]/50"
                >
                  <div className="flex-1">
                    <span className="font-display text-lg font-bold text-[var(--pizzeria-charcoal)]">
                      {item.name}
                    </span>
                    <p className="mt-1 text-sm text-[var(--pizzeria-warm-gray)]">
                      {item.description}
                    </p>
                  </div>
                  <span className="ml-4 whitespace-nowrap text-sm font-semibold text-[var(--pizzeria-red)]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="rounded-2xl bg-[var(--pizzeria-charcoal)] p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-white">
            Vill du beställa?
          </h3>
          <p className="mt-2 text-white/70">
            Ring oss på{" "}
            <a
              href="tel:+4684477064"
              className="font-semibold text-[var(--pizzeria-gold)] hover:underline"
            >
              08-447 70 64
            </a>{" "}
            eller besök oss på Trollbäcksvägen 34A
          </p>
        </div>
      </main>
    </div>
  );
}
