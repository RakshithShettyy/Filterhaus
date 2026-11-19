import { connection } from "next/server";
import { About } from "@/components/About";
import { Audiences } from "@/components/Audiences";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/motion/Marquee";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Showreel } from "@/components/Showreel";
import { readHomepage } from "@/lib/homepage";

export const instant = false;

export default async function Home() {
  await connection();
  const media = await readHomepage();

  return (
    <>
      <main id="main">
        <Hero poster={media.hero.src} alt={media.hero.alt} />
        <Showreel src={media.showreel.src} />
        <Marquee />
        <Audiences />
        <Services photos={media.services} />
        <Marquee />
        <Packages />
        <Process />
        <About founder={media.founder} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
