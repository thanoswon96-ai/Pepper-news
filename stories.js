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

  var tickerResizeBound = false;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function collectNetworkLinks(nav) {
    var label = nav.querySelector("a.on") || nav.querySelector("a");
    var source = nav.querySelector(".network__set") || nav;
    var found = source.querySelectorAll("a");
    var links = [];
    var i;
    for (i = 0; i < found.length; i++) {
      if (found[i] === label) continue;
      links.push(found[i].cloneNode(true));
    }
    return {
      label: label ? label.cloneNode(true) : null,
      links: links
    };
  }

  function makeNetworkSet(links, hidden) {
    var set = document.createElement("div");
    set.className = "network__set";
    if (hidden) set.setAttribute("aria-hidden", "true");
    var i;
    for (i = 0; i < links.length; i++) {
      set.appendChild(links[i].cloneNode(true));
      var sep = document.createElement("span");
      sep.className = "network__sep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "•";
      set.appendChild(sep);
    }
    return set;
  }

  function syncNetworkTickerSpeed(nav) {
    var track = nav.querySelector(".network__track");
    var viewport = nav.querySelector(".network__viewport");
    var firstSet = nav.querySelector(".network__set");
    if (!track || !viewport || !firstSet) return;

    if (prefersReducedMotion()) {
      track.classList.remove("is-scrolling");
      track.style.removeProperty("--ticker-shift");
      track.style.removeProperty("--ticker-duration");
      return;
    }

    var setWidth = firstSet.getBoundingClientRect().width;
    var viewWidth = viewport.getBoundingClientRect().width;
    if (setWidth < 1) return;

    var needed = Math.max(2, Math.ceil((viewWidth + setWidth) / setWidth));
    var sets = track.querySelectorAll(".network__set");
    var i;
    for (i = sets.length; i < needed; i++) {
      var clone = firstSet.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }
    sets = track.querySelectorAll(".network__set");
    for (i = sets.length - 1; i >= needed; i--) {
      if (sets[i].getAttribute("aria-hidden") === "true") {
        track.removeChild(sets[i]);
      }
    }

    var duration = setWidth / 75;
    track.style.setProperty("--ticker-shift", setWidth + "px");
    track.style.setProperty("--ticker-duration", duration + "s");
    track.classList.add("is-scrolling");
  }

  function bindTickerChrome() {
    if (tickerResizeBound) return;
    tickerResizeBound = true;
    var timer = null;
    function refresh() {
      var current = document.getElementById("js-network");
      if (current && current.classList.contains("is-ready")) {
        syncNetworkTickerSpeed(current);
      }
    }
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(refresh, 150);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.addEventListener) mq.addEventListener("change", refresh);
      else if (mq.addListener) mq.addListener(refresh);
    }
  }

  function setupNetworkTicker() {
    var nav = document.getElementById("js-network");
    if (!nav) return;

    var parts = collectNetworkLinks(nav);
    if (!parts.label || !parts.links.length) return;

    var viewport = document.createElement("div");
    viewport.className = "network__viewport";

    var track = document.createElement("div");
    track.className = "network__track";
    track.appendChild(makeNetworkSet(parts.links, false));
    track.appendChild(makeNetworkSet(parts.links, true));
    viewport.appendChild(track);

    nav.innerHTML = "";
    nav.appendChild(parts.label);
    nav.appendChild(viewport);
    nav.classList.add("is-ready");

    function pause() { track.style.animationPlayState = "paused"; }
    function resume() { track.style.animationPlayState = ""; }
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", resume, { passive: true });
    viewport.addEventListener("touchcancel", resume, { passive: true });

    syncNetworkTickerSpeed(nav);
    bindTickerChrome();
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
      setupNetworkTicker();
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

  setupNetworkTicker();

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
