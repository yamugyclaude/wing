import Link from "next/link";
import { notFound } from "next/navigation";
import { scenarioList } from "@/lib/scenarios";
import ScenarioFlowDiagram from "@/components/ScenarioFlowDiagram";

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = scenarioList.find((s) => s.slug === slug);
  if (!scenario) notFound();

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <Link href="/scenario" className="text-sm text-neutral-500 underline underline-offset-4">
        ← 시나리오 목록으로
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={
            scenario.confirmed
              ? "text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "text-xs rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }
        >
          {scenario.confirmed ? "확정" : "미확정"}
        </span>
        {scenario.source && <span className="text-xs text-neutral-500">{scenario.source}</span>}
      </div>

      <h1 className="mt-2 text-2xl font-semibold">{scenario.title}</h1>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
          가상 환경 (채널 구성)
        </h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {scenario.setup.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">목표</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {scenario.goal.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <ScenarioFlowDiagram />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          단계별 절차
        </h2>
        <ol className="flex flex-col gap-4">
          {scenario.steps.map((step) => (
            <li
              key={step.n}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-mono rounded-full bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5">
                  {step.n}
                </span>
                <h3 className="font-medium">{step.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{step.action}</p>
              <p className="mt-1 text-xs text-neutral-500">📍 {step.where}</p>
              {step.note && (
                <p className="mt-1 text-xs text-neutral-500 italic">{step.note}</p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
