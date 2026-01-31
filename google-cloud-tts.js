// ═══════════════════════════════════════════════════════════
// 🎙️ GOOGLE CLOUD TEXT-TO-SPEECH - USS PROMETHEUS v6.3 CORRECTED
// PODLE DOPORUČENÍ AI PŘEHLED (Google)
// Neural2 + WaveNet Technology
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────
// ✅ FALLBACK PRO tacticalLog
// ─────────────────────────────────────────────────────────
const tacticalLog = window.tacticalLog || ((level, message) => {
    const timestamp = new Date().toLocaleTimeString('cs-CZ');
    console.log(`[${timestamp}] [${level}] ${message}`);
    
    const logDisplay = document.getElementById('log-display');
    if (logDisplay) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-level">[${level}]</span> ${message}`;
        logDisplay.appendChild(logEntry);
        logDisplay.scrollTop = logDisplay.scrollHeight;
    }
});

// ═══════════════════════════════════════════════════════════
// 🎙️ VOICE CONFIGURATION - PRODUCTION (Reálně existující hlasy)
// ═══════════════════════════════════════════════════════════
const VOICES = {
    // ─────────────────────────────────────────────────────────
    // ⚡ NEURAL2 - NEJVYŠŠÍ KVALITA (existuje pouze ženský pro cs-CZ)
    // ─────────────────────────────────────────────────────────
    neural_f: 'cs-CZ-Neural2-A',     // ⭐ Nejkvalitnější ženský hlas
    
    // ─────────────────────────────────────────────────────────
    // 🎯 WAVENET - VYSOKÁ KVALITA (osvědčené hlasy)
    // ─────────────────────────────────────────────────────────
    wavenet_f: 'cs-CZ-Wavenet-A',    // Ženský Wavenet
    wavenet_m: 'cs-CZ-Wavenet-B',    // Mužský Wavenet
    
    // ─────────────────────────────────────────────────────────
    // ⚙️ STANDARD - RYCHLÉ ODPOVĚDI (nižší latence)
    // ─────────────────────────────────────────────────────────
    standard_f: 'cs-CZ-Standard-A',  // Základní ženský hlas
    
    // ─────────────────────────────────────────────────────────
    // 🚀 ALIASY PRO KOMPATIBILITU
    // ─────────────────────────────────────────────────────────
    female: 'cs-CZ-Neural2-A',       // Výchozí ženský → Neural2
    male: 'cs-CZ-Wavenet-B',         // Výchozí mužský → Wavenet
    neutral: 'cs-CZ-Wavenet-A',      // Neutrální → Wavenet
    female_alt: 'cs-CZ-Standard-A',  // Alternativní → Standard
    
    // Fallbacky pro neexistující hlasy
    neural_m: 'cs-CZ-Wavenet-B',     // Neural2 mužský NEEXISTUJE
    hd_male: 'cs-CZ-Wavenet-B',      // Chirp HD NEEXISTUJE
    hd_female: 'cs-CZ-Neural2-A'     // Chirp HD NEEXISTUJE
};

let currentVoice = VOICES.male; // Výchozí: cs-CZ-Wavenet-B (mužský)

// ═══════════════════════════════════════════════════════════
// 🎙️ GENEROVÁNÍ ŘEČI (Google Cloud TTS)
// PODLE DOPORUČENÍ AI PŘEHLED
// ═══════════════════════════════════════════════════════════
export async function generateSpeechGoogleCloud(text, voiceKey = 'wavenet_m') {
    // ✅ API KLÍČ UVNITŘ FUNKCE (podle AI Přehled doporučení)
    const API_KEY = 'AIzaSyAz_BFf_O8x4j9nFWzinB4deWSdpBLqdUA';
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    
    try {
        const textPreview = text.length > 50 ? text.substring(0, 50) + '...' : text;
        
        // Získej název hlasu z klíče (s fallbackem na neural_f)
        const voiceName = VOICES[voiceKey] || VOICES.neural_f;
        
        tacticalLog('SYSTEM', `🎙️ Generuji audio: "${textPreview}"`);
        tacticalLog('INFO', `   Klíč hlasu: ${voiceKey}`);
        tacticalLog('INFO', `   ID hlasu: ${voiceName}`);
        
        // ─────────────────────────────────────────────────────
        // REQUEST BODY (podle Google TTS API specifikace)
        // ─────────────────────────────────────────────────────
        const requestBody = {
            input: { 
                text: text 
            },
            voice: { 
                languageCode: 'cs-CZ',
                name: voiceName
            },
            audioConfig: { 
                audioEncoding: 'MP3',
                pitch: 0,               // Výška hlasu (0 = normální)
                speakingRate: 1.0       // Rychlost (1.0 = normální)
            }
        };

        // ─────────────────────────────────────────────────────
        // API CALL (s hlavičkami)
        // ─────────────────────────────────────────────────────
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // ─────────────────────────────────────────────────────
        // ERROR HANDLING
        // ─────────────────────────────────────────────────────
        if (!response.ok) {
            const errorData = await response.json();
            const errorMsg = errorData.error?.message || response.statusText;
            
            tacticalLog('ERROR', `🎙️ Google TTS API selhalo: ${response.status}`);
            tacticalLog('ERROR', `   Zpráva: ${errorMsg}`);
            
            throw new Error(`Google TTS API error: ${response.status} - ${errorMsg}`);
        }

        // ─────────────────────────────────────────────────────
        // SUCCESS - ZPRACOVÁNÍ ODPOVĚDI
        // ─────────────────────────────────────────────────────
        const data = await response.json();
        
        if (!data.audioContent) {
            tacticalLog('ERROR', '🎙️ Žádný audio obsah v odpovědi');
            throw new Error('No audio content in response');
        }

        const sizeKB = (data.audioContent.length / 1024).toFixed(2);
        const voiceType = getVoiceType(voiceName);
        
        tacticalLog('SYSTEM', `🎙️ Google Cloud TTS: Audio vygenerováno ✅`);
        tacticalLog('INFO', `   Hlas: ${voiceName} (${voiceType})`);
        tacticalLog('INFO', `   Velikost: ${sizeKB} KB`);
        
        // Zachovám původní console.log pro kompatibilitu
        console.log('🎙️ Google Cloud TTS: Audio generated ✅');
        console.log(`   Voice: ${voiceName} ✅`);
        console.log(`   Size: ${sizeKB} KB ✅`);
        
        return data.audioContent; // Base64 MP3
        
    } catch (error) {
        tacticalLog('ERROR', `🎙️ Google Cloud TTS kritická chyba: ${error.message}`);
        console.error('🎙️ [ERROR] Google TTS API selhalo:', error.message);
        return null;
    }
}

