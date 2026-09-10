import Link from "next/link";
import { m32rQnaList } from "@/lib/m32rQna";

export default function M32rHome() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">M32R LIVE Q&A</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Midas M32R LIVE 학습 기록 — WING과는 별도로 독립 운용합니다.
        </p>
        <div className="mt-4 flex flex-col gap-1">
          <a
            href="/manual-m32r/M32R-User-Manual.pdf"
            className="text-sm underline underline-offset-4"
          >
            공식 User Manual 열람/다운로드 (PDF)
          </a>
          <a
            href="/manual-m32r/M32R-Live-QuickStart.pdf"
            className="text-sm underline underline-offset-4"
          >
            공식 Quick Start Guide 열람/다운로드 (PDF)
          </a>
          <Link href="/" className="text-sm underline underline-offset-4 text-neutral-500">
            ← WING Q&A로 이동 (다른 콘솔, 별도 공간)
          </Link>
        </div>
      </header>

      <ul className="flex flex-col gap-3">
        {m32rQnaList.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/m32r/${item.slug}`}
              className="block rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span
                  className={
                    item.confirmed
                      ? "shrink-0 whitespace-nowrap text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "shrink-0 whitespace-nowrap text-xs rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }
                >
                  {item.confirmed ? "확정" : "미확정"}
                </span>
                <h2 className="font-medium">{item.question}</h2>
              </div>
              <p className="mt-1 text-sm text-neutral-500">{item.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
