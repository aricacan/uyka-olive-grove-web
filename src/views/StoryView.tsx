import { PageIntro } from "@/components/layout/PageIntro";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { StoryValues } from "@/components/sections/StoryValues";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

export function StoryView({ locale }: { locale: Locale }) {
  const { story } = getDictionary(locale).sections;

  return (
    <>
      <PageIntro eyebrow={story.eyebrow} title={story.heading} />
      <Container className="section-y max-w-3xl space-y-6 text-lg leading-relaxed text-ink/85">
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Container>
      <StoryTimeline locale={locale} />
      <StoryValues locale={locale} />
      <StoryTeaser locale={locale} showCta={false} />
    </>
  );
}
