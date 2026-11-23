import Link from "next/link";
import { loans, type Category } from "@/data/loans";
import { LoanCard } from "@/components/LoanCard";
import { categoryLabel } from "@/lib/format";
import { posts } from "@/lib/posts";

type Search = { q?: string; category?: string; amount?: string };

const categories = Object.keys(categoryLabel) as Category[];

function href(params: Search) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
  const s = sp.toString();
  return s ? `/?${s}#results` : "/";
}

export default async function Home({ searchParams }: { searchParams: Promise<Search> }) {
  const { q = "", category = "", amount = "" } = await searchParams;
  const amountNum = Number(amount.replace(/[^\d]/g, "")) || 0;
  const needle = q.trim().toLowerCase();

  const results = loans.filter((l) => {
    if (category && l.category !== category) return false;
    if (needle && !`${l.name} ${l.lender}`.toLowerCase().includes(needle)) return false;
    if (amountNum && !l.amountText) {
      if (l.amountMin != null && amountNum < l.amountMin) return false;
      if (l.amountMax != null && amountNum > l.amountMax) return false;
    }
    return true;
  });

  const isFiltering = Boolean(q || category || amountNum);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-2xl px-5 pb-16 pt-16 text-center sm:pt-20">
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Compare personal loans</h1>
          <p className="mx-auto mt-4 max-w-md text-balance text-muted">
            Enter an amount to see which lenders offer it, side by side, with their published rates.
          </p>

          <form action="/" method="get" className="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-surface p-2 shadow-[0_0_40px_rgba(124,58,237,.12)]">
            {category && <input type="hidden" name="category" value={category} />}
            <label htmlFor="amount" className="block px-3 pt-2 text-left text-xs text-muted">Loan amount (KSh)</label>
            <div className="flex items-center gap-2 px-3 pb-2">
              <span className="font-display text-2xl font-semibold text-accent-soft" aria-hidden="true">KSh</span>
              <input
                id="amount"
                name="amount"
                inputMode="numeric"
                defaultValue={amount}
                placeholder="100,000"
                className="w-full bg-transparent py-2 font-display text-2xl font-medium text-ink placeholder:text-muted/50 focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover">
              See your rates
            </button>
          </form>

          <nav aria-label="Loan type" className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href={href({ q, amount })} className={`rounded-full border px-4 py-1.5 text-xs ${!category ? "border-accent bg-accent/15 text-ink" : "border-line bg-surface text-muted hover:text-ink"}`}>All</Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={href({ q, amount, category: c })}
                className={`rounded-full border px-4 py-1.5 text-xs ${category === c ? "border-accent bg-accent/15 text-ink" : "border-line bg-surface text-muted hover:text-ink"}`}
              >
                {categoryLabel[c]}
              </Link>
            ))}
          </nav>

          <dl className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {[
              ["Cost", "Free to compare"],
              ["Decision", "No obligation to apply"],
              ["Coverage", `${loans.length} loans listed`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-surface px-4 py-3">
                <dt className="text-[11px] text-muted">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="results" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-10">
        <h2 className="font-display text-lg font-semibold">
          {isFiltering ? `${results.length} ${results.length === 1 ? "loan" : "loans"} found` : "Recently added"}
        </h2>

        {results.length === 0 ? (
          <div className="mt-5 rounded-xl border border-line bg-surface p-8 text-center">
            <p className="font-medium">No loans match your search.</p>
            <p className="mt-1 text-sm text-muted">Try a different amount, or clear the filters.</p>
            <Link href="/" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => <LoanCard key={l.id} loan={l} />)}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <h2 className="font-display text-lg font-semibold">Latest from the blog</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-xl border border-line bg-surface p-5 hover:border-accent/60">
              <h3 className="font-display font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
