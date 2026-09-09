import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Demo } from "@/components/Demo";
import { Traceability } from "@/components/Traceability";
import { FooterCTA } from "@/components/FooterCTA";
import { BreathingGrid } from "@/components/BreathingGrid";
import { ScrollCue } from "@/components/ScrollCue";
import { TeamViewsMobile } from "@/components/TeamViewsMobile";
import { PostDemoCTA } from "@/components/PostDemoCTA";
import { SectionNav } from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <Header />
      <SectionNav />
      <BreathingGrid />
      <ScrollCue />
      <main>
        <section className="relative min-h-screen overflow-hidden">
          <Hero />
        </section>
        <div id="demo-boundary" className="relative">
          <div id="demo" className="absolute top-[20vh]" />
          <Demo />
        </div>
        <TeamViewsMobile />
        <PostDemoCTA />
        <div id="problem">
          <Problem />
        </div>
        <div id="traceability">
          <Traceability />
        </div>
        <FooterCTA />
      </main>
    </>
  );
}
