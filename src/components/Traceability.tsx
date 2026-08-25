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
          text: "When the IC memo is due, you're not rebuilding the story from six inboxes, a shared drive, and photos buried on someone's phone - pulled together from scratch, every time.",
          className: "text-base sm:text-xl text-text-secondary leading-relaxed text-center",
        },
        {
          text: "No context hunting, no rebuilding the story before every decision.\nJust one system, grounded in your firm's data.",
          className: "text-base sm:text-xl text-text-primary font-medium leading-relaxed text-center",
        },
      ]}
      innerClassName="max-w-2xl mx-auto"
      runwayVh={140}
      opaqueBg={false}
    />
  );
}
