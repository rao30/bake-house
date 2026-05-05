# Project notes (for Claude)

Quick-reference snapshot of `bake-house`. Update when something material changes so you don't have to re-scan the repo each session.

---

## What this project actually is

A single-page menu site for **The BakeHouse** (Indian bakery; phone `+91 9849450882`, instagram `@bakehouse.52`, email `support@thebakehouse.in`).

There are **two stacks in this repo**, only one of which is live:

- **Live / deployed**: `server.js` (~17 lines, Express) serves `public/index.html` as a static page. Deployed on Railway. This is the real customer-facing site.
- **Dormant / future**: `backend/` (FastAPI: orders, Google auth, payment sessions) + `frontend/` (React + Vite). Not deployed. Don't touch unless the user asks — treat as design exploration for a future ordering flow.

---

## The live site — [public/index.html](public/index.html)

- One self-contained HTML file (~310 lines), CDN Tailwind, no build step.
- All menu data hardcoded in the `MENU_DATA` array — [public/index.html:53-96](public/index.html#L53-L96).
- Business info in `BUSINESS_INFO` — [public/index.html:47-52](public/index.html#L47-L52).
- Cards: full-width 4:3 photo on top, name + price + description + per-item WhatsApp deep-link button beneath. Grid is 1 col mobile / 2 col tablet / 3 col desktop. Items still missing an `image` show a "Sweet Treat — Photo coming soon" gradient placeholder.
- Per-item "Order on WhatsApp" buttons open `wa.me/<phone>?text=...` with a prefilled order message — see `waLinkFor()` in [public/index.html](public/index.html).
- Mobile-only sticky bottom CTA bar (`#mobileCtaBar`) gives one-tap access to Call and WhatsApp; auto-hides on `sm:` and up.
- Tap-to-zoom lightbox (`#lightbox`) on every product image. Closes on overlay click, the X button, or `Escape`.
- Live menu categories: `Custom Cakes`, `Cupcakes & Muffins` (combined), `Cookies`, `Brownies`, `Donuts`, `Tea Time Cakes`, `Sheet Cakes`.
- Donuts currently shows a single showcase item ("Classic Glazed Donut" @ ₹80). Other 6 donut variants are held back; expand when moving to a richer frontend (React).

---

## Photo asset state (as of 2026-05-03)

- Source folder: [20260419-Saby Kitchen Bakery Product Shoot/](20260419-Saby Kitchen Bakery Product Shoot/) — 112 JPGs, ~6MB avg (raw DSLR). **Will need optimization before going to web.**
- All renamed in-place to `{product_type}_{nn}.jpg`. Sequential numbering preserves original capture order within each category.
- Manifest: [scripts/photo_manifest.json](scripts/photo_manifest.json) — each entry has `new_name`, `original_name`, `product_type`, `description` (one-sentence visual summary), `confidence`, `composition` (`hero` / `group` / `lifestyle` / `detail`).
- Rename script (re-runnable if originals are restored): [scripts/rename_photos.ps1](scripts/rename_photos.ps1). Run via `powershell.exe -ExecutionPolicy Bypass -File scripts\rename_photos.ps1`.

### Counts by product_type

| product_type | count | notes |
|---|---|---|
| brownie | 16 | includes ~3 blondies and ~3 red-velvet brownies |
| cookie | 13 | chocolate-chip, double-chocolate, Biscoff, Ferrero, etc. |
| cupcake | 20 | red liners + mini white-liner cupcakes |
| custom_cake | 5 | tiered cakes only (lamingtons moved to `tea_time_cake`) |
| donut | 14 | glazed, drizzled, candy-button toppings |
| facility | 13 | interior, signage, equipment — **not a product**, useful for hero/about |
| muffin | 11 | real muffins (dark tulip wrappers, no frosting) |
| sheet_cake | 5 | vanilla + chocolate |
| tea_time_cake | 15 | 8 lamingtons (`_01..08`) + 7 loaf cakes (`_09..15`: marble, vanilla pound, walnut/banana, chocolate) |

### Photo bucket → live menu category mapping

| Photo bucket | Live menu category |
|---|---|
| `custom_cake` | Custom Cakes |
| `cupcake` + `muffin` | Cupcakes & Muffins (combined) |
| `cookie` | Cookies |
| `brownie` | Brownies |
| `donut` | Donuts |
| `tea_time_cake` | Tea Time Cakes |
| `sheet_cake` | Sheet Cakes |
| `facility` | not a product — reserve for hero banner / about section |

---

## Dormant FastAPI/React stack — quick map

- Backend entry: [backend/app/main.py](backend/app/main.py) (auth, orders, checkout, payment confirmation endpoints).
- Product config (6 keys, **does not match live menu or photo buckets**): [backend/app/config.py:5-49](backend/app/config.py#L5-L49). Has: `custom_cake`, `sheet_cake`, `muffin`, `cookie`, `brownie`, `donut`. Missing `cupcake` and `loaf_cake`.
- Models: [backend/app/models.py](backend/app/models.py). DB layer: [backend/app/db.py](backend/app/db.py). DB design doc: [backend/DB_PLAN.md](backend/DB_PLAN.md).
- Frontend entry: [frontend/src/App.jsx](frontend/src/App.jsx). Product list UI: [frontend/src/components/ProductList.jsx](frontend/src/components/ProductList.jsx) (no image rendering yet).
- Local setup: [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md). Tests: [backend/tests/test_main.py](backend/tests/test_main.py). Plan: [TEST_PLAN.md](TEST_PLAN.md).

---

## Repo root quick map

- [README.md](README.md) — minimal, points to LOCAL_SETUP for legacy stack.
- [package.json](package.json) — Node side, only dependency is `express`. `npm start` runs `server.js`.
- [launch.json](launch.json) — VS Code launch configs (lives at root, not `.vscode/`).
- [scripts/setup_local.sh](scripts/setup_local.sh) — bootstraps the dormant FastAPI/React stack.
- [scripts/rename_photos.ps1](scripts/rename_photos.ps1), [scripts/photo_manifest.json](scripts/photo_manifest.json) — photo work output.

---

## Environment / tooling gotchas

- **No `node`, `python`, or `py` on PATH from PowerShell on this machine.** Use PowerShell directly for ad-hoc scripting; reach for `node`/`python` only inside their respective project folders if needed.
- **PowerShell execution policy blocks `.ps1` files.** Run scripts with `powershell.exe -ExecutionPolicy Bypass -File <path>`.
- **Subagents currently can't use the `Write` tool** — denials cascade across all subagents in a session. When delegating, instruct subagents to return structured output (e.g. JSON) **inline in their final response** so the parent agent can write it.
- **Photo shoot folder has spaces in its name** — quote it in shell commands.
