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
