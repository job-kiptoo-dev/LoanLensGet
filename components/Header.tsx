import Link from "next/link";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold" aria-label="LoanLens home">
          <LogoMark />
          <span className="hidden sm:inline">LoanLens</span>
        </Link>

        <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
          Free to compare
        </span>

        <div className="flex items-center gap-4">
          <form action="/" method="get" role="search" className="hidden sm:block">
            <label htmlFor="header-q" className="sr-only">Compare loans</label>
            <input
              id="header-q"
              name="q"
              type="search"
              placeholder="Compare loans…"
              className="h-9 w-52 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted"
            />
          </form>
          <Link href="/blog" className="text-sm text-ink hover:text-accent-soft">Blog</Link>
        </div>
      </div>
    </header>
  );
}
