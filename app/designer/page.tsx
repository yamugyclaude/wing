"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  designChannels,
  type BusRow,
  type CategoryRow,
} from "@/lib/channelDesigner";
import ConsoleFaderView from "@/components/ConsoleFaderView";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `row-${idCounter}`;
}

const DEFAULT_CATEGORIES: CategoryRow[] = [
  { id: nextId(), label: "VOX", count: 0 },
  { id: nextId(), label: "Ac GTR", count: 0 },
  { id: nextId(), label: "GTR", count: 0 },
  { id: nextId(), label: "BASS", count: 0 },
  { id: nextId(), label: "DRUM", count: 0 },
];

const DEFAULT_BUSES: BusRow[] = [
  { id: nextId(), label: "모니터" },
];

function moveItem<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= arr.length) return arr;
  const copy = [...arr];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}

export default function DesignerPage() {
  const [categories, setCategories] = useState<CategoryRow[]>(DEFAULT_CATEGORIES);
  const [buses, setBuses] = useState<BusRow[]>(DEFAULT_BUSES);
  const [mains, setMains] = useState<string[]>(["Main 1 (PA)"]);
  const [labelOverrides, setLabelOverrides] = useState<Record<number, string>>({});

  const result = useMemo(() => designChannels(categories, buses, mains), [categories, buses, mains]);

  const finalChannels = useMemo(
    () =>
      result.flatChannels.map((c) => ({
        ...c,
        label: labelOverrides[c.number] ?? c.label,
      })),
    [result.flatChannels, labelOverrides]
  );

  const setChannelLabel = (number: number, label: string) => {
    setLabelOverrides((prev) => ({ ...prev, [number]: label }));
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 underline underline-offset-4">
        ← Q&A로
      </Link>

      <header className="mt-4 mb-6">
        <h1 className="text-2xl font-semibold">채널/버스 자동 설계기</h1>
        <p className="mt-1 text-sm text-neutral-500">
          항목 이름·순서·개수를 자유롭게 정하면, 그 순서 그대로 채널/버스 번호가 계산됩니다.
        </p>
      </header>

      {/* Channel categories */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          채널 항목 (위에서부터 순서대로 번호가 매겨집니다)
        </h2>
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div className="flex flex-col">
                <button
                  type="button"
                  aria-label="위로 이동"
                  disabled={i === 0}
                  onClick={() => setCategories((prev) => moveItem(prev, i, -1))}
                  className="text-xs disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  aria-label="아래로 이동"
                  disabled={i === categories.length - 1}
                  onClick={() => setCategories((prev) => moveItem(prev, i, 1))}
                  className="text-xs disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <input
                type="text"
                value={cat.label}
                onChange={(e) =>
                  setCategories((prev) =>
                    prev.map((c) => (c.id === cat.id ? { ...c, label: e.target.value } : c))
                  )
                }
                placeholder="항목 이름 (예: 보컬)"
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                min={0}
                value={cat.count}
                onChange={(e) =>
                  setCategories((prev) =>
                    prev.map((c) =>
                      c.id === cat.id ? { ...c, count: Math.max(0, parseInt(e.target.value, 10) || 0) } : c
                    )
                  )
                }
                className="w-20 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                aria-label="삭제"
                onClick={() => setCategories((prev) => prev.filter((c) => c.id !== cat.id))}
                className="text-xs text-red-600 dark:text-red-400"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setCategories((prev) => [...prev, { id: nextId(), label: "", count: 0 }])}
          className="mt-2 text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          + 채널 항목 추가
        </button>
      </section>

      {/* Buses */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          버스 항목 (위에서부터 Bus 1, 2, 3...)
        </h2>
        <div className="flex flex-col gap-2">
          {buses.map((bus, i) => (
            <div key={bus.id} className="flex items-center gap-2">
              <div className="flex flex-col">
                <button
                  type="button"
                  aria-label="위로 이동"
                  disabled={i === 0}
                  onClick={() => setBuses((prev) => moveItem(prev, i, -1))}
                  className="text-xs disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  aria-label="아래로 이동"
                  disabled={i === buses.length - 1}
                  onClick={() => setBuses((prev) => moveItem(prev, i, 1))}
                  className="text-xs disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <input
                type="text"
                value={bus.label}
                onChange={(e) =>
                  setBuses((prev) => prev.map((b) => (b.id === bus.id ? { ...b, label: e.target.value } : b)))
                }
                placeholder="버스 이름 (예: 모니터, 리버브)"
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                aria-label="삭제"
                onClick={() => setBuses((prev) => prev.filter((b) => b.id !== bus.id))}
                className="text-xs text-red-600 dark:text-red-400"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setBuses((prev) => [...prev, { id: nextId(), label: "" }])}
          className="mt-2 text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          + 버스 항목 추가
        </button>
      </section>

      {/* Mains */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          Main 항목
        </h2>
        <div className="flex flex-col gap-2">
          {mains.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={m}
                onChange={(e) =>
                  setMains((prev) => prev.map((v, idx) => (idx === i ? e.target.value : v)))
                }
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                aria-label="삭제"
                onClick={() => setMains((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-xs text-red-600 dark:text-red-400"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setMains((prev) => [...prev, `Main ${prev.length + 1}`])}
          className="mt-2 text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          + Main 추가
        </button>
      </section>

      {/* Results */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          결과: 채널 배정 (채널마다 이름 직접 수정 가능)
        </h2>
        {finalChannels.length === 0 ? (
          <p className="text-sm text-neutral-500">위에 채널 항목과 개수를 입력하세요.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-2 pr-3 w-20">채널</th>
                <th className="py-2">이름</th>
              </tr>
            </thead>
            <tbody>
              {finalChannels.map((c) => (
                <tr key={c.number} className="border-b border-neutral-100 dark:border-neutral-900">
                  <td className="py-2 pr-3 font-mono text-xs">CH{c.number}</td>
                  <td className="py-1.5">
                    <input
                      type="text"
                      value={c.label}
                      onChange={(e) => setChannelLabel(c.number, e.target.value)}
                      className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-sm"
                    />
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
          {result.buses.map((b) => (
            <li key={b.number}>
              Bus {b.number}: {b.label}
            </li>
          ))}
          {result.mains.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
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

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          콘솔 페이더 뷰
        </h2>
        <ConsoleFaderView channels={finalChannels} buses={result.buses} mains={result.mains} />
      </section>
    </div>
  );
}
