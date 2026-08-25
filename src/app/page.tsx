import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Demo } from "@/components/Demo";
import { Traceability } from "@/components/Traceability";
import { Anchor } from "@/components/Anchor";
import { FooterCTA } from "@/components/FooterCTA";
import { BreathingGrid } from "@/components/BreathingGrid";
import { ScrollCue } from "@/components/ScrollCue";
import { TeamViewsMobile } from "@/components/TeamViewsMobile";

export default function Home() {
  return (
    <>
      <Header />
      <BreathingGrid />
      <ScrollCue />
      <main>
        <section className="relative min-h-screen overflow-hidden">
          <Hero />
        </section>
        <Problem />
        <div id="demo-boundary">
          <Demo />
        </div>
        <TeamViewsMobile />
        <Anchor />
        <Traceability />
        <FooterCTA />
      </main>
    </>
  );
}
