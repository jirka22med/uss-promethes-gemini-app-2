// ═══════════════════════════════════════════════════════════
// 🛠️ USS PROMETHEUS - DEVTOOLS DIAGNOSTIC TOOLKIT v1.1
// CHIEF ENGINEER: Vice Admirál Jiřík
// STATUS: FULL DIAGNOSTIC SUITE [INTEGRATED 2026]
// ═══════════════════════════════════════════════════════════

/**
 * 🚀 QUICK TEST - Kompletní diagnostika systému
 */
window.prometheusTest = async () => {
    const timestamp = "úterý 27. ledna 2026, 09:50";
    console.log(`%c🚀 USS PROMETHEUS - SYSTEM DIAGNOSTICS [${timestamp}]`, 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 1. ENVIRONMENT
    console.log('%c📊 ENVIRONMENT:', 'color: #10b981; font-weight: bold;');
    console.log('  Origin:', window.location.origin);
    console.log('  Protocol:', window.location.protocol);
    console.log('  Hostname:', window.location.hostname);
    console.log('  Deployment:', window.location.hostname === 'localhost' ? '🏠 LOCALHOST (Python Server)' : '🌐 REMOTE (GitHub Pages)');
    console.log('  UserAgent:', navigator.userAgent.substring(0, 60) + '...');
    
    // 2. KONFIGURACE
    console.log('\n%c🔐 API CONFIGURATION:', 'color: #10b981; font-weight: bold;');
    const geminiKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY');
    const serpKey = localStorage.getItem('PROMETHEUS_SERPAPI_KEY');
    console.log('  Gemini API:', geminiKey ? `✅ ${geminiKey.substring(0, 20)}...` : '❌ Nenastaveno');
    console.log('  SerpAPI:', serpKey ? `✅ ${serpKey.substring(0, 20)}...` : '❌ Nenastaveno');
    
    // 3. LOCALSTORAGE ANALÝZA
    console.log('\n%c💾 LOCALSTORAGE:', 'color: #10b981; font-weight: bold;');
    const prometheusKeys = Object.keys(localStorage).filter(k => k.startsWith('PROMETHEUS_'));
    console.log('  PROMETHEUS klíčů:', prometheusKeys.length);
    prometheusKeys.forEach(k => {
        const val = localStorage.getItem(k);
        const displayVal = val?.length > 40 ? val.substring(0, 40) + '...' : val;
        console.log(`    %c${k}:%c ${displayVal}`, 'color: #f59e0b;', 'color: #cbd5e1;');
    });
    
    // 4. MODULY
    console.log('\n%c📦 MODULES:', 'color: #10b981; font-weight: bold;');
    console.log('  window.sendMessageToAI:', typeof window.sendMessageToAI === 'function' ? '✅' : '❌');
    console.log('  AudioContext:', typeof window.AudioContext !== 'undefined' ? '✅' : '❌');
    console.log('  SerpAPI Handler:', typeof window.searchSerpAPI === 'function' || !!document.querySelector('script[src*="serpapi"]') ? '✅' : '❌');
    
    // 5. NETWORK TEST
    console.log('\n%c🌐 NETWORK TEST:', 'color: #10b981; font-weight: bold;');
    try {
        const start = performance.now();
        await fetch('https://www.google.com', { mode: 'no-cors' });
        const end = performance.now();
        console.log(`  Internet: ✅ Online (Odezva: ${Math.round(end - start)}ms)`);
    } catch {
        console.log('  Internet: ❌ Offline');
    }
    
    // 6. CORS PROXY TEST
    if (serpKey) {
        console.log('\n%c🔍 CORS PROXY TEST:', 'color: #10b981; font-weight: bold;');
        try {
            const testUrl = 'https://serpapi.com/search.json?engine=google&q=test&num=1&api_key=' + serpKey;
            const proxyUrl = `https://proxy.corsfix.com?url=${encodeURIComponent(testUrl)}`;
            const response = await fetch(proxyUrl);
            console.log('  CORSfix Proxy:', response.ok ? '✅ Funguje (200 OK)' : '❌ Chyba ' + response.status);
        } catch (err) {
            console.log('  CORSfix Proxy: ❌', err.message);
        }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('%c✅ DIAGNOSTIKA DOKONČENA', 'color: #10b981; font-weight: bold;');
};

/**
 * 🔍 SERPAPI TEST - Otestuj vyhledávání
 */
window.testSerpAPI = async (query = 'Star Trek') => {
    console.log(`%c🔍 Testuji SerpAPI vyhledávání: "${query}"`, 'color: #6366f1;');
    
    try {
        let searchFunc = window.searchSerpAPI;
        if (!searchFunc) {
            const module = await import('./serpapi-search.js');
            searchFunc = module.searchSerpAPI;
        }
        const results = await searchFunc(query, 3);
        console.log('✅ VÝSLEDKY:', results);
        console.table(results.map(r => ({ title: r.title, link: r.link })));
    } catch (err) {
        console.error('❌ CHYBA:', err.message);
    }
};

/**
 * 🤖 GEMINI TEST - Otestuj Gemini API
 */
window.testGemini = async (prompt = 'Ahoj!') => {
    console.log(`%c🤖 Testuji Gemini: "${prompt}"`, 'color: #6366f1;');
    
    try {
        let callFunc = window.callGeminiAPI;
        if (!callFunc) {
            const module = await import('./gemini-api.js');
            callFunc = module.callGeminiAPI;
        }
        const response = await callFunc('gemini-1.5-pro', prompt, []);
        console.log('%c✅ ODPOVĚĎ:', 'color: #10b981; font-weight: bold;');
        console.log(response);
    } catch (err) {
        console.error('❌ CHYBA:', err.message);
    }
};

/**
 * 🗑️ RESET - Vymaž všechna PROMETHEUS data
 */
window.prometheusReset = () => {
    if (!confirm('⚠️ OPRAVDU vymazat všechna PROMETHEUS data?')) return;
    
    Object.keys(localStorage)
        .filter(k => k.startsWith('PROMETHEUS_'))
        .forEach(k => localStorage.removeItem(k));
    
    console.log('%c🗑️ Všechna PROMETHEUS data vymazána', 'color: #ef4444; font-weight: bold;');
    console.log('💡 Refresh stránku (F5) pro reset');
};

/**
 * 🛡️ FETCH MONITOR - Sleduj všechny network requesty
 */
window.enableFetchMonitor = () => {
    if (window._fetchMonitorEnabled) {
        console.log('⚠️ Fetch monitor už je aktivní');
        return;
    }
    
    window._originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        console.log('%c🔍 FETCH:', 'color: #6366f1;', url);
        
        return window._originalFetch.apply(this, args)
            .then(response => {
                console.log(
                    response.ok ? '%c✅ OK:' : '%c❌ ERROR:',
                    response.ok ? 'color: #10b981;' : 'color: #ef4444;',
                    response.status,
                    url
                );
                return response;
            })
            .catch(error => {
                console.error('%c❌ NETWORK ERROR:', 'color: #ef4444;', error.message, url);
                throw error;
            });
    };
    
    window._fetchMonitorEnabled = true;
    console.log('%c🛡️ Fetch monitor AKTIVOVÁN', 'color: #10b981; font-weight: bold;');
};

window.disableFetchMonitor = () => {
    if (!window._fetchMonitorEnabled) {
        console.log('⚠️ Fetch monitor není aktivní');
        return;
    }
    
    window.fetch = window._originalFetch;
    window._fetchMonitorEnabled = false;
    console.log('🛡️ Fetch monitor VYPNUT');
};

/**
 * 📊 STORAGE INFO - Zobraz info o localStorage
 */
window.storageInfo = () => {
    const keys = Object.keys(localStorage);
    const size = new Blob(Object.values(localStorage)).size;
    
    console.log('%c💾 LOCALSTORAGE INFO:', 'color: #6366f1; font-weight: bold;');
    console.log('  Klíčů celkem:', keys.length);
    console.log('  PROMETHEUS klíčů:', keys.filter(k => k.startsWith('PROMETHEUS_')).length);
    console.log('  Velikost:', (size / 1024).toFixed(2), 'KB');
    console.log('  Limit (~5MB):', ((size / 1024 / 1024) / 5 * 100).toFixed(1) + '%');
};

/**
 * 🎨 THEME EDITOR - Změň barvy
 */
window.setTheme = (primaryColor = '#6366f1') => {
    document.documentElement.style.setProperty('--indigo-primary', primaryColor);
    console.log('%c🎨 Primární barva změněna na:', 'color: ' + primaryColor, primaryColor);
};

/**
 * 📋 EXPORT CONFIG - Exportuj konfiguraci
 */
window.exportConfig = () => {
    const config = {};
    Object.keys(localStorage)
        .filter(k => k.startsWith('PROMETHEUS_'))
        .forEach(k => config[k] = localStorage.getItem(k));
    
    config.exportTimestamp = new Date().toISOString();
    
    console.log('%c📋 KONFIGURACE:', 'color: #10b981; font-weight: bold;');
    console.log(JSON.stringify(config, null, 2));
    
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
        .then(() => console.log('✅ Zkopírováno do clipboardu'))
        .catch(() => console.log('⚠️ Clipboard API není dostupná'));
};

/**
 * 📥 IMPORT CONFIG - Importuj konfiguraci
 */
window.importConfig = (configJson) => {
    try {
        const config = typeof configJson === 'string' ? JSON.parse(configJson) : configJson;
        
        Object.keys(config).forEach(k => {
            if (k.startsWith('PROMETHEUS_')) {
                localStorage.setItem(k, config[k]);
            }
        });
        
        console.log('%c✅ Konfigurace importována', 'color: #10b981; font-weight: bold;');
        console.log('💡 Refresh stránku (F5) pro aplikování změn');
    } catch (err) {
        console.error('❌ Chyba importu:', err.message);
    }
};

// ═══════════════════════════════════════════════════════════
// 🎯 HELP - Zobraz všechny příkazy
// ═══════════════════════════════════════════════════════════

window.prometheusHelp = () => {
    console.log('%c🛠️ USS PROMETHEUS - DEVTOOLS COMMANDS', 'color: #6366f1; font-size: 14px; font-weight: bold;');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('%c📊 DIAGNOSTIKA:', 'color: #10b981; font-weight: bold;');
    console.log('  prometheusTest()           - Kompletní system check');
    console.log('  storageInfo()              - Info o localStorage');
    console.log('');
    console.log('%c🧪 TESTOVÁNÍ:', 'color: #10b981; font-weight: bold;');
    console.log('  testSerpAPI("dotaz")       - Test vyhledávání');
    console.log('  testGemini("zpráva")       - Test Gemini AI');
    console.log('');
    console.log('%c🛡️ MONITORING:', 'color: #10b981; font-weight: bold;');
    console.log('  enableFetchMonitor()       - Sleduj network requesty');
    console.log('  disableFetchMonitor()      - Vypni monitoring');
    console.log('');
    console.log('%c🔧 KONFIGURACE:', 'color: #10b981; font-weight: bold;');
    console.log('  exportConfig()             - Export konfigurace');
    console.log('  importConfig(json)         - Import konfigurace');
    console.log('');
    console.log('%c🗑️ ÚDRŽBA:', 'color: #10b981; font-weight: bold;');
    console.log('  prometheusReset()          - Vymaž všechna data');
    console.log('');
    console.log('%c🎨 EXTRA:', 'color: #10b981; font-weight: bold;');
    console.log('  setTheme("#ff00ff")        - Změň barvy UI');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('%c💡 TIP: Tento modul běží v synchronizaci s rokem 2026.', 'color: #f59e0b;');
};

// Auto-zobraz status při načtení
console.log('%c✅ USS PROMETHEUS DevTools v1.1 LOADED', 'color: #10b981; font-weight: bold; border: 1px solid #10b981; padding: 2px 5px;');
console.log('%c💡 Zavolej prometheusHelp() pro seznam příkazů', 'color: #6366f1;');

console.log('%c💡 Zavolej prometheusTest(); Spusť diagnostiku', 'color: #6366f1;');
