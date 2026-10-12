/** "Plain words <em>italic accent.</em>" — the recurring headline pattern. */
export function EmphasisTitle({ title, emphasis }: { title: string; emphasis?: string }) {
  return (
    <>
      {title} {emphasis && <em>{emphasis}</em>}
    </>
  );
}
