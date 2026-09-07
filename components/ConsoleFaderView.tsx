"use client";

import { useState } from "react";

type Strip = {
  key: string;
  topLabel: string; // e.g. "CH3" or "Bus 2" or "Main 1"
  bottomLabel: string; // e.g. instrument name
  filled: boolean;
};

function FaderStrip({ strip }: { strip: Strip }) {
  return (
    <div className="flex flex-col items-center gap-1 w-16 shrink-0">
      <div
        className={`w-full h-14 rounded-sm px-1 py-1 text-center flex flex-col justify-center ${
          strip.filled
            ? "bg-neutral-800 text-neutral-100 dark:bg-neutral-200 dark:text-neutral-900"
            : "bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 border border-dashed border-neutral-300 dark:border-neutral-700"
        }`}
      >
        <span className="text-[10px] font-mono leading-tight">{strip.topLabel}</span>
        <span className="text-[9px] leading-tight break-words">{strip.bottomLabel}</span>
      </div>
      <div className="w-1.5 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 relative">
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-5 h-3 rounded-sm ${
            strip.filled ? "bg-neutral-600 dark:bg-neutral-300" : "bg-neutral-300 dark:bg-neutral-700"
          }`}
          style={{ top: "40%" }}
        />
      </div>
    </div>
  );
}

function BankSection({
  title,
  bankSize,
  strips,
}: {
  title: string;
  bankSize: number;
  strips: Strip[];
}) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(strips.length / bankSize));
  const pageStrips = strips.slice(page * bankSize, page * bankSize + bankSize);
  const padded: Strip[] = [
    ...pageStrips,
    ...Array.from({ length: bankSize - pageStrips.length }, (_, i) => ({
      key: `empty-${page}-${i}`,
      topLabel: "",
      bottomLabel: "",
      filled: false,
    })),
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-neutral-500">{title}</span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1 text-xs">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="disabled:opacity-30"
              aria-label="이전 뱅크"
            >
              ◀
            </button>
            <span className="text-neutral-500">
              {page + 1}/{totalPages}
            </span>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="disabled:opacity-30"
              aria-label="다음 뱅크"
            >
              ▶
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {padded.map((s) => (
          <FaderStrip key={s.key} strip={s} />
        ))}
      </div>
    </div>
  );
}

export default function ConsoleFaderView({
  channels,
  buses,
  mains,
}: {
  channels: { number: number; label: string }[];
  buses: { number: number; label: string }[];
  mains: string[];
}) {
  const channelStrips: Strip[] = channels.map((c) => ({
    key: `ch-${c.number}`,
    topLabel: `CH${c.number}`,
    bottomLabel: c.label,
    filled: true,
  }));

  const busStrips: Strip[] = buses.map((b) => ({
    key: `bus-${b.number}`,
    topLabel: `Bus ${b.number}`,
    bottomLabel: b.label,
    filled: true,
  }));

  const mainStrips: Strip[] = mains.map((m, i) => ({
    key: `main-${i}`,
    topLabel: `M${i + 1}`,
    bottomLabel: m,
    filled: true,
  }));

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50 dark:bg-neutral-950">
      <p className="text-xs text-neutral-500 mb-3">
        실제 WING 페이더 배열 기준(왼쪽 12 / 중앙 8 / 오른쪽 4)으로 뱅크를 나눠 보여줍니다.
      </p>
      <div className="flex flex-wrap gap-6 justify-center">
        <BankSection title="입력 (12)" bankSize={12} strips={channelStrips} />
        <BankSection title="Bus/DCA (8)" bankSize={8} strips={busStrips} />
        <BankSection title="Main/Matrix (4)" bankSize={4} strips={mainStrips} />
      </div>
    </div>
  );
}
