
Context and current findings
- You reported 3 related symptoms:
  1) The site does not scroll at all (Desktop Chrome/Edge, both Preview and Published).
  2) “Cyber Journal” cards are not loading on both:
     - the homepage “Cyber Journal” section (BlogSection), and
     - the /journal page.
  3) RSS should display live posts from https://journal.ishaansrv.com/feed/.
- In the codebase:
  - Home page “Cyber Journal” section is driven by `src/components/BlogSection.tsx` (RSS + fallback posts).
  - `/journal` page (`src/pages/Journal.tsx`) is currently static (hardcoded posts) and would need to be wired to RSS if you want “live RSS” there too.
  - Scrolling is controlled by a combination of:
    - inline CSS in `index.html` (critical CSS),
    - global CSS in `src/index.css`,
    - and runtime platform behavior in `src/components/ResponsiveWrapper.tsx`.

Goal
- Make scrolling work reliably on Desktop Chrome/Edge (Preview and Published).
- Make “Cyber Journal” show live RSS posts on both the homepage section and `/journal`, with good loading/error fallback behavior.

Implementation approach (high-level)
1) Fix scrolling first (it blocks access to sections/pages and makes the “cards not loading” symptom ambiguous).
2) Convert RSS usage into a single shared data source (a hook) used by both BlogSection and Journal so they always show consistent content.
3) Improve RSS reliability and observability (timeouts, better error messaging, and optional server-side proxy).

