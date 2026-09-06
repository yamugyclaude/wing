"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { designChannels, type DesignerInput } from "@/lib/channelDesigner";

const DEFAULT_INPUT: DesignerInput = {
  vocal: 0,
  guitar: 0,
  bass: 0,
  keys: 0,
  drum: 0,
  otherDi: 0,
  monitorMixes: 1,
  fxBuses: 1,
  addStreamMain: false,
};

const NUMBER_FIELDS: { key: keyof DesignerInput; label: string }[] = [
  { key: "vocal", label: "보컬 채널 수" },
  { key: "guitar", label: "기타 채널 수" },
  { key: "bass", label: "베이스 채널 수" },
  { key: "keys", label: "신디/키보드 채널 수" },
  { key: "drum", label: "드럼 채널 수" },
  { key: "otherDi", label: "기타 DI 채널 수" },
];

export default function DesignerPage() {
  const [input, setInput] = useState<DesignerInput>(DEFAULT_INPUT);
  const result = useMemo(() => designChannels(input), [input]);

  const setNumber = (key: keyof DesignerInput, value: string) => {
    const n = Math.max(0, parseInt(value, 10) || 0);
    setInput((prev) => ({ ...prev, [key]: n }));
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 underline underline-offset-4">
        ← Q&A로
      </Link>

      <header className="mt-4 mb-6">
        <h1 className="text-2xl font-semibold">채널/버스 자동 설계기</h1>
        <p className="mt-1 text-sm text-neutral-500">
          장비 개수를 입력하면 정해진 규칙에 따라 채널 번호와 버스 배정이 바로 계산됩니다.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        {NUMBER_FIELDS.map((f) => (
          <label key={f.key} className="flex flex-col gap-1 text-sm">
            {f.label}
            <input
              type="number"
              min={0}
              value={input[f.key] as number}
              onChange={(e) => setNumber(f.key, e.target.value)}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5"
            />
          </label>
        ))}
        <label className="flex flex-col gap-1 text-sm">
          모니터 믹스 개수 (Bus)
          <input
            type="number"
            min={0}
            value={input.monitorMixes}
            onChange={(e) => setNumber("monitorMixes", e.target.value)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          이펙트(FX) 버스 개수
          <input
            type="number"
            min={0}
            value={input.fxBuses}
            onChange={(e) => setNumber("fxBuses", e.target.value)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5"
          />
        </label>
      </section>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={input.addStreamMain}
          onChange={(e) => setInput((prev) => ({ ...prev, addStreamMain: e.target.checked }))}
        />
        스트리밍/녹음용 Main 2 추가
      </label>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          결과: 채널 배정
        </h2>
        {result.channels.length === 0 ? (
          <p className="text-sm text-neutral-500">위에 채널 수를 입력하세요.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-2 pr-3">항목</th>
                <th className="py-2">채널 번호</th>
              </tr>
            </thead>
            <tbody>
              {result.channels.map((c) => (
                <tr key={c.category} className="border-b border-neutral-100 dark:border-neutral-900">
                  <td className="py-2 pr-3 font-medium">{c.category}</td>
                  <td className="py-2">
                    {c.from === c.to ? `CH${c.from}` : `CH${c.from}-${c.to}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="mt-2 text-xs text-neutral-500">총 입력 채널: {result.totalChannels}개</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          결과: 버스 / Main
        </h2>
        <ul className="text-sm space-y-1">
          {result.monitorBuses.length > 0 && (
            <li>
              모니터 버스: {result.monitorBuses.map((b) => `Bus ${b}`).join(", ")}
            </li>
          )}
          {result.fxBusesList.length > 0 && (
            <li>FX 버스: {result.fxBusesList.map((b) => `Bus ${b}`).join(", ")}</li>
          )}
          <li>Main: {result.mains.join(", ")}</li>
        </ul>
      </section>

      {result.warnings.length > 0 && (
        <div className="mt-6 rounded-md bg-red-50 dark:bg-red-950 p-3">
          {result.warnings.map((w) => (
            <p key={w} className="text-xs text-red-800 dark:text-red-200">
              ⚠ {w}
            </p>
          ))}
        </div>
      )}

      <section className="mt-8 text-xs text-neutral-500">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          배정 규칙
        </h2>
        <ol className="list-decimal list-inside space-y-0.5">
          <li>채널 순서: 보컬 → 기타 → 베이스 → 신디/키보드 → 드럼 → 기타 DI</li>
          <li>모니터 버스는 Bus 1부터, FX 버스는 그다음 번호부터 순서대로 배정</li>
          <li>Main 1은 항상 PA용으로 고정, 필요시 Main 2를 스트리밍/녹음용으로 추가</li>
        </ol>
      </section>
    </div>
  );
}
