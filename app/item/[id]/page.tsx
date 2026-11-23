import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLoan, loans } from "@/data/loans";
import { CategoryTag, LoanCard } from "@/components/LoanCard";
import { amountLabel, aprLabel, formatDate, termLabel } from "@/lib/format";
import { guidance } from "@/lib/copy";
import { posts } from "@/lib/posts";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return loans.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loan = getLoan((await params).id);
  if (!loan) return {};
  return { title: loan.name, description: loan.summary };
}

export default async function LoanPage({ params }: Props) {
  const loan = getLoan((await params).id);
  if (!loan) notFound();

  const g = guidance(loan);
  const similar = loans.filter((l) => l.category === loan.category && l.id !== loan.id).slice(0, 3);
  const host = new URL(loan.applyUrl).hostname.replace(/^www\./, "");

  return (
    <div className="mx-auto max-w-5xl px-5 pb-6 pt-8">
      <Link href="/" className="text-sm text-muted hover:text-ink">&larr; Back</Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <CategoryTag category={loan.category} />
        <span className="text-xs text-muted">{loan.lender}</span>
      </div>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{loan.name}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{loan.summary}</p>
      <p className="mt-2 text-xs text-muted">
        Last checked on {formatDate(loan.lastChecked)}. We may earn a commission when you click through.
      </p>

      {!loan.verified && (
        <p role="note" className="mt-4 rounded-lg border border-amber-tag/40 bg-amber-tag/10 px-4 py-3 text-sm text-amber-tag">
          Sample data. Confirm the current rate, limits and terms with the lender before you rely on them.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-4">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold">Our verdict</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{g.verdict}</p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold text-good">Best for</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.bestFor}</p>
            </section>
            <section className="rounded-xl border border-amber-tag/40 bg-amber-tag/5 p-5">
              <h2 className="text-sm font-semibold text-amber-tag">Watch out</h2>
              <p className="mt-2 text-sm leading-relaxed text-amber-tag/90">{g.watchOut}</p>
            </section>
          </div>

          <section>
            <h2 className="mt-6 font-display text-xl font-semibold">Our analysis</h2>
            <div className="mt-3 max-w-prose space-y-4 text-[15px] leading-7 text-muted">
              {g.analysis.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="text-sm font-semibold">Key details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted">APR</dt><dd className="font-display text-lg font-semibold text-accent-soft">{aprLabel(loan)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Amount</dt><dd className="text-right font-semibold">{amountLabel(loan, true)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Term</dt><dd className="font-semibold">{termLabel(loan)}</dd></div>
            </dl>
            <h3 className="mt-5 text-xs font-semibold text-muted">Requirements</h3>
            <ul className="mt-2 space-y-1.5 text-xs">
              {loan.requirements.map((r) => (
                <li key={r} className="flex items-center gap-2"><span className="text-accent-soft" aria-hidden="true">&#10003;</span>{r}</li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between gap-4 border-t border-line pt-4 text-sm">
              <span className="text-muted">Decision</span><span className="font-semibold">{loan.decision}</span>
            </div>
          </section>

          <section className="rounded-xl border border-accent/40 bg-surface p-5">
            <h2 className="text-sm font-semibold">Ready to check your rate?</h2>
            <a
              href={`/go?item_id=${loan.id}`}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="mt-3 block rounded-xl bg-accent py-3 text-center text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Check eligibility
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              No obligation to apply. You will be taken to <strong className="text-ink">{host}</strong>.
            </p>
          </section>
        </aside>
      </div>

      <p className="mt-12 border-t border-line pt-4 text-xs text-muted">
        Rates shown are representative. Your actual rate may differ based on your circumstances. We may earn a commission for referrals.
      </p>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold">Similar options</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => <LoanCard key={l.id} loan={l} />)}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-display text-lg font-semibold">Related articles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-xl border border-line bg-surface p-5 hover:border-accent/60">
              <h3 className="font-display font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
