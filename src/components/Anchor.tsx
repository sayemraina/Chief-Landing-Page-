import { ScrollRevealSection } from "./ScrollRevealSection";

export function Anchor() {
  return (
    <ScrollRevealSection
      paragraphs={[
        {
          text: "Today, every site visit produces photos in a camera roll, notes in a car, and a day of calls to get the team up to speed. The analyst works from whatever survived the handoff. The memo is reconstructed, not captured.",
          className: "text-lg sm:text-xl text-text-secondary leading-relaxed",
        },
        {
          text: "Chief starts from the other end: the data is structured at the point of capture, and the team works from the full record, not the fragments.",
          className: "text-lg sm:text-xl text-text-primary leading-relaxed font-medium",
        },
      ]}
      runwayVh={130}
      title="Where context begins"
    />
  );
}
