import { ScrollRevealSection } from "./ScrollRevealSection";

export function Problem() {
  return (
    <ScrollRevealSection
      paragraphs={[
        {
          text: "Mid-market CRE firms have tools for every part of their operation, but every tool sees only its own function. Nothing connects the dots and tells you what to actually do about it.",
          className: "text-lg sm:text-xl text-text-secondary leading-relaxed",
        },
        {
          text: "Chief captures site visits, structures and consolidates data scattered across tools, properties, and people into one living record, so your whole team stays up to speed, without anyone chasing it.",
          className: "text-lg sm:text-xl text-text-primary leading-relaxed",
        },
      ]}
      runwayVh={150}
    />
  );
}
