import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageIntroProps = { eyebrow: string; title: ReactNode; intro?: string };

/** Dark header band for inner pages; clears the fixed header. */
export function PageIntro({ eyebrow, title, intro }: PageIntroProps) {
  return (
    <section className="bg-brand pb-14 pt-36 sm:pb-20 sm:pt-40 text-on-brand">
      <Container>
        <p className="eyebrow text-accent-soft">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[2.6rem] sm:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-on-brand/80">{intro}</p>}
      </Container>
    </section>
  );
}
