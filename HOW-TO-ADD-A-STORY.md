# How to add a Pepper News story

You only need to edit **one file**: `stories.json`.

Add both the English and the Québec French wording in that same entry, so the two languages stay in sync. Do not add a story unless it is a confirmed fact (from Louka, or from a linked news article or his public post).

Do not invent quotes, dates, dollar amounts, or court outcomes.

---

## On your phone or computer

1. Open your repo: [https://github.com/thanoswon96-ai/Pepper-news](https://github.com/thanoswon96-ai/Pepper-news)
2. Tap **`stories.json`**.
3. Tap the pencil (Edit).
4. Add the new entry at the **top** of the right list (see below).
5. Scroll down, write a short message like `Add Nov 25 sanctuary update`, and tap **Commit changes** (you can commit straight to `main`).
6. Wait a minute, then check:
   - English: [https://thanoswon96-ai.github.io/Pepper-news/](https://thanoswon96-ai.github.io/Pepper-news/)
   - Français: [https://thanoswon96-ai.github.io/Pepper-news/fr/](https://thanoswon96-ai.github.io/Pepper-news/fr/)

GitHub Pages updates automatically after you save. You do not need to upload anything to Cloudflare for the news site itself.

---

## Add a regular story (the timeline)

At the top of the `"stories"` list, just after `"stories": [`, paste a new block like this. Keep the comma after it.

```json
{
  "url": "https://example.com/the-source-link",
  "datetime": "2026-11-25",
  "image": "images/your-photo.jpg",
  "en": {
    "dateLabel": "25 Nov 2026",
    "headline": "SHORT HEADLINE IN ALL CAPS",
    "blurb": "One or two factual sentences. No invented quotes.",
    "imageAlt": "A short, honest description of the photo."
  },
  "fr": {
    "dateLabel": "25 nov. 2026",
    "headline": "COURT TITRE EN FRANÇAIS",
    "blurb": "Une ou deux phrases factuelles, en français québécois.",
    "imageAlt": "Une courte description honnête de la photo."
  }
},
```

- Put this **above** the older stories. Newest first.
- `url` is the source people go to when they tap the row (an X post or a news article).
- If you do not have a photo, delete the `"image"` line and the two `"imageAlt"` lines.
- If you add a photo, upload it to the `images/` folder first, then use `images/your-photo.jpg` in the entry.

Also add a short line at the **top** of the `"latest"` list (the sidebar):

```json
{
  "url": "https://example.com/the-source-link",
  "en": { "dateLabel": "25 Nov 2026", "label": "JUST IN: Short label" },
  "fr": { "dateLabel": "25 nov. 2026", "label": "DERNIÈRE MINUTE : court libellé" }
},
```

---

## Change the big top story

Only do this when the news really deserves the top of the page. Edit the `"lead"` object. Use the same source URL in both languages; put the English and French headlines inside `"headline"`, `"dek"`, `"kicker"`, and `"eyebrow"`.

If you change the lead, you can also update the `"meta"` titles at the top of the file (the text that shows in a browser tab and when the page is shared).

---

## Watch cards and “From the wires”

- Watch videos/podcasts: add an object at the top of `"watch"`.
- Press links: add an object at the top of `"press"`. Include `"en"` and `"fr"` when the same article should appear in both languages. A French-only item can have only `"fr"`.

---

## Checklist

- [ ] The fact is confirmed, and the `url` points at the source
- [ ] English and French are both filled in
- [ ] Newest item is at the top
- [ ] No invented quotes, amounts, or dates
- [ ] The live English and French pages look right after a minute

If a comma is missing, the page may show the older bundled stories until the file is fixed. GitHub will often highlight a JSON typo if you accidentally break the file.
