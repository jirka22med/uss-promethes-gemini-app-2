// 🚀 MAIN TACTICAL ENGINE - USS PROMETHEUS v6.0 (GOOGLE CLOUD TTS)
// CHIEF ARCHITECT: Vice Admirál Jiřík + Admirál Claude
// STATUS: MAXIMUM POWER / GOOGLE CLOUD TTS / WAVENET TECHNOLOGY
// ═══════════════════════════════════════════════════════════════════════════

import { callGeminiAPI } from "./gemini-api.js";
import { generateSpeechGoogleCloud } from "./google-cloud-tts.js";
import { openCanvas, updatePreview, closeCanvas } from "./canvas-editor.js";
import { searchSerpAPI, formatSerpAPIResults, checkSerpAPIConfig } from "./serpapi-search.js";

// ─── DOM ELEMENTY (HLAVNÍ MŮSTEK) ───
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const modelSelector = document.getElementById('model-selector');
const sendBtn = document.getElementById('send-btn');
const fileInput = document.getElementById('file-input');
const attachBtn = document.getElementById('attach-btn');
const filePreviewContainer = document.getElementById('file-preview-container');
const voiceToggle = document.getElementById('voice-toggle');
const voiceIndicator = document.getElementById('voice-indicator');
const relinkApiBtn = document.getElementById('relink-api-btn');
const apiStatusDot = document.getElementById('api-status-dot');
const manualCanvasBtn = document.getElementById('manual-canvas-btn');

// ─── DOM ELEMENTY (MODÁLY A KALIBRACE) ───
const calibrationModal = document.getElementById('calibration-modal');
const closeCalibrationBtn = document.getElementById('close-calibration');
const manualKeyInput = document.getElementById('manual-api-key-input');
const saveManualKeyBtn = document.getElementById('save-manual-key-btn');

// ─── INTERNÍ STAV SYSTÉMU ───
let history = [];
let isVoiceEnabled = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔊 Audio kontrolní systém
let currentAudioSource = null;
let isAudioPlaying = false;
let audioTextLimit = parseInt(localStorage.getItem('PROMETHEUS_AUDIO_LIMIT')) || 2300;
let audioPlaybackRate = parseFloat(localStorage.getItem('PROMETHEUS_PLAYBACK_RATE')) || 0.8;
let lastAudioBase64 = null;
window.lastAudioBase64 = lastAudioBase64;

// ✅ MULTI-FILE SYSTÉM
let currentAttachments = []; // Array souborů místo jednoho
const MAX_FILES = 10; // Maximální počet souborů
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

const tacticalLog = (level, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
        'INFO': '#6366f1',
        'SYSTEM': '#10b981',
        'ERROR': '#ef4444',
        'CRITICAL': '#b91c1c'
    };
    console.log(`%c[${timestamp}] [${level}] %c${message}`, 
        `color: ${colors[level] || '#94a3b8'}; font-weight: bold`, 
        `color: #f1f5f9`);
};

function getCurrentTimestamp() {
    const now = new Date();
    const dny = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
    const mesice = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 
                    'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
    
    const denVTydnu = dny[now.getDay()];
    const den = now.getDate();
    const mesic = mesice[now.getMonth()];
    const rok = now.getFullYear();
    const hodiny = String(now.getHours()).padStart(2, '0');
    const minuty = String(now.getMinutes()).padStart(2, '0');
    
    return {
        full: `${denVTydnu} ${den}. ${mesic} ${rok}, ${hodiny}:${minuty}`,
        date: `${den}. ${mesic} ${rok}`,
        time: `${hodiny}:${minuty}`,
        year: rok,
        month: mesic,
        day: den,
        dayOfWeek: denVTydnu
    };
}

