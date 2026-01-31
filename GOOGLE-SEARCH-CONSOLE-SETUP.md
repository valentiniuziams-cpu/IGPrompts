# 🔍 Google Search Console Setup Guide

**Website:** https://igprompts.netlify.app
**Date:** 27 Ianuarie 2026

---

## Pas 1: Accesează Google Search Console

1. Du-te la **https://search.google.com/search-console/**
2. Loghează-te cu contul tău Google (preferabil cel asociat cu business-ul)

---

## Pas 2: Adaugă Proprietatea (Property)

1. Click pe **"Add property"** (sau "Adaugă proprietate")
2. Alege **"URL prefix"** (NU Domain)
3. Introdu: `https://igprompts.netlify.app`
4. Click **"Continue"**

---

## Pas 3: Verifică Ownership (3 Metode Disponibile)

### ✅ **Metodă 1: HTML File Upload (RECOMANDAT pentru Netlify)**

**Ce primești de la Google:**
- Un fișier precum: `google1234567890abcdef.html`

**Ce trebuie să faci:**

1. **Descarcă fișierul** de la Google Search Console
2. **Urcă fișierul** în root-ul site-ului tău (aceeași locație cu index.html)
3. **Pe Netlify:**
   - Du-te la Netlify Dashboard → Your Site
   - Deployer Tab → "Deploys" → "Drag and drop"
   - Trage tot folderul "Boring Website" din nou (cu fișierul Google inclus)
   - SAU: Upload doar fișierul Google în folder-ul existent

4. **Verifică** că fișierul e accesibil:
   - Deschide: `https://igprompts.netlify.app/google1234567890abcdef.html`
   - Ar trebui să vezi o pagină goală (e normal!)

5. **Revino la Google Search Console** și click pe **"Verify"**

---

### Metodă 2: HTML Tag (Alternativă)

**Ce primești de la Google:**
```html
<meta name="google-site-verification" content="abc123...xyz" />
```

**Ce trebuie să faci:**

1. Copiază tag-ul primit de la Google
2. Deschide fișierul `index.html` în editor
3. Adaugă tag-ul în secțiunea `<head>`, după linia 6:

```html
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="TAU_COD_AICI" />

    <meta name="description" content="...">
    ...
</head>
```

4. **Salvează** și **re-deploiază** site-ul pe Netlify
5. **Revino la Google Search Console** și click pe **"Verify"**

---

### Metodă 3: Google Analytics (Dacă ai GA configurat)

- Dacă ai Google Analytics deja configurat pe site, Google Search Console poate verifica automat
- Pur și simplu alege opțiunea "Google Analytics" și urmează pașii

---

## Pas 4: Trimite Sitemap-ul

După ce site-ul e verificat:

1. În Google Search Console, du-te la **"Sitemaps"** (din meniul lateral stâng)
2. Introdu URL-ul sitemap-ului: `sitemap.xml`
3. Click pe **"Submit"**

**Rezultat așteptat:**
- Status: "Success" (sau "Submitted")
- Discovered URLs: ~20 (toate paginile din sitemap)

---

## Pas 5: Configurări Opționale (Recomandate)

### A. **URL Parameters**
- În Search Console → **Settings** → **URL Parameters**
- Configurează `category` și `niche` ca parametri de filtrare (nu conținut duplicat)

### B. **International Targeting**
- În Search Console → **Settings** → **International Targeting**
- Setează ținta geografică: **Romania** (dacă target-ul tău e România)
- SAU: **United States** (dacă target-ul e global/US)

### C. **Email Notifications**
- Search Console → **Settings** → **Users and permissions**
- Asigură-te că primești notificări pentru:
  - Errori critice
  - Manual actions
  - Security issues

---

## Pas 6: Monitorizare și Întreținere

### Ce să verifici săptămânal:

1. **Performance Report**
   - Clicks, Impressions, CTR, Average Position
   - Top Queries (ce caută oamenii)
   - Top Pages (ce pagini primesc trafic)

2. **Coverage Report**
   - Errori de indexare
   - Valid pages vs. errors

3. **Core Web Vitals**
   - Performance metrics (LCP, FID, CLS)
   - Mobile usability

### Acțiuni recomandate după 1-2 săptămâni:

1. **Verifică indexarea:**
   - Du-te la "URL Inspection"
   - Testează fiecare pagină importantă
   - Click "Request Indexing" dacă nu e indexată

2. **Analizează Search Queries:**
   - Vezi ce keywords generează trafic
   - Optimizează conținutul pentru keyword-uri cu CTR mic dar impressions mari

3. **Fix Coverage Issues:**
   - Dacă apar erori (404, soft 404, etc.), rezolvă-le
   - Re-submit sitemap-ul după fix-uri

---

## 📋 Checklist Final

- [ ] Site verificat în Google Search Console
- [ ] Sitemap trimis și acceptat
- [ ] Robots.txt accesibil și valid
- [ ] Toate paginile principale indexate (verifică cu site:igprompts.netlify.app în Google)
- [ ] Email notifications configurate
- [ ] Performance report monitorizat

---

## 🔧 Troubleshooting

### Problema: "Verification failed"

**Soluție:**
- Verifică că fișierul HTML e în root (nu într-un subfolder)
- Clear cache: `Ctrl+Shift+R` în browser
- Așteaptă 5-10 minute după deploy și încearcă din nou

### Problema: "Sitemap couldn't be read"

**Soluție:**
- Verifică că `https://igprompts.netlify.app/sitemap.xml` se deschide în browser
- Verifică formatarea XML (nu există erori de sintaxă)
- Verifică că sitemap.xml e în root-ul site-ului

### Problema: "No data yet"

**Soluție:**
- Google Search Console poate dura 24-48 ore pentru a începe să colecteze date
- Așteaptă câteva zile pentru statistici complete

---

## 📊 Ce Date Vei Vedea (După 1-2 Săptămâni)

1. **Performance:**
   - Keywords care aduc trafic
   - Click-through rate (CTR)
   - Average position în search results

2. **Coverage:**
   - Câte pagini sunt indexate
   - Errori de crawling/indexare

3. **Enhancements:**
   - Mobile usability
   - Core Web Vitals (speed metrics)

4. **Links:**
   - External links (backlinks)
   - Internal linking structure

---

## 📝 Note Importante

- **Indexarea durează:** Prima indexare poate dura 1-7 zile după submit sitemap
- **Datele sunt cu delay:** Performance data are 1-2 zile delay
- **Verifică regulat:** Setează un reminder să verifici Search Console săptămânal

---

## 🎯 Next Steps După Setup

1. **Creează conținut nou** (blog posts) pentru a atrage mai mult trafic organic
2. **Optimizează meta descriptions** pentru CTR mai bun
3. **Build backlinks** pentru autoritate SEO
4. **Monitorizează competiția** pentru target keywords

---

**Succes cu SEO! 🚀**

Pentru întrebări sau probleme, verifică:
- Google Search Console Help: https://support.google.com/webmasters
- Netlify Docs: https://docs.netlify.com

---

**Document creat:** 27 Ianuarie 2026
**Ultima actualizare:** 27 Ianuarie 2026