// ═══════════════════════════════════════════════════════════
// 🎚️ ZMĚNA HLASU
// ═══════════════════════════════════════════════════════════
export function setVoice(voiceKey) {
    if (VOICES[voiceKey]) {
        const oldVoice = currentVoice;
        currentVoice = VOICES[voiceKey];
        
        const oldType = getVoiceType(oldVoice);
        const newType = getVoiceType(currentVoice);
        
        tacticalLog('SYSTEM', `🎙️ Hlas změněn: ${oldType} → ${newType}`);
        tacticalLog('INFO', `   Starý ID: ${oldVoice}`);
        tacticalLog('INFO', `   Nový ID: ${currentVoice}`);
        
        // Zachovám původní console.log
        console.log(`🎙️ Voice changed to: ${currentVoice} ✅`);
        return true;
    }
    
    tacticalLog('ERROR', `🎙️ Neznámý klíč hlasu: ${voiceKey}`);
    tacticalLog('INFO', `   Použit fallback: ${VOICES.neural_f}`);
    console.error(`❌ Unknown voice key: ${voiceKey}`);
    return false;
}

// ═══════════════════════════════════════════════════════════
// 📋 ZÍSKÁNÍ DOSTUPNÝCH HLASŮ
// ═══════════════════════════════════════════════════════════
export function getAvailableVoices() {
    return VOICES;
}

// ═══════════════════════════════════════════════════════════
// 🎯 ZÍSKÁNÍ AKTUÁLNÍHO HLASU
// ═══════════════════════════════════════════════════════════
export function getCurrentVoice() {
    return currentVoice;
}

// ═══════════════════════════════════════════════════════════
// 🏷️ POMOCNÁ FUNKCE - Určení typu hlasu
// ═══════════════════════════════════════════════════════════
function getVoiceType(voiceId) {
    if (voiceId.includes('Neural2')) return '⚡ Neural2 (Premium AI)';
    if (voiceId.includes('Wavenet')) return '🎯 WaveNet (Vysoká kvalita)';
    if (voiceId.includes('Standard')) return '⚙️ Standard (Rychlý)';
    return '❓ Neznámý';
}

// ═══════════════════════════════════════════════════════════
// 🚀 INICIALIZACE
// ═══════════════════════════════════════════════════════════
tacticalLog('SYSTEM', '🎙️ Google Cloud TTS v6.3 CORRECTED načten ✅');
tacticalLog('INFO', `   Výchozí hlas: ${currentVoice}`);
tacticalLog('INFO', `   Typ: ${getVoiceType(currentVoice)}`);
tacticalLog('INFO', `   Dostupné hlasy: ${Object.keys(VOICES).length} (${countUniqueVoices()} unikátních)`);
tacticalLog('INFO', `   API klíč: UVNITŘ FUNKCE ✅ (podle AI Přehled)`);

console.log('%c═══════════════════════════════════════════════════════════', 'color: #6366f1');
console.log('%c🎙️ GOOGLE CLOUD TTS v6.3 CORRECTED', 'color: #10b981; font-weight: bold; font-size: 14px');
console.log('%c   Podle doporučení AI Přehled (Google)', 'color: #64748b; font-size: 11px');
console.log('%c═══════════════════════════════════════════════════════════', 'color: #6366f1');
console.log('%c⚡ Neural2-A: AKTIVNÍ (pouze ženský)', 'color: #8b5cf6; font-weight: bold');
console.log('%c🎯 WaveNet A+B: AKTIVNÍ', 'color: #06b6d4; font-weight: bold');
console.log('%c⚙️ Standard-A: DOSTUPNÝ', 'color: #64748b; font-weight: bold');
console.log('%c═══════════════════════════════════════════════════════════', 'color: #6366f1');

// ─────────────────────────────────────────────────────────
// POMOCNÁ FUNKCE - Počet unikátních hlasů
// ─────────────────────────────────────────────────────────
function countUniqueVoices() {
    const uniqueVoices = new Set(Object.values(VOICES));
    return uniqueVoices.size;
}