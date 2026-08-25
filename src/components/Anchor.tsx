import { ScrollRevealSection } from "./ScrollRevealSection";

export function Anchor() {
  return (
    <ScrollRevealSection
      paragraphs={[
        {
          text: "Today, every site visit produces photos in a camera roll, notes in a car, and a string of calls to get the team up to speed. The analyst works from whatever survived the handoff. The memo is reconstructed, not captured.",
          className: "text-lg sm:text-xl text-text-secondary leading-relaxed",
        },
        {
          text: "This is where Chief starts. The data is structured at the point of capture, and the team works off the full record instead of scattered fragments.",
          className: "text-lg sm:text-xl text-text-primary leading-relaxed font-medium",
        },
        {
          text: "It's built to grow into everything downstream a site visit touches - the underwriting model, the IC memo, the data room, the lender package, the handoff to the Asset Manager and so on.",
          className: "text-lg sm:text-xl text-text-primary leading-relaxed font-medium",
        },
      ]}
      runwayVh={170}
      title="Where context begins"
    />
  );
}
