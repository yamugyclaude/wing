import Link from "next/link";
import { scenarioList } from "@/lib/scenarios";

export default function ScenarioListPage() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 underline underline-offset-4">
        ← Q&A로
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-semibold">실전 시나리오</h1>
        <p className="mt-1 text-sm text-neutral-500">
          가상 환경을 세워두고, 물리 버튼까지 포함한 라우팅 절차를 순서대로 정리합니다.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {scenarioList.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/scenario/${s.slug}`}
              className="block rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <h2 className="font-medium">{s.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">{s.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
