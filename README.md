# Pepper News

**Pepper News** is a static, cable-news-style website about **Pepper the raccoon** and **Louka Berman** (Montréal; [X @MaggotX66](https://x.com/MaggotX66)). It tells the story in dramatic “breaking news” voice, links to real sources, and rallies support for Pepper and the refuge mission.

- **English:** [https://thanoswon96-ai.github.io/Pepper-news](https://thanoswon96-ai.github.io/Pepper-news)
- **Français (Québec):** [https://thanoswon96-ai.github.io/Pepper-news/fr/](https://thanoswon96-ai.github.io/Pepper-news/fr/)

There is no database, no CMS, and no build step. The site is plain **HTML + CSS** plus images in the `images/` folder.

---

## Who this repo is for

This is the official community copy of Pepper News, in the **thanoswon96-ai** GitHub account. You can update it yourself. AbsNBDY’s original demo at pepper-news.vercel.app is separate and is not changed from here.

- **Miguel / the $PEPPER community site** — add stories in **[stories.json](./stories.json)**. A short guide is in **[HOW-TO-ADD-A-STORY.md](./HOW-TO-ADD-A-STORY.md)**.
- **Grok Bot (or any coding agent)** — follow **[AGENTS.md](./AGENTS.md)** for sources and verification rules. Edit `stories.json`, keep English and Québec French in the same entry, and do not invent facts.

---

## How deploys work (GitHub Pages)

This copy is meant to be hosted with **GitHub Pages** from the `main` branch (folder: `/`, the root of the repo). After Pages is turned on once, every save to `main` goes live automatically, usually within a minute or two.

| Action | What happens |
|--------|----------------|
| Edit and commit `stories.json` on `main` | The live news site updates by itself |
| English | https://thanoswon96-ai.github.io/Pepper-news/ |
| Français | https://thanoswon96-ai.github.io/Pepper-news/fr/ |

The community website [peppertheraccooncto.com](https://peppertheraccooncto.com) has a Pepper News button that should point at this copy, not at the old Vercel demo.

---

## File map

```
pepper-news/
├── stories.json        ← **Edit this to add or change a story** (EN + FR in one entry)
├── stories.js          ← Reads stories.json and draws the page (do not edit unless fixing a bug)
├── HOW-TO-ADD-A-STORY.md
├── index.html          ← English page shell
├── fr/
│   └── index.html      ← French page shell
├── styles.css          ← Visual design (avoid big changes unless asked)
├── favicon.svg
├── images/
├── README.md
├── AGENTS.md
└── docs/
    ├── news-item-template.md
    └── sources.md
```

### What lives inside each HTML file (top to bottom)

1. **Support bar** (`support-bar`) — scrolling ticker messages + “Buy $10 of $PEPPER” button  
2. **Network bar** (`network-bar`) — black strip of quick story links  
3. **Site header** — logo, section links, EN/FR switcher, Montréal clock  
4. **Section nav** (`nav-lower`) — headline-style links (DEVELOPING, JUST IN, etc.)  
5. **Lead story** (`big-top` / `lead`) — main hero image, BREAKING line, title, dek  
6. **Hot topics** — hashtag and topic chips  
7. **Watch** — grid of video/podcast cards (`thumbs`)  
8. **Poster** — featured art block  
9. **The story** (`river`) — chronological story rows (newest near the top)  
10. **The mission** — refuge / GoFundMe block  
11. **Sidebar** — Latest list, Help Pepper, $PEPPER coin box, press wire list  
12. **Footer** — disclaimer and links  

French (`fr/index.html`) uses the **same structure** and CSS; only text and some link choices differ.

---

## Editing by hand on GitHub

You do not need a code editor. Follow **[HOW-TO-ADD-A-STORY.md](./HOW-TO-ADD-A-STORY.md)**.

The usual path is: open `stories.json` → pencil icon → add one entry with `"en"` and `"fr"` fields → commit to `main` → check the live Pages links.

**Rule:** every new story needs English and natural Québec French in the same entry (not a word-for-word machine translation).

### Quick examples of what to edit

| You want to change… | Where in `index.html` |
|---------------------|------------------------|
| Ticker lines at the very top | `<span class="support-bar__msg">…</span>` inside `support-bar__ticker` |
| Buy button text or link | `support-bar__btn` (only change the Pump.fun URL if Louka says so) |
| Top black network links | Inside `<nav class="network">` |
| Scrolling headline strip under the blue bar | Inside `<nav class="section-nav">` |
| Main BREAKING headline | `lead` section: `h1`, `dek`, image `src` / `alt` |
| New story in the timeline | Add a `<a class="row">…</a>` at the **top** of `<div class="river">` |
| Sidebar “Latest” | `<ol class="side-list">` under “Latest” |
| Watch grid item | `<article>` blocks inside `<div class="thumbs">` |

Templates with real markup: **[docs/news-item-template.md](./docs/news-item-template.md)**.

---

## Adding images

1. Save the image file (JPG or PNG) into **`images/`** with a short name (e.g. `sanctuary-nov12.jpg`).  
2. Prefer **Louka’s own photos** or media you have permission to use.  
3. In **English** HTML: `src="images/yourfile.jpg"`  
4. In **French** HTML: `src="../images/yourfile.jpg"`  
5. Always set a helpful **`alt="..."`** description for accessibility.

Commit the image file and both HTML files in the same pull request.

---

## Keeping English and French in sync

| English (`index.html`) | French (`fr/index.html`) |
|------------------------|---------------------------|
| `images/photo.jpg` | `../images/photo.jpg` |
| `href="./"` for EN | `href="../"` for EN link in FR page |
| `href="fr/"` for FR | `href="./"` for FR |
| `styles.css` | `../styles.css` |

When you add a story, add **both** languages in the same `stories.json` entry: same link URLs, same `datetime`, translated headlines and blurbs.

---

## Preview locally

**Option A — simplest:** double-click `index.html`. The bundled stories still show. To preview a change to `stories.json`, use option B (a local server), or just commit and check the live GitHub Pages link.

**Option B — recommended:**

```bash
cd pepper-news
npx serve
```

Open the URL it prints (usually `http://localhost:3000`). For French, open `/fr/`.

---

## Connect your Grok Bot

1. In Grok Bot, **connect GitHub** and grant access to this repository (`thanoswon96-ai/pepper-news`).  
2. Point the agent at **`pepper-news`** and tell it: **“Follow AGENTS.md and HOW-TO-ADD-A-STORY.md. Edit stories.json only for news.”**  
3. Pass **news, photos, and confirmations** to the agent.  
4. The agent should edit `stories.json` (English and French in the same entry), list source links, and **not invent facts**.  
5. Check [https://thanoswon96-ai.github.io/Pepper-news/](https://thanoswon96-ai.github.io/Pepper-news/) and [the French page](https://thanoswon96-ai.github.io/Pepper-news/fr/).

Full rules, source priority, and checklists: **[AGENTS.md](./AGENTS.md)**.

---

## Disclaimer (same spirit as the site footer)

Pepper News is a fan/story site, not a real TV network. It is **not financial advice** and **not a charity**. The refuge is still a plan. When in doubt, ask Louka before publishing.
