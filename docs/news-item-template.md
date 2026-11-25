# News item templates (copy from the live site patterns)

Use these snippets in **`index.html`** (English). Mirror in **`fr/index.html`** with Québec French and `../images/` paths.

---

## 1. Support bar ticker line

```html
<span class="support-bar__msg">YOUR ALL-CAPS TICKER LINE HERE</span>
```

Add or replace lines inside `.support-bar__ticker`. Keep messages short; they scroll.

---

## 2. Network bar link (black top strip)

```html
<a href="https://example.com/story-url">LABEL: Short description</a>
```

The first link (`Pepper News`) uses `class="on"` and `href="#top"`. Leave that alone unless Louka asks.

---

## 3. Section nav headline (under blue header)

```html
<a href="https://x.com/MaggotX66/status/XXXXXXXX">JUST IN: SHORT HEADLINE IN ALL CAPS</a>
```

Mix of internal `href="#coin"` and external URLs is normal. Social links (TikTok, Instagram, Louka on X) sit at the end.

---

## 4. New lead story (hero) — use only when the news deserves the top slot

Replace the contents of `<article class="lead">` (or update text/links/image while keeping structure):

```html
<article class="lead">
  <a class="m" href="SOURCE_URL">
    <img src="images/road.jpg" alt="Describe the photo honestly.">
    <p class="kicker"><span>ON THE RUN</span></p>
  </a>
  <div class="info">
    <p class="eyebrow">BREAKING</p>
    <h1 id="title"><a href="SOURCE_URL">MAIN HEADLINE IN ALL CAPS</a></h1>
    <p class="dek">Two or three sentences. Dramatic but factual. Link emotionally to #SavePepper. End with #SavePepper when it fits.</p>
  </div>
</article>
```

French: same structure; `src="../images/road.jpg"`; translate kicker (e.g. `EN CAVALE`), eyebrow (`DERNIÈRE HEURE`), title, dek.

Also update `<title>`, meta description, and `og:title` / `og:description` in `<head>` when the lead changes materially.

---

## 5. River row **with** thumbnail (newest stories — insert at top of `.river`)

```html
<a class="row" href="SOURCE_URL">
  <img src="images/newphoto.jpg" alt="">
  <div>
    <time datetime="2026-11-13">13 Nov 2026</time>
    <h3>SHORT HEADLINE</h3>
    <p>One or two factual sentences. No invented quotes.</p>
  </div>
</a>
```

French: `../images/newphoto.jpg`, French date style (e.g. `13 nov. 2026`), translated `h3` and `p`.

---

## 6. River row **without** image (press-style)

```html
<a class="row plain" href="https://news-outlet.example/article">
  <div>
    <time datetime="2026-11-13">13 Nov 2026</time>
    <h3>HEADLINE</h3>
    <p>Outlet name or context: what the article says, in your words. No conviction claims unless reported.</p>
  </div>
</a>
```

---

## 7. Watch grid card (video / podcast)

```html
<article>
  <a class="m" href="EPISODE_URL">
    <img src="images/beat.jpg" alt="Describe scene.">
    <p class="kicker"><span>THE BEAT</span></p>
  </a>
  <h3><a href="EPISODE_URL">ALL-CAPS CARD TITLE</a></h3>
  <ul class="related">
    <li><a href="EPISODE_URL">Supporting line with context. #SavePepper</a></li>
  </ul>
</article>
```

Optional image position classes used on the live site: `pos-beat`, `pos-barely`, `pos-donut`, `pos-holder`, `pos-avatar`.

---

## 8. Sidebar “Latest” item

Insert at the **top** of the first `<ol class="side-list">` in the aside:

```html
<li><a href="SOURCE_URL"><time>13 Nov 2026</time>Short label for the link</a></li>
```

---

## 9. Press wire item

Insert at the **top** of the press section’s `<ol class="side-list">`:

```html
<li><a href="ARTICLE_URL"><time>Outlet · 13 Nov</time>Very short description</a></li>
```

---

## Bilingual checklist for one new story

- [ ] English river row (and FR twin)
- [ ] Sidebar Latest (both languages)
- [ ] Section nav and/or network bar if it’s major news
- [ ] Lead + meta tags only if this **is** the top story
- [ ] Image committed under `images/` if new
- [ ] PR lists source URLs
