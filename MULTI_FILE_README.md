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
