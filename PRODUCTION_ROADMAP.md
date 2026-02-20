# Jewellery Store V2 — Production Roadmap (Free Stack)

This document is a complete execution plan to build, launch, and operate a simple modern jewellery catalog website similar to the provided reference, with no authentication and social sharing support.

---

## 1) Product Scope (Final Version)

### Core user experience
- Visitors can browse jewellery items in a clean card/grid layout.
- Each card shows:
  - Product image
  - Product name
  - Price
  - Short description
- Product detail view (optional but recommended) with larger image + complete description.
- Category filtering (rings, earrings, necklaces, bracelets, etc.).
- Search by product name/keyword.
- Social sharing per product:
  - WhatsApp share
  - Instagram share flow guidance (copy link + open Instagram)
  - Generic share via native Web Share API (mobile) + fallback share links.
- Zero auth/login/signup.

### Non-functional goals
- Fast page loads on mobile (LCP < 2.5s on 4G target).
- SEO-ready pages and metadata.
- 1000+ concurrent traffic readiness (static-first architecture + CDN caching).
- Free hosting and free toolchain.

---

## 2) Recommended Architecture (Free + Scalable)

### Frontend
- **Next.js 14 (App Router) + TypeScript + Tailwind CSS**
  - Why: SEO, image optimization, easy deployment to free platforms, high performance.

### Data/content layer
- **Option A (simplest, free, fastest):** `products.json` inside repo + static build.
- **Option B (better for non-dev updates):** Free headless CMS (e.g., Sanity free tier) + static revalidation.

For your use case, start with **Option A** then migrate to CMS later if needed.

### Hosting
- **Cloudflare Pages (free)** or **Vercel Hobby (free)**.
  - Both provide global CDN.
  - For strict free + caching control, Cloudflare Pages is excellent.

### Media storage
- Keep optimized product images in repo initially (`/public/images/products`).
- If image count grows, move to Cloudflare R2 (has free allowance) or Cloudinary free tier.

### Analytics & monitoring
- **Cloudflare Web Analytics (free)** or **Plausible self-hosted later**.
- **UptimeRobot free** for uptime checks.

---

## 3) High-Level Capacity Strategy for 1000+ Traffic

Because your site is read-only catalog (no auth, no checkout), the best way to handle 1000+ concurrent users on free tier is:

1. Pre-render all pages as static HTML.
2. Serve via global CDN.
3. Cache aggressively with immutable assets.
4. Avoid dynamic backend at request time.

This removes server bottlenecks and allows high burst traffic.

---

## 4) Repository Structure Plan

```text
jewellery-store-v2/
  app/
    page.tsx                    # Home with hero + product highlights
    products/page.tsx           # Product listing
    products/[slug]/page.tsx    # Product detail
    layout.tsx
    sitemap.ts
    robots.ts
  components/
    ProductCard.tsx
    ProductGrid.tsx
    ProductFilters.tsx
    ShareButtons.tsx
    Header.tsx
    Footer.tsx
  data/
    products.json
    categories.json
  lib/
    products.ts                 # data fetch/filter helpers
    seo.ts
    share.ts
  public/
    images/products/
    og/
  styles/
  scripts/
    optimize-images.mjs
    validate-products.mjs
  .github/workflows/
    ci.yml
  README.md
  PRODUCTION_ROADMAP.md
```

---

## 5) Data Model

Each product in `data/products.json`:

```json
{
  "id": "ring-001",
  "slug": "minimal-gold-ring",
  "name": "Minimal Gold Ring",
  "price": 2499,
  "currency": "INR",
  "shortDescription": "Elegant daily-wear gold ring.",
  "description": "Lightweight handcrafted ring with premium finish.",
  "category": "Rings",
  "image": "/images/products/minimal-gold-ring.webp",
  "imageAlt": "Minimal Gold Ring on white background",
  "tags": ["daily wear", "minimal"],
  "inStock": true,
  "sortOrder": 10
}
```

---

## 6) UX/UI Plan (Simple Modern)

### Pages
1. Home
   - Minimal hero banner.
   - Featured products.
   - Category quick links.
2. Products listing
   - Grid cards, filter chips, sort dropdown.
3. Product detail page
   - Bigger image.
   - Price + description.
   - Share actions.
4. Optional About/Contact page.

### Design style
- Plenty of white space.
- Neutral color palette + one luxury accent.
- Smooth hover transitions.
- Rounded cards and subtle shadows.

---

## 7) Social Share Implementation Plan

### WhatsApp
- Share URL:
  - `https://wa.me/?text=${encodeURIComponent(productName + ' - ₹' + price + ' ' + productUrl)}`

### Instagram
- Instagram does not allow prefilled feed text via URL like WhatsApp.
- Provide:
  - “Copy product link” button
  - “Open Instagram” button
  - Optional generated share image card (future enhancement)

