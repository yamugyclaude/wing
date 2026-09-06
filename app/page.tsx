import Link from "next/link";
import { qnaList } from "@/lib/qna";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">WING Q&A</h1>
        <p className="mt-1 text-sm text-neutral-500">
          베링거 WING 학습 기록 — 막히는 부분을 질문하고, 개념이 확정되면 여기 쌓입니다.
        </p>
        <div className="mt-4 flex flex-col gap-1">
          <a
            href="/manual/WING-User-Manual_2025-10-20.pdf"
            className="text-sm underline underline-offset-4"
          >
            공식 매뉴얼 원문 열람/다운로드 (PDF, 2025-10-20)
          </a>
          <Link href="/scenario" className="text-sm underline underline-offset-4">
            실전 시나리오 (물리 버튼 포함 라우팅 절차) →
          </Link>
          <Link href="/template" className="text-sm underline underline-offset-4">
            입력 장비 템플릿 (새 시나리오 준비용) →
          </Link>
        </div>
      </header>

      <ul className="flex flex-col gap-3">
        {qnaList.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/qna/${item.slug}`}
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
