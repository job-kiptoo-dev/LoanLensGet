import Link from "next/link";
import type { Loan } from "@/data/loans";
import { amountLabel, aprLabel, categoryLabel, termLabel } from "@/lib/format";

export function CategoryTag({ category }: { category: Loan["category"] }) {
  return (
    <span className="inline-block rounded-md bg-amber-tag/15 px-2 py-0.5 text-[11px] font-semibold text-amber-tag">
      {categoryLabel[category]}
    </span>
  );
}

export function LoanCard({ loan }: { loan: Loan }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex flex-col items-center gap-2 border-b border-line bg-bg/60 px-4 py-5 text-center">
        <h3 className="font-display text-[15px] font-semibold leading-snug">
          <Link href={`/item/${loan.id}`} className="hover:text-accent-soft">{loan.name}</Link>
        </h3>
        <CategoryTag category={loan.category} />
      </div>

      <div className="flex flex-1 flex-col gap-3 bg-raised/60 p-4">
        <dl className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <dt className="text-muted">APR</dt>
            <dd className="mt-0.5 font-semibold text-accent-soft">{aprLabel(loan)}</dd>
          </div>
          <div>
            <dt className="text-muted">Amount</dt>
            <dd className="mt-0.5 font-semibold">{amountLabel(loan)}</dd>
          </div>
          <div>
            <dt className="text-muted">Term</dt>
            <dd className="mt-0.5 font-semibold">{termLabel(loan)}</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5">
          {loan.requirements.slice(0, 3).map((r) => (
            <li key={r} className="rounded-md bg-line/70 px-2 py-1 text-[11px] text-muted">{r}</li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-[11px] text-muted">{loan.decision}</span>
          <Link
            href={`/item/${loan.id}`}
            className="rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white hover:bg-accent-hover"
          >
            Check rates
          </Link>
        </div>
      </div>
    </article>
  );
}
