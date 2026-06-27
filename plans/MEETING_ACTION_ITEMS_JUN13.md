# Implementation Plan: Meeting Action Items — June 13, 2026

> **Status**: 🟢 Complete
> **Created**: 2026-06-26
> **Last Updated**: 2026-06-26
> **Source**: Weekly Meeting "Pre-Launch to Hy-lee.com 1.0" — 2026-06-13 (Shawn Jones, Jeremiah Tillman, Derek Hawkins)
> **Stack**: Hydrogen (React + TypeScript + Tailwind v4 + shadcn/ui + React Router 7)

---

## Overview

Pre-launch weekly review. Two action items belong to Derek from this meeting:

1. **Configure Header** — Build a "Live Well Anywhere" dropdown nav menu in the header, linked to
   existing lifestyle collection pages (e.g. Tiny Home Living, Van/RV Life Essentials).
2. **Review Code** — Review the PR Jeremiah merged into a feature branch before the meeting
   (analytics/GTM work) for errors.

> **Supersedes placement decision in [MEETING_ACTION_ITEMS_MAY16.md](MEETING_ACTION_ITEMS_MAY16.md)
> Workstream 3**: that plan placed "Live Well Anywhere" as pill links in the homepage hero
> (never built — confirmed zero evidence in codebase). Shawn's instruction in this meeting is
> explicit: a **header dropdown menu**, not a hero element. Treat WS3 in the May 16 plan as
> superseded by Workstream 1 below; do not build the hero-pill version.

---

## Branch Map

| Branch | Scope | Priority | Status |
|--------|-------|----------|--------|
| `feature/header/live-well-anywhere-dropdown` | Header dropdown linking to lifestyle collections | HIGH | ✅ Complete |
| `bugfix/cart/remove-dead-handler` | Dead-code fix found during PR #103 review | HIGH | ✅ Complete |

---

## Workstream 1 — "Live Well Anywhere" Header Dropdown

**Branch**: `feature/header/live-well-anywhere-dropdown`
**Priority**: HIGH
**Status**: ✅ Complete

### Context

Shawn: build a "Live Well Anywhere" dropdown in the header, linking to existing lifestyle
collection pages — he named **Tiny Home Living** and **RV Life Essentials** as examples.

Per Derek's decision, scoped to only the 2 collections named in this meeting (not all 4 from the
May 16 plan). The May 16 plan's assumed handles were **wrong** — confirmed via a direct Storefront
API query against the live store:

| May 16 plan assumed | Actual handle in Shopify |
|---|---|
| `tiny-home-living` | `tiny-homes-living` |
| `van-and-rv-life-essentials` | `van-rv-life-essentials` |

(Also discovered while checking: `off-grid-living` and `micro-small-apartment-living` — i.e.
Apartment & Studio Living — already exist in the store, contrary to the May 16 note that Shawn
still needed to create them. Not wired in per Derek's scope decision, but available for a
follow-up if the dropdown is expanded later.)

### Implementation Notes

- New `LifestyleDropdown` component in `hydrogen/app/components/layout/Header.tsx`, modeled on
  `NavDropdown` (shadcn `DropdownMenu`) — not the full-width `categoryBarOpen` panel pattern used
  for Categories, since 2 items doesn't need that.
- `LIFESTYLE_NAV_QUERY` added to `hydrogen/app/root.tsx` — named GraphQL aliases
  (`tinyHomeLiving`, `vanAndRvLifeEssentials`) fetching by handle directly, same call site as
  `HEADER_COLLECTIONS_QUERY`/`SEASONAL_NAV_QUERY`/`DISCOUNTS_NAV_QUERY`, `CacheLong()`. Result is
  filtered to drop any null collection, so a renamed/deleted handle won't break the build — it just
  silently disappears from the dropdown.
- `lifestyleItems` flows `root.tsx` → `PageLayout.tsx` → `Header.tsx`, same prop-drilling pattern
  as `seasonalItems`/`discountItems`.
