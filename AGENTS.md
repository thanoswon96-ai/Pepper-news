# AGENTS.md — Pepper News maintenance playbook

**Goal:** Keep [Pepper News](https://thanoswon96-ai.github.io/Pepper-news) current with real news about **Pepper the raccoon** and **Louka Berman** (Montréal; [X @MaggotX66](https://x.com/MaggotX66)), in **English** and **Québec French**, without changing design unless Louka asks.

**Repository shape:** Static site. **Story updates go in `stories.json`** (English and Québec French fields in the same entry). `stories.js` draws the page. `index.html` and `fr/index.html` are the page shells. No build step. GitHub Pages deploys when `main` changes.

When adding a story, follow **[HOW-TO-ADD-A-STORY.md](./HOW-TO-ADD-A-STORY.md)**. Do not add new stories unless they are confirmed facts. Keep existing stories as they are unless you are fixing a real error.

---

## 1. Source priority and trust

| Priority | Source | How to use |
|----------|--------|------------|
| 1 | **Louka directly** (DMs, agent chat, photos he sends, PR review comments) | Treat as authoritative for facts, dates, quotes, and whether something may be published |
| 2 | **Louka’s X** [@MaggotX66](https://x.com/MaggotX66) | Primary public timeline; link statuses in stories |
| 3 | **@PepperonPF**, TikTok/Instagram @pepperanddeadpool | Campaign and community voice; confirm big claims with Louka |
| 4 | **News outlets** (Global, Gazette, CP, Radio-Canada, etc.) | Paraphrase accurately; link article; use their dates |
| 5 | **Web search / social rumors** | Do not publish as fact; mark unconfirmed or skip |

See **[docs/sources.md](./docs/sources.md)** for starting links and search terms. Extend that file when you add stable sources.

---

## 2. Verification rules (non-negotiable)

- Publish only facts **confirmed by Louka or a credible linked source**.
- **Link sources** in the HTML (`href` on rows, headlines, and cards) and **list them again in the PR body**.
- **Never invent** quotes, dollar amounts, dates, legal outcomes, or “insider” details.
- If something is plausible but unconfirmed: **do not** put it in the lead story; either skip it or use clearly hedged wording (“Louka has not confirmed…”) only when Louka allows that framing.
- **Photos / video:** use Louka’s own media, official embeds, or properly credited press — save new images to `images/` only when Louka provides them or rights are clear.
- **Legal / court:** no statement of guilt or conviction unless reported by press; “charged,” “vows to fight,” etc. must match articles.
- **Crypto:** no live price claims, no promises of profit; fee totals are **dated quotes from interviews**, not balances (see existing `$PEPPER` sidebar copy).

---

## 3. Editorial voice

- **Tone:** cable TV breaking news — urgent, dramatic, punchy headlines (often ALL CAPS in nav and `h3`s).
- **Stance:** firmly on Pepper’s and Louka’s side — the refuge mission, #SavePepper, against seizure/euthanasia — **without fabricating events**.
- **Dek / blurbs:** short, vivid, honest; hashtag `#SavePepper` where it fits naturally.
- **French:** natural **Québec French**, not literal word-for-word translation; keep the same facts and links as EN.

---

## 4. Site map — where to edit what

All paths below refer to **`index.html`** unless noted. French equivalents live in **`fr/index.html`** (image paths: `../images/...`, stylesheet: `../styles.css`).

### 4.1 `<head>` — SEO and social

- `<title>`, `<meta name="description">`
- `og:title`, `og:description`, `og:image` (FR page often uses absolute image URL)
- Do not change hreflang URLs unless Louka is migrating domains.

### 4.2 Support bar (top)

```html
<div class="support-bar__ticker" aria-live="polite">
  <span class="support-bar__msg">…</span>
</div>
<a class="support-bar__btn btn" href="PUMP_FUN_URL" …>Buy $10 of $PEPPER</a>
```

- Edit ticker lines by changing text inside `support-bar__msg`.
- **Contract / buy URL:** see “Must not do” — no changes without Louka’s explicit instruction.

### 4.3 Network bar

`<nav class="network">` — short black-bar links. First item is home (`class="on"`).

### 4.4 Header

- `primary-nav` — Story, Mission, Watch, coin, Press (anchor links)
- `langs` — EN/FR switches (do not break `href="./"` / `href="fr/"` / `../` pattern)
- `section-nav` — scrolling headline links; primary place for DEVELOPING / JUST IN lines

### 4.5 Lead (`#lead`)

`article.lead` — hero image (`a.m` + `img`), kicker, `eyebrow` (e.g. BREAKING), `h1`, `dek`. This is the main story.

### 4.6 Hot topics

`div.hot` — quick topic chips.

### 4.7 Watch (`#watch`)

`div.thumbs` > multiple `article` blocks — thumbnail stories (podcasts, TV, memes). Each follows: linked image + kicker, `h3`, `ul.related`.

### 4.8 Poster

`section.poster` — one featured image + title + short credit line.

### 4.9 The story (`#story`)

`div.river` — chronological **rows**:

- With image: `<a class="row" href="…">` + `img` + `time` + `h3` + `p`
- Text-only press: `<a class="row plain" href="…">` (no `img`)

**Newest items go at the top** of `.river`.

### 4.10 Mission (`#mission`)

`section#mission` — GoFundMe / refuge copy and buttons. Factual, no overclaim on refuge being open.

### 4.11 Sidebar aside

- **Latest** — first `ol.side-list` (reverse-chronological bullets)
- **Help Pepper** (`#share`) — GoFundMe + share link
- **$PEPPER** (`#coin`) — contract in `<code id="contract">`, buy/chart links, disclaimer paragraphs
- **Press** (`#press`) — second `ol.side-list` “From the wires”

### 4.12 Footer

Disclaimer text and footer nav — only change if Louka wants wording updates.

### 4.13 Inline script

Clock (America/Toronto) and “Copy contract” button — **do not modify** unless fixing a bug Louka reported.

### 4.14 Styles

`styles.css` — **no layout/color overhauls** unless Louka explicitly requests them.

**Markup templates:** [docs/news-item-template.md](./docs/news-item-template.md)

---

## 5. Bilingual rule

Every content change in `index.html` requires a matching update in `fr/index.html`:

- Same URLs and `datetime` values
- Translated visible text (headlines, dek, tickers, buttons, alt text, footer)
- Image paths: EN `images/foo.jpg` → FR `../images/foo.jpg`

Read both files side by side before opening a PR.

---

## 6. Suggested cadence

- **Check sources** daily when Pepper is in the news cycle; otherwise every few days.
- **Update when there is real news** — new Louka post, interview, court development, sanctuary milestone, major press piece.
- **Lead story:** promote only the most important confirmed item.
- **River + Latest:** add each significant item; trim or demote only when the page gets too long (ask Louka before deleting old rows).
- **Do not** churn tickers or headlines without substance (avoid “update for update’s sake”).

---

## 7. Workflow

1. `git fetch` and branch from `main` (e.g. `cursor/pepper-update-3b98` per repo convention).
2. Make **small, focused** edits (content only unless told otherwise).
3. Update **EN + FR**.
4. Open a **pull request** with:
   - Summary of what changed
   - **Source links** (X status URLs, articles)
   - Note if Louka confirmed in chat
5. **Louka reviews** preview deploy and merges.
6. After merge, verify the GitHub Pages EN and FR URLs.
7. **Do not merge your own PR** unless Louka explicitly allows it for that change.

---

## 8. What you must NOT do

- **Design/layout/CSS overhauls** without Louka asking.
- Change **`$PEPPER` contract address** (`9g4Pib6AM3oVdP9YA7ZcssAXAuhoUzkjR8w27doYpump`) or primary **buy links** without Louka’s explicit say-so.
- **Financial promises**, price predictions, or implied investment advice.
- Commit **secrets**, API keys, or private personal data.
- Replace verified facts with fanfiction or unsourced drama.
- Merge PRs on your own (default).
- Edit **HTML meta hreflang** domain to a new host without Louka confirming the canonical URL.

---

## 9. Pre-PR checklist

- [ ] Fact checked against Louka and/or linked credible source
- [ ] Source URLs in PR description
- [ ] `index.html` updated
- [ ] `fr/index.html` updated (Québec French)
- [ ] New images in `images/` if used (both paths correct)
- [ ] Lead / meta tags updated only if lead story changed
- [ ] Sidebar Latest updated for significant news
- [ ] No invented quotes, amounts, or dates
- [ ] No contract/buy-link changes (unless Louka approved in writing)
- [ ] No `styles.css` changes (unless requested)
- [ ] Live Pages URL checked (EN + `/fr/`)

---

## 10. Humans

Louka Berman — Pepper’s human, Montréal — [@MaggotX66](https://x.com/MaggotX66).

For repo editing without an agent, see **[README.md](./README.md)**.
