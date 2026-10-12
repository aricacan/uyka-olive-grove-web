import { CLAIM_IDS, claimRegister } from "@/content/claims";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

/** Every public claim with its evidence status ("Belgelendi" / "Belge hazırlanıyor"). */
export function ClaimStatusList({ locale }: { locale: Locale }) {
  const { claims, pages } = getDictionary(locale);
  const { verified, pending } = pages.quality;

  return (
    <ul className="divide-y divide-line border-y border-line">
      {CLAIM_IDS.map((id) => (
        <li key={id} className="flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-baseline">
          <span className="font-display text-2xl text-brand">{claims[id]}</span>
          <span className="eyebrow shrink-0 text-muted">{claimRegister[id].status === "verified" ? verified : pending}</span>
        </li>
      ))}
    </ul>
  );
}
