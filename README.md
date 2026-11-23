# LoanLens

Loan comparison site for Kenya. Next.js 15 (App Router), TypeScript, Tailwind CSS.

## Run

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Where things live

- `data/loans.ts`   the loan listings. Edit this file to add or change loans.
- `lib/copy.ts`     the verdict / best-for / watch-out text, written per category.
- `lib/posts.ts`    blog posts.
- `app/page.tsx`    home: amount form, category filter, results grid.
- `app/item/[id]`   loan detail page.
- `app/go/route.ts` outbound click redirect (`/go?item_id=...`). It only redirects to the
                    `applyUrl` stored in `data/loans.ts`, so it cannot be used as an open redirect.
- `tailwind.config.ts` the dark / purple theme tokens.

## Before you publish

1. All 8 loans are SAMPLE data (`verified: false`). Confirm rates, limits, requirements and links with
   each lender, then set `verified: true` and update `lastChecked`. Unverified loans show a notice.
2. Replace the placeholder company line in `components/Footer.tsx`.
3. Add analytics to `app/go/route.ts` if you want to track outbound clicks.
4. If you earn commission, keep the disclosure text and `rel="sponsored"` on the outbound link.
5. Log in / Sign up are not included because there is no account system yet.
