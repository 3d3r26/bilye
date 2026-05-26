(function () {
  "use strict";

  // Canlı uygulama (Render/tunnel): tam URL. Boş + localhost = otomatik kök.
  const APP_LIVE_URL = "";

  const DEMO_PRODUCTS = [
    {
      id: "yogurt",
      name: "Sade yoğurt",
      brand: "Demo Market",
      keywords: ["yoğurt", "yogurt", "süt", "sut"],
      ingredients:
        "Pastörize inek sütü (%98), canlı yoğurt kültürü (Streptococcus thermophilus, Lactobacillus bulgaricus).",
      highlights: [
        { level: "yellow", text: "Pastörize süt — işlenmiş süt ürünü; hassasiyetiniz varsa etiketi okuyun." },
        { level: "blue", text: "Canlı kültür — fermente gıda, probiyotik içerik bilgilendirmesi." },
      ],
      counts: { red: 0, yellow: 1, blue: 1 },
    },
    {
      id: "biscuit",
      name: "Çikolatalı kremalı bisküvi",
      brand: "Demo Market",
      keywords: ["bisküvi", "biskuvi", "çikolata", "cikolata", "krema"],
      ingredients:
        "Buğday unu, şeker, bitkisel yağ (palm), glukoz-fruktoz şurubu, kakao tozu (%4), emülgatör (soya lesitini E322), kabartıcılar, tuz, aroma verici.",
      highlights: [
        { level: "red", text: "Palm yağı — yüksek doymuş yağ; sık tüketimde dikkat." },
        { level: "red", text: "Glukoz-fruktoz şurubu — eklenmiş şeker." },
        { level: "yellow", text: "Emülgatör (E322) — işlenmiş katkı; etiket okumayı sürdürün." },
        { level: "blue", text: "Kakao tozu — bilgi amaçlı içerik." },
      ],
      counts: { red: 2, yellow: 1, blue: 1 },
    },
    {
      id: "soup",
      name: "Tavuklu şehriye çorbası (hazır)",
      brand: "Demo Market",
      keywords: ["çorba", "corba", "tavuk", "şehriye", "sehirye", "instant"],
      ingredients:
        "Şehriye (%32), tuz, nişasta, tavuk eti tozu (%6), sebze tozu, palm yağı, aroma verici, renklendirici (E160c), koruyucu (E627, E631).",
      highlights: [
        { level: "red", text: "Yüksek tuz — günlük tüketim limitini aşmamaya dikkat." },
        { level: "yellow", text: "Aroma verici — içerik şeffaflığı sınırlı olabilir." },
        { level: "blue", text: "E627 / E631 — glutamat türevi katkılar (bilgilendirme)." },
      ],
      counts: { red: 1, yellow: 1, blue: 1 },
    },
  ];

  const DEMO_SUGGESTIONS = ["Yoğurt", "Bisküvi", "Çorba"];

  const root = document.getElementById("demo-root");
  const searchInput = document.getElementById("demo-search");
  const resultsEl = document.getElementById("demo-results");
  const hintEl = document.getElementById("demo-hint");
  const chipsEl = document.getElementById("demo-chips");
  const searchView = document.getElementById("demo-search-view");
  const detailView = document.getElementById("demo-detail-view");
  const fullAppLink = document.getElementById("demo-full-app");

  if (!root || !searchInput) return;

  function resolveAppUrl() {
    if (APP_LIVE_URL) return APP_LIVE_URL;
    const h = location.hostname;
    if (h === "localhost" || h === "127.0.0.1") {
      return location.protocol + "//" + location.host + "/";
    }
    return null;
  }

  const appUrl = resolveAppUrl();
  if (appUrl && fullAppLink) {
    fullAppLink.href = appUrl;
    fullAppLink.hidden = false;
  }

  function normalize(s) {
    return s
      .toLocaleLowerCase("tr")
      .normalize("NFD")
      .replace(/\p{M}/gu, "");
  }

  function matchProduct(q) {
    const n = normalize(q);
    if (n.length < 2) return [];
    return DEMO_PRODUCTS.filter((p) => {
      const hay = [p.name, p.brand, ...p.keywords].map(normalize).join(" ");
      return hay.includes(n);
    });
  }

  function levelLabel(level) {
    if (level === "red") return "Kırmızı risk";
    if (level === "yellow") return "Sarı belirsiz";
    return "Mavi katkı";
  }

  function renderResults(list) {
    resultsEl.innerHTML = "";
    if (!list.length) {
      hintEl.textContent = "Sonuç yok. «yoğurt», «bisküvi» veya «çorba» deneyin.";
      hintEl.hidden = false;
      return;
    }
    hintEl.hidden = true;
    list.forEach((p) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "demo-result";
      btn.innerHTML =
        "<strong>" +
        escapeHtml(p.name) +
        "</strong><span>" +
        escapeHtml(p.brand) +
        "</span>";
      btn.addEventListener("click", () => showDetail(p));
      li.appendChild(btn);
      resultsEl.appendChild(li);
    });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function showDetail(p) {
    searchView.hidden = true;
    detailView.hidden = false;
    document.getElementById("demo-product-name").textContent = p.name;
    document.getElementById("demo-product-brand").textContent = p.brand;

    const summary = document.getElementById("demo-summary");
    summary.innerHTML = "";
    [
      ["red", "Kırmızı", p.counts.red],
      ["yellow", "Sarı", p.counts.yellow],
      ["blue", "Mavi", p.counts.blue],
    ].forEach(([level, label, count]) => {
      if (!count) return;
      const span = document.createElement("span");
      span.className = "demo-pill demo-pill--" + level;
      span.textContent = count + " " + label;
      summary.appendChild(span);
    });

    document.getElementById("demo-ingredients").textContent = p.ingredients;
    const ul = document.getElementById("demo-highlights");
    ul.innerHTML = "";
    p.highlights.forEach((h) => {
      const li = document.createElement("li");
      li.className = "demo-highlight demo-highlight--" + h.level;
      li.innerHTML =
        '<span class="demo-highlight-tag">' +
        levelLabel(h.level) +
        "</span> " +
        escapeHtml(h.text);
      ul.appendChild(li);
    });
  }

  function showSearch() {
    detailView.hidden = true;
    searchView.hidden = false;
    searchInput.focus();
  }

  function openDemo(prefill) {
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    root.removeAttribute("inert");
    document.body.classList.add("demo-open-body");
    showSearch();
    searchInput.value = prefill || "";
    renderResults(prefill ? matchProduct(prefill) : []);
    if (!prefill) hintEl.hidden = false;
    searchInput.focus();
  }

  function closeDemo() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    root.setAttribute("inert", "");
    document.body.classList.remove("demo-open-body");
    showSearch();
    searchInput.value = "";
    resultsEl.innerHTML = "";
    hintEl.hidden = false;
    hintEl.textContent = "En az 2 harf yazın veya bir öneriye tıklayın.";
  }

  DEMO_SUGGESTIONS.forEach((label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "demo-chip";
    b.textContent = label;
    b.addEventListener("click", () => {
      searchInput.value = label;
      renderResults(matchProduct(label));
    });
    chipsEl.appendChild(b);
  });

  document.querySelectorAll(".demo-open").forEach((el) => {
    el.addEventListener("click", () => openDemo());
  });

  root.querySelectorAll("[data-demo-close]").forEach((el) => {
    el.addEventListener("click", closeDemo);
  });

  document.getElementById("demo-back").addEventListener("click", showSearch);

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim();
    if (q.length < 2) {
      resultsEl.innerHTML = "";
      hintEl.hidden = false;
      hintEl.textContent = "En az 2 harf yazın veya bir öneriye tıklayın.";
      return;
    }
    renderResults(matchProduct(q));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) closeDemo();
  });
})();
