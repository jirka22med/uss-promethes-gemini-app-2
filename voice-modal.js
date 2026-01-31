// ═══════════════════════════════════════════════════════════
// 🔊 HLASOVÝ MODEL MODAL - USS PROMETHEUS v6.1 FIXED
// Voice Selector Integration + tacticalLog fallback
// ═══════════════════════════════════════════════════════════

import { setVoice, getCurrentVoice, getAvailableVoices } from './google-cloud-tts.js';

// ─────────────────────────────────────────────────────────
// ✅ FALLBACK PRO tacticalLog (pokud není v globálním scope)
// ─────────────────────────────────────────────────────────
const tacticalLog = window.tacticalLog || ((level, message) => {
    const timestamp = new Date().toLocaleTimeString('cs-CZ');
    const emoji = {
        'SYSTEM': '🔧',
        'ERROR': '❌',
        'INFO': 'ℹ️',
        'SUCCESS': '✅'
    }[level] || '📡';
    
    console.log(`[${timestamp}] [${level}] ${message}`);
    
    // Pokud existuje logDisplay v DOM, použij ho
    const logDisplay = document.getElementById('log-display');
    if (logDisplay) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-level">[${level}]</span> ${message}`;
        logDisplay.appendChild(logEntry);
        logDisplay.scrollTop = logDisplay.scrollHeight;
    }
});

// ─────────────────────────────────────────────────────────
// DOM ELEMENTY
// ─────────────────────────────────────────────────────────
const voiceToggleBtn = document.getElementById('hlasovi-model-toggle');
const voiceModalOverlay = document.getElementById('voice-modal-overlay');
const voiceModalClose = document.getElementById('voice-modal-close');
const voiceCards = document.querySelectorAll('.voice-card');
const currentVoiceDisplay = document.getElementById('current-voice-display');
const voiceIndicator = document.getElementById('hlasovi-model-indicator');

// ─────────────────────────────────────────────────────────
// ZOBRAZENÍ/SKRYTÍ MODALU
// ─────────────────────────────────────────────────────────
function openVoiceModal() {
    voiceModalOverlay.classList.add('active');
    updateCurrentVoiceDisplay();
    updateActiveCard();
    tacticalLog('SYSTEM', '🎙️ Hlasový modal otevřen');
}

function closeVoiceModal() {
    voiceModalOverlay.classList.remove('active');
    tacticalLog('SYSTEM', '🎙️ Hlasový modal zavřen');
}

// ─────────────────────────────────────────────────────────
// AKTUALIZACE UI
// ─────────────────────────────────────────────────────────
function updateCurrentVoiceDisplay() {
    const currentVoice = getCurrentVoice();
    if (currentVoiceDisplay) {
        currentVoiceDisplay.textContent = currentVoice;
    }
}

function updateActiveCard() {
    const currentVoice = getCurrentVoice();
    
    voiceCards.forEach(card => {
        const voiceName = card.getAttribute('data-voice-name');
        if (voiceName === currentVoice) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function updateVoiceIndicator() {
    if (voiceIndicator) {
        voiceIndicator.classList.remove('alert');
        voiceIndicator.classList.add('active');
    }
}

// ─────────────────────────────────────────────────────────
// ZMĚNA HLASU
// ─────────────────────────────────────────────────────────
function changeVoice(voiceType, voiceName) {
    // Změň hlas v google-cloud-tts.js
    const success = setVoice(voiceType);
    
    if (success) {
        // Aktualizuj UI
        updateCurrentVoiceDisplay();
        updateActiveCard();
        updateVoiceIndicator();
        
        // Ulož do localStorage
        localStorage.setItem('PROMETHEUS_VOICE_TYPE', voiceType);
        localStorage.setItem('PROMETHEUS_VOICE_NAME', voiceName);
        
        // Tactical log
        tacticalLog('SYSTEM', `🎙️ Hlas změněn: ${voiceName} ✅`);
        
        // Zavři modal po 0.5s
        setTimeout(() => {
            closeVoiceModal();
        }, 500);
        
    } else {
        tacticalLog('ERROR', `🎙️ Nepodařilo se změnit hlas: ${voiceType} ❌`);
    }
}

// ─────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────

// Otevření modalu
if (voiceToggleBtn) {
    voiceToggleBtn.onclick = () => {
        openVoiceModal();
    };
}

// Zavření modalu
if (voiceModalClose) {
    voiceModalClose.onclick = () => {
        closeVoiceModal();
    };
}

// Zavření kliknutím mimo modal
if (voiceModalOverlay) {
    voiceModalOverlay.onclick = (e) => {
        if (e.target === voiceModalOverlay) {
            closeVoiceModal();
        }
    };
}

// Kliknutí na voice card
voiceCards.forEach(card => {
    card.onclick = () => {
        const voiceType = card.getAttribute('data-voice');
        const voiceName = card.getAttribute('data-voice-name');
        changeVoice(voiceType, voiceName);
    };
});

// ─────────────────────────────────────────────────────────
// INICIALIZACE
// ─────────────────────────────────────────────────────────
function initVoiceModal() {
    // Načti uložený hlas z localStorage
    const savedVoiceType = localStorage.getItem('PROMETHEUS_VOICE_TYPE');
    const savedVoiceName = localStorage.getItem('PROMETHEUS_VOICE_NAME');
    
    if (savedVoiceType && savedVoiceName) {
        setVoice(savedVoiceType);
        tacticalLog('SYSTEM', `🎙️ Načten uložený hlas: ${savedVoiceName} ✅`);
    } else {
        // Výchozí hlas (male)
        setVoice('male');
        tacticalLog('SYSTEM', '🎙️ Výchozí hlas: cs-CZ-Wavenet-B (mužský) ✅');
    }
    
    updateVoiceIndicator();
}

// Spusť inicializaci
initVoiceModal();

// ─────────────────────────────────────────────────────────
// EXPORT PRO DEBUGGING
// ─────────────────────────────────────────────────────────
window.openVoiceModal = openVoiceModal;
window.closeVoiceModal = closeVoiceModal;
window.showCurrentVoice = () => {
    console.log(`%c🎙️ AKTUÁLNÍ HLAS: ${getCurrentVoice()}`, 'color: #10b981; font-weight: bold;');
    console.log('%c🎙️ Dostupné hlasy:', 'color: #6366f1; font-weight: bold;');
    console.table(getAvailableVoices());
};