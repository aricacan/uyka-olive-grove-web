/**
 * True when motion should be avoided: the OS "reduce motion" setting or the
 * site's own accessibility panel ("Animasyonları durdur").
 */
export function isMotionReduced(): boolean {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.hasAttribute("data-motion-off")
  );
}
