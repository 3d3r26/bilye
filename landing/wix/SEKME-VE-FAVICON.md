# Wix: Sekmeden HOME kaldır + logo (favicon)

Sekme: `HOME | Bilye — Gıda dedektifi`  
İstenen: `Bilye — Gıda dedektifi` + Bilye logosu (localhost gibi)

---

## 1) HOME yazısını kaldır (Wix editör — kalıcı)

`HOME` sayfa adından gelir. Wix formatı: **Sayfa adı | Site adı**

1. Wix editör → sol **Sayfalar**
2. Ana sayfaya tıkla (genelde **HOME** veya Home)
3. **Sayfa SEO'su** / **SEO (Google)** / dişli → **SEO**
4. **Sayfa başlığı (title tag):** şunu yaz:
   `Bilye — Gıda dedektifi`
5. Varsa **“Site adını başlığa ekle”** kutusunu **kapat**
6. Sayfa menü adını değiştir: HOME → **Ana Sayfa** (sekme bazen menü adını da kullanır)
7. **Kaydet** → **Yayınla**

**Site geneli:** Ayarlar → **SEO** → Site başlığı: `Bilye — Gıda dedektifi`

---

## 2) Logo / favicon (en kolay yol)

1. Wix → **Ayarlar** (sol alttaki dişli)
2. **Website** / **Site** → **Favicon** (veya **Marka** / **Branding**)
3. Bilgisayardan yükle:  
   `C:\Users\emret\Downloads\scanwise\public\icons\logo-mark.png`
4. Kaydet → Yayınla

Tarayıcı önbelleği: **Ctrl+F5** veya gizli pencerede aç.

---

## 3) Alternatif: Özel Kod → Header

`landing/wix-HEADER-kod.txt` dosyasını güncelledik.

1. Logo önce **Medya**'ya yükle → dosyaya sağ tık → **Bağlantıyı kopyala** (https:// ile başlamalı)
2. Ayarlar → **Özel Kod** → **Header**
3. `wix-HEADER-kod.txt` içindeki `LOGO_URL_BURAYA` yerine yapıştır
4. Kaydet → Yayınla

---

## Localhost ile aynı mı?

| | Localhost (`npm start`) | Wix (`bilye.app`) |
|--|-------------------------|-------------------|
| Sekme | `public/index.html` → `<title>` | Sayfa SEO + site adı |
| Logo | `icons/logo-mark.png` | Favicon yükleme veya Header link |

Kod repoda: `public/index.html` zaten doğru başlık ve favicon kullanıyor.
