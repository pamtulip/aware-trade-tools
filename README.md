# Aware Trade Tools

Interactive research tools from [Aware Trade](https://awaretrade.com).

## Pages

- `/` — Landing page
- `/monitor` — Macro Monitor (economic dashboard)
- `/timeline` — Social Credit Timeline (investigative timeline)

## Deploy to Vercel

### Option A — GitHub (recommended, enables auto-updates)

1. Create a new repository on github.com — call it `aware-trade-tools`
2. Push this folder to that repository (instructions below)
3. Go to vercel.com, click "Add New Project"
4. Import the GitHub repository
5. Leave all settings as default — Vercel auto-detects Vite
6. Click Deploy

Every time you push updated code to GitHub, Vercel rebuilds automatically.

### Option B — Vercel CLI (deploy directly without GitHub)

```bash
npm install -g vercel
cd aware-trade-tools
npm install
vercel
```

Follow the prompts. Your site will be live in under a minute.

## Push to GitHub (first time)

```bash
cd aware-trade-tools
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aware-trade-tools.git
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

## Update the tools

When new data arrives (PPI, jobless claims, UMich, etc.):
1. Update `/src/pages/MacroMonitor.jsx` with new values
2. Update `/src/pages/SocialCreditTimeline.jsx` with new entries
3. Commit and push to GitHub
4. Vercel rebuilds automatically — live in ~30 seconds

## Custom domain (optional)

In Vercel project settings, go to Domains and add:
- `monitor.awaretrade.com` pointing to `/monitor`
- `timeline.awaretrade.com` pointing to `/timeline`

Or use a single domain: `tools.awaretrade.com` for the landing page.
