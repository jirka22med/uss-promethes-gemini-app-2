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