function getTimeContext() {
    const ts = getCurrentTimestamp();
    return `[AKTUÁLNÍ ČAS: ${ts.full}] [ROK: ${ts.year}] [POZOR: Tvoje interní data končí v květnu 2024, ale SKUTEČNÝ čas je ${ts.date}]\n\n`;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📨 SEND MESSAGE TO AI
// ═══════════════════════════════════════════════════════════════════════════

window.sendMessageToAI = async function(prompt) {
    tacticalLog('INFO', 'Externí požadavek z Canvasu přijat.');
    const fullPrompt = getTimeContext() + prompt;
    appendMessage('user', prompt);
    if (sendBtn) sendBtn.disabled = true;
    
    try {
        const responseText = await callGeminiAPI(modelSelector.value, fullPrompt, history, null);
        appendMessage('model', responseText);
        history.push(
            { role: 'user', parts: [{ text: fullPrompt }] }, 
            { role: 'model', parts: [{ text: responseText }] }
        );
        
        if (isVoiceEnabled) await handleTextToSpeech(responseText);
        
        const code = extractCode(responseText);
        if (code) {
            tacticalLog('SYSTEM', 'Kód detekován → posílám do Canvas');
            updatePreview(code);
            openCanvas(code, "STRATEGICKÁ REVIZE KÓDU");
        }
    } catch (err) {
        tacticalLog('CRITICAL', `Selhání: ${err.message}`);
        appendMessage('system', `⚠️ CHYBA: ${err.message}`);
    } finally {
        if (sendBtn) sendBtn.disabled = false;
    }
};

function appendMessage(role, content, attachments = null) {
    if (history.length === 0 && chatMessages.children.length === 1) {
        const firstChild = chatMessages.children[0];
        if (firstChild.classList.contains('initial-scan')) {
            chatMessages.innerHTML = '';
        }
    }
    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper msg-${role}`;
    const label = document.createElement('span');
    label.className = 'msg-label';
    label.textContent = role === 'user' ? 'VICE ADMIRÁL JIŘÍK' : 
                        role === 'system' ? 'TERMINÁL OHLÁŠENÍ' : 
                        'PROMETHEUS CORE';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // ✅ ZOBRAZ ATTACHMENTY (pokud existují)
    if (attachments && attachments.length > 0) {
        const attachmentContainer = document.createElement('div');
        attachmentContainer.style.cssText = "display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;";
        
        attachments.forEach(att => {
            if (att.mimeType.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = `data:${att.mimeType};base64,${att.base64}`;
                img.style.cssText = "max-width: 150px; max-height: 150px; border-radius: 6px; object-fit: contain; border: 1px solid var(--border-bright); box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);";
                attachmentContainer.appendChild(img);
            } else {
                const fileTag = document.createElement('div');
                fileTag.style.cssText = "padding: 6px 12px; background: var(--bg-surface); border: 1px solid var(--border-main); border-radius: 4px; font-size: 10px; color: var(--slate-text); font-family: 'Fira Code', monospace;";
                fileTag.textContent = `📄 ${att.name}`;
                attachmentContainer.appendChild(fileTag);
            }
        });
        
        bubble.appendChild(attachmentContainer);
    }
    
    const textPart = document.createElement('div');
    const formattedContent = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    textPart.innerHTML = formattedContent;
    textPart.style.textAlign = 'left';
    bubble.appendChild(textPart);
    wrapper.appendChild(label);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

function extractCode(text) {
    const match = text.match(/```(?:[a-zA-Z]*)\n([\s\S]*?)```/);
    return match ? match[1] : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔊 VYLEPŠENÝ AUDIO SYSTÉM
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 🎙️ ČIŠTĚNÍ TEXTU PRO TTS
 */
function cleanTextForSpeech(text) {
    let cleaned = text;
    
    // 1. Odstranit code bloky (```...```)
    cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
    
    // 2. Odstranit inline kód (`...`)
    cleaned = cleaned.replace(/`[^`]+`/g, '');
    
    // 3. Odstranit markdown syntaxi
    cleaned = cleaned.replace(/[*_#\[\]()]/g, '');
    
    // 4. Odstranit URL adresy
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '');
    
    // 5. Odstranit emojis a speciální znaky
    cleaned = cleaned.replace(/[🚀🔥✅⚠️🎯📡⚡🖖]/g, '');
    
    // 6. Odstranit nadbytečné bílé znaky
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // 7. Limit délky (konfigurovatelný uživatelem)
    if (cleaned.length > audioTextLimit) {
        // Inteligentní ořez na poslední celou větu
        const truncated = cleaned.substring(0, audioTextLimit);
        const lastPeriod = truncated.lastIndexOf('.');
        const lastQuestion = truncated.lastIndexOf('?');
        const lastExclamation = truncated.lastIndexOf('!');
        
        const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
        
        const minCutPoint = audioTextLimit - 300; // Toleranční okno
        
        if (lastSentenceEnd > minCutPoint) {
            // Máme rozumné místo pro ořez
            cleaned = truncated.substring(0, lastSentenceEnd + 1) + ' ... zbytek zprávy v chatu.';
        } else {
            // Žádná věta poblíž, hard cut
            cleaned = truncated + '... pokračování v chatu.';
        }
    }
    
    return cleaned;
}

/**
 * 🔊 HLAVNÍ TTS HANDLER
 */
async function handleTextToSpeech(text) {
    if (!isVoiceEnabled) return;
    
    // Zastavit předchozí audio
    stopAudio();
    
    // Vyčistit text
    const cleanText = cleanTextForSpeech(text);
    
    if (cleanText.length < 5) {
        tacticalLog('INFO', 'Text příliš krátký pro audio syntézu.');
        return;
    }
    
    // Vizuální feedback
    setAudioStatus('speaking');
    
    try {
        // ✅ GOOGLE CLOUD TTS (místo Gemini)
        const audioData = await generateSpeechGoogleCloud(cleanText);
        if (audioData) {
            await playAudioMP3(audioData);
        }
    } catch (error) {
        tacticalLog('ERROR', `TTS selhalo: ${error.message} ❌`);
        setAudioStatus('error');
    } finally {
        setTimeout(() => setAudioStatus('idle'), 1000);
    }
}

/**
 * 🔊 PŘEHRÁVÁNÍ MP3 AUDIO (Google Cloud TTS)
 */
async function playAudioMP3(base64MP3) {
    if (!base64MP3 || !isVoiceEnabled) return;
    
    // ✅ Ulož Base64 pro možný export
    lastAudioBase64 = base64MP3;
    window.lastAudioBase64 = base64MP3;
    
    try {
        // ✅ JEDNODUCHÉ: MP3 přehrání přes HTML5 Audio
        const audio = new Audio(`data:audio/mp3;base64,${base64MP3}`);
        
        // Ulož referenci pro možné zastavení
        currentAudioSource = audio;
        isAudioPlaying = true;
        
        // Event listeners
        audio.onended = () => {
            isAudioPlaying = false;
            currentAudioSource = null;
            setAudioStatus('idle');
        };
        
        audio.onerror = (e) => {
            tacticalLog('ERROR', `Přehrávání selhalo: ${e.message} ❌`);
            setAudioStatus('error');
            isAudioPlaying = false;
        };
        
        // Přehrání
        await audio.play();
        
        tacticalLog('SYSTEM', `🔊 Google Cloud TTS: Přehrávám (WaveNet kvalita) ✅`);
        
    } catch (error) {
        tacticalLog('ERROR', `Přehrávání audio: ${error.message} ❌`);
        setAudioStatus('error');
        isAudioPlaying = false;
    }
}

/**
 * 🔊 STARÁ FUNKCE playAudio (zachováno pro kompatibilitu - NEPOUŽÍVÁ SE)
 */
async function playAudio(base64) {
    if (!base64 || !isVoiceEnabled) return;
    
    // ✅ Ulož Base64 pro možný export
    lastAudioBase64 = base64;
    window.lastAudioBase64 = base64;
    
    try {
        // 1. Dekódování Base64 → binární data
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // 2. Převod na Int16Array (16-bit PCM audio)
        const dataInt16 = new Int16Array(bytes.buffer);
        
        // 🔥 OPRAVA: Zajistit správný sample rate (23kHz - testováno velitelem)
        const sampleRate = 23000;
        
        // 3. Vytvoření audio bufferu
        const buffer = audioCtx.createBuffer(1, dataInt16.length, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        // 🔥 OPRAVA: Normalizace audio dat s anti-clipping ochranou
        let maxAmplitude = 0;
        
        // Najít maximální amplitudu
        for (let i = 0; i < dataInt16.length; i++) {
            const normalized = Math.abs(dataInt16[i] / 32768.0);
            if (normalized > maxAmplitude) {
                maxAmplitude = normalized;
            }
        }
        
        // Normalizační faktor (pokud je audio příliš hlasité)
        const normalizationFactor = maxAmplitude > 0.95 ? 0.95 / maxAmplitude : 1.0;
        
        // Aplikovat normalizaci
        for (let i = 0; i < dataInt16.length; i++) {
            channelData[i] = (dataInt16[i] / 32768.0) * normalizationFactor;
        }
        
        // 4. Vytvoření audio source
        currentAudioSource = audioCtx.createBufferSource();
        currentAudioSource.buffer = buffer;
        
        // 🔥 NOVÉ: DynamicsCompressor pro odstranění šumu v pauzách
        const compressor = audioCtx.createDynamicsCompressor();
        compressor.threshold.value = -50;     // dB - práh pro kompresi
        compressor.knee.value = 40;           // Hladký přechod
        compressor.ratio.value = 12;          // Kompresní poměr (12:1)
        compressor.attack.value = 0;          // Okamžitá reakce
        compressor.release.value = 0.25;      // 250ms release
        
        // 🔥 OPRAVA: Gain Node pro kontrolu hlasitosti
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.85; // 85% hlasitost
        
        // 🔥 AUDIO CHAIN: Source → Compressor → Gain → Destination
        currentAudioSource.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Event listener pro konec přehrávání
        currentAudioSource.onended = () => {
            isAudioPlaying = false;
            currentAudioSource = null;
            compressor.disconnect();
            gainNode.disconnect();
            setAudioStatus('idle');
        };
        
        isAudioPlaying = true;
        currentAudioSource.start();
        
        tacticalLog('SYSTEM', '🔊 Přehrávám s noise reduction (DynamicsCompressor) ✅');
        tacticalLog('SYSTEM', 'Audio syntéza dokončena. Přehrávám čistě...');
    } catch (e) { 
        tacticalLog('ERROR', `Audio dekodér selhal: ${e.message}`);
        setAudioStatus('error');
        isAudioPlaying = false;
    }
}

/**
 * ⛔ ZASTAVENÍ AUDIA
 */
function stopAudio() {
    if (currentAudioSource && isAudioPlaying) {
        try {
            // ✅ Podporuje jak BufferSource tak HTML5 Audio
            if (typeof currentAudioSource.pause === 'function') {
                // HTML5 Audio (Google Cloud TTS)
                currentAudioSource.pause();
                currentAudioSource.currentTime = 0;
            } else if (typeof currentAudioSource.stop === 'function') {
                // BufferSource (starý způsob)
                currentAudioSource.stop();
                currentAudioSource.disconnect();
            }
        } catch (e) {
            // Audio už mohlo skončit
        }
        currentAudioSource = null;
        isAudioPlaying = false;
        tacticalLog('SYSTEM', 'Audio přehrávání zastaveno.');
    }
}

/**
 * 📊 VIZUÁLNÍ STATUS AUDIA
 */
function setAudioStatus(status) {
    if (!voiceIndicator) return;
    
    voiceIndicator.classList.remove('active', 'speaking', 'error');
    
    switch(status) {
        case 'idle':
            if (isVoiceEnabled) voiceIndicator.classList.add('active');
            break;
        case 'speaking':
            voiceIndicator.classList.add('speaking');
            break;
        case 'error':
            voiceIndicator.classList.add('error');
            break;
    }
}



// ═══════════════════════════════════════════════════════════════════════════
// 📁 MULTI-FILE SYSTÉM
// ═══════════════════════════════════════════════════════════════════════════

function updateFilePreview() {
    const container = filePreviewContainer;
    const list = document.getElementById('file-preview-list');
    const countDisplay = document.getElementById('file-count-display');
    
    if (currentAttachments.length === 0) {
        container.classList.add('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    countDisplay.textContent = `${currentAttachments.length} SOUBORŮ`;
    
    list.innerHTML = '';
    
    currentAttachments.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';
        
        // Preview (obrázek nebo ikona)
        if (file.mimeType.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = `data:${file.mimeType};base64,${file.base64}`;
            item.appendChild(img);
        } else {
            const icon = document.createElement('div');
            icon.className = 'file-icon';
            icon.textContent = getFileIcon(file.mimeType);
            item.appendChild(icon);
        }
        
        // Název souboru
        const nameLabel = document.createElement('div');
        nameLabel.className = 'file-name-label';
        nameLabel.textContent = file.name;
        nameLabel.title = file.name;
        item.appendChild(nameLabel);
        
        // Tlačítko odstranit
        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => removeFile(index);
        item.appendChild(removeBtn);
        
        list.appendChild(item);
    });
}

function getFileIcon(mimeType) {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('text')) return '📝';
    if (mimeType.includes('json')) return '📋';
    if (mimeType.includes('javascript') || mimeType.includes('python')) return '⚙️';
    if (mimeType.includes('html')) return '🌐';
    return '📎';
}

function removeFile(index) {
    currentAttachments.splice(index, 1);
    updateFilePreview();
    tacticalLog('SYSTEM', `Soubor odstraněn. Zbývá: ${currentAttachments.length}`);
}

function clearAllFiles() {
    currentAttachments = [];
    updateFilePreview();
    fileInput.value = '';
    tacticalLog('SYSTEM', 'Všechny soubory vymazány');
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔍 SERPAPI SEARCH MODULE
// ─────────────────────────────────────────────────────────────────────────────

async function handleSearchRequest(query) {
    try {
        tacticalLog('INFO', `SerpAPI vyhledávání: "${query}"`);
        appendMessage('system', `🔍 Vyhledávám: "${query}"...`);
        const results = await searchSerpAPI(query, 5);
        if (results && results.length > 0) {
            const formatted = formatSerpAPIResults(results);
            tacticalLog('SYSTEM', `Nalezeno ${results.length} výsledků`);
            return formatted;
        } else {
            tacticalLog('ERROR', 'Žádné výsledky nenalezeny');
            return "Žádné výsledky z vyhledávání.";
        }
    } catch (error) {
        tacticalLog('ERROR', `SerpAPI chyba: ${error.message}`);
        return `⚠️ Chyba vyhledávání: ${error.message}`;
    }
}

function updateConfigStatus() {
    const geminiKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY');
    const serpKey = localStorage.getItem('PROMETHEUS_SERPAPI_KEY');
    const geminiStatus = document.getElementById('gemini-status');
    const serpApiStatus = document.getElementById('serpapi-status');
    
    // ═══════════════════════════════════════════════════════════
    // GEMINI API STATUS
    // ═══════════════════════════════════════════════════════════
    if (geminiStatus) {
        if (!geminiKey || geminiKey.length === 0) {
            // ⚠️ VAROVÁNÍ - žádný klíč
            geminiStatus.innerHTML = `<span style="color: var(--amber);">⚠️ Nový uživatel - musíte zadat API klíč</span>`;
        } else if (geminiKey.length < 20) {
            // ❌ CHYBA - nevalidní klíč
            geminiStatus.innerHTML = `<span style="color: var(--red);">❌ API klíč se špatně načetl - zadejte klíč znovu pro opravu chyby</span>`;
        } else {
            // ✅ READY - klíč OK
            geminiStatus.innerHTML = `<span style="color: var(--emerald);">✅ Váš API klíč je plně funkční</span>`;
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // SERPAPI STATUS
    // ═══════════════════════════════════════════════════════════
    if (serpApiStatus) {
        if (!serpKey || serpKey.length === 0) {
            // ⚠️ VAROVÁNÍ - žádný klíč
            serpApiStatus.innerHTML = `<span style="color: var(--amber);">⚠️ Nový uživatel - musíte zadat API klíč</span>`;
        } else if (serpKey.length < 20) {
            // ❌ CHYBA - nevalidní klíč
            serpApiStatus.innerHTML = `<span style="color: var(--red);">❌ API klíč se špatně načetl - zadejte klíč znovu pro opravu chyby</span>`;
        } else {
            // ✅ READY - klíč OK
            serpApiStatus.innerHTML = `<span style="color: var(--emerald);">✅ Váš API klíč je plně funkční</span>`;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📨 HLAVNÍ CHAT SUBMIT
// ═══════════════════════════════════════════════════════════════════════════

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const hasApiKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY') || process.env.API_KEY;
    if (!hasApiKey) {
        tacticalLog('CRITICAL', 'API klíč nenastaven!');
        appendMessage('error', '⚠️ CHYBA: Gemini API klíč není nastaven. Klikni na "Rekalibrovat".');
        return;
    }

    const isSearchQuery = /^(vyhledej|najdi|hledej|search|find)\s+/i.test(userMessage);
    if (isSearchQuery) {
        const searchQuery = userMessage.replace(/^(vyhledej|najdi|hledej|search|find)\s+/i, '').trim();
        const serpConfig = checkSerpAPIConfig();
        if (!serpConfig.configured) {
            appendMessage('system', '⚠️ CHYBA: SerpAPI klíč není nastaven. Nakonfiguruj ho v "Rekalibrovat".');
            return;
        }
        const searchResults = await handleSearchRequest(searchQuery);
        const fullPrompt = getTimeContext() + `Uživatel požádal o vyhledávání "${searchQuery}". Tady jsou výsledky:\n\n${searchResults}\n\nShrň klíčové informace stručně a jasně.`;
        appendMessage('user', userMessage);
        chatInput.value = '';
        sendBtn.disabled = true;
        sendBtn.textContent = 'Analyzuji...';
        try {
            const responseText = await callGeminiAPI(modelSelector.value, fullPrompt, history, null);
            appendMessage('model', responseText);
            history.push(
                { role: 'user', parts: [{ text: fullPrompt }] },
                { role: 'model', parts: [{ text: responseText }] }
            );
            if (isVoiceEnabled) await handleTextToSpeech(responseText);
        } catch (error) {
            tacticalLog('CRITICAL', `Chyba: ${error.message}`);
            appendMessage('error', `⚠️ CHYBA: ${error.message}`);
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Vyslat';
        }
        return;
    }

    const fullPrompt = getTimeContext() + userMessage;
    
    // ✅ Přidej info o přiložených souborech
    if (currentAttachments.length > 0) {
        const fileInfo = currentAttachments.map(f => `- ${f.name} (${f.mimeType})`).join('\n');
        fullPrompt + `\n\nPřiložené soubory:\n${fileInfo}`;
    }
    
    appendMessage('user', userMessage, currentAttachments.length > 0 ? currentAttachments : null);
    chatInput.value = '';

    sendBtn.disabled = true;
    sendBtn.textContent = 'Přenos...';

    try {
        // ✅ POSÍLEJ POUZE PRVNÍ SOUBOR (Gemini API limit)
        const firstAttachment = currentAttachments.length > 0 ? currentAttachments[0] : null;
        
        if (currentAttachments.length > 1) {
            tacticalLog('INFO', `Posílám ${currentAttachments.length} souborů, ale Gemini akceptuje pouze první.`);
        }
        
        const responseText = await callGeminiAPI(
            modelSelector.value,
            fullPrompt,
            history,
            firstAttachment
        );

        appendMessage('model', responseText);

        history.push(
            { role: 'user', parts: [{ text: fullPrompt }] },
            { role: 'model', parts: [{ text: responseText }] }
        );

        // ✅ Vymaž attachmenty po odeslání
        clearAllFiles();

        if (isVoiceEnabled) await handleTextToSpeech(responseText);

        const code = extractCode(responseText);
        if (code) {
            tacticalLog('SYSTEM', 'Kód detekován → Canvas');
            openCanvas(code, "Tactical Output");
        }
    } catch (error) {
        tacticalLog('CRITICAL', `Chyba: ${error.message}`);
        appendMessage('error', `⚠️ CHYBA: ${error.message}`);
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Vyslat';
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// ⚙️ UI CONTROLS
// ─────────────────────────────────────────────────────────────────────────────

attachBtn.onclick = () => fileInput.click();

// ✅ NOVÝ FILE INPUT HANDLER - MULTIPLE FILES
fileInput.onchange = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Kontrola limitu
    if (currentAttachments.length + files.length > MAX_FILES) {
        tacticalLog('ERROR', `⚠️ Maximum ${MAX_FILES} souborů!`);
        appendMessage('system', `⚠️ LIMIT: Maximálně ${MAX_FILES} souborů najednou.`);
        return;
    }
    
    tacticalLog('INFO', `Nahrávám ${files.length} souborů...`);
    
    for (const file of files) {
        // Kontrola velikosti
        if (file.size > MAX_FILE_SIZE) {
            tacticalLog('ERROR', `⚠️ Soubor ${file.name} je příliš velký (max 10MB)`);
            continue;
        }
        
        // Načti soubor
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        await new Promise((resolve) => {
            reader.onload = () => {
                currentAttachments.push({
                    name: file.name,
                    mimeType: file.type,
                    base64: reader.result.split(',')[1]
                });
                resolve();
            };
        });
    }
    
    updateFilePreview();
    fileInput.value = ''; // Reset input
    tacticalLog('SYSTEM', `✅ ${files.length} souborů nahráno. Celkem: ${currentAttachments.length}`);
};

// ✅ CLEAR ALL FILES BUTTON
const clearAllBtn = document.getElementById('clear-all-files-btn');
if (clearAllBtn) {
    clearAllBtn.onclick = clearAllFiles;
}

voiceToggle.onclick = () => {
    isVoiceEnabled = !isVoiceEnabled;
    
    if (isVoiceEnabled) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        setAudioStatus('idle');
        tacticalLog('SYSTEM', 'Audio systémy: AKTIVNÍ');
        
        // Zobrazit nastavení audio limitu
        showAudioSettings();
    } else {
        stopAudio(); // Zastavit při vypnutí
        voiceIndicator.classList.remove('active', 'speaking', 'error');
        tacticalLog('SYSTEM', 'Audio systémy: DEAKTIVOVÁNY');
        
        // Skrýt nastavení
        hideAudioSettings();
    }
};

// 🎛️ AUDIO NASTAVENÍ UI
function showAudioSettings() {
    const existing = document.getElementById('audio-settings-panel');
    if (existing) return; // Už existuje
    
    const panel = document.createElement('div');
    panel.id = 'audio-settings-panel';
    panel.style.cssText = `
        position: fixed;
        bottom: 140px;
        right: 20px;
        background: var(--bg-surface);
        border: 1px solid var(--border-bright);
        border-radius: var(--radius-lg);
        padding: 1.2rem;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        z-index: 9999;
        min-width: 280px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    panel.innerHTML = `
        <div style="font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 800; color: var(--indigo-primary); margin-bottom: 1rem; letter-spacing: 0.1em;">
            ⚙️ AUDIO KALIBRACE
        </div>
        <div style="margin-bottom: 0.8rem;">
            <label style="font-family: 'Fira Code', monospace; font-size: 10px; color: var(--slate-text); display: block; margin-bottom: 0.5rem;">
                DÉLKA ČTENÍ: <span id="audio-limit-value" style="color: var(--indigo-primary); font-weight: bold;">${audioTextLimit}</span> znaků
            </label>
            <input 
                type="range" 
                id="audio-limit-slider" 
                min="500" 
                max="2300" 
                step="100" 
                value="${audioTextLimit}"
                style="width: 100%; accent-color: var(--indigo-primary);"
            >
            <div style="display: flex; justify-content: space-between; font-size: 8px; color: var(--slate-text); margin-top: 0.3rem; font-family: 'Fira Code', monospace;">
                <span>500</span>
                <span>1400</span>
                <span>2300</span>
            </div>
        </div>
        <div style="font-size: 9px; color: var(--slate-text); line-height: 1.4; font-family: 'Inter', sans-serif;">
            💡 <strong>500-1000:</strong> Rychlé odpovědi<br>
            💡 <strong>1500-2000:</strong> Vyvážené (doporučeno)<br>
            💡 <strong>2500-3000:</strong> Maximální délka
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Event listener pro slider
    const slider = document.getElementById('audio-limit-slider');
    const valueDisplay = document.getElementById('audio-limit-value');
    
    slider.oninput = (e) => {
        audioTextLimit = parseInt(e.target.value);
        valueDisplay.textContent = audioTextLimit;
        localStorage.setItem('PROMETHEUS_AUDIO_LIMIT', audioTextLimit);
        tacticalLog('SYSTEM', `Audio limit aktualizován: ${audioTextLimit} znaků`);
    };
}

function hideAudioSettings() {
    const panel = document.getElementById('audio-settings-panel');
    if (panel) {
        panel.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => panel.remove(), 300);
    }
}

relinkApiBtn.onclick = () => calibrationModal.classList.remove('hidden');
closeCalibrationBtn.onclick = () => calibrationModal.classList.add('hidden');


relinkApiBtn.onclick = () => {
    calibrationModal.classList.remove('hidden');
    updateConfigStatus();
    
    // ✅ NAČTI SKUTEČNÉ KLÍČE DO VALUE (ne placeholder!)
    const geminiKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY');
    const serpKey = localStorage.getItem('PROMETHEUS_SERPAPI_KEY');
    
    const geminiInput = manualKeyInput;
    const serpInput = document.getElementById('serpapi-key-input');
    
    // ✅ Nastav SKUTEČNÉ hodnoty (budou zobrazeny jako ••••••• protože type="password")
    if (geminiKey && geminiInput) {
        geminiInput.value = geminiKey;  // SKUTEČNÝ klíč
        geminiInput.type = 'password';   // Jako tečky
    } else if (geminiInput) {
        geminiInput.value = '';
        geminiInput.placeholder = 'AIzaSy...';
    }
    
    if (serpKey && serpInput) {
        serpInput.value = serpKey;       // SKUTEČNÝ klíč
        serpInput.type = 'password';     // Jako tečky
    } else if (serpInput) {
        serpInput.value = '';
        serpInput.placeholder = 'váš_serpapi_klíč';
    }
    
    // ✅ Reset toggle tlačítek na výchozí stav
    const toggleGeminiBtn = document.getElementById('toggle-gemini-visibility');
    const toggleSerpBtn = document.getElementById('toggle-serpapi-visibility');
    
    if (toggleGeminiBtn) {
        toggleGeminiBtn.innerHTML = '<span id="gemini-eye-icon">👁️</span> Zobrazit';
    }
    
    if (toggleSerpBtn) {
        toggleSerpBtn.innerHTML = '<span id="serpapi-eye-icon">👁️</span> Zobrazit';
    }
};

closeCalibrationBtn.onclick = () => calibrationModal.classList.add('hidden');

saveManualKeyBtn.onclick = () => {
    const geminiKey = manualKeyInput.value.trim();
    const serpApiKey = document.getElementById('serpapi-key-input')?.value.trim();
    let saved = false;
    let messages = [];
    
    if (geminiKey && geminiKey.length > 10) {
        localStorage.setItem('PROMETHEUS_MANUAL_KEY', geminiKey);
        saved = true;
        messages.push('✅ Gemini API klíč uložen');
        tacticalLog('SYSTEM', 'Gemini API klíč uložen');
    }
    
    if (serpApiKey && serpApiKey.length > 10) {
        localStorage.setItem('PROMETHEUS_SERPAPI_KEY', serpApiKey);
        saved = true;
        messages.push('✅ SerpAPI klíč uložen');
        tacticalLog('SYSTEM', 'SerpAPI klíč uložen');
    }
    
    if (saved) {
        // ✅ PONECH hodnoty v inputech (nemazat!)
        // Input zůstane s type="password" takže vidíš tečky
        
        updateConfigStatus();
        calibrationModal.classList.add('hidden');
        appendMessage('system', messages.join('\n'));
        apiStatusDot.classList.remove('alert');
        apiStatusDot.classList.add('active');
    } else {
        appendMessage('system', '⚠️ CHYBA: Nevyplnil jsi žádné pole.');
    }
};

manualCanvasBtn.onclick = () => {
    openCanvas("// SYSTÉM PŘIPRAVEN PRO PŘÍJEM TAKTICKÝCH DAT ...", "RUČNÍ PŘEVZETÍ OVLÁDÁNÍ");
};

// ✅ TOGGLE PASSWORD VISIBILITY HANDLERS
const toggleGeminiBtn = document.getElementById('toggle-gemini-visibility');
const toggleSerpBtn = document.getElementById('toggle-serpapi-visibility');

if (toggleGeminiBtn) {
    toggleGeminiBtn.onclick = () => {
        const input = manualKeyInput;
        const icon = document.getElementById('gemini-eye-icon');
        if (input.type === 'password') {
            input.type = 'text';
            icon.textContent = '🔒';
            toggleGeminiBtn.innerHTML = '<span id="gemini-eye-icon">🔒</span> Skrýt';
        } else {
            input.type = 'password';
            icon.textContent = '👁️';
            toggleGeminiBtn.innerHTML = '<span id="gemini-eye-icon">👁️</span> Zobrazit';
        }
    };
}

if (toggleSerpBtn) {
    toggleSerpBtn.onclick = () => {
        const input = document.getElementById('serpapi-key-input');
        const icon = document.getElementById('serpapi-eye-icon');
        if (input && input.type === 'password') {
            input.type = 'text';
            icon.textContent = '🔒';
            toggleSerpBtn.innerHTML = '<span id="serpapi-eye-icon">🔒</span> Skrýt';
        } else if (input) {
            input.type = 'password';
            icon.textContent = '👁️';
            toggleSerpBtn.innerHTML = '<span id="serpapi-eye-icon">👁️</span> Zobrazit';
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ DEVTOOLS PŘÍKAZY
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ DEVTOOLS PŘÍKAZY - AUDIO EXPORT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 💾 EXPORT AUDIO DO WAV SOUBORU
 */
function exportAudioToWAV(base64Data, filename = `prometheus-audio-${Date.now()}.wav`) {
    try {
        // 1. Dekóduj Base64 → binární data
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // 2. Převod na Int16Array (PCM)
        const dataInt16 = new Int16Array(bytes.buffer);
        
        // 3. Vytvoř WAV header (23kHz - shodné s playback)
        const sampleRate = 23000;
        const numChannels = 1;
        const bitsPerSample = 16;
        const byteRate = sampleRate * numChannels * bitsPerSample / 8;
        const blockAlign = numChannels * bitsPerSample / 8;
        const dataSize = dataInt16.length * 2;
        
        // WAV file structure
        const wavBuffer = new ArrayBuffer(44 + dataSize);
        const view = new DataView(wavBuffer);
        
        // RIFF chunk descriptor
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + dataSize, true);
        writeString(view, 8, 'WAVE');
        
        // fmt sub-chunk
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
        view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, byteRate, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitsPerSample, true);
        
        // data sub-chunk
        writeString(view, 36, 'data');
        view.setUint32(40, dataSize, true);
        
        // Write PCM data
        for (let i = 0; i < dataInt16.length; i++) {
            view.setInt16(44 + i * 2, dataInt16[i], true);
        }
        
        // 4. Vytvoř Blob a stáhni
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        tacticalLog('SYSTEM', `💾 Audio exportováno: ${filename} ✅`);
    } catch (error) {
        tacticalLog('ERROR', `Export selhal: ${error.message} ❌`);
    }
}

// Helper funkce pro zápis stringu do DataView
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

window.setAudioSpeed = (speed) => {
    audioPlaybackRate = parseFloat(speed);
    localStorage.setItem('PROMETHEUS_PLAYBACK_RATE', audioPlaybackRate);
    console.log(`%c🔊 Audio rychlost nastavena na ${audioPlaybackRate}x`, 'color: #10b981; font-weight: bold;');
};

window.exportLastAudio = (filename = `prometheus-audio-${Date.now()}.wav`) => {
    if (window.lastAudioBase64) {
        exportAudioToWAV(window.lastAudioBase64, filename);
        console.log(`%c💾 Audio exportováno: ${filename}`, 'color: #10b981; font-weight: bold;');
    } else {
        console.warn('%c⚠️ Žádné audio k exportu', 'color: #f59e0b; font-weight: bold;');
    }
};

window.audioHelp = () => {
    console.log('%c🔊 AUDIO COMMANDS', 'color: #6366f1; font-weight: bold; font-size: 14px;');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  setAudioSpeed(0.8)     - Nastav rychlost (0.5-1.5)');
    console.log('  exportLastAudio()       - Exportuj poslední audio');
    console.log('  exportLastAudio("jmeno.wav") - Export s vlastním jménem');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
};

// ✅ MULTI-FILE DEVTOOLS
window.showFiles = () => {
    console.log(`%c📁 PŘILOŽENÉ SOUBORY (${currentAttachments.length})`, 'color: #6366f1; font-weight: bold;');
    currentAttachments.forEach((f, i) => {
        console.log(`  ${i + 1}. ${f.name} (${f.mimeType}) - ${(f.base64.length / 1024).toFixed(2)} KB`);
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// 🚀 INICIALIZACE SYSTÉMU 
// ─────────────────────────────────────────────────────────────────────────────

const startTime = getCurrentTimestamp();
tacticalLog('SYSTEM', `USS PROMETHEUS v5.9 zkalibrován. ${startTime.full}`);
appendMessage('system', `Všechny systémy online.\nPřipraven k akci, vice admirále.\n\n📅 ${startTime.date}\n🕐 ${startTime.time}\n🔊 Audio: ${audioPlaybackRate}x rychlost\n📁 Multi-file: ${MAX_FILES} souborů max`);

const serpConfig = checkSerpAPIConfig();
if (serpConfig.configured) {
    tacticalLog('SYSTEM', 'SerpAPI: AKTIVNÍ ✅');
} else {
    tacticalLog('INFO', 'SerpAPI: Neaktivní (nakonfiguruj v Rekalibrovat)');
}

updateConfigStatus();

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

if (localStorage.getItem('PROMETHEUS_MANUAL_KEY')) {
    apiStatusDot.classList.remove('alert');
    apiStatusDot.classList.add('active');
    tacticalLog('SYSTEM', 'API klíče načteny z paměti');
}

tacticalLog('SYSTEM', `🔊 Audio Module v2.0 ACTIVE (${audioPlaybackRate}x speed)`);
tacticalLog('SYSTEM', `📁 Multi-File Upload ACTIVE (max ${MAX_FILES} files)`);
console.log('%c🔊 AUDIO: Type audioHelp() for commands', 'color: #10b981; font-weight: bold;');
console.log('%c📁 FILES: Type showFiles() to list attachments', 'color: #6366f1; font-weight: bold;');