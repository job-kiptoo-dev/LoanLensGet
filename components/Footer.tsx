import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-4xl px-5 py-10 text-center">
        <nav className="flex justify-center gap-6 text-sm text-ink" aria-label="Footer">
          <Link href="/" className="hover:text-accent-soft">Browse all</Link>
          <Link href="/blog" className="hover:text-accent-soft">Articles</Link>
        </nav>
        <div className="mt-6 border-t border-line pt-6 text-left text-xs leading-relaxed text-muted">
          <p>
            &copy; {new Date().getFullYear()} LoanLens. Add your company name and registration details here.
          </p>
          <p className="mt-3 italic">
            LoanLens is an independent information site. We are not a lender or a bank, we do not process loan
            applications and we cannot guarantee approval. Rates and terms are indicative and set by each lender, so
            confirm them with the lender before you borrow. We may earn a commission when you click through to a
            lender. Only borrow what you can afford to repay.
          </p>
        </div>
      </div>
    </footer>
  );
}
