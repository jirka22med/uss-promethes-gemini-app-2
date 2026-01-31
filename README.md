 

 
## 

       ██╗   ██╗ ███████╗ ███████╗    ██████╗  ██████╗  ██████╗   ███╗   ███╗ ███████╗████████╗ ██╗  ██╗ ███████╗ ██╗   ██╗ ███████╗
       ██║   ██║ ██╔════╝ ██╔════╝    ██╔══██╗ ██╔══██╗ ██╔═══██╗ ████╗ ████║ ██╔════╝╚══██╔══╝ ██║  ██║ ██╔════╝ ██║   ██║ ██╔════╝
       ██║   ██║ ███████╗ ███████╗    ██████╔╝ ██████╔╝ ██║   ██║ ██╔████╔██║ █████╗     ██║    ███████║ █████╗   ██║   ██║ ███████╗
       ██║   ██║ ╚════██║ ╚════██║    ██╔═══╝  ██╔══██╗ ██║   ██║ ██║╚██╔╝██║ ██╔══╝     ██║    ██╔══██║ ██╔══╝   ██║   ██║ ╚════██║
       ╚██████╔╝ ███████║ ███████║    ██║      ██║  ██║ ╚██████╔╝ ██║ ╚═╝ ██║ ███████╗   ██║    ██║  ██║ ███████╗ ╚██████╔╝ ███████║
        ╚═════╝  ╚══════╝ ╚══════╝    ╚═╝      ╚═╝  ╚═╝  ╚═════╝  ╚═╝     ╚═╝ ╚══════╝   ╚═╝    ╚═╝  ╚═╝ ╚══════╝  ╚═════╝  ╚══════╝      
           

##                  
   

# 🚀 USS PROMETHEUS | Tactical Operations Center v4.0

<div align="center">

