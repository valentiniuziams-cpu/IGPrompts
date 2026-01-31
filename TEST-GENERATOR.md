# 🧪 Test Plan - Generator Verification

## ✅ Checklist de Testare

### 1. **RESET Counter (PRIMUL PAS)**
- [ ] Click pe butonul roșu **"🔄 Reset Counter (Testing)"**
- [ ] Pagina se reîncarcă
- [ ] Counter-ul arată: **1000/1000**

### 2. **Verificare Inițializare**
Deschide Console (F12):
- [ ] Vezi mesajul: `🚀 Generator initializing...`
- [ ] Vezi mesajul: `⚙️ Config: {DAILY_LIMIT: 1000, ...}`
- [ ] Vezi mesajul: `✅ Prompts database loaded successfully!`
- [ ] Vezi mesajul: `📊 Total prompts: 50`
- [ ] Vezi mesajul: `✅ Generator initialized successfully!`

**Dacă nu vezi aceste mesaje → EROARE! Spune-mi ce vezi în console.**

---

### 3. **Test Generare Simplă**

**Pasul A: Selectează Filtre**
- [ ] Category: **Caption Ideas**
- [ ] Niche: **Fitness**
- [ ] Tone: **Motivational & Inspirational**

**Pasul B: Click "Generate Prompts"**

În Console ar trebui să vezi:
```
🎯 Generate button clicked!
📋 Selected filters: {category: "caption-ideas", niche: "fitness", tone: "motivational"}
🔍 Filtered prompts: X found (before excluding displayed)
🔍 After excluding displayed: X remaining
✨ Selected Y prompts to display
📝 Total displayed so far: Y prompts
🎨 Displaying Y prompts
✅ Results container is now visible
✅ Prompts rendered successfully!
```

- [ ] Apar **1-3 prompturi** pe ecran (în funcție de câte există)
- [ ] Counter-ul scade: **999/1000** (sau 997/1000 dacă sunt 3 prompturi)
- [ ] Poți să apeși butonul **"Copy Prompt"** și funcționează

**Dacă nu apar prompturi → Spune-mi ce vezi în console!**

---

### 4. **Test "Generate More" - Prompturi Diferite**

- [ ] Click pe **"Generate More"** (același filtru)
- [ ] Apar **ALTE prompturi** (diferite de primele)
- [ ] Counter-ul scade din nou

**Test 3-4 ori:**
- [ ] Click "Generate More" → prompturi diferite
- [ ] Click "Generate More" → prompturi diferite
- [ ] Click "Generate More" → prompturi diferite

**Dacă se repetă aceleași prompturi → EROARE! Spune-mi.**

---

### 5. **Test Schimbare Filtre**

**Pasul A: Schimbă categoria**
- [ ] Selectează: **Reel Scripts**
- [ ] În Console: Vezi `🔄 Category changed - resetting displayed prompts`
- [ ] Click "Generate Prompts"
- [ ] Apar prompturi pentru Reel Scripts

**Pasul B: Schimbă niche-ul**
- [ ] Selectează: **Food**
- [ ] În Console: Vezi `🔄 Niche changed - resetting displayed prompts`
- [ ] Click "Generate Prompts"
- [ ] Apar prompturi pentru Food

**Pasul C: Schimbă tone-ul**
- [ ] Selectează: **Funny & Humorous**
- [ ] În Console: Vezi `🔄 Tone changed - resetting displayed prompts`
- [ ] Click "Generate Prompts"
- [ ] Apar prompturi funny

---

### 6. **Test Copy to Clipboard**

- [ ] Generează un prompt
- [ ] Click pe **"📋 Copy Prompt"**
- [ ] Butonul devine: **"✓ Copied!"** (verde)
- [ ] După 2 secunde revine la: **"📋 Copy Prompt"**
- [ ] Deschide Notepad și apasă Ctrl+V → promptul e copiat

---

### 7. **Test Counter Display**

După câteva generări:
- [ ] Counter-ul arată corect (ex: 995/1000, 992/1000, etc.)
- [ ] Numărul din stânga (remaining) scade
- [ ] Numărul din dreapta rămâne **1000**

---

### 8. **Test cu Filtre care nu au Prompturi**

- [ ] Selectează: Category: **Bio Generator** + Niche: **Tech** + Tone: **Funny**
- [ ] Click "Generate Prompts"
- [ ] Dacă nu există prompturi cu această combinație → apare mesaj:
  ```
  No Prompts Found
  Try adjusting your filters...
  ```

---

## 🐛 Erori Comune și Soluții

### Eroare: "No Prompts Found" chiar dacă ar trebui să existe

**Verifică în Console:**
- Ce valori sunt pentru `category`, `niche`, `tone`?
- Câte prompturi sunt după filtrare?

**Soluție:** Verifică că tone-ul din dropdown match-ează cu tone-ul din `prompts.json`

---

### Eroare: Counter-ul nu se actualizează

**Verifică:**
- Există elementele `#remainingPrompts` și `#totalPrompts` în HTML?
- Funcția `updateUsageDisplay()` e apelată?

---

### Eroare: Prompturile se repetă

**Verifică în Console:**
- Vezi mesajul `🔄 Category changed - resetting displayed prompts` când schimbi filtrele?
- Array-ul `displayedPromptIds` se populează corect?

---

## 📊 Raport Final

După testare, completează:

**Generator funcționează:** ✅ DA / ❌ NU

**Counter funcționează:** ✅ DA / ❌ NU

**Prompturi nu se repetă:** ✅ DA / ❌ NU

**Copy to clipboard funcționează:** ✅ DA / ❌ NU

**Erori întâlnite:**
- [ ] Nicio eroare
- [ ] Generator nu afișează prompturi
- [ ] Counter-ul e greșit
- [ ] Prompturile se repetă
- [ ] Altceva: _______________

---

## 🔧 Comenzi Utile pentru Debugging

**Reset complet:**
```javascript
localStorage.clear(); location.reload();
```

**Vezi ce e în localStorage:**
```javascript
console.log(localStorage.getItem('promptGeneratorUsage'));
```

**Vezi câte prompturi sunt în DB:**
```javascript
console.log(promptsDatabase.prompts.length);
```

**Vezi prompturile afișate:**
```javascript
console.log(displayedPromptIds);
```