### Native share
- Use `navigator.share()` on supported mobile browsers.
- Fallback to copy link + platform share links.

### Future enhancement
- Generate OG image per product so shared links show image + price nicely in social previews.

---

## 8) SEO & Discoverability Plan

- Unique title/description per product page.
- Open Graph + Twitter metadata with product image.
- `sitemap.xml` auto-generated.
- `robots.txt` allow indexing.
- Clean URLs (`/products/minimal-gold-ring`).
- Add JSON-LD structured data (`Product`) for each product.

---

## 9) Performance Plan

- Convert all product images to WebP/AVIF.
- Resize images to exact required dimensions.
- Use Next.js `<Image>` with lazy loading.
- Preload critical fonts or use system fonts.
- Avoid heavy client-side JS.
- Enable long cache headers for static assets.

Target checks:
- Lighthouse Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

---

## 10) Security & Hardening (Even Without Auth)

- Add HTTP security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
- Validate `products.json` schema in CI.
- Prevent broken image links and invalid slugs via scripts.

---

## 11) CI/CD Plan (Free)

### GitHub Actions
Run on pull requests and main branch:
1. Install dependencies.
2. Type check.
3. Lint.
4. Build.
5. Run product data validation script.

### Deploy
- Auto deploy on merge to `main`.
- Preview deploys for PRs (Cloudflare/Vercel both support this).

---

## 12) Free Hosting Setup Plan

### Option A: Cloudflare Pages
1. Push repo to GitHub.
2. Create Cloudflare Pages project from repo.
3. Build command: `npm run build`
4. Output dir (if static export mode): `out`
5. Connect custom domain (optional).
6. Enable caching + compression.

### Option B: Vercel Hobby
1. Import GitHub repo.
2. Detect Next.js automatically.
3. Deploy with default settings.
4. Attach custom domain.

---

## 13) Step-by-Step Execution Plan (Jules CLI Friendly)

### Phase 1: Foundation (Day 1)
- Initialize Next.js + TypeScript + Tailwind.
- Create folder structure.
- Add base layout, header, footer.
- Add sample product JSON (20 items).

### Phase 2: Core Catalog (Day 2)
- Build listing page + product cards.
- Build detail page via slug routing.
- Add filter + search + sort.

### Phase 3: Sharing + SEO (Day 3)
- Add WhatsApp share link + copy link + native share.
- Add product metadata and Open Graph tags.
- Add sitemap/robots.

### Phase 4: Quality + Performance (Day 4)
- Optimize images.
- Add schema validation script.
- Add Lighthouse checks and fix key issues.

### Phase 5: CI/CD + Deploy (Day 5)
- Add GitHub Actions workflow.
- Connect Cloudflare Pages or Vercel.
- Deploy production.
- Validate with live URL and load test.

### Phase 6: Traffic Validation (Day 5)
- Use k6 to test traffic on deployed site:
  - 1000 virtual users burst test.
  - Observe response times/errors.
- Tune caching and asset sizes.

---

## 14) Load Testing Plan (Important)

Use `k6` locally against production URL:

- Test A: 200 VUs for 5 min (baseline)
- Test B: 500 VUs for 5 min (scale)
- Test C: 1000 VUs for 2 min (burst)

Success criteria:
- Error rate < 1%
- p95 response time < 800ms (static pages should be much lower)

---

## 15) Reality Check on “Perfectly” + Free Tier

No system is 100% perfect, but this architecture is the closest practical production setup on zero cost:
- Static pages + CDN reduce failure points heavily.
- No auth and no checkout simplifies operations.
- The main risk is very large image payloads; optimize aggressively.

If traffic grows beyond free limits, easiest upgrade path:
- Move images to dedicated CDN bucket.
- Upgrade hosting plan.
- Add edge cache rules.

---

## 16) MVP to Production Checklist

- [ ] Mobile responsive at all breakpoints
- [ ] Product data complete and validated
- [ ] Share buttons working on real devices
- [ ] SEO metadata for all product pages
- [ ] Lighthouse 90+ overall
- [ ] CI passing on main
- [ ] Production deployed on free host
- [ ] Domain + HTTPS working
- [ ] 1000 VU burst load test report saved
- [ ] Monitoring enabled

---

## 17) Suggested Final Tech Stack Summary

- **Frontend:** Next.js 14 + TypeScript + Tailwind
- **Data:** Local JSON (initial)
- **Hosting:** Cloudflare Pages (free) or Vercel Hobby
- **Media:** Repo static assets, later R2/Cloudinary free tier
- **CI/CD:** GitHub Actions
- **Monitoring:** Cloudflare Analytics + UptimeRobot
- **Testing:** Lighthouse + k6

This stack is practical, production-oriented, and aligned with your “free + 1000+ traffic + no auth” goal.
