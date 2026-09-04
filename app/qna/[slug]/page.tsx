import Link from "next/link";
import { notFound } from "next/navigation";
import { qnaList } from "@/lib/qna";
import BusRoutingDiagram from "@/components/BusRoutingDiagram";

export default async function QnaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = qnaList.find((q) => q.slug === slug);
  if (!item) notFound();

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
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

      <div className="mt-6 whitespace-pre-line leading-relaxed">
        {item.answer}
      </div>
    </div>
  );
}
