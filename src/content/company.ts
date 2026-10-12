/**
 * Locale-independent company facts. Source: current uyka.com.tr (Sept 2026).
 * Translatable copy lives in `content/<locale>/`.
 */
export const company = {
  name: "UYKA",
  url: "https://www.uyka.com.tr",
  foundedYear: 1950,
  generation: 3,
  origin: { district: "İznik", province: "Bursa", country: "Türkiye" },
  legal: {
    company: "Öz Uygun Kardeşler Tarım Sanayi ve Ticaret Ltd. Şti.",
    registry: "No: 1881 · TE-10-K-010256",
  },
  contact: {
    phones: ["+90 536 596 56 15", "+90 535 740 20 46"],
    email: "info@uyka.com.tr",
    whatsapp: "905365965615",
    address: {
      street: "Tacir Mah. Tacir/9 Sk. No:6",
      district: "İznik",
      province: "Bursa",
      country: "TR",
    },
    mapsUrl: "https://maps.google.com/?q=Tacir+Mah.+Tacir%2F9+Sk.+No%3A6+%C4%B0znik+Bursa",
  },
} as const;

export const SOCIAL_NETWORKS = ["instagram", "facebook", "linkedin", "youtube"] as const;
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

/**
 * Social profiles — fill in the real URLs. The current site lists none, so
 * they are empty: production hides empty ones, development shows them as
 * placeholders so the layout can be reviewed.
 */
export const socialProfiles: Record<SocialNetwork, { label: string; url: string }> = {
  instagram: { label: "Instagram", url: "" },
  facebook: { label: "Facebook", url: "" },
  linkedin: { label: "LinkedIn", url: "" },
  youtube: { label: "YouTube", url: "" },
};

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export const whatsappHref = `https://wa.me/${company.contact.whatsapp}`;

/** wa.me link that opens the chat with a prefilled message. */
export function whatsappLink(message: string): string {
  return `${whatsappHref}?text=${encodeURIComponent(message)}`;
}
