"use client";

import Link from "next/link";
import { useState } from "react";

const TEMPLATE_TEXT = `[공연 기본 정보]
- 날짜:
- 장소(실내/실외):
- 관객 규모:
- 행사 성격(밴드공연/강연/행사 등):

[스피커]
- 모델명 / 수량 / 역할(메인, 서브, 모니터 등):

[앰프]
- 모델명 / 수량 / 담당 스피커:

[마이크 · 무선]
- 모델명 / 수량 / 용도(악기명 등):

[DI 박스]
- 수량 / 용도(악기명):

[콘솔]
- 베링거 WING

[기타 특이사항]
- `;

export default function TemplatePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — user can still select and copy manually
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 underline underline-offset-4">
        ← Q&A로
      </Link>

      <header className="mt-4 mb-6">
        <h1 className="text-2xl font-semibold">입력 장비 템플릿</h1>
        <p className="mt-1 text-sm text-neutral-500">
          새 공연 시나리오를 짤 때, 이 템플릿을 복사해서 채운 뒤 대화창에 붙여넣으세요. 하나씩
          질문받지 않고 한 번에 정리할 수 있습니다.
        </p>
      </header>

      <button
        onClick={handleCopy}
        className="mb-4 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
      >
        {copied ? "복사됨 ✓" : "템플릿 복사하기"}
      </button>

      <pre className="whitespace-pre-wrap rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 text-sm leading-relaxed font-mono">
        {TEMPLATE_TEXT}
      </pre>
    </div>
  );
}
