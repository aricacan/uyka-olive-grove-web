import { Icon } from "@/components/ui/Icon";
import { SOCIAL_NETWORKS, socialProfiles } from "@/content/company";

const SHOW_PLACEHOLDERS = process.env.NODE_ENV === "development";

/** Round outline icons (Partanna reference). Empty profiles are dev-only placeholders. */
export function SocialLinks({ className = "" }: { className?: string }) {
  const networks = SOCIAL_NETWORKS.filter((network) => socialProfiles[network].url || SHOW_PLACEHOLDERS);
  if (networks.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {networks.map((network) => {
        const { label, url } = socialProfiles[network];
        return (
          <li key={network}>
            <a
              href={url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={url ? label : `${label} — adres eklenecek`}
              className="flex size-11 items-center justify-center rounded-full border border-current/30 transition-colors hover:border-current hover:bg-on-brand hover:text-brand"
            >
              <Icon name={network} className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
