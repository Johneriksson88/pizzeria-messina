import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuHighlights from "@/components/MenuHighlights";
import About from "@/components/About";
import FullMenu from "@/components/FullMenu";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-full w-full flex-col bg-[var(--pizzeria-cream)]">
      <Header />
      <Hero />
      <MenuHighlights />
      <About />
      <FullMenu />
      <Contact />
      <Footer />
    </main>
  );
}
