/* Renders Pepper News from stories.json (English + Québec French). */
(function () {
  var lang = (document.documentElement.lang || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  var assetBase = lang === "fr" ? "../" : "";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pick(obj, key) {
    if (!obj) return "";
    if (obj[lang] != null && typeof obj[lang] === "object" && key) return obj[lang][key] || "";
    if (key && obj[key] != null && typeof obj[key] === "object") return obj[key][lang] || "";
    if (obj[lang] != null && typeof obj[lang] === "string") return obj[lang];
    return obj[key] || "";
  }

  function imgPath(src) {
    if (!src) return "";
    if (/^https?:/i.test(src) || src.indexOf("../") === 0) return src;
    return assetBase + src.replace(/^\//, "");
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function render(data) {
    if (data.ticker) {
      fill("js-ticker", data.ticker.map(function (item) {
        return '<span class="support-bar__msg">' + esc(item[lang] || "") + "</span>";
      }).join(""));
    }

    if (data.buyButton) {
      var btn = document.getElementById("js-buy");
      if (btn) {
        btn.href = data.buyButton.url;
        btn.textContent = data.buyButton[lang] || data.buyButton.en;
      }
    }

    if (data.network) {
      fill("js-network", data.network.map(function (item) {
        var cls = item.current ? ' class="on"' : "";
        return "<a" + cls + ' href="' + esc(item.url) + '">' + esc(item[lang] || "") + "</a>";
      }).join(""));
    }

    if (data.sectionNav) {
      fill("js-section-nav", data.sectionNav.map(function (item) {
        var cls = item.className ? ' class="' + esc(item.className) + '"' : "";
        return "<a" + cls + ' href="' + esc(item.url) + '">' + esc(item[lang] || "") + "</a>";
      }).join(""));
    }

    if (data.lead) {
      var lead = data.lead;
      fill("js-lead",
        '<article class="lead">' +
          '<a class="m" href="' + esc(lead.url) + '">' +
            '<img src="' + esc(imgPath(lead.image)) + '" alt="' + esc(pick(lead, "imageAlt")) + '">' +
            '<p class="kicker"><span>' + esc(pick(lead, "kicker")) + "</span></p>" +
          "</a>" +
          '<div class="info">' +
            '<p class="eyebrow">' + esc(pick(lead, "eyebrow")) + "</p>" +
            '<h1 id="title"><a href="' + esc(lead.url) + '">' + esc(pick(lead, "headline")) + "</a></h1>" +
            '<p class="dek">' + esc(pick(lead, "dek")) + "</p>" +
          "</div>" +
        "</article>"
      );
    }

    if (data.hotTopics) {
      fill("js-hot-links", data.hotTopics.map(function (item) {
        return '<a href="' + esc(item.url) + '">' + esc(item[lang] || "") + "</a>";
      }).join(""));
    }

    if (data.watch) {
      fill("js-watch", data.watch.map(function (item) {
        var imgClass = item.imageClass ? ' class="' + esc(item.imageClass) + '"' : "";
        var related = (item.related || []).map(function (rel) {
          return "<li><a href=\"" + esc(rel.url) + "\">" + esc(rel[lang] || "") + "</a></li>";
        }).join("");
        return "<article>" +
          '<a class="m" href="' + esc(item.url) + '">' +
            "<img" + imgClass + ' src="' + esc(imgPath(item.image)) + '" alt="' + esc(pick(item, "imageAlt")) + '">' +
            '<p class="kicker"><span>' + esc(pick(item, "kicker")) + "</span></p>" +
          "</a>" +
          "<h3><a href=\"" + esc(item.url) + "\">" + esc(pick(item, "headline")) + "</a></h3>" +
          '<ul class="related">' + related + "</ul>" +
        "</article>";
      }).join(""));
    }

    if (data.poster) {
      var poster = data.poster;
      var posterEl = document.getElementById("js-poster");
      if (posterEl) {
        posterEl.innerHTML =
          '<a class="m banner" href="' + esc(poster.url) + '">' +
            '<img src="' + esc(imgPath(poster.image)) + '" alt="' + esc(pick(poster, "imageAlt")) + '">' +
          "</a>" +
          '<h3 id="poster-title"><a href="' + esc(poster.url) + '">' + esc(pick(poster, "headline")) + "</a></h3>" +
          "<p>" + esc(pick(poster, "credit")) + "</p>";
      }
    }

    if (data.stories) {
      fill("js-river", data.stories.map(function (item) {
        var loc = item[lang] || item.en || {};
        var hasImage = !!item.image;
        var img = hasImage
          ? '<img src="' + esc(imgPath(item.image)) + '" alt="' + esc(loc.imageAlt || "") + '">'
          : "";
        var cls = hasImage ? "row" : "row plain";
        return '<a class="' + cls + '" href="' + esc(item.url) + '">' +
          img +
          "<div>" +
            '<time datetime="' + esc(item.datetime || "") + '">' + esc(loc.dateLabel || "") + "</time>" +
            "<h3>" + esc(loc.headline || "") + "</h3>" +
            "<p>" + esc(loc.blurb || "") + "</p>" +
          "</div>" +
        "</a>";
      }).join(""));
    }

    if (data.latest) {
      fill("js-latest", data.latest.map(function (item) {
        var loc = item[lang] || item.en || {};
        return "<li><a href=\"" + esc(item.url) + "\"><time>" + esc(loc.dateLabel || "") + "</time>" + esc(loc.label || "") + "</a></li>";
      }).join(""));
    }

    if (data.press) {
      fill("js-press", data.press.filter(function (item) {
        return !!(item[lang]);
      }).map(function (item) {
        var loc = item[lang];
        return "<li><a href=\"" + esc(item.url) + "\"><time>" + esc(loc.time || "") + "</time>" + esc(loc.label || "") + "</a></li>";
      }).join(""));
    }
  }

  fetch(assetBase + "stories.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load stories.json");
      return res.json();
    })
    .then(render)
    .catch(function (err) {
      console.warn("Pepper News: keeping the bundled stories.", err);
    });
})();
