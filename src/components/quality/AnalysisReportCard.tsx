import { getDictionary } from "@/content/index";
import { ANALYSIS_PARAMETERS, type AnalysisReport } from "@/content/quality";
import type { Locale } from "@/i18n/config";
import { formatDate } from "@/lib/format";

type AnalysisReportCardProps = { report: AnalysisReport; productName: string; locale: Locale };

/** One lab report: meta line + parameter table + PDF link. */
export function AnalysisReportCard({ report, productName, locale }: AnalysisReportCardProps) {
  const { parameters, reportLabels } = getDictionary(locale).pages.quality;
  const date = formatDate(report.date, locale);
  const meta = [
    { label: reportLabels.lot, value: report.lot },
    { label: reportLabels.harvest, value: report.harvestSeason },
    { label: reportLabels.laboratory, value: report.laboratory },
    { label: reportLabels.date, value: date },
  ];

  return (
    <article className="border border-line p-6 sm:p-8">
      <h3 className="text-3xl text-brand">{productName}</h3>
      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        {meta.map((item) => (
          <div key={item.label} className="flex gap-2">
            <dt className="text-muted">{item.label}:</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <table className="mt-6 w-full text-left">
        <thead>
          <tr className="eyebrow text-muted">
            <th scope="col" className="pb-3 font-semibold">{reportLabels.parameter}</th>
            <th scope="col" className="pb-3 text-right font-semibold">{reportLabels.value}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {ANALYSIS_PARAMETERS.filter((parameter) => report.values[parameter] !== undefined).map((parameter) => (
            <tr key={parameter}>
              <th scope="row" className="py-3 font-normal">{parameters[parameter]}</th>
              <td className="py-3 text-right tabular-nums">{report.values[parameter]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {report.pdf && (
        <a href={report.pdf} target="_blank" rel="noopener noreferrer" className="eyebrow mt-6 inline-flex min-h-11 items-center text-brand underline underline-offset-8">
          {reportLabels.pdf}
        </a>
      )}
    </article>
  );
}
