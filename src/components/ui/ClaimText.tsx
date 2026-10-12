import { claimRegister, type ClaimId } from "@/content/claims";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

/** Renders a claim from the register; pending claims get a visible marker. */
export function ClaimText({ id, locale }: { id: ClaimId; locale: Locale }) {
  const { claims, labels } = getDictionary(locale);
  return (
    <span>
      {claims[id]}
      {claimRegister[id].status === "pending" && (
        <sup className="ml-0.5 text-accent" title={labels.pendingClaim}>
          *
        </sup>
      )}
    </span>
  );
}
