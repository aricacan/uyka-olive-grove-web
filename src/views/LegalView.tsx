import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

type LegalPageKey = keyof ReturnType<typeof getDictionary>["legalPages"];

export function LegalView({ page, locale }: { page: LegalPageKey; locale: Locale }) {
  const { eyebrow, title, updated, sections } = getDictionary(locale).legalPages[page];

  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} intro={updated} />
      <Container className="section-y max-w-3xl space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-3xl text-brand">{section.heading}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
