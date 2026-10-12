import Link from "next/link";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { company, telHref, whatsappHref, whatsappLink } from "@/content/company";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { quoteHref } from "@/i18n/routes";
import type { AnalyticsEvent } from "@/lib/analytics";

type ContactRow = { label: string; event?: AnalyticsEvent; external?: boolean; items: { text: string; href: string }[] };

export function ContactView({ locale }: { locale: Locale }) {
  const { pages, labels, whatsapp, cta } = getDictionary(locale);
  const { contact: copy } = pages;
  const { contact, legal } = company;

  const rows: ContactRow[] = [
    { label: copy.phone, event: "phone_click", items: contact.phones.map((phone) => ({ text: phone, href: telHref(phone) })) },
    { label: copy.email, event: "email_click", items: [{ text: contact.email, href: `mailto:${contact.email}` }] },
    { label: copy.whatsapp, event: "whatsapp_click", external: true, items: [{ text: contact.phones[0], href: whatsappHref }] },
    {
      label: copy.address,
      external: true,
      items: [{ text: `${contact.address.street}, ${contact.address.district} / ${contact.address.province}`, href: contact.mapsUrl }],
    },
  ];

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} />
      <Container className="section-y">
        <dl className="divide-y divide-line border-y border-line">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="eyebrow text-accent">{row.label}</dt>
              <dd className="space-y-1 text-lg">
                {row.items.map((item) => (
                  <TrackedAnchor
                    key={item.text}
                    event={row.event}
                    href={item.href}
                    {...(row.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="block hover:text-muted"
                  >
                    {item.text}
                  </TrackedAnchor>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <TrackedAnchor
            event="whatsapp_click"
            href={whatsappLink(whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 rounded-3xl bg-whatsapp p-8 text-white"
          >
            <span className="font-display text-3xl">{whatsapp.orderLine}</span>
            <Icon name="whatsapp" className="size-10 shrink-0 transition-transform group-hover:scale-110" />
          </TrackedAnchor>
          <Link href={quoteHref(locale)} className="group flex items-center justify-between gap-6 rounded-3xl bg-brand p-8 text-on-brand">
            <span className="font-display text-3xl">{cta.corporateQuote}</span>
            <Icon name="arrowRight" className="size-8 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="mt-10 text-sm text-ink/70">
          {legal.company} · {labels.registry} {legal.registry}
        </p>
      </Container>
    </>
  );
}