Part 1 — Fix the “page won’t scroll” issue (Desktop)
A. Identify the actual scroll lock mechanism
- Add a temporary “scroll diagnostics” block (development-only) to display:
  - which element is the scrolling container (html vs body vs #root vs wrapper),
  - current scrollTop/scrollY,
  - and whether any element is forcing `overflow: hidden` / `position: fixed`.
- Add a temporary global listener (development-only) for:
  - wheel events,
  - key scroll (PageDown/Space),
  - and scroll events,
  to confirm whether the events fire and whether scrollTop changes.
- Rationale: your environment reports “nothing scrolls”, but our earlier inspection suggests the page has enough content to scroll. A small diagnostic helps pinpoint what’s actually blocking it (CSS overflow, fixed body, overlay, etc.).

B. Apply a robust desktop scroll reset (safe, targeted, reversible)
- In `src/components/ResponsiveWrapper.tsx`, in the “desktop” branch of the global effect:
  - Explicitly clear any scroll-locking styles that might have been introduced by CSS or a browser quirk:
    - `document.documentElement.style.overflowY = 'auto'`
    - `document.body.style.overflowY = 'auto'`
    - clear `position: fixed` if present
    - ensure `height` isn’t forcing a non-scroll state
  - Ensure we do not set transforms (`translateZ(0)`) or other GPU hints at the root on desktop (already mostly true).
- In `index.html` critical CSS:
  - Ensure we never set global “mobile scrolling” constraints for desktop:
    - Scope the “Mobile-specific scrolling” block using a mobile-only media query (similar to the GPU hint approach).
    - This avoids desktop inheriting touch-centric overscroll constraints that sometimes interact badly with scroll containers.
- In `src/index.css`:
  - Keep `html, body` scrolling default-friendly on desktop:
    - do not rely on `-webkit-overflow-scrolling` (it’s iOS-focused)
    - ensure `overflow-y: auto` is actually applied and not overridden
  - Confirm no desktop rules inadvertently apply `touch-action`/`user-select` classes to body/root.

C. Fallback strategy if window scrolling is still unreliable
If desktop scrolling still fails after the reset above, switch to an “app-scroll container” pattern:
- Make the app scroll inside a single container:
  - `html, body { height: 100%; overflow: hidden; }`
  - `#root` (or the `ResponsiveWrapper` root div) becomes `height: 100vh; overflow-y: auto;`
- Update scroll-dependent logic:
  - Navigation “scrolled” state: listen to the container’s scrollTop instead of `window.scrollY`.
  - Any `scrollIntoView` will still work (it scrolls the nearest scrollable ancestor), but we’ll verify anchors behave as expected.
- This pattern is extremely reliable across browsers when window scroll gets blocked by something outside React.

Acceptance checks for Part 1
- Desktop Chrome and Edge:
  - Mouse wheel scroll works from Hero down to Footer on `/`.
  - Scrollbar dragging works.
  - `/journal` is scrollable from top to the cards section.
  - Navigation anchor jumps (Experience/Education/Projects) still work.

Part 2 — Make “Cyber Journal” cards load on both Home and /journal
A. Unify the data source
- Create a shared hook (e.g., `useCyberJournalPosts`) that:
  - fetches RSS posts,
  - maps them into a UI-friendly shape,
  - returns `data`, `isLoading`, `error`, `refetch`.
- Use this hook in:
  - `src/components/BlogSection.tsx` (homepage)
  - `src/pages/Journal.tsx` (/journal page)
- Result: both pages show the same live RSS content and consistent loading states.

B. Use React Query for caching + refresh
- Convert RSS fetching to `@tanstack/react-query`:
  - queryKey: `['cyber-journal', WORDPRESS_RSS_URL]`
  - queryFn: call `RSSService.fetchRSSFeed`
  - `staleTime`: 5–15 minutes, `retry`: 1–2 (RSS can be flaky; don’t hammer)
- Refresh button:
  - call `queryClient.invalidateQueries({ queryKey: ['cyber-journal', WORDPRESS_RSS_URL] })`
  - or simply use `refetch()` for immediate reload.
- This also addresses “sometimes not loading” issues caused by stale or inconsistent state management.

C. Improve the UI states
- While loading: show Skeleton cards (already present in BlogSection).
- On error: show a clear “Live feed unavailable” banner and provide:
  - “Try again” button,
  - optionally show fallback posts so the section isn’t empty.
- Ensure mapping logic never crashes:
  - guard for missing categories, missing pubDate, missing content, etc.

Acceptance checks for Part 2
- Home page:
  - Cyber Journal cards appear within a few seconds.
  - “Live Feed” badge shows when RSS succeeded.
  - Refresh updates the posts without needing a hard reload.
- /journal page:
  - shows the same posts (or a fuller list, e.g., 20 items) with pagination or “Load more”.

Part 3 — Fix RSS reliability (and make it “real live”)
A. Make the client-side RSS service more reliable
- In `src/services/rssService.ts`:
  - Add a fetch timeout (e.g., 8–12 seconds) per proxy attempt to avoid hanging.
  - Try direct fetch first (some feeds do allow CORS), then proxies.
  - Improve parsing to prefer:
    - `content:encoded` when present
    - `description` fallback
  - Use a consistent, safe excerpt/content extraction.
  - Return a stable shape even when fields are missing.

B. Optional (recommended) best-practice solution: server-side RSS proxy via Supabase Edge Function
- Client-side RSS will always be somewhat unreliable due to CORS and third-party proxies.
- If you enable Lovable Cloud/Supabase:
  - Create an Edge Function that fetches the WordPress feed server-side and returns JSON.
  - The frontend calls your edge function (same origin / configured), eliminating CORS and dependency on public proxies.
- This is the most robust approach for “live RSS”.

Acceptance checks for Part 3
- RSS loads reliably across sessions (no random failures due to proxy downtime).
- Clear error message if the feed is down, rate-limited, or returns invalid XML.
- No unsafe HTML injection (continue to sanitize/strip content).

Files likely to change (implementation)
- Scrolling:
  - `src/components/ResponsiveWrapper.tsx`
  - `src/index.css`
  - `index.html`
  - (optional) small debug helper in `src/utils/` or a tiny dev-only component
- Cyber Journal / RSS:
  - `src/components/BlogSection.tsx`
  - `src/pages/Journal.tsx`
  - `src/services/rssService.ts`
  - (new) shared hook file, e.g. `src/hooks/useCyberJournalPosts.ts`

Risks and how we mitigate them
- Changing scroll behavior can affect mobile:
  - All scroll fixes will be scoped to desktop first.
  - Mobile GPU hints remain scoped (no global transforms).
- Switching to app-scroll-container can affect window-based listeners:
  - We’ll update Navigation scroll detection accordingly if we choose that fallback.
- RSS parsing variations:
  - We keep strict XML safety checks but improve fallbacks and timeouts.

Test plan (end-to-end)
- Desktop: Chrome + Edge
  - `/` scroll, navbar anchor clicks, reach BlogSection, open posts.
  - `/journal` scroll, cards visible, open posts.
- Mobile sanity check:
  - Ensure scrolling still works and no viewport height regressions.
  - Ensure BlogSection still loads (or gracefully falls back).

