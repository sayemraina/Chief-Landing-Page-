import { ScrollRevealSection } from "./ScrollRevealSection";

export function Traceability() {
  return (
    <ScrollRevealSection
      paragraphs={[
        {
          text: "The data is structured at the point of capture, and the team works off the full record instead of scattered fragments.",
          className: "text-base sm:text-xl text-text-primary font-medium leading-relaxed text-center",
        },
        {
          text: "So when the IC memo is due, you're not rebuilding the story from six inboxes, a shared drive, and photos buried on someone's phone - pulled together from scratch, every single time.",
          className: "text-base sm:text-xl text-text-primary font-medium leading-relaxed text-center",
        },
        {
          text: "Chief already brought it to you.",
          className: "text-base sm:text-xl text-text-primary font-medium leading-relaxed text-center",
        },
      ]}
      innerClassName="max-w-2xl mx-auto"
      runwayVh={210}
      opaqueBg={false}
    />
  );
}
