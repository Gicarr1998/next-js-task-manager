import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-between">
      <div>
        {currentPage > 1 && (
          <Link
            href={`/dashboard?page=${currentPage - 1}`}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Previous
          </Link>
        )}
      </div>

      <p className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </p>

      <div>
        {currentPage < totalPages && (
          <Link
            href={`/dashboard?page=${currentPage + 1}`}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
