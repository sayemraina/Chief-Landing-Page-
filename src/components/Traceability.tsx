import { ScrollRevealSection } from "./ScrollRevealSection";

export function Traceability() {
  return (
    <ScrollRevealSection
      paragraphs={[
        {
          text: "With Chief, every insight is traced back to its source: the site visit, the call, the comp, the memo, the tool.",
          className: "text-base sm:text-xl text-text-secondary leading-relaxed text-center",
        },
        {
          text: "No context hunting, no rebuilding the story before every decision. Just one conversation grounded in your firm's data.",
          className: "text-base sm:text-xl text-text-primary font-medium leading-relaxed text-center",
        },
      ]}
      innerClassName="max-w-2xl mx-auto"
      runwayVh={120}
      opaqueBg={false}
    />
  );
}
