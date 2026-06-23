## Answer to your question

What you have today is **only the marketing landing page**. To get the full product UI (all screens), we'll build it out in waves. Auth stays UI-only — no backend, no Lovable Cloud — until you say otherwise.

## This turn (Wave 1 — foundation + key flows)

1. **Polish the landing page**
   - Tighten hero spacing, fix mobile overflow on the dashboard mockup, add scroll-reveal on feature cards, sticky cyber-nav with active section highlight, real footer.
2. **Make the dashboard preview interactive**
   - Hover states on sidebar items, clickable severity chart filters the "Recent Scans" list, animated scan-progress bar, "Launch Scan" button triggers a fake terminal stream.
3. **Responsive pass** across the landing — grid → stacked at `md`, hide non-essential columns on mobile, use the `grid-cols-[minmax(0,1fr)_auto]` pattern for header rows.
4. **`/login` + `/signup` (UI only)**
   - Split-screen: glass form on left, animated grid + tagline on right. Email/password fields, "Continue with Google / SSO" buttons (non-functional), forgot-password link. Submit → navigates to `/onboarding`.
5. **`/onboarding` setup wizard** (4 steps)
   - Step 1: Workspace name + logo
   - Step 2: Primary target (domain / IP range / cloud account)
   - Step 3: Scan profile (Recon-only / Standard / Deep / Red-Team)
   - Step 4: Invite team + finish → `/dashboard`
   - Progress rail on the left, framer-motion step transitions, fake validation.
6. **Authenticated app shell** (`/_app` layout)
   - Persistent collapsible cyber-sidebar, top command bar with search + version badge + user menu, breadcrumb.
   - `/dashboard` route with real (mock-data) widgets: KPI cards, severity donut, active scans table, recent findings feed, attack-path teaser.

## Later turns (Wave 2 — full product surface)

- `/scans` (list + new-scan wizard + live scan detail with terminal log + module graph)
- `/findings` (CVE table, severity filters, finding detail w/ evidence, exploit chain, AI remediation)
- `/attack-paths` (interactive graph view)
- `/assets` (target inventory)
- `/reports` (generated report list + viewer)
- `/integrations` (Jira, Slack, GitHub, SIEM tiles)
- `/settings` (workspace, team, API keys, billing)
- `/notifications`, command palette (Cmd-K), empty / loading / error states across all screens

## Technical notes

- All routes added under `src/routes/` using TanStack file-based routing. Authenticated screens live under `src/routes/_app.*.tsx` with a layout route rendering `<Outlet />` inside the cyber shell.
- No real auth — `/login` and `/signup` just `navigate({ to: '/onboarding' })`. When you want real auth, we enable Lovable Cloud and swap in the handlers.
- Sidebar uses the shadcn `Sidebar` primitives, restyled with the `.cyber-card` tokens already in `styles.css`.
- Mock data lives in `src/lib/mock/*.ts` so it's trivial to swap for real queries later.
- Framer-motion drives wizard transitions, scan-progress, and scroll reveals; `prefers-reduced-motion` respected.

Approve and I'll ship Wave 1 in the next turn.