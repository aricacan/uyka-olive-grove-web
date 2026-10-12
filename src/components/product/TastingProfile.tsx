import type { TastingScore } from "@/content/catalog";

/** Panel scores are on a 0–10 scale (IOC sensory method). */
const TASTING_SCALE_MAX = 10;

type TastingProfileProps = {
  scores: TastingScore[];
  labels: Record<TastingScore["attribute"], string>;
  heading: string;
  source: string;
};

/** Horizontal bars; rendered only when real panel scores exist. */
export function TastingProfile({ scores, labels, heading, source }: TastingProfileProps) {
  return (
    <section>
      <h2 className="text-3xl text-brand">{heading}</h2>
      <dl className="mt-6 space-y-4">
        {scores.map((score) => (
          <div key={score.attribute}>
            <div className="flex justify-between text-sm">
              <dt>{labels[score.attribute]}</dt>
              <dd className="tabular-nums text-muted">
                {score.score} / {TASTING_SCALE_MAX}
              </dd>
            </div>
            <div aria-hidden className="mt-2 h-1.5 bg-line">
              <div className="h-full bg-brand" style={{ width: `${(score.score / TASTING_SCALE_MAX) * 100}%` }} />
            </div>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted">{source}</p>
    </section>
  );
}
