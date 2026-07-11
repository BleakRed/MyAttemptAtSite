# Links Hub

A minimal, fast personal link hub built with [Astro](https://astro.build). Organize frequently visited sites into categories with custom SVG icons. Deploys to GitHub Pages.

## Features

- **Content-driven** — Edit `src/data/links.json` to add/remove/reorder links
- **Categories** — Social, Development, Media, Tools (customizable)
- **Featured section** — Pin important links at the top
- **Custom SVG icons** — Drop SVGs in `public/icons/`, reference by path
- **Cyberpunk theme** — Dark/light via CSS variables, respects system preference
- **Zero JS** — Static HTML, no client-side hydration needed
- **GitHub Pages ready** — Build outputs to `dist/`

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to ./dist
npm run preview    # preview production build
```

## Project Structure

```
src/
├── components/
│   └── LinkCard.astro    # Link card component (icon + title + desc)
├── data/
│   └── links.json        # All links — edit this to manage content
├── pages/
│   └── index.astro       # Main page, loads links.json
├── styles/
│   └── global.css        # Cyberpunk theme (CSS variables)
public/
├── icons/                # Custom SVG icons (referenced by iconPath)
│   ├── github.svg
│   ├── gitlab.svg
│   ├── twitter.svg
│   └── ...
└── favicon.svg
```

## Managing Links

Edit `src/data/links.json`:

```json
{
  "title": "GitHub",
  "url": "https://github.com/yourusername",
  "description": "Public repos, contributions, stars",
  "category": "dev",
  "iconPath": "/icons/github.svg",
  "featured": true
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | yes | Display name |
| `url` | yes | Full URL (https://...) |
| `description` | yes | Short description |
| `category` | yes | `social` \| `dev` \| `media` \| `tools` \| `other` |
| `iconPath` | no | Path to SVG in `public/icons/` |
| `icon` | no | Fallback emoji if no SVG |
| `featured` | no | `true` pins to top section |

**Categories** are defined in `src/pages/index.astro` (`categoryOrder` + `categoryLabels`).

## Adding Icons

1. Add `your-icon.svg` to `public/icons/`
2. Use `fill="currentColor"` in the SVG so it inherits theme color
3. Reference it: `"iconPath": "/icons/your-icon.svg"`

If `iconPath` is omitted, the `icon` emoji is used (default: 🔗).

## Theme

Colors defined in `src/styles/global.css` via CSS variables:

```css
:root {
  --color-bg: #0d0d0d;
  --color-card: #1a1a1a;
  --color-border: #2a2a2a;
  --color-text: #e0e0e0;
  --color-muted: #888;
  --color-accent: #00ffaa;
  --color-accent-bg: rgba(0, 255, 170, 0.1);
  --font-sans: 'JetBrains Mono', 'Fira Code', monospace;
}
```

Light mode auto-applies via `@media (prefers-color-scheme: light)`.

## Deploy to GitHub Pages

1. Push to GitHub
2. Settings → Pages → Source: **GitHub Actions**
3. Add workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

4. Push — site deploys automatically.

## License

MIT