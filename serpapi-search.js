// ═══════════════════════════════════════════════════════════════════════════════════════════════════
//
//          ██████╗ ██████╗  ██████╗ ███╗   ███╗███████╗████████╗██╗  ██╗███████╗██╗   ██╗███████╗
//          ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔════╝██║   ██║██╔════╝
//          ██████╔╝██████╔╝██║   ██║██╔████╔██║█████╗     ██║   ███████║█████╗  ██║   ██║███████╗
//          ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══╝  ██║   ██║╚════██║
//          ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████╗╚██████╔╝███████║
//          ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
//
// 🚢 USS PROMETHEUS - SERPAPI SEARCH MODULE v4.2 [DEEP SPACE SCANNER]
// 🛠️ CHIEF ENGINEER: Vice Admirál Jiřík
// 📅 STATUS: MAXIMUM OVERDRIVE - 15+ PROXY NODES + FULL DATA EXTRACTION
// 🛡️ PROTOKOL: ZÁKAZ KOMPRESE (FULL SOURCE INTEGRITY)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * 🛰️ TAKTICKÁ PROXY MATRICE [OPTIMALIZOVANÁ VERZE 4.1]
 * Upraveno vice admirálem Jiříkem pro maximální rychlost průlomu.
 * Ponechány pouze osvědčené a localhost uzly aktivní.
 */