- Desktop: positioned as the **first** item in the center nav, before Categories (Derek's choice).
- Mobile: collapsible section in `MobileMenu`, same accordion pattern as Categories, also placed
  before the Categories section.
- New i18n key `nav.liveWellAnywhere` added to EN/ES/FR `common.json`. Item labels themselves
  (collection titles) come straight from Shopify, not i18n — same as Categories/Seasonal items.
- Verified visually with a throwaway Playwright script (not committed) — dropdown opens, both
  "Tiny Homes Living" and "Van & RV Life Essentials" appear, links resolve to
  `/collections/tiny-homes-living` and `/collections/van-rv-life-essentials`.

### Tasks
- [x] Add `LIFESTYLE_NAV_QUERY` to `hydrogen/app/root.tsx` loader (named aliases for the 2 handles)
- [x] Filter null collections
- [x] Pass `lifestyleItems` through `PageLayout` to `Header`
- [x] Build dropdown UI (desktop) using shadcn `DropdownMenu`, same trigger styling as `NavDropdown`
- [x] Wire into mobile `MobileMenu` as a collapsible section
- [x] Add `nav.liveWellAnywhere` i18n key to EN/ES/FR
- [x] Each dropdown item links to `/collections/<handle>`
- [x] Verified in browser via Playwright — dropdown opens, both items render, links correct

### Manual Tests
1. Desktop: "Live Well Anywhere" appears in header nav (before Categories) with a dropdown ✅
2. Dropdown lists each configured lifestyle collection by title ✅
3. Clicking an item navigates to `/collections/<handle>` and the collection page loads ✅
4. If a collection handle doesn't resolve, it's silently omitted — no broken link, no build error
   (verified this behavior before fixing the handles — both resolved to `null` originally) ✅
5. Mobile: "Live Well Anywhere" appears as a collapsible section in the mobile menu ✅

### Pre-Commit Checks
```bash
pnpm format && pnpm format:check && pnpm build && pnpm test
```
All passed on 2026-06-26. (`pnpm typecheck` OOMs locally per
[[feedback_typecheck_memory]] — not run; build catches SSR/type-level errors instead.)

---

## Workstream 2 — Review Merged PR (GTM/Inbox Analytics)

**Branch**: `bugfix/cart/remove-dead-handler` (for the one finding that needed a code fix)
**Priority**: HIGH
**Status**: ✅ Complete

### Context

Jeremiah confirmed he merged a PR into a feature branch before the meeting for Derek to review.
Identified as **PR #103, `gtm-and-inbox-fixes`** (merged same day, commit `cb317e9`) — Jeremiah's
GTM/GA4 and Shopify Inbox analytics work.

### Findings

1. **Wrong event name + implicit `any` types** in the new `ShopifyAnalyticsBridge.tsx` (string
   literal `'product_add_to_cart'` instead of the real Hydrogen value `'product_added_to_cart'`,
   plus untyped `reduce` callbacks). **Already fixed** by Derek on 2026-06-19, commit `96c9533`
   (`fix(analytics): correct Hydrogen analytics event names and implicit any types`) — this was
   done before this session, prior to this plan even existing.
2. **Dead code in `cart.tsx`** (new finding, fixed in this session): PR #103 stripped the
   `onClick={handleRemove}` wiring from the cart line remove button — intentionally, since
   `ShopifyAnalyticsBridge` now picks up `remove_from_cart` automatically via the cart action's
   analytics payload — but left the now-unused `handleRemove` function (and its manual
   `pushEcommerceEvent` call) in place. Removed in `bugfix/cart/remove-dead-handler`
   (commit `b1e95f2`).
3. No other issues found: `Analytics.ProductView`/`CollectionView`/`SearchView` usage in
   `products.$handle.tsx`/`collections.$handle.tsx`/`search.tsx` matches Hydrogen's expected
   payload shapes; `cart.tsx`'s `action()` correctly returns `analytics: {cartId}` via `data()` for
   the bridge to consume.

### Tasks
- [x] Review the diff for PR #103 (`gtm-and-inbox-fixes`)
- [x] Check for incorrect GTM/GA4 event names, implicit `any` types, CSP regressions — found and
  confirmed the event-name bug was already fixed; found and fixed the dead-code leftover
- [x] Verify build/tests/format pass after the dead-code fix

### Manual Tests
1. Add an item to cart → `add_to_cart` fires via `ShopifyAnalyticsBridge` (uses
   `AnalyticsEvent.PRODUCT_ADD_TO_CART`, not the wrong string literal)
2. Remove an item from cart → `remove_from_cart` fires via the same bridge (no dead handler call)
3. `pnpm build` / `pnpm test` / `pnpm format:check` all pass with the cleanup in place

---

## Notes

- **Not Derek's tasks** (Shawn/Jeremiah owned, no code from Derek): Google Search Console access
  fix, high-margin/short-sales-cycle product category research, SEO checklist completion,
  dev/staging environment recommendation, Midjourney→Adobe Stock asset workflow switch.
- **Dev/prod separation decision**: "The team committed to separating development and production
  environments across all used services" — applies broadly (analytics, and likely Shopify itself).
  Watch for this requirement surfacing in future Jeremiah environment-recommendation tasks; no
  immediate code action for Derek beyond what's already done for GA4.
- **Live Well Anywhere — resolved**: shipped with only the 2 collections Shawn named (Tiny Homes
  Living, Van & RV Life Essentials), positioned before Categories. The May 16 plan's 4-collection
  list used wrong handles for 2 of them and assumed 2 others didn't exist yet when they actually
  do (`off-grid-living`, `micro-small-apartment-living`) — if Shawn wants the dropdown expanded to
  all 4 later, use the corrected handles above, not the May 16 plan's.
