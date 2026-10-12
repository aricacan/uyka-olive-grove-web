import type { ReactNode } from "react";

type Tone = "light" | "dark";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: Tone;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left" }: SectionHeadingProps) {
  const titleColor = tone === "dark" ? "text-brand" : "text-on-brand";
  const introColor = tone === "dark" ? "text-ink/75" : "text-on-brand/75";
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <header className={`max-w-2xl ${alignment}`}>
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className={`mt-4 text-[2.35rem] sm:text-5xl lg:text-6xl ${titleColor}`}>{title}</h2>
      {intro && <p className={`mt-6 text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p>}
    </header>
  );
}
