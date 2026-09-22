# Wix’e elle yapıştırmadan canlı site (localhost/landing gibi)

`landing/` zaten tam sayfa (CSS, animasyon, mockup). Wix’e **kopyala-yapıştır ile senkron yok**.
Otomatik yol: siteyi **GitHub Pages’te yayınla**, Wix’i ya kapat ya da **tek iframe** ile bağla.

---

## Nasıl çalışır?

```
Sen: landing/ içinde düzenle → git push
         ↓
GitHub Actions (.github/workflows/deploy-landing.yml)
         ↓
https://KULLANICI.github.io/REPO/   (canlı site, localhost/landing ile aynı)
         ↓
Wix (isteğe bağlı): tek “Web adresi” gömme → yukarıdaki URL
```

Her push = site güncellenir. **3 HTML kutusuna tekrar yapıştırmana gerek kalmaz.**

---

## Yol 1 — Önerilen: GitHub Pages + alan adı (Wix’siz tanıtım)

| | |
|--|--|
| **Artı** | Tam dinamik site, SEO, favicon, tek kaynak (`landing/`) |
| **Eksi** | Wix editöründe sayfa düzenlemezsin; domain DNS GitHub’a |

### Adımlar

1. **bilye** reposuna push et (`bilye-site` değil — o Wix’in kendi reposu).
2. Repo → **Settings → Pages → Source: GitHub Actions**
3. `main`’e push et → **Actions** yeşil olunca Pages URL’ini aç.
4. **bilye.app** için: Pages → **Custom domain** `www.bilye.app`  
   Domain panelinde CNAME: `www` → `KULLANICI.github.io` (Wix DNS’ini kapat veya devre dışı bırak).

Sonuç: `www.bilye.app` = localhost’taki `/landing/` ile aynı deneyim, otomatik güncellenir.

---

## Yol 2 — Wix domain kalsın, içerik GitHub’dan (tek gömme)

Wix’i sadece **alan adı / hosting kabuğu** olarak kullan.

### Wix editörde (bir kez)

1. Eski 3 bölümdeki HTML kutularını ve “Yakında” metinlerini **sil**.
2. Tek bölüm kalsın (veya tam sayfa boş şablon).
3. **Ekle → Gömülü Kod / HTML iframe**
4. **“Web adresi”** (Kod değil!) seç.
5. URL: GitHub Pages adresin, örn.  
   `https://3d3r26.github.io/bilye/`  
   (kendi repo URL’in neyse onu yaz)
6. Kutuyu **tam genişlik + çok yüksek** yap (ör. 3000px) veya “tam ekran” şablon.
7. Sayfa arka planı: `#06080f`
8. Yayınla

### Sonrası

- `landing/` değiştir → push → 1–2 dk sonra Wix’te görünen site de güncellenir.
- Wix’e tekrar dokunmana gerek yok.

### iframe sınırları

- Sekme başlığı / favicon bazen Wix ayarlarından gelir (Gömülü Kod değil).
- Çok nadir: kaydırma veya yükseklik ayarı gerekebilir.
- SEO için uzun vadede **Yol 1** daha iyi.

---

## Yol 3 — Wix GitHub (`bilye-site` + `wix dev`)

Wix’in gösterdiği:

```text
git clone .../bilye-site.git
wix dev
```

Bu **Wix’in kendi site kodunu** senkronlar (Velo, sayfa yapısı).  
**landing/index.html otomatik Wix’e dönmez** (GitHub Pages veya iframe ile bağlanır).  
O repoda ayrı bir site mimarisi vardır; localhost/landing’i birebir aktarmaz.

→ Canlı landing istiyorsan **Yol 1 veya 2** kullan.

---

## Hangi repo?

| Repo | Ne işe yarar |
|------|----------------|
| `3d3r26/bilye-site` | Wix CLI, Wix editör senkronu |
| `bilye` (GitHub repo) | Uygulama + **landing/** + GitHub Pages workflow |

Pages için **bilye** reposuna push et (`.\git-push.ps1`).

---

## Hızlı kontrol listesi

- [ ] bilye → GitHub’da public repo
- [ ] Settings → Pages → **GitHub Actions**
- [ ] Push sonrası Pages URL açılıyor mu?
- [ ] Wix: ya domain’i Pages’e yönlendir (Yol 1) ya da tek Web adresi gömme (Yol 2)
- [ ] Wix: tek **Web adresi** gömme veya domain → Pages

---

## Uygulama linki

`landing/index.html` içindeki “Uygulamayı dene” şu an `/` işaret ediyor.  
Canlıda uygulama ayrı host’ta olacak (Render, `app.bilye.app` vb.) — onu deploy edince landing’deki linki o URL’ye güncellersin (tek satır, push ile yayınlanır).

Detay: proje kökündeki `GITHUB-KURULUM.md`.