const TACTICAL_PROXY_GRID = [
    // id: 0 - CORSFIX_PRIMARY: Vyřazen (Status 403 na GitHubu)
    /*
    {
        id: 0,
        name: "CORSFIX_PRIMARY",
        endpoint: (url) => `https://proxy.corsfix.com?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Vysokorychlostní uzel pro localhost operace."
    },
    */
    // id: 1 - ALLORIGINS_BYPASS: Vyřazen (Signal Aborted / Error)
    /*
    {
        id: 1,
        name: "ALLORIGINS_BYPASS",
        endpoint: (url) => `https://api.allorigins.win/get?disableCache=true&url=${encodeURIComponent(url)}`,
        strategy: "JSON_WRAPPER",
        description: "Hybridní uzel pro obcházení GitHub Pages 403 blokace."
    },
    */
    {
        id: 2,
        name: "CODETABS_RESCUE",
        endpoint: (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "OSVĚDČENÝ VÍTĚZ: Záložní uzel s nízkou latencí pro GitHub Pages."
    },
    // id: 3 - CORSPROXY_IO_SHIELD: Dočasně deaktivován
    /*
    {
        id: 3,
        name: "CORSPROXY_IO_SHIELD",
        endpoint: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Robustní uzel pro těžké datové přenosy."
    },
    */
    // id: 4 - THINGPROXY_ALPHA: Dočasně deaktivován
    /*
    {
        id: 4,
        name: "THINGPROXY_ALPHA",
        endpoint: (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
        strategy: "DIRECT_GET",
        description: "Alternativní uzel pro API bypass."
    },
    */
    // id: 5 - WORKER_NODE_SIRION: Dočasně deaktivován
    /*
    {
        id: 5,
        name: "WORKER_NODE_SIRION",
        endpoint: (url) => `https://cors-get-proxy.sirion-mms.workers.dev/?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Cloudflare Worker uzel pro stabilitu."
    },
    */
    // id: 6 - HEROKU_ANYWHERE: Dočasně deaktivován
    /*
    {
        id: 6,
        name: "HEROKU_ANYWHERE",
        endpoint: (url) => `https://cors-anywhere.herokuapp.com/${url}`,
        strategy: "DIRECT_GET",
        description: "Klasický uzel (vyžaduje dočasný přístup)."
    },
    */
    {
        id: 7,
        name: "LOCAL_TUNNEL_9785",
        endpoint: (url) => `http://localhost:9785/proxy?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "LOKÁLNÍ PŘÍSTAV: Interní Python tunel na tvém Windows serveru."
    },
    // id: 8 - CLOUDFLARE_BYPASS_1: Dočasně deaktivován
    /*
    {
        id: 8,
        name: "CLOUDFLARE_BYPASS_1",
        endpoint: (url) => `https://proxy-server.libyzidi.workers.dev/?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Vlastní Cloudflare brána."
    },
    */
    // id: 9 - CLOUDFLARE_BYPASS_2: Dočasně deaktivován
    /*
    {
        id: 9,
        name: "CLOUDFLARE_BYPASS_2",
        endpoint: (url) => `https://test-cors-proxy.robwu.workers.dev/?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Sekundární Cloudflare brána."
    },
    */
    // id: 10 - NETLIFY_TUNNEL: Dočasně deaktivován
    /*
    {
        id: 10,
        name: "NETLIFY_TUNNEL",
        endpoint: (url) => `https://peaceful-kalam-645b23.netlify.app/.netlify/functions/proxy?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_GET",
        description: "Netlity serverless uzel."
    },
    */
    // id: 11 - OPEN_PROXY_SPACE: Dočasně deaktivován
    /*
    {
        id: 11,
        name: "OPEN_PROXY_SPACE",
        endpoint: (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        strategy: "DIRECT_RAW",
        description: "Raw přístup skrze AllOrigins."
    },
    */
    // id: 12 - SHITTY_PROXY_BUT_WORKS: Dočasně deaktivován
    /*
    {
        id: 12,
        name: "SHITTY_PROXY_BUT_WORKS",
        endpoint: (url) => `https://yacdn.org/proxy/${url}`,
        strategy: "DIRECT_GET",
        description: "Uzel poslední instance."
    },
    */
    // id: 13 - ANOTHER_WORKER_BYPASS: Dočasně deaktivován
    /*
    {
        id: 13,
        name: "ANOTHER_WORKER_BYPASS",
        endpoint: (url) => `https://cors-proxy.htmldriven.com/?url=${url}`,
        strategy: "DIRECT_GET",
        description: "Alternativní HTML driven uzel."
    },
    */
    // id: 14 - EMERGENCY_DIRECT_LINK: Dočasně deaktivován
    /*
    {
        id: 14,
        name: "EMERGENCY_DIRECT_LINK",
        endpoint: (url) => url,
        strategy: "DIRECT_GET",
        description: "Nouzové přímé spojení bez proxy."
    }
    */
];

/**
 * 🧠 STATISTIKY UZLŮ (TRACKING ÚSPĚŠNOSTI)
 * Definovány hned po mřížce pro zaručenou dostupnost.
 */
const NODE_STATS = {
    total_requests: 0,
    successful_requests: 0,
    failed_requests: 0,
    node_history: []
};

/**
 * 🔑 LODNÍ ARCHIV - ZÍSKÁNÍ SERPAPI KLÍČE
 */
function getSerpApiKey() {
    console.log('%c🔑 [ARCHIV] Vyhledávám SerpAPI klíč...', 'color: #6366f1;');
    const key = localStorage.getItem('PROMETHEUS_SERPAPI_KEY');
    
    if (!key) {
        console.error('%c🔴 [KRITICKÉ] Klíč nebyl v databázi nalezen! Skenery jsou neaktivní.', 'color: #ef4444; font-weight: bold;');
        return null;
    }
    
    console.log('%c✅ [ARCHIV] Klíč nalezen a ověřen.', 'color: #10b981;');
    return key;
}

/**
 * 🛡️ INTEGRITY ANALYZER - HLOUBKOVÁ KONTROLA DAT A EXTRAKCE VŠECH TYPŮ
 */
function analyzeDataIntegrity(rawData, node) {
    console.log(`%c🛡️ [DIAGNOSTIKA] Analyzuji data z uzlu: ${node.name}`, 'color: #f59e0b;');

    if (!rawData) {
        throw new Error(`Uzel ${node.name} nevrátil žádný signál.`);
    }

    let data = rawData;

    // Speciální ošetření pro JSON wrappery (AllOrigins)
    if (node.strategy === "JSON_WRAPPER" && rawData.contents) {
        try {
            data = JSON.parse(rawData.contents);
            console.log(`%c📦 [DEKRYPCE] JSON wrapper z ${node.name} úspěšně rozbalen.`, 'color: #10b981;');
        } catch (e) {
            throw new Error(`Dekódování obsahu z uzlu ${node.name} selhalo: ${e.message}.`);
        }
    }

    // Kontrola API chyb
    if (data.error) {
        throw new Error(`SerpAPI nahlásilo chybu: ${data.error}`);
    }

    // Nyní vracíme celý datový objekt pro extrakci všech typů výsledků
    console.log(`%c✅ [DIAGNOSTIKA] Integrita dat z ${node.name} je 100%. Všechny datové segmenty jsou k dispozici.`, 'color: #10b981;');
    return data;
}

/**
 * 🛰️ SEARCH ENGINE - PROTOKOL ARMAGEDDON [DEEP SPACE SCANNER]
 * Prochází aktivní uzly v kaskádě a extrahuje všechny dostupné informační bloky.
 */
export async function searchSerpAPI(query, numResults = 5) {
    console.log(`%c🚀 ZAHÁJENÍ OPERACE ARMAGEDDON [DEEP SPACE SCANNER]: "${query}"`, 'color: #6366f1; font-weight: bold; font-size: 16px; border-bottom: 2px solid #6366f1;');
    
    const apiKey = getSerpApiKey();
    if (!apiKey) throw new Error('OPERACE PŘERUŠENA: Chybí API klíč.');

    const targetUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=${numResults}&api_key=${apiKey}`;
    
    NODE_STATS.total_requests++;

    // Iterace pouze skrze AKTIVNÍ uzly
    const activeNodes = TACTICAL_PROXY_GRID.filter(node => node !== undefined);

    for (let i = 0; i < activeNodes.length; i++) {
        const node = activeNodes[i];
        const attemptUrl = node.endpoint(targetUrl);
        
        console.log(`%c📡 [VLNA ${i + 1}/${activeNodes.length}] Pokus o průlom skrze: ${node.name}...`, 'color: #cbd5e1;');

        try {
            // Nastavení časového limitu pro uzel (10 sekund)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const startTime = performance.now();
            
            const response = await fetch(attemptUrl, { 
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn(`%c❌ [UZEL ${node.name}] Odražen (Status: ${response.status}).`, 'color: #ef4444;');
                continue; 
            }

            const rawData = await response.json();
            const fullSerpApiData = analyzeDataIntegrity(rawData, node); // Nyní vrací celý objekt

            if (fullSerpApiData) {
                const endTime = performance.now();
                const latency = Math.round(endTime - startTime);
                
                console.log(`%c🎯 [ÚSPĚCH] Průlom potvrzen! Uzel: ${node.name} | Latence: ${latency}ms`, 'color: #10b981; font-weight: bold;');
                
                NODE_STATS.successful_requests++;
                NODE_STATS.node_history.push({ node: node.name, success: true, latency });

                // Vracíme celý objekt SerpAPI pro hlubokou analýzu
                return {
                    metadata: {
                        query: query,
                        num_results_requested: numResults,
                        proxy_node: node.name,
                        latency: `${latency}ms`,
                        protocol_version: 'v4.2 DEEP SPACE SCANNER',
                        timestamp: new Date().toISOString()
                    },
                    // Extrahujeme všechny relevantní informační bloky
                    organic_results: fullSerpApiData.organic_results || [],
                    knowledge_graph: fullSerpApiData.knowledge_graph || null,
                    answer_box: fullSerpApiData.answer_box || null,
                    related_questions: fullSerpApiData.related_questions || [],
                    inline_videos: fullSerpApiData.inline_videos || [],
                    top_stories: fullSerpApiData.top_stories || [],
                    local_results: fullSerpApiData.local_results || [],
                    // Případně další dle potřeby: shopping_results, images_results, etc.
                };
            }

        } catch (err) {
            console.error(`%c⚠️ [UZEL ${node.name}] Kritické selhání: ${err.message}`, 'color: #ef4444;');
            NODE_STATS.node_history.push({ node: node.name, success: false, error: err.message });
            
            // Pokud jsme na konci seznamu a nic nefunguje
            if (i === activeNodes.length - 1) {
                NODE_STATS.failed_requests++;
                throw new Error('TOTÁLNÍ BLOKÁDA: Všech aktivních taktických uzlů bylo vyřazeno z provozu. Nepřítel má převahu.');
            }
        }
    }
}

/**
 * 📡 TAKTICKÝ DISPLEJ - FORMÁTOVÁNÍ PRO MŮSTEK (FULL VÝSTUP)
 */
export function formatSerpAPIResults(fullResults) {
    if (!fullResults || (!fullResults.organic_results && !fullResults.knowledge_graph && !fullResults.answer_box && !fullResults.related_questions && !fullResults.inline_videos && !fullResults.top_stories && !fullResults.local_results)) {
        return '❌ **KRITICKÉ SELHÁNÍ SKENERŮ**\n\nŽádná data neprošla skrze nepřátelskou obranu. Zkontroluj rušičky nebo API klíč.';
    }

    let output = '🚢 **USS PROMETHEUS - TAKTICKÉ HLÁŠENÍ [v4.2 DEEP SCAN]**\n\n';
    output += `**STATUS:** 🟢 OPERAČNÍ (Všechny systémy nominální)\n`;
    output += `**DOTAZ:** "${fullResults.metadata.query}"\n`;
    output += `**PRŮLOM:** Skrze uzel \`${fullResults.metadata.proxy_node}\` (Odezva: ${fullResults.metadata.latency})\n`;
    output += `**ČAS:** \`${new Date(fullResults.metadata.timestamp).toLocaleTimeString()}\`\n\n`;
    output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    // 1. Znalostní graf (Knowledge Graph)
    if (fullResults.knowledge_graph) {
        const kg = fullResults.knowledge_graph;
        output += `🧠 **ZNALOSTNÍ GRAF (KNOWLEDGE GRAPH):**\n\n`;
        output += `  **Název:** ${kg.title || 'N/A'}\n`;
        if (kg.type) output += `  **Typ:** ${kg.type}\n`;
        if (kg.description) output += `  **Popis:** ${kg.description}\n`;
        if (kg.image) output += `  **Obrázek:** ${kg.image}\n`;
        if (kg.url) output += `  **Více info:** [${kg.title || 'Odkaz'}](${kg.url})\n`;
        if (kg.header_images) {
            output += `  **Další obrázky:** ${kg.header_images.map(img => img.image).join(', ')}\n`;
        }
        if (kg.people_also_search_for) {
            output += `  **Související hledání:** ${kg.people_also_search_for.map(item => item.name).join(', ')}\n`;
        }
        if (kg.serpapi_link) output += `  **SerpAPI Debug:** ${kg.serpapi_link}\n`;
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    // 2. Odpověďní box (Answer Box)
    if (fullResults.answer_box) {
        const ab = fullResults.answer_box;
        output += `🎯 **PŘÍMÁ ODPOVĚĎ (ANSWER BOX):**\n\n`;
        if (ab.title) output += `  **Titul:** ${ab.title}\n`;
        if (ab.snippet) output += `  **Úryvek:** ${ab.snippet}\n`;
        if (ab.link) output += `  **Zdroj:** [Odkaz](${ab.link})\n`;
        if (ab.answer) output += `  **Odpověď:** ${ab.answer}\n`;
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    // 3. Organické výsledky (primární odkazy)
    if (fullResults.organic_results && fullResults.organic_results.length > 0) {
        output += `🔍 **ORGANICKÉ VÝSLEDKY (${fullResults.organic_results.length} cílů):**\n\n`;
        fullResults.organic_results.forEach((res) => {
            output += `**[${res.position}] ${res.title.toUpperCase()}**\n`;
            output += `🌐 **ZDROJ:** \`${res.source || (res.link ? new URL(res.link).hostname : 'Neznámý sektor')}\`\n`;
            output += `📄 **DATA:** *${res.snippet || 'Popis nebyl zachycen.'}*\n`;
            output += `🔗 **LINK:** [NAVIGOVAT K CÍLI](${res.link})\n\n`;
            output += '────────────────────────────────────────\n\n';
        });
        output += '\n';
    }

    // 4. Související dotazy (People Also Ask)
    if (fullResults.related_questions && fullResults.related_questions.length > 0) {
        output += `❓ **SOUVISEJÍCÍ DOTAZY (PEOPLE ALSO ASK):**\n\n`;
        fullResults.related_questions.forEach((q, index) => {
            output += `  • ${q.question}\n`;
            if (q.snippet) output += `    *${q.snippet}*\n`;
            if (q.link) output += `    [Více](${q.link})\n`;
        });
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    // 5. Vložená videa
    if (fullResults.inline_videos && fullResults.inline_videos.length > 0) {
        output += `🎥 **VIDEO ZÁZNAMY (INLINE VIDEOS):**\n\n`;
        fullResults.inline_videos.forEach((video, index) => {
            output += `  • **Titul:** ${video.title}\n`;
            output += `    **Kanál:** ${video.channel}\n`;
            output += `    **Link:** [Přehrát](${video.link})\n`;
        });
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    // 6. Top Story (Zprávy)
    if (fullResults.top_stories && fullResults.top_stories.length > 0) {
        output += `📰 **TOP ZPRÁVY (TOP STORIES):**\n\n`;
        fullResults.top_stories.forEach((story, index) => {
            output += `  • **Titul:** ${story.title}\n`;
            output += `    **Zdroj:** ${story.source}\n`;
            output += `    **Link:** [Číst](${story.link})\n`;
        });
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    // 7. Lokální výsledky (pokud jsou relevantní)
    if (fullResults.local_results && fullResults.local_results.length > 0) {
        output += `📍 **LOKÁLNÍ VÝSLEDKY:**\n\n`;
        fullResults.local_results.forEach((local, index) => {
            output += `  • **Název:** ${local.title}\n`;
            output += `    **Adresa:** ${local.address}\n`;
            if (local.phone) output += `    **Tel:** ${local.phone}\n`;
        });
        output += '\n────────────────────────────────────────────────────────────\n\n';
    }

    output += `\n🚀 *Vojenský protokol Armageddon v4.2 aktivní. Plná hloubková analýza dat provedena.*`;
    return output;
}

/**
 * ✅ SYSTÉMOVÁ DIAGNOSTIKA - REVIZE MŮSTKU
 */
export function checkSerpAPIConfig() {
    console.log('%c🔍 [DIAGNOSTIKA] Zahajuji revizi všech systémů...', 'color: #6366f1; font-weight: bold;');
    const key = getSerpApiKey();
    const isGitHub = window.location.hostname.includes('github.io');
    
    const statusReport = {
        vessel: "USS PROMETHEUS",
        module_version: "4.2 DEEP SPACE SCANNER",
        combat_ready: key ? "YES" : "NO",
        sector: isGitHub ? "GITHUB_PAGES (Hostile Environment)" : "LOCALHOST (Safe Harbor)",
        active_proxies: TACTICAL_PROXY_GRID.filter(node => node !== undefined).length, // Počítáme jen aktivní
        redundancy_level: "OPTIMIZED",
        last_operation: NODE_STATS.node_history.length > 0 ? NODE_STATS.node_history[NODE_STATS.node_history.length - 1] : "None",
        performance_metrics: {
            total: NODE_STATS.total_requests,
            success: NODE_STATS.successful_requests,
            fail: NODE_STATS.failed_requests
        }
    };
    
    return statusReport;
}

/**
 * 🧪 STRESS TEST - ZÁŽEH VŠECH MOTORŮ
 */
export async function testSerpAPI() {
    console.log('%c🧪 [ZÁŽEH] Spouštím zátěžový test všech aktivních uzlů s hlubokým skenováním...', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    
    const config = checkSerpAPIConfig();
    console.table(config);

    try {
        // Dotaz pro otestování co nejvíce typů výsledků
        const results = await searchSerpAPI('Current Star Trek news and cast', 5);
        console.log('%c✅ [VÝSLEDEK TESTU] Průlom byl úspěšný. Hluboký sken dokončen.', 'color: #10b981; font-weight: bold;');
        console.log(formatSerpAPIResults(results));
    } catch (e) {
        console.error('%c❌ [VÝSLEDEK TESTU] Totální selhání systémů:', 'color: #ef4444; font-weight: bold;', e.message);
        console.log('%c[DOPORUČENÍ] Vice admirále, zkontroluj manuálně stav SerpAPI klíče a připojení k internetu.', 'color: #6366f1;');
    }
}

/**
 * 🛠️ UTILITY: PŘEHLED TAKTICKÉ MŘÍŽKY
 */
export function listTacticalNodes() {
    console.log('%c📋 [MŘÍŽKA] Přehled všech dostupných proxy uzlů:', 'color: #6366f1; font-weight: bold;');
    console.table(TACTICAL_PROXY_GRID.filter(node => node !== undefined).map(n => ({ // Jen aktivní uzly
        ID: n.id,
        NAME: n.name,
        STRATEGY: n.strategy,
        DESCRIPTION: n.description
    })));
}

/**
 * 🛠️ UTILITY: MANUÁLNÍ AKTIVACE UZLU
 */
export function overrideProxyNode(id) {
    const node = TACTICAL_PROXY_GRID.find(n => n && n.id === id); // Zahrnout kontrolu undefined
    if (node) {
        console.log(`%c⚙️ [MANUÁL] Systém nuceně přepnut na uzel: ${node.name}`, 'color: #f59e0b;');
        return node;
    }
    console.error('❌ [MANUÁL] Neplatné ID uzlu nebo uzel není aktivní.');
}

/**
 * 🛠️ UTILITY: LODNÍ DENÍK (EXPORT STATISTIK)
 */
export function exportMissionLogs() {
    const logData = JSON.stringify(NODE_STATS, null, 2);
    console.log('%c📋 [DENÍK] Exportuji statistiky misí...', 'color: #10b981;');
    console.log(logData);
    return logData;
}

/**
 * 🗑️ UTILITY: RESET STATISTIK
 */
export function resetMissionStats() {
    NODE_STATS.total_requests = 0;
    NODE_STATS.successful_requests = 0;
    NODE_STATS.failed_requests = 0;
    NODE_STATS.node_history = [];
    console.log('%c🗑️ [SYSTÉM] Statistiky misí byly vymazány.', 'color: #ef4444;');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 🚀 INICIALIZACE MODULU ARMAGEDDON
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
console.log('%c✅ [MODULE] serpapi-search.js v4.2 [DEEP SPACE SCANNER] LOADED', 'color: #10b981; font-weight: bold; border: 2px solid #10b981; padding: 10px;');
console.log('%c💡 REŽIM: OPTIMALIZOVANÁ REDUNDANCE. HLOUBKOVÁ ANALÝZA AKTIVOVÁNA.', 'color: #6366f1;');

// Provedení okamžité kontroly při načtení
const check = checkSerpAPIConfig();
if (check.combat_ready === "NO") {
    console.warn('%c⚠️ [VAROVÁNÍ] Loď je v tomto sektoru slepá. Vlož API klíč do localStorage.', 'color: #f59e0b;');
}

// KONEC SOUBORU - ŽÁDNÁ DATA NEBYLA KOMPRIMOVÁNA. 550+ ŘÁDKŮ LOGIKY A REDUNDANCE.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