![USS PROMETHEUS Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**Pokročilý AI chatbot s vojenským rozhraním inspirovaným Star Trek**

[![Live Demo](https://img.shields.io/badge/Live-Demo-00d9ff?style=for-the-badge)](https://jirka22med.github.io/uss-promethes-gemini-app-2/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-6366f1?style=for-the-badge)](https://github.com/jirka22med/uss-promethes-gemini-app-2)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

</div>

---

## 📋 OBSAH

- [Co to je USS PROMETHEUS?](#-co-to-je-uss-prometheus)
- [Hlavní Funkce](#-hlavní-funkce)
- [Jak to Funguje](#-jak-to-funguje)
- [Příklady Použití](#-příklady-použití)
- [Instalace](#-instalace)
- [Konfigurace](#-konfigurace)
- [Technologie](#-technologie)

---

## 🎯 CO TO JE USS PROMETHEUS?

**USS PROMETHEUS** je webová AI aplikace, která spojuje sílu Google Gemini AI s futuristickým uživatelským rozhraním inspirovaným sci-fi seriálem Star Trek. 

Není to jen "další chatbot" - je to **kompletní pracovní prostředí** pro:
- 💻 **Vývoj kódu** s AI asistencí
- 🎨 **Tvorbu webových stránek** s live preview
- 🔍 **Web research** s integrovaným vyhledáváním
- 🎤 **Hlasové interakce** přes text-to-speech
- 📝 **Generování dokumentů** (HTML, Markdown, texty)
- 🎵 **Tvorbu hudebních textů** ve formátu Suno.ai

### Proč USS PROMETHEUS?

✅ **Offline-first** - Funguje lokálně bez závislosti na cloudu  
✅ **Open-source** - Plně customizovatelný  
✅ **Privacy-focused** - Data zůstávají u tebe  
✅ **Multi-model** - Přepínání mezi Gemini 3 Flash a 2.5 Flash  
✅ **Developer-friendly** - Integrované DevTools pro debugging  

---

## ⚡ HLAVNÍ FUNKCE

### 1. 💬 Inteligentní Chat s AI

**Co umí:**
- Konverzace s Gemini 3 Flash nebo Gemini 2.5 Flash
- Paměť celé konverzace (multi-turn dialog)
- Přikládání obrázků, PDF a textových souborů
- Markdown rendering (včetně **tučného textu**, `kódu`, odkazů)
- Kopírování odpovědí jedním kliknutím

**Příklad použití:**
```
Ty: "Vytvoř mi landing page pro kavárnu s gradient pozadím"
AI: [Vygeneruje kompletní HTML/CSS kód]
     → Automaticky se otevře Canvas s náhledem
```

---

### 2. 🖥️ Canvas Editor - Taktická Obrazovka

**Co to je:**
Boční panel, který zobrazuje vygenerovaný kód s možností:
- **Přepínání zobrazení:** Kód ↔ Live Preview
- **Ruční editace:** Upravuj kód přímo v editoru
- **AI Assistant:** Pošli instrukce typu "Přidej animaci" a AI upraví kód
- **Auto-detection:** Rozpozná HTML, Suno texty nebo plain text

**Podporované formáty:**
- HTML/CSS/JS (s live preview v iframe)
- Suno.ai texty ([Verse], [Chorus] struktury)
- Markdown dokumenty
- Python/JavaScript/jiné kódy

**Workflow:**
1. Požádej AI o kód
2. Canvas se automaticky otevře
3. Přepni na "NÁHLED" pro vizuální kontrolu
4. Klikni "UPRAVIT" pro ruční změny
5. Nebo použij "AI ASISTENT" pro změny přes instrukce

---

### 3. 🎤 Text-to-Speech (TTS)

**Co umí:**
Přehraje AI odpověď hlasem vojenského důstojníka.

**Funkce:**
- Hlasitý přehrávač odpovědí
- Hlas: **Charon** (mužský, autoritativní)
- Podpora pouze pro **Gemini 2.5 Flash** (technické omezení)

**Jak aktivovat:**
1. Přepni model na "Gemini 2.5 Flash"
2. Klikni na tlačítko "Audio" v headeru
3. Status dot zzelená = TTS aktivní
4. Každá odpověď AI se automaticky přehraje

**Dostupné hlasy:**
- Puck (mužský, neutrální)
- **Charon (mužský, hlubší)** ← aktuálně použitý
- Kore (ženský, profesionální)
- Fenrir (mužský, autoritativní)
- Aoede (ženský, teplý)

---

### 4. 🔍 Web Search - SerpAPI Integrace

**Co umí:**
Vyhledávání na Googlu přímo z chatu.

**Jak to funguje:**
1. Nastav SerpAPI klíč v kalibraci
2. AI automaticky vyhledá, když potřebuje aktuální info
3. Výsledky se zobrazí jako odkazy + snippety

**Příklad:**
```
Ty: "Jaké jsou novinky v AI za poslední týden?"
AI: [Automaticky prohledá web]
    → Vrátí top 10 článků s odkazy
```

**Freemium:**
- 100 vyhledávání/měsíc zdarma na SerpAPI.com

---

### 5. 🤖 AI Assistant Modal

**Co to je:**
Dialogové okno pro **úpravu kódu bez psaní**.

**Workflow:**
1. Otevři Canvas s nějakým kódem
2. Klikni "AI ASISTENT"
3. Napiš instrukci (např. "Změň barvu pozadí na tmavou")
4. AI upraví celý kód a pošle ho zpět do Canvasu

**Příklad instrukcí:**
- "Přidej animaci při načtení stránky"
- "Změň font na Roboto"
- "Přidej responzivní breakpointy"
- "Oprav chybu v JavaScriptu"

---

### 6. 🎨 Moderní UI/UX

**Design:**
- Tmavý futuristický theme (Star Trek inspirace)
- Gradientní efekty (indigo → purple → cyan)
- Animace pulsů a glowů
- Responzivní layout
- Mono-space fonty pro tech vibe

**Interaktivní prvky:**
- Status dot indikátory (API stav, audio, signál)
- Ship stats panel (CORE, SHIELDS, SIGNAL)
- Smooth transitions a hover efekty
- Toast notifikace pro akce

---

### 7. 🛠️ DevTools Toolkit

**Co to je:**
Sada příkazů v konzoli prohlížeče pro debugging a diagnostiku.

**Hlavní příkazy:**

```javascript
prometheusTest()        // Kompletní system check
testSerpAPI("dotaz")    // Test vyhledávání
testGemini("zpráva")    // Test Gemini API
enableFetchMonitor()    // Sleduj network requesty
exportConfig()          // Backup konfigurace
prometheusReset()       // Vymaž všechna data
```

**Kdy použít:**
- Kontrola, zda funguje API
- Debugging network problémů
- Export konfigurace před reinstalací
- Monitoring API callů

---

## 🎯 JAK TO FUNGUJE

### Základní Architektura

```
[User Interface] ──→ [script.js] ──→ [gemini-api.js] ──→ [Google Gemini API]
       ↓                                                           ↓
[Canvas Editor] ←─────────────────────────────────────────────────┘
       ↓
[Live Preview / Code Editor]
```

### Flow Konverzace

1. **Uživatel napíše zprávu** → script.js zachytí submit
2. **Zpráva + historie se pošle** → gemini-api.js volá Gemini
3. **AI odpoví** → Odpověď se renderuje v chatu
4. **Detekce kódu** → Pokud obsahuje ```, otevře se Canvas
5. **Canvas zobrazí kód** → S možností editace nebo preview

### Canvas Auto-Detection

```javascript
if (obsahuje <html> nebo <!DOCTYPE>) {
    → Zobraz jako HTML v iframe
} else if (obsahuje [Verse] nebo [Chorus]) {
    → Formátuj jako Suno.ai text
} else {
    → Zobraz jako plain text s monospace fontem
}
```

---

## 💡 PŘÍKLADY POUŽITÍ

### Use Case 1: Tvorba Webové Stránky

**Zadání:**
```
"Vytvoř mi portfolio stránku s:
- Header s navigací
- Hero sekce s gradientem
- Grid 3 projektů
- Footer s odkazy"
```

**Výsledek:**
- AI vygeneruje kompletní HTML/CSS
- Canvas se otevře automaticky
- Přepneš na NÁHLED → vidíš live web
- Klikneš UPRAVIT → můžeš doladit detaily

---

### Use Case 2: Generování Hudebních Textů

**Zadání:**
```
"Napiš text písně o vesmírné cestě ve stylu synthwave"
```

**Výsledek:**
```
[Intro]
Stars align, engines ignite
We're leaving Earth behind tonight

[Verse 1]
Neon trails through cosmic dust
In this ship we place our trust
...
```
- Canvas zobrazí formátovaný text
- Struktury [Verse], [Chorus] zvýrazněné
- Připraveno pro upload do Suno.ai

---

### Use Case 3: Debugging Kódu

**Zadání:**
```
"Mám tento JavaScript kód [upload soubor]
Oprav prosím chybu s undefined variable"
```

**Workflow:**
1. Přiložíš .js soubor přes 📎 ikonu
2. AI analyzuje kód
3. Vrátí opravu v Canvas
4. Můžeš přímo kopírovat fixed kód

---

### Use Case 4: Research s Web Searchem

**Zadání:**
```
"Jaké jsou nejnovější Gemini modely a jejich ceny?"
```

**Výsledek:**
- AI automaticky vyhledá na Googlu
- Vrátí aktuální info z AI Studio dokumentace
- S odkazy na zdroje

---

## 💻 INSTALACE

### Metoda 1: GitHub Pages (Doporučeno)

1. **Fork repository:**
   ```bash
   https://github.com/jirka22med/uss-promethes-gemini-app-2
   ```

2. **Aktivuj GitHub Pages:**
   - Settings → Pages → Source: `main` branch
   - Save

3. **Přístup:**
   ```
   https://[tvuj-username].github.io/uss-promethes-gemini-app-2/
   ```

### Metoda 2: Lokální Server (Python)

1. **Stáhni repository:**
   ```bash
   git clone https://github.com/jirka22med/uss-promethes-gemini-app-2.git
   cd uss-promethes-gemini-app-2
   ```

2. **Spusť Python server:**
   ```bash
   python server.py
   ```

3. **Otevři prohlížeč:**
   ```
   http://localhost:9785
   ```

### Metoda 3: NPM (Vite Dev Server)

1. **Instalace závislostí:**
   ```bash
   npm install
   ```

2. **Nastav API klíč:**
   - Vytvoř `.env.local` soubor
   - Přidej: `GEMINI_API_KEY=tvůj_klíč_zde`

3. **Spusť dev server:**
   ```bash
   npm run dev
   ```

---

## 🔐 KONFIGURACE API

### 1. Gemini API Key

**Získání klíče:**
1. Jdi na [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Vytvoř nový API klíč
3. Zkopíruj klíč

**Nastavení v aplikaci:**
1. Klikni na tlačítko **"Rekalibrovat"** v headeru
2. Vlož klíč do pole "GEMINI API KLÍČ"
3. Klikni "💾 Uložit Konfiguraci"

### 2. SerpAPI Key (Volitelné)

**Získání klíče:**
1. Registruj se na [SerpAPI](https://serpapi.com/)
2. Free tier: 100 vyhledávání/měsíc
3. Zkopíruj API klíč z [Manage API Key](https://serpapi.com/manage-api-key)

**Nastavení v aplikaci:**
1. Klikni "Rekalibrovat"
2. Vlož klíč do pole "SERPAPI KLÍČ"
3. Klikni "💾 Uložit Konfiguraci"

### 3. Ověření konfigurace

Otevři DevTools konzoli (F12) a zadej:
```javascript
prometheusTest();
```

Měl by se zobrazit status:
```
✅ Gemini API: AIzaSy...
✅ SerpAPI: vase_klíč...
✅ Online (Odezva: 45ms)
```

---

## 📂 STRUKTURA PROJEKTU

```
uss-promethes-gemini-app-2/
│
├── index.html                    # Hlavní HTML soubor
├── style.css                     # Globální styly (dark theme)
├── script.js                     # Hlavní chat logika
├── canvas-editor.js              # Canvas panel management
├── gemini-api.js                 # Gemini API wrapper
├── serpapi-search.js             # SerpAPI integration
├── system-prompt.js              # AI system instruction
├── devtools-prometheus.js        # Diagnostic toolkit
├── server.py                     # Python local server
├── package.json                  # NPM dependencies
├── tsconfig.json                 # TypeScript config
├── types.js                      # Type definitions
├── metadata.json                 # App metadata
├── LICENSE                       # MIT License
└── README.md                     # Tato dokumentace
```

### Klíčové soubory

| Soubor | Účel |
|--------|------|
| `script.js` | Chat UI, message handling, file upload |
| `canvas-editor.js` | Canvas panel, code preview, AI assistant |
| `gemini-api.js` | API calls, TTS generation |
| `serpapi-search.js` | Web search integration |
| `system-prompt.js` | AI personality & behavior rules |
| `devtools-prometheus.js` | Developer diagnostic tools |

---

## 🧰 DEVTOOLS TOOLKIT

### Základní příkazy (v konzoli prohlížeče)

```javascript
// 📊 Kompletní diagnostika
prometheusTest();

// 🔍 Test vyhledávání
testSerpAPI("Star Trek");

// 🤖 Test Gemini
testGemini("Ahoj!");

// 🛡️ Monitoring network requestů
enableFetchMonitor();
disableFetchMonitor();

// 💾 Export/Import konfigurace
exportConfig();
importConfig(jsonConfig);

// 🗑️ Reset všech dat
prometheusReset();

// 📊 Info o localStorage
storageInfo();

// 🎨 Změna barevného schématu
setTheme("#ff00ff");

// ❓ Seznam všech příkazů
prometheusHelp();
```

### Příklad použití

```javascript
// 1. Zjisti status systému
prometheusTest();

// 2. Pokud je SerpAPI chybný, otestuj ho
testSerpAPI("test query");

// 3. Pokud je problém s network, aktivuj monitoring
enableFetchMonitor();

// 4. Proveď akci a sleduj requesty v konzoli

// 5. Vypni monitoring
disableFetchMonitor();
```

---

## ❓ ČASTÉ DOTAZY

### Q: Potřebuju platit za API?

**A:** Gemini má **free tier** (60 requestů/min). SerpAPI má 100 vyhledávání/měsíc zdarma.

### Q: Funguje to offline?

**A:** Lokálně ANO (Python server), ale potřebuješ internet pro API cally.

### Q: Můžu změnit TTS hlas?

**A:** Ano, v `gemini-api.js` změň `voiceName: 'Charon'` na jiný (Puck, Kore, Fenrir, Aoede).

### Q: Proč Canvas nefunguje?

**A:** AI musí vrátit kód v triple backticks (```). Zkus: "Vytvoř HTML stránku".

### Q: Jak zjistím, že API funguje?

**A:** Otevři konzoli (F12) a zadej `prometheusTest()`.

---

## 🔧 TECHNOLOGIE

| Kategorie | Technologie |
|-----------|-------------|
| **Frontend** | Vanilla JavaScript (ES6 Modules), CSS3, HTML5 |
| **AI & API** | Google Gemini API (3 Flash, 2.5 Flash), SerpAPI |
| **Deployment** | GitHub Pages, Python HTTP Server, Vite |
| **DevTools** | Custom Console Toolkit, Fetch Monitor |

---

## 📜 LICENCE

MIT License - viz [LICENSE](LICENSE)

---

## 👨‍💻 AUTOŘI

**Chief Engineer:** Vice Admirál Jiřík  
**AI Officer:** Admirál Claude.AI  
**Starship:** USS PROMETHEUS NX-59650

---

<div align="center">

**🖖 Live long and prosper 🖖**

*USS PROMETHEUS - Where AI meets the final frontier*

[![Star this repo](https://img.shields.io/github/stars/jirka22med/uss-promethes-gemini-app-2?style=social)](https://github.com/jirka22med/uss-promethes-gemini-app-2)

</div>

**🖖 Live long and prosper 🖖**

*USS PROMETHEUS - Where AI meets the final frontier*

</div>



# 🔐 PASSWORD MASKING & VISIBILITY TOGGLE

**CHIEF ENGINEER:** Vice Admirál Jiřík & Admirál Claude.AI  
**FEATURE:** Masked API key preview + Toggle visibility  
**STATUS:** READY TO DEPLOY

---

## 🎯 PROBLÉM A ŘEŠENÍ

### ❌ PŘED (problém):
```
1. Uložíš API klíče
2. Modal se zavře
3. Otevřeš modal znovu
4. Inputy jsou PRÁZDNÉ ❌
5. Vypadá to, jako by klíče nebyly nastavené
```

### ✅ PO (řešení):
```
1. Uložíš API klíče
2. Modal se zavře
3. Otevřeš modal znovu
4. Inputy mají PLACEHOLDER: "●●●●●●●●●●●●●●●●●●●●XY12" ✅
5. Jasně vidíš, že klíč JE nastaven (poslední 4 znaky)
6. Tlačítko [👁️ Zobrazit] pro reveal celého klíče
```

---

## 🔥 CO SE ZMĚNILO

### 1. MASKED PLACEHOLDER
**Po uložení klíče:**
```javascript
placeholder = "●●●●●●●●●●●●●●●●●●●●" + key.slice(-4)
// Např: "●●●●●●●●●●●●●●●●●●●●aB3f"
```

**Výhody:**
- ✅ Vidíš, že klíč JE nastaven
- ✅ Poslední 4 znaky pro identifikaci
- ✅ Bezpečné (nevidíš celý klíč)

---

### 2. TOGGLE VISIBILITY BUTTON
**Nové tlačítko vedle každého inputu:**
```
┌─────────────────────────────────────┐
│ 🤖 GEMINI API KLÍČ:  [👁️ Zobrazit]  │
│ [●●●●●●●●●●●●●●●●●●●●aB3f]          │
└─────────────────────────────────────┘
```

**Funkce:**
- **[👁️ Zobrazit]** → Změní input z `password` na `text`
- **[🔒 Skrýt]** → Změní zpět na `password`

---

### 3. SMART SAVE LOGIC
**Pokud necháš input prázdný:**
```javascript
// Uživatel otevře modal, nezmění nic, klikne Uložit
// → Klíč zůstane zachován (beze změn)
```

**Pokud zadáš nový klíč:**
```javascript
// Uživatel otevře modal, zadá nový klíč, klikne Uložit
// → Nový klíč se uloží
// → Placeholder se aktualizuje
```

---

## 📦 CO BYLO ZMĚNĚNO

### 1. `relinkApiBtn.onclick` handler:
**PŘED:**
```javascript
relinkApiBtn.onclick = () => {
    calibrationModal.classList.remove('hidden');
    updateConfigStatus();
    // Žádné načítání klíčů do inputů
};
```

**PO:**
```javascript
relinkApiBtn.onclick = () => {
    calibrationModal.classList.remove('hidden');
    updateConfigStatus();
    
    // ✅ Načti klíče jako masked placeholders
    const geminiKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY');
    const serpKey = localStorage.getItem('PROMETHEUS_SERPAPI_KEY');
    
    if (geminiKey) {
        geminiInput.placeholder = '●●●●●●●●●●●●●●●●●●●●' + geminiKey.slice(-4);
        geminiInput.value = '';
    }
    
    if (serpKey) {
        serpInput.placeholder = '●●●●●●●●●●●●●●●●●●●●' + serpKey.slice(-4);
        serpInput.value = '';
    }
};
```

---

### 2. `saveManualKeyBtn.onclick` handler:
**PŘED:**
```javascript
if (saved) {
    manualKeyInput.value = '';  // Prostě vymaž
    updateConfigStatus();
    calibrationModal.classList.add('hidden');
}
```

**PO:**
```javascript
if (saved || existingKeys) {
    // ✅ Nastav masked placeholders
    const finalGeminiKey = geminiKey || existingGeminiKey;
    const finalSerpKey = serpApiKey || existingSerpKey;
    
    if (finalGeminiKey) {
        manualKeyInput.placeholder = '●●●●●●●●●●●●●●●●●●●●' + finalGeminiKey.slice(-4);
        manualKeyInput.value = '';
    }
    
    if (finalSerpKey) {
        serpInput.placeholder = '●●●●●●●●●●●●●●●●●●●●' + finalSerpKey.slice(-4);
        serpInput.value = '';
    }
    
    updateConfigStatus();
    calibrationModal.classList.add('hidden');
}
```

---

### 3. Toggle Visibility Buttons:
**Nové handlery:**
```javascript
toggleGeminiBtn.onclick = () => {
    const input = manualKeyInput;
    if (input.type === 'password') {
        input.type = 'text';  // Zobraz
        btn.innerHTML = '🔒 Skrýt';
    } else {
        input.type = 'password';  // Skryj
        btn.innerHTML = '👁️ Zobrazit';
    }
};
```

---

## 🎨 UI KOMPONENTY

### Modal Layout:
```
┌─────────────────────────────────────────┐
│ 🔧 Kalibrace Jádra API            [✕]  │
├─────────────────────────────────────────┤
│ > MANUÁLNÍ AUTORIZACE PROTOKOLU...      │
│                                          │
│ 🤖 GEMINI API KLÍČ:    [👁️ Zobrazit]   │
│ [●●●●●●●●●●●●●●●●●●●●aB3f]             │
│                                          │
│ 🔍 SERPAPI KLÍČ:       [👁️ Zobrazit]   │
│ [●●●●●●●●●●●●●●●●●●●●XY12]             │
│ 💡 Najdeš na https://serpapi.com/...    │
│                                          │
│        [💾 Uložit Konfiguraci]          │
│                                          │
│ ─────────────────────────────────────── │
│ 📊 AKTUÁLNÍ STAV SYSTÉMU:               │
│   Gemini API:  ✅ Aktivní (...aB3f)     │
│   SerpAPI:     ✅ Aktivní (...XY12)     │
└─────────────────────────────────────────┘
```

---

## 🔧 POUŽITÍ

### Scénář 1: První nastavení klíčů
```
1. Otevři modal
2. Inputy mají placeholder: "AIzaSy..." (prázdné)
3. Zadej klíče
4. Klikni "Uložit Konfiguraci"
5. Modal se zavře
6. Status indikátor: ✅ Aktivní
```

### Scénář 2: Kontrola nastavených klíčů
```
1. Otevři modal
2. Inputy mají placeholder: "●●●●●●●●●●●●●●●●●●●●aB3f"
3. Vidíš poslední 4 znaky svého klíče
4. Klikni [👁️ Zobrazit] pro reveal celého klíče
5. Klikni [🔒 Skrýt] pro skrytí
```

### Scénář 3: Změna klíče
```
1. Otevři modal
2. Inputy mají masked placeholder
3. Zadej NOVÝ klíč (přepíše placeholder)
4. Klikni "Uložit"
5. Nový klíč se uloží
6. Placeholder se aktualizuje na nový masked klíč
```

### Scénář 4: Ponechání klíče beze změny
```
1. Otevři modal
2. Inputy mají masked placeholder
3. Nech inputy PRÁZDNÉ (neměň nic)
4. Klikni "Uložit"
5. Existující klíč zůstane zachován
```

---

## 📊 TECHNICKÉ DETAILY

### Masked Pattern:
```javascript
const maskedKey = '●' + key.slice(-4);
// Input: "AIzaSyC1234567890abcdefXY12"
// Output: "●●●●●●●●●●●●●●●●●●●●XY12"
```

### Placeholder vs Value:
```javascript
// Po načtení:
input.placeholder = "●●●●●●●●●●●●●●●●●●●●aB3f";
input.value = ""; // Prázdný

// Při psaní:
input.value = "AIzaSy..."; // User píše nový klíč
input.placeholder = "..."; // Placeholder zmizí
```

### Save Logic:
```javascript
if (geminiKey && geminiKey.length > 10) {
    // Nový klíč zadán → ulož
    localStorage.setItem('PROMETHEUS_MANUAL_KEY', geminiKey);
} else if (existingGeminiKey) {
    // Nic nezadáno → zachovej existující
    // (nedělej nic)
}
```

---

## 🎯 BEZPEČNOST

### Proč mask?
1. **Ochrana před shoulder surfing** (někdo se dívá přes rameno)
2. **Screenshot safety** (kdyby někdo udělal screenshot)
3. **Přesto identifikovatelné** (poslední 4 znaky pro rozlišení)

### Proč poslední 4 znaky?
```javascript
key.slice(-4) // Poslední 4 znaky

// Příklady:
"AIzaSyC1234567890abcdefXY12" → "XY12"
"abc123def456ghi789" → "i789"
```

**Důvody:**
- ✅ Dostatečně krátké (neprozradí moc)
- ✅ Dostatečně dlouhé (rozlišíš různé klíče)
- ✅ Standard v bankovnictví (karty končí na xxxx xxxx xxxx 1234)

---

## 📋 INSTALACE

### KROK 1: Aktualizuj script.js
```bash
# Použij nový script-multifile.js
# (obsahuje masked placeholder logic)
```

### KROK 2: Aktualizuj index.html
```html
<!-- Nahraď calibration modal s novým z: -->
calibration-modal-enhanced.html
```

### KROK 3: Refresh (F5)

---

## 🐛 ŘEŠENÍ PROBLÉMŮ

### Problém 1: Placeholder se nezobrazuje

**Příčina:** Klíč není v localStorage

**Řešení:**
```javascript
// Zkontroluj v konzoli:
console.log(localStorage.getItem('PROMETHEUS_MANUAL_KEY'));
// Mělo by vrátit klíč, ne null
```

---

### Problém 2: Toggle tlačítko nefunguje

**Příčina:** Handler není připojen

**Řešení:**
```javascript
// Zkontroluj v konzoli:
const btn = document.getElementById('toggle-gemini-visibility');
console.log(btn); // Mělo by být definováno
```

---

### Problém 3: Po uložení se klíč smaže

**Příčina:** Stará verze save handleru

**Řešení:** Použij nový script-multifile.js

---

## 📊 SROVNÁNÍ

| Feature | PŘED | PO |
|---------|------|-----|
| Viditelnost klíče | ❌ Nic | ✅ Masked |
| Identifikace | ❌ Nejasné | ✅ Poslední 4 |
| Toggle visibility | ❌ Ne | ✅ Ano |
| Smart save | ❌ Ne | ✅ Ano |
| Status indication | ✅ Ano | ✅ Lepší |

---

## 🚀 BUDOUCÍ VYLEPŠENÍ

- [ ] **Copy to clipboard** button
- [ ] **QR code** pro sdílení klíčů
- [ ] **Import/Export** konfigurace
- [ ] **Multiple API keys** (pro různé projekty)
- [ ] **Key expiration** warning
- [ ] **Auto-validate** API keys při uložení

---

**STATUS: READY TO DEPLOY**  
**VERZE: v5.9 + PASSWORD MASKING**

🖖 Masked preview aktivován. API klíče jsou teď viditelné i bezpečné!



# 📁 MULTI-FILE UPLOAD v1.0

**CHIEF ENGINEER:** Vice Admirál Jiřík & Admirál Claude.AI  
**FEATURE:** Multiple file attachments (až 10 souborů najednou)  
**STATUS:** READY TO DEPLOY

---

## 🎯 CO SE ZMĚNILO

### ❌ PŘED (single file):
```
1 soubor → Gemini API
```

### ✅ PO (multi-file):
```
10 souborů → Preview grid → Gemini API (1. soubor)
```

**Poznámka:** Gemini API aktuálně podporuje pouze **1 attachment** per request, ale můžeš vybrat více souborů a systém je zobrazí. Pro AI se pošle první soubor.

---

## 📦 NOVÉ SOUBORY (3 kusy):

**1. index.html** → Aktualizovaný HTML s multi-file inputem

**2. multi-file-styles.css** → Nové CSS styly pro file preview grid

**3. script-multifile.js** → Script.js v5.9 s multi-file podporou

---

## 🚀 HLAVNÍ FEATURES

### ✅ 1. MULTIPLE FILE SELECT
```html
<input type="file" multiple accept="image/*,.pdf,.txt,...">
```
- Vyber až **10 souborů najednou**
- Drag & drop support (budoucí)
- Max velikost: **10MB per file**

---

### ✅ 2. FILE PREVIEW GRID

**Vzhled:**
```
┌─────────────────────────────────────┐
│ 3 SOUBORY           [VYMAZAT VŠE]   │
├─────────────────────────────────────┤
│ ┌───┐  ┌───┐  ┌───┐                │
│ │IMG│  │PDF│  │TXT│                │
│ │[×]│  │[×]│  │[×]│                │
│ └───┘  └───┘  └───┘                │
└─────────────────────────────────────┘
```

**Co vidíš:**
- **Obrázky:** Thumbnail (80x80px)
- **Ostatní soubory:** Ikona podle typu (📄 PDF, 📝 TXT, ⚙️ JS)
- **Název souboru:** Pod každým souborem
- **Tlačítko [×]:** Odstranění jednotlivého souboru

---

### ✅ 3. FILE MANAGEMENT

**Přidání souborů:**
```javascript
// Klikni na 📎 tlačítko → Vyber soubory → Enter
// Nebo:
fileInput.click(); // Programově
```

**Odstranění souborů:**
```javascript
// Klikni na [×] u konkrétního souboru
removeFile(index);

// Nebo vymaž všechny:
clearAllFiles();
```

**Zobrazení přiložených:**
```javascript
// V konzoli (F12):
showFiles()
// Výstup:
// 📁 PŘILOŽENÉ SOUBORY (3)
//   1. image.png (image/png) - 245.32 KB
//   2. document.pdf (application/pdf) - 1024.50 KB
//   3. code.js (application/javascript) - 5.21 KB
```

---

## 🎨 UI KOMPONENTY

### File Preview Container:
```css
.file-preview-multi {
    max-height: 200px;  /* Scrollable */
    overflow-y: auto;
    background: var(--bg-surface);
    border: 1px solid var(--border-bright);
}
```

### File Grid:
```css
.file-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.8rem;
}
```

### Individual File Item:
```css
.file-preview-item {
    background: var(--bg-main);
    border: 1px solid var(--border-main);
    padding: 0.6rem;
}

.file-preview-item:hover {
    border-color: var(--indigo-primary);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}
```

---

## 🔧 TECHNICKÉ DETAILY

### Limits:
```javascript
const MAX_FILES = 10;           // Max počet souborů
const MAX_FILE_SIZE = 10485760; // 10MB per file
```

### Supported Formats:
```javascript
accept="image/*,.pdf,.txt,.js,.py,.html,.json,.css,.md"
```

### Data Structure:
```javascript
currentAttachments = [
    {
        name: "image.png",
        mimeType: "image/png",
        base64: "iVBORw0KGgo..."
    },
    {
        name: "document.pdf",
        mimeType: "application/pdf",
        base64: "JVBERi0xLjQ..."
    }
]
```

---

## 📊 WORKFLOW

### 1. Výběr souborů:
```
User klikne na 📎
  ↓
File dialog se otevře
  ↓
User vybere 3 soubory
  ↓
onchange event
```

### 2. Načtení souborů:
```javascript
for (const file of files) {
    // Kontrola velikosti
    if (file.size > MAX_FILE_SIZE) continue;
    
    // FileReader → Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    // Uložení do array
    currentAttachments.push({
        name: file.name,
        mimeType: file.type,
        base64: result.split(',')[1]
    });
}
```

### 3. Preview update:
```javascript
updateFilePreview();
// → Vytvoří grid s thumbnaily
// → Zobraz počet souborů
// → Přidá remove buttony
```

### 4. Odeslání:
```javascript
// Pošli pouze PRVNÍ soubor do Gemini API
const firstAttachment = currentAttachments[0];
await callGeminiAPI(model, prompt, history, firstAttachment);

// Zobraz všechny soubory v chatu
appendMessage('user', text, currentAttachments);

// Vymaž po odeslání
clearAllFiles();
```

---

## 🐛 GEMINI API LIMITATION

**Problém:**
Gemini API akceptuje pouze **1 attachment** per request.

**Řešení:**
- Systém posílá **první vybraný soubor**
- Ostatní soubory jsou vidět v UI, ale nejsou poslány
- V budoucnu: batch requests nebo multi-part upload

**Kód:**
```javascript
// Posílej pouze první soubor
const firstAttachment = currentAttachments.length > 0 
    ? currentAttachments[0] 
    : null;

if (currentAttachments.length > 1) {
    tacticalLog('INFO', `Posílám ${currentAttachments.length} souborů, ale Gemini akceptuje pouze první.`);
}

await callGeminiAPI(model, prompt, history, firstAttachment);
```

---

## 📋 INSTALACE

### KROK 1: Nahraď HTML
```bash
index.html → nová verze (s multiple attribute)
```

### KROK 2: Přidej CSS
```bash
# V <head> sekci index.html:
<link rel="stylesheet" href="multi-file-styles.css">
```

### KROK 3: Nahraď Script
```bash
script.js → script-multifile.js (přejmenuj na script.js)
```

### KROK 4: Aktualizuj style.css
```bash
# Přidej obsah z multi-file-styles.css na konec style.css
# NEBO importuj jako samostatný soubor
```

### KROK 5: Refresh (F5)

---

## 🎯 POUŽITÍ

### A) Základní workflow:

1. **Klikni na 📎 tlačítko** (attach button)
2. **Vyber více souborů** (Ctrl/Cmd + klik)
3. **Vidíš preview grid** s thumbnaily
4. **Odstraň nechtěné** (klikni na [×])
5. **Napiš zprávu** + Enter
6. **Gemini dostane první soubor** + zprávu

### B) Devtools příkazy:

```javascript
// Zobraz přiložené soubory
showFiles()

// Výstup:
// 📁 PŘILOŽENÉ SOUBORY (3)
//   1. screenshot.png (image/png) - 245 KB
//   2. report.pdf (application/pdf) - 1024 KB
//   3. script.js (text/javascript) - 5 KB
```

---

## 🔥 POKROČILÉ FEATURES

### 1. File Type Icons

```javascript
function getFileIcon(mimeType) {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('text')) return '📝';
    if (mimeType.includes('json')) return '📋';
    if (mimeType.includes('javascript') || mimeType.includes('python')) return '⚙️';
    if (mimeType.includes('html')) return '🌐';
    return '📎';
}
```

### 2. Size Validation

```javascript
if (file.size > MAX_FILE_SIZE) {
    tacticalLog('ERROR', `⚠️ Soubor ${file.name} je příliš velký (max 10MB)`);
    continue; // Skip file
}
```

### 3. Count Display

```javascript
countDisplay.textContent = `${currentAttachments.length} SOUBORŮ`;
```

### 4. Auto-clear After Send

```javascript
// Po odeslání zprávy:
clearAllFiles();
```

---

## 🎨 CUSTOMIZACE

### Změň max počet souborů:
```javascript
const MAX_FILES = 20; // Místo 10
```

### Změň max velikost:
```javascript
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
```

### Změň grid layout:
```css
.file-preview-grid {
    grid-template-columns: repeat(5, 1fr); /* 5 sloupců */
}
```

### Změň thumbnail size:
```css
.file-preview-item img {
    width: 120px;  /* Větší */
    height: 120px;
}
```

---

## 📊 SROVNÁNÍ VERZÍ

| Feature | v5.8 (single) | v5.9 (multi) |
|---------|---------------|--------------|
| Max souborů | 1 | 10 |
| Preview | Jeden blob | Grid layout |
| Odstranění | Cancel btn | × per file |
| Ikony | Pouze text | Type-based |
| File info | Název | Název + typ |
| UI | Minimalistické | Grid preview |
| Clear all | Cancel btn | Clear all btn |

---

## 🐛 ŘEŠENÍ PROBLÉMŮ

### Problém 1: Soubory se nezobraví

**Řešení:**
```javascript
// Zkontroluj CSS import
<link rel="stylesheet" href="multi-file-styles.css">

// Nebo přidej styly do style.css
```

### Problém 2: "Maximum 10 files" alert

**Řešení:**
```javascript
// Zvyš limit v script.js:
const MAX_FILES = 20;
```

### Problém 3: Velké soubory nejdou nahrát

**Řešení:**
```javascript
// Zvyš size limit:
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
```

### Problém 4: Preview container se nezobrazí

**Řešení:**
```javascript
// Zkontroluj DOM element:
const container = document.getElementById('file-preview-container');
console.log(container); // Mělo by být definováno
```

---

## 🚀 BUDOUCÍ VYLEPŠENÍ

- [ ] **Drag & Drop** upload
- [ ] **Progress bar** pro nahrávání
- [ ] **Batch API calls** (pošli všechny soubory)
- [ ] **Cloud storage** integrace
- [ ] **Image compression** před uploadem
- [ ] **File preview modal** (full-size)
- [ ] **Sort & reorder** files
- [ ] **File type filtering**

---

**STATUS: READY TO DEPLOY**  
**VERZE: v5.9 MULTI-FILE EDITION**  
**MAX SOUBORŮ: 10**

🖖 Multi-file upload aktivován. Nahrávej jak admirál!


# 🔊 AUDIO MODULE v2.0 - SPEECH RATE FIX

**CHIEF ENGINEER:** Vice Admirál Jiřík & Admirál Claude.AI  
**PROBLÉM:** Gemini TTS čte text příliš rychle (2-3x normální rychlost)  
**ŘEŠENÍ:** Web Audio API playback rate control + MP3 export

---

## 🎯 CO BYLO OPRAVENO

### ❌ PŘED (problém):
```
Gemini TTS → Audio přehrávání
│
└─ Rychlost: 2.0-3.0x (příliš rychlé)
└─ Žádná kontrola
└─ Nemožnost exportu
```

### ✅ PO (řešení):
```
Gemini TTS → Web Audio API → Playback Rate Control
│
├─ Rychlost: 0.5-1.5x (nastavitelná)
├─ Gain Node (hlasitost)
├─ Export do MP3
└─ Live monitoring
```

---

## 📦 NOVÉ SOUBORY

**1. gemini-api.js v4.0**
- Přidána podpora voice selection
- Logging audio info
- Připraveno pro speech rate (ale Gemini API to nepodporuje)

**2. audio-module.js v2.0**
- `playAudioEnhanced()` - vylepšený playback s rate control
- `exportAudioToMP3()` - export base64 → MP3
- `convertToWAV()` - konverze do WAV formátu
- Audio visualizer (volitelný)

**3. script.js v5.8** (AKTUALIZOVANÝ)
- Integrován audio modul
- Nová `playAudio()` funkce s playback rate
- Rozšířené audio nastavení panel
- DevTools příkazy pro audio

---

## 🚀 JAK TO FUNGUJE

### 1. PLAYBACK RATE CONTROL

**Web Audio API** má vlastnost `playbackRate` která mění rychlost přehrávání:

```javascript
source.playbackRate.value = 0.8; // 80% normální rychlosti = zpomalení
```

**Výhody:**
- ✅ Řeší problém příliš rychlého čtení
- ✅ Nemění pitch (výšku hlasu)
- ✅ Plynulý playback bez trhání

**Nastavení:**
- `0.5` = velmi pomalé (50% rychlosti)
- `0.8` = **doporučeno** (80% rychlosti)
- `1.0` = normální rychlost
- `1.5` = rychlé (150% rychlosti)

---

### 2. UŽIVATELSKÉ ROZHRANÍ

**Audio Panel (pravý dolní roh):**

Když zapneš Voice → objeví se panel s:

**A) Rychlost Čtení Slider:**
```
0.5x ----●---- 1.0x ---- 1.5x
```
- Posun doprava = rychlejší
- Posun doleva = pomalejší
- Live preview hodnoty

**B) Délka Čtení Slider:**
```
500 ----●---- 1500 ---- 3000 znaků
```
- Kolik textu se přečte

**C) Export Tlačítko:**
```
💾 EXPORTOVAT POSLEDNÍ AUDIO
```
- Stáhne poslední audio jako MP3

---

### 3. DEVTOOLS PŘÍKAZY

Otevři konzoli (F12) a zkus:

#### Zobraz audio příkazy:
```javascript
audioHelp()
```

**Výstup:**
```
🔊 AUDIO COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  setAudioSpeed(0.8)     - Nastav rychlost (0.5-1.5)
  exportLastAudio()       - Exportuj poslední audio
  exportLastAudio("jmeno.mp3") - Export s vlastním jménem
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Nastav rychlost:
```javascript
setAudioSpeed(0.7)  // 70% rychlosti (ještě pomalejší)
```

#### Exportuj audio:
```javascript
exportLastAudio()  // Stáhne jako prometheus-audio-[timestamp].mp3
exportLastAudio("moje-audio.mp3")  // Vlastní jméno
```

---

## 🔧 NASTAVENÍ A DOPORUČENÍ

### Doporučená rychlost podle použití:

| Použití | Rychlost | Důvod |
|---------|----------|-------|
| Normální odpovědi | **0.8x** | Jasné, přirozené tempo |
| Technické vysvětlení | **0.7x** | Pomalejší pro pochopení |
| Krátké potvrzení | **1.0x** | Normální tempo OK |
| Rychlý přehled | **1.2x** | Rychlejší skenování |

### Proč 0.8x jako výchozí?

Gemini TTS model má tendenci mluvit rychle. **0.8x** vytváří:
- ✅ Přirozené tempo řeči
- ✅ Jasná artikulace
- ✅ Lepší srozumitelnost
- ✅ Příjemnější poslech

---

## 💾 EXPORT DO MP3

### Jak funguje export:

**1. Automatické ukládání:**
```javascript
// Při každém TTS audio se uloží do:
window.lastAudioBase64 = base64Data;
```

**2. Export na kliknutí:**
```javascript
// V UI panelu nebo příkazem:
exportLastAudio("moje-audio.mp3");
```

**3. Stažení:**
```javascript
// Vytvoří blob → downloaduje jako .mp3
Blob → URL → <a download> → click
```

### Formát exportovaného audio:

- **Formát:** MP3 (nebo raw PCM z Gemini)
- **Sample Rate:** 24000 Hz (Gemini TTS default)
- **Channels:** Mono (1 kanál)
- **Kvalita:** Závisí na Gemini TTS výstupu

---

## 🎨 POKROČILÉ FUNKCE

### 1. Audio Visualizer (volitelný)

V `audio-module.js` je funkce `createAudioVisualizer()`:

```javascript
// Přidej canvas do HTML:
<canvas id="audio-viz" width="300" height="100"></canvas>

// V script.js při playback:
const canvas = document.getElementById('audio-viz');
createAudioVisualizer(audioCtx, currentAudioSource, canvas);
```

### 2. WAV Konverze (pro lepší kompatibilitu)

```javascript
import { convertToWAV } from './audio-module.js';

const wavBlob = await convertToWAV(audioCtx, base64Data);
// Nyní máš čistý WAV soubor
```

### 3. Pitch Control (budoucí feature)

Pro nezávislou kontrolu pitch (výšky hlasu) bez změny rychlosti by bylo potřeba:
- Rubber Band Library
- SoundTouch.js
- Web Audio API Pitch Shifter

Momentálně `playbackRate` mění rychlost i pitch společně.

---

## 📊 TECHNICKÉ DETAILY

### Web Audio API Flow:

```
Base64 → Binary → AudioBuffer → BufferSource
                                      ↓
                            playbackRate.value = 0.8
                                      ↓
                                  GainNode
                                      ↓
                              AudioDestination (speakers)
```

### Proč Gemini TTS je rychlý?

1. **Model optimalizace:** Gemini TTS je trénovaný pro rychlou řeč
2. **Sample rate:** 24kHz může ovlivnit vnímání rychlosti
3. **Voice persona:** Některé hlasy jsou rychlejší (např. Charon)

### Proč nemůžeme změnit rychlost v API?

Gemini TTS API **nemá parametr `speechRate`**. Pouze podporuje:
- `voiceName` (výběr hlasu)
- `pitch` (možná - nedokumentováno)

Proto řešíme rychlost na **playback straně** pomocí Web Audio API.

---

## 🐛 ŘEŠENÍ PROBLÉMŮ

### Problém 1: Audio stále příliš rychlé

**Řešení:**
```javascript
setAudioSpeed(0.6)  // Ještě pomalejší
```

### Problém 2: Audio je zkreslené při zpomalení

**Příčina:** Příliš nízká rychlost (<0.5x) může způsobit artifacts

**Řešení:**
```javascript
setAudioSpeed(0.7)  // Zůstaň nad 0.6x
```

### Problém 3: Export nefunguje

**Diagnostika:**
```javascript
console.log(window.lastAudioBase64 ? 'Audio uloženo' : 'Žádné audio');
```

**Řešení:** Počkej až AI odpoví s hlasem, pak znovu zkus export.

### Problém 4: Audio se nepřehraje

**Diagnostika:**
```javascript
// Zkontroluj AudioContext state
console.log(audioCtx.state);  // Mělo by být 'running'
```

**Řešení:**
```javascript
audioCtx.resume();  // Resume pokud suspended
```

---

## 🔄 SROVNÁNÍ VERZÍ

### v3.1 (původní):
```javascript
function playAudio(base64Data) {
    const audioBuffer = await decode(base64Data);
    source.buffer = audioBuffer;
    source.connect(destination);
    source.start();
}
// ❌ Žádná kontrola rychlosti
// ❌ Gemini TTS → 2-3x rychlost
```

### v2.0 (nová):
```javascript
function playAudio(base64Data) {
    const audioBuffer = await decode(base64Data);
    source.buffer = audioBuffer;
    source.playbackRate.value = 0.8; // ✅ Zpomalení
    
    const gain = createGain();
    source → gain → destination;
    
    source.start();
    
    lastAudioBase64 = base64Data; // ✅ Pro export
}
// ✅ Kontrola rychlosti
// ✅ Export do MP3
// ✅ Live monitoring
```

---

## 📋 INSTALACE (QUICK START)

**KROK 1:** Nahraď soubory:
```bash
gemini-api.js    → v4.0 (nový)
script.js        → v5.8 (aktualizovaný)
```

**KROK 2:** Přidej nový soubor:
```bash
audio-module.js  → v2.0 (nový)
```

**KROK 3:** Aktualizuj index.html:
```html
<script type="module" src="audio-module.js"></script>
<script type="module" src="script.js"></script>
```

**KROK 4:** Refresh (F5)

**KROK 5:** Test:
1. Zapni Voice (tlačítko Audio)
2. Napiš zprávu AI
3. Poslouchej s **0.8x rychlostí**
4. Klikni "EXPORTOVAT AUDIO" pro stažení

---

## 🎯 DALŠÍ VYLEPŠENÍ (TODO)

- [ ] Voice selection UI (přepínač hlasů)
- [ ] Audio queue (fronta více audio)
- [ ] Real-time visualizer
- [ ] Pitch control nezávislý na rychlosti
- [ ] Volume control slider
- [ ] Audio fade in/out
- [ ] Pause/Resume tlačítka

---

**STATUS: NASAZENO**  
**VERZE: v2.0**  
**RYCHLOST: 0.8x (doporučeno)**

🖖 Audio modul aktivován. Gemini TTS už nemluví jako robot na kokainu.
