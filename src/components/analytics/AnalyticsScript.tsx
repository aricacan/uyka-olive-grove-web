import Script from "next/script";
import { PLAUSIBLE_SCRIPT_SRC, plausibleDomain } from "@/lib/analytics";

/** Queues events fired before the Plausible script finishes loading. */
const QUEUE_STUB = "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}";

/** Renders nothing unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. */
export function AnalyticsScript() {
  if (!plausibleDomain) return null;

  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {QUEUE_STUB}
      </Script>
      <Script src={PLAUSIBLE_SCRIPT_SRC} data-domain={plausibleDomain} strategy="afterInteractive" />
    </>
  );
}
