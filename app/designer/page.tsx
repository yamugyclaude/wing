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

const DEFAULT_BUSES: BusRow[] = [{ id: nextId(), label: "모니터" }];

function moveItem<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= arr.length) return arr;
  const copy = [...arr];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}

const inputCls =
  "rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-1.5 py-1 text-xs";

const TABS = [
  { key: "channels", label: "채널 항목" },
  { key: "buses", label: "버스/Main" },
  { key: "results", label: "결과" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function DesignerPage() {
  const [categories, setCategories] = useState<CategoryRow[]>(DEFAULT_CATEGORIES);
  const [buses, setBuses] = useState<BusRow[]>(DEFAULT_BUSES);
  const [mains, setMains] = useState<string[]>(["Main 1 (PA)"]);
  const [labelOverrides, setLabelOverrides] = useState<Record<number, string>>({});
  const [mobileTab, setMobileTab] = useState<TabKey>("channels");

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
    <div className="max-w-6xl mx-auto w-full px-4 py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <Link href="/" className="text-xs text-neutral-500 underline underline-offset-4">
          ← Q&A로
        </Link>
        <h1 className="text-lg font-semibold">채널/버스 자동 설계기</h1>
        <span className="text-xs text-neutral-500">
          총 {result.totalChannels}채널 · 버스 {result.buses.length} · Main {result.mains.length}
        </span>
      </div>

      {/* Mobile tab switcher — only one section shown at a time below lg */}
      <div className="mt-3 flex gap-1 lg:hidden">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setMobileTab(t.key)}
            className={`flex-1 text-xs rounded-md px-2 py-1.5 border ${
              mobileTab === t.key
                ? "border-neutral-800 dark:border-neutral-200 font-medium"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Channel categories */}
        <section
          className={`border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 ${
            mobileTab === "channels" ? "" : "hidden"
          } lg:block`}
        >
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            채널 항목
          </h2>
          <div className="flex flex-col gap-1">
            {categories.map((cat, i) => (
              <div key={cat.id} className="flex items-center gap-1">
                <div className="flex flex-col leading-none">
                  <button
                    type="button"
                    aria-label="위로 이동"
                    disabled={i === 0}
                    onClick={() => setCategories((prev) => moveItem(prev, i, -1))}
                    className="text-[10px] disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    aria-label="아래로 이동"
                    disabled={i === categories.length - 1}
                    onClick={() => setCategories((prev) => moveItem(prev, i, 1))}
                    className="text-[10px] disabled:opacity-30"
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
                  placeholder="항목 이름"
                  className={`flex-1 min-w-0 ${inputCls}`}
                />
                <input
                  type="number"
                  min={0}
                  value={cat.count}
                  onChange={(e) =>
                    setCategories((prev) =>
                      prev.map((c) =>
                        c.id === cat.id
                          ? { ...c, count: Math.max(0, parseInt(e.target.value, 10) || 0) }
                          : c
                      )
                    )
                  }
                  className={`w-12 ${inputCls}`}
                />
                <button
                  type="button"
                  aria-label="삭제"
                  onClick={() => setCategories((prev) => prev.filter((c) => c.id !== cat.id))}
                  className="text-xs text-red-600 dark:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCategories((prev) => [...prev, { id: nextId(), label: "", count: 0 }])}
            className="mt-2 text-xs rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            + 채널 항목 추가
          </button>
        </section>

        {/* Buses */}
        <section
          className={`border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 ${
            mobileTab === "buses" ? "" : "hidden"
          } lg:block`}
        >
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            버스 항목 (Bus 1, 2...)
          </h2>
          <div className="flex flex-col gap-1">
            {buses.map((bus, i) => (
              <div key={bus.id} className="flex items-center gap-1">
                <div className="flex flex-col leading-none">
                  <button
                    type="button"
                    aria-label="위로 이동"
                    disabled={i === 0}
                    onClick={() => setBuses((prev) => moveItem(prev, i, -1))}
                    className="text-[10px] disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    aria-label="아래로 이동"
                    disabled={i === buses.length - 1}
                    onClick={() => setBuses((prev) => moveItem(prev, i, 1))}
                    className="text-[10px] disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                <input
                  type="text"
                  value={bus.label}
                  onChange={(e) =>
                    setBuses((prev) =>
                      prev.map((b) => (b.id === bus.id ? { ...b, label: e.target.value } : b))
                    )
                  }
                  placeholder="버스 이름"
                  className={`flex-1 min-w-0 ${inputCls}`}
                />
                <button
                  type="button"
                  aria-label="삭제"
                  onClick={() => setBuses((prev) => prev.filter((b) => b.id !== bus.id))}
                  className="text-xs text-red-600 dark:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setBuses((prev) => [...prev, { id: nextId(), label: "" }])}
            className="mt-2 text-xs rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            + 버스 항목 추가
          </button>

          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 mt-4">
            Main 항목
          </h2>
          <div className="flex flex-col gap-1">
            {mains.map((m, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  type="text"
                  value={m}
                  onChange={(e) =>
                    setMains((prev) => prev.map((v, idx) => (idx === i ? e.target.value : v)))
                  }
                  className={`flex-1 min-w-0 ${inputCls}`}
                />
                <button
                  type="button"
                  aria-label="삭제"
                  onClick={() => setMains((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-red-600 dark:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMains((prev) => [...prev, `Main ${prev.length + 1}`])}
            className="mt-2 text-xs rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            + Main 추가
          </button>
        </section>

        {/* Results: channel table */}
        <section
          className={`border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 max-h-[420px] overflow-y-auto ${
            mobileTab === "results" ? "" : "hidden"
          } lg:block`}
        >
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            채널 배정 (이름 직접 수정 가능)
          </h2>
          {finalChannels.length === 0 ? (
            <p className="text-xs text-neutral-500">채널 항목과 개수를 입력하세요.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {finalChannels.map((c) => (
                <div key={c.number} className="flex items-center gap-1">
                  <span className="font-mono text-[10px] w-9 shrink-0 text-neutral-500">
                    CH{c.number}
                  </span>
                  <input
                    type="text"
                    value={c.label}
                    onChange={(e) => setChannelLabel(c.number, e.target.value)}
                    className={`flex-1 min-w-0 ${inputCls}`}
                  />
                </div>
              ))}
            </div>
          )}

          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1 mt-3">
            버스 / Main
          </h2>
          <ul className="text-xs space-y-0.5">
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
      </div>

      {result.warnings.length > 0 && (
        <div className="mt-3 rounded-md bg-red-50 dark:bg-red-950 p-2">
          {result.warnings.map((w) => (
            <p key={w} className="text-xs text-red-800 dark:text-red-200">
              ⚠ {w}
            </p>
          ))}
        </div>
      )}

      <section className="mt-4">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          콘솔 페이더 뷰
        </h2>
        <ConsoleFaderView channels={finalChannels} buses={result.buses} mains={result.mains} />
      </section>
    </div>
  );
}
