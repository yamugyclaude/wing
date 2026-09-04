import Link from "next/link";
import { notFound } from "next/navigation";
import { qnaList } from "@/lib/qna";
import { formatAnswer } from "@/lib/formatAnswer";
import BusRoutingDiagram from "@/components/BusRoutingDiagram";
import ScreenFunctionMap from "@/components/ScreenFunctionMap";

export default async function QnaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = qnaList.find((q) => q.slug === slug);
  if (!item) notFound();

  const wide = item.slug === "where-to-do-what";

  return (
    <div
      className={`mx-auto w-full px-4 py-10 ${wide ? "max-w-3xl" : "max-w-2xl"}`}
    >
      <Link href="/" className="text-sm text-neutral-500 underline underline-offset-4">
        ← 목록으로
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={
            item.confirmed
              ? "text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "text-xs rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }
        >
          {item.confirmed ? "확정" : "미확정"}
        </span>
        {item.source && (
          <span className="text-xs text-neutral-500">{item.source}</span>
        )}
      </div>

      <h1 className="mt-2 text-2xl font-semibold">{item.question}</h1>

      {item.slug === "bus-aux-mtx-main" && (
        <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <BusRoutingDiagram />
        </div>
      )}

      {item.slug === "where-to-do-what" && (
        <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 overflow-x-auto">
          <div className="min-w-[640px]">
            <ScreenFunctionMap />
          </div>
        </div>
      )}

      <div className="mt-6 leading-relaxed">{formatAnswer(item.answer)}</div>
    </div>
  );
}
