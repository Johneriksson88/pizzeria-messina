"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const menuCategories = [
  {
    title: "Pizzor",
    description:
      "56 sorters pizza — från klassisk Margherita till vår egna Messina Special",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    href: "/meny#pizzor",
  },
  {
    title: "Kebab & Gyros",
    description:
      "Kebab, gyros och falafel — serverat med fräscha tillbehör",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    href: "/meny#kebab",
  },
  {
    title: "Pasta",
    description:
      "Bolognese, Carbonara, Lasagne — 12 hemlagade pastarätter",
    image:
      "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=600&q=80",
    href: "/meny#pasta",
  },
  {
    title: "Sallader",
    description: "14 fräscha sallader — grekisk, tonfisk, kyckling och mer",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    href: "/meny#sallader",
  },
];

export default function MenuHighlights() {
  return (
    <section
      id="meny"
      className="flex w-full flex-col items-center gap-12 bg-[var(--pizzeria-cream)] px-[60px] py-20"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[13px] font-semibold tracking-[3px] text-[var(--pizzeria-red)]">
          VÅR MENY
        </span>
        <h2 className="font-display text-[42px] font-bold text-[var(--pizzeria-charcoal)]">
          Utforska våra rätter
        </h2>
        <p className="text-base text-[var(--pizzeria-warm-gray)]">
          Från klassisk napolitansk pizza till krispiga sallader och hemlagad
          pasta
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid w-full grid-cols-4 gap-6">
        {menuCategories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(26,23,20,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(26,23,20,0.12)]"
          >
            {/* Image */}
            <div className="relative h-[220px] w-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-6">
              <h3 className="font-display text-2xl font-bold text-[var(--pizzeria-charcoal)]">
                {category.title}
              </h3>
              <p className="text-sm leading-[1.5] text-[var(--pizzeria-warm-gray)]">
                {category.description}
              </p>
              <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[var(--pizzeria-red)] transition-colors group-hover:text-[var(--pizzeria-charcoal)]">
                Se alla <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
