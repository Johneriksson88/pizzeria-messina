"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="om-oss"
      className="flex h-[520px] w-full overflow-hidden bg-[var(--pizzeria-charcoal)]"
    >
      {/* Text Content */}
      <div className="flex h-full flex-1 flex-col justify-center gap-6 px-[60px] py-20">
        <span className="text-[13px] font-semibold tracking-[3px] text-[var(--pizzeria-gold)]">
          VÅR HISTORIA
        </span>

        <h2 className="font-display text-[40px] font-bold leading-[1.1] text-white">
          Välkommen till
          <br />
          Pizzeria Messina
        </h2>

        <p className="max-w-[500px] text-base leading-[1.7] text-white/70">
          Sedan 1980 har vi serverat Tyresös invånare autentisk italiensk mat
          med passion och kärlek. Vår pizzeria på Trollbäcksvägen 34A är en
          plats där familjer samlas, vänner möts och alla känner sig som hemma.
          <br />
          <br />
          Vi använder bara de finaste ingredienserna — importerad mozzarella,
          San Marzano-tomater och färska grönsaker — för att skapa rätter som
          tar dig rakt till Napoli.
        </p>

        <button className="flex w-fit items-center gap-2 rounded-full bg-[var(--pizzeria-olive)] px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          Läs mer om oss
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-full w-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
          alt="Restaurant interior"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
