// ═══════════════════════════════════════════════════════════
// 🎨 CANVAS EDITOR - USS PROMETHEUS v5.0 (HYBRID AUTO-DETECTION)
// STATUS: FULL POWER / AUTO-TRIGGER SYSTEM / PROPER TEXT WRAPPING
// CHIEF ENGINEERS: Vice Admirál Jiřík & Admirál Claude.AI
// ═══════════════════════════════════════════════════════════

// Globální reference pro stabilní přístup
let appContainer, canvasPanel, canvasEditor, canvasPreview;
let viewCodeBtn, viewPreviewBtn, closeBtn;

let isEditMode = false;
let originalContent = '';

// ═══════════════════════════════════════════════════════════
// 🤖 HYBRIDNÍ AUTO-DETEKCE SYSTÉM
// ═══════════════════════════════════════════════════════════
let chatObserver = null;
let backupTimer = null;
let lastProcessedMessage = null;
let lastCheckTime = 0;
const CHECK_THROTTLE = 500; // Kontroluj max 1x za 500ms

// Regex patterns pro detekci - FLEXIBILNÍ VERZE
const CODE_BLOCK_REGEX = /```(javascript|text|style\.css|suno\.ai|html)\n([\s\S]*?)```/g;
const CONFIRM_PHRASE_REGEX = /taktick[áa] data (?:byl[ay]? )?odesl[áa]n[ay]? na (?:hlavn[ií] )?obrazovku|canvas|data (?:p.edan[ay]?|odesl[áa]n[ay]?) do canvasu/i;

// Mapování typů na titulky
const TYPE_TITLES = {
    'javascript': '⚡ JavaScript Kód',
    'text': '📄 Textový Výstup',
    'style.css': '🎨 CSS Styly',
    'suno.ai': '🎵 Suno.ai Text',
    'html': '🌐 HTML Kód'
};

function initAutoCanvasDetector() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) {
        console.warn('⚠️ Chat messages nenalezen - auto-detekce odložena');
        return;
    }

    // Cleanup předchozího observeru
    if (chatObserver) {
        chatObserver.disconnect();
    }

    chatObserver = new MutationObserver((mutations) => {
        // Najdi poslední msg-model (aktuální Gemini zprávu)
        const lastModelMessage = chatContainer.querySelector('.msg-model:last-child');
        
        if (lastModelMessage) {
            handleNewAssistantMessage(lastModelMessage);
        }
    });

    chatObserver.observe(chatContainer, {
        childList: true,      // Nové zprávy
        subtree: true,        // Změny uvnitř zpráv
        characterData: true   // Změny textu (streaming!)
    });

    console.log('✅ AUTO-DETEKCE AKTIVOVÁNA - Hybridní režim (msg-model)');
}

function handleNewAssistantMessage(messageElement) {
    // Throttling - nevolej příliš často během streamingu
    const now = Date.now();
    if (now - lastCheckTime < CHECK_THROTTLE) {
        return;
    }
    lastCheckTime = now;
    
    const messageText = messageElement.textContent || messageElement.innerText;
    
    // Prevence duplicitního zpracování
    if (lastProcessedMessage === messageText) {
        return;
    }

    // ═══════════════════════════════════════════════════════
    // PRIORITA 1: INSTANT TRIGGER (potvrzovací fráze)
    // ═══════════════════════════════════════════════════════
    if (CONFIRM_PHRASE_REGEX.test(messageText)) {
        console.log('✅ AUTO-DETEKCE: Potvrzení detekováno - INSTANT otevření');
        lastProcessedMessage = messageText;
        clearTimeout(backupTimer);
        
        const codeBlocks = extractCodeBlocks(messageText);
        if (codeBlocks.length > 0) {
            const primaryBlock = codeBlocks[0];
            console.log(`📂 Otevírám Canvas: ${TYPE_TITLES[primaryBlock.type] || 'Taktický Výstup'}`);
            openCanvas(primaryBlock.content, TYPE_TITLES[primaryBlock.type] || 'Taktický Výstup');
            showToast('🚀 CANVAS AUTO-OTEVŘEN', 'success');
        }
        return;
    }

    // ═══════════════════════════════════════════════════════
    // PRIORITA 2: BACKUP TRIGGER (6s delay bez potvrzení)
    // ═══════════════════════════════════════════════════════
    const codeBlocks = extractCodeBlocks(messageText);
    if (codeBlocks.length > 0 && messageText !== lastProcessedMessage) {
        clearTimeout(backupTimer);
        console.log(`⏳ AUTO-DETEKCE: Code block nalezen - backup timer (6s)`);
        
        backupTimer = setTimeout(() => {
            if (lastProcessedMessage !== messageText && !CONFIRM_PHRASE_REGEX.test(messageText)) {
                console.log('⚠️ AUTO-DETEKCE: Backup timer vypršel - otevírám Canvas');
                lastProcessedMessage = messageText;
                const block = codeBlocks[0];
                openCanvas(block.content, TYPE_TITLES[block.type] || 'Taktický Výstup');
                showToast('⚠️ CANVAS AUTO-OTEVŘEN (Backup)', 'info');
            }
        }, 3000);
    }
}

function extractCodeBlocks(text) {
    const blocks = [];
    let match;
    
    // Reset regex index
    CODE_BLOCK_REGEX.lastIndex = 0;
    
    while ((match = CODE_BLOCK_REGEX.exec(text)) !== null) {
        blocks.push({
            type: match[1],
            content: match[2].trim()
        });
        console.log(`🔎 Code block nalezen: type="${match[1]}", velikost=${match[2].trim().length} znaků`);
    }
    
    if (blocks.length > 0) {
        console.log(`📊 Celkem nalezeno ${blocks.length} code bloků`);
    }
    
    return blocks;
}

// ─────────────────────────────────────────────────────────
// 📂 OTEVŘENÍ CANVAS
// ─────────────────────────────────────────────────────────
export function openCanvas(content, title = "Taktický Výstup") {
    const titleEl = document.getElementById('canvas-title');
    if (titleEl) titleEl.textContent = title;
    
    // Lazy loading elementů pro jistotu
    appContainer = appContainer || document.getElementById('app');
    canvasPanel = canvasPanel || document.getElementById('canvas-panel');
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    
    if (appContainer && canvasPanel && canvasEditor) {
        appContainer.classList.add('canvas-active');
        canvasPanel.classList.remove('hidden');
        canvasEditor.value = content;
        updatePreview(content);
        exitEditMode();
    }
}

// ─────────────────────────────────────────────────────────
// ❌ ZAVŘENÍ CANVAS
// ─────────────────────────────────────────────────────────
export function closeCanvas() {
    appContainer = appContainer || document.getElementById('app');
    canvasPanel = canvasPanel || document.getElementById('canvas-panel');
    
    if (appContainer && canvasPanel) {
        appContainer.classList.remove('canvas-active');
        canvasPanel.classList.add('hidden');
        exitEditMode();
    }
}

// ─────────────────────────────────────────────────────────
// 👁️ NÁHLED A RENDERING (OPRAVENO PRO FORMÁTOVÁNÍ)
// ─────────────────────────────────────────────────────────
export function updatePreview(content) {
    canvasPreview = canvasPreview || document.getElementById('canvas-preview');
    if (!canvasPreview) return;

    const isHtml = content.includes('<html>') || content.includes('<!DOCTYPE html>') || content.includes('<div');
    const isLyrics = content.includes('[Verse]') || content.includes('[Chorus]');

    if (isHtml && !isLyrics) {
        // HTML PREVIEW - zachováno
        canvasPreview.innerHTML = `<iframe srcdoc='${content.replace(/'/g, "&apos;")}' style="width: 100%; height: 100%; border: none; background: white;" sandbox="allow-scripts"></iframe>`;
    } else if (isLyrics) {
        // LYRICS PREVIEW - zachováno
        const formatted = content
            .replace(/\[(.*?)\]/g, '<div class="suno-tag">[$1]</div>')
            .replace(/\n/g, '<br/>');
        canvasPreview.innerHTML = `<div class="p-10 text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto">${formatted}</div>`;
    } else {
        // 🔥 OPRAVA: PLAIN TEXT / CODE PREVIEW s podporou zalomení
        const formattedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
        
        canvasPreview.innerHTML = `<pre style="padding: 2rem; color: #818cf8; font-family: 'Fira Code', monospace; font-size: 14px; white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; text-align: left;">${formattedContent}</pre>`;
    }
}

// ─────────────────────────────────────────────────────────
// ✏️ RUČNÍ EDITACE
// ─────────────────────────────────────────────────────────
export function toggleEditMode() {
    const editBtn = document.getElementById('edit-canvas-btn');
    const saveBtn = document.getElementById('save-canvas-btn');
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    
    if (!isEditMode && canvasEditor) {
        isEditMode = true;
        originalContent = canvasEditor.value;
        canvasEditor.removeAttribute('readonly');
        canvasEditor.classList.add('editable-active');
        canvasEditor.focus();
        if (editBtn) editBtn.innerHTML = '<span>✏️</span><span>EDITACE AKTIVNÍ</span>';
        if (saveBtn) saveBtn.classList.remove('hidden');
    } else {
        exitEditMode();
    }
}

export function saveCanvasChanges() {
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    if (canvasEditor) {
        const newContent = canvasEditor.value;
        updatePreview(newContent);
        try {
            localStorage.setItem('PROMETHEUS_CANVAS_BACKUP', newContent);
        } catch (e) {}
        exitEditMode();
        showToast("✅ ZMĚNY ULOŽENY", "success");
    }
}

function exitEditMode() {
    isEditMode = false;
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    if (canvasEditor) {
        canvasEditor.setAttribute('readonly', true);
        canvasEditor.classList.remove('editable-active');
    }
    
    const editBtn = document.getElementById('edit-canvas-btn');
    const saveBtn = document.getElementById('save-canvas-btn');
    
    if (editBtn) editBtn.innerHTML = '<span>✏️</span><span>UPRAVIT</span>';
    if (saveBtn) saveBtn.classList.add('hidden');
}

// ─────────────────────────────────────────────────────────
// 🤖 AI ASISTENT MODAL LOGIC
// ─────────────────────────────────────────────────────────
export function openAiAssistantModal() {
    const modal = document.getElementById('ai-assistant-modal');
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    const preview = document.getElementById('current-code-preview');
    const instructionsInput = document.getElementById('ai-instructions-input');
    
    if (modal && canvasEditor && preview) {
        const currentCode = canvasEditor.value;
        
        // Bezpečné ořezání náhledu
        const codePreview = currentCode.length > 500 
            ? currentCode.substring(0, 500) + '...' 
            : currentCode;
        
        // 🔥 OPRAVA: Formátovaný náhled v modálu
        const formattedPreview = codePreview
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
        
        preview.innerHTML = `<pre style="font-size: 10px; font-family: 'Fira Code', monospace; color: #818cf8; white-space: pre-wrap; word-wrap: break-word; line-height: 1.5;">${formattedPreview}</pre>`;
        
        if (instructionsInput) {
            instructionsInput.value = '';
            instructionsInput.focus();
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

export function closeAiAssistantModal() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

export async function sendToAiForEdit() {
    canvasEditor = canvasEditor || document.getElementById('canvas-editor');
    const instructionsInput = document.getElementById('ai-instructions-input');
    const sendBtn = document.getElementById('send-to-ai-btn');
    
    if (!canvasEditor || !instructionsInput) return;
    
    const instructions = instructionsInput.value.trim();
    if (!instructions) return;
    
    sendBtn.disabled = true;
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = '<span class="animate-pulse">⚡ ANALYZUJI...</span>';
    
    try {
        const prompt = `VICE ADMIRÁL JIŘÍK ŽÁDÁ ÚPRAVU TOHOTO KÓDU:
\`\`\`
${canvasEditor.value}
\`\`\`
POŽADAVKY:
${instructions}
Vrať CELÝ upravený kód v code bloku.`;

        // Ověření komunikačního kanálu se script.js
        if (typeof window.sendMessageToAI === 'function') {
            await window.sendMessageToAI(prompt);
            closeAiAssistantModal();
            showToast("🚀 POŽADAVEK ODESLÁN DO JÁDRA", "info");
        } else {
            throw new Error("Komunikační linka (window.sendMessageToAI) přerušena!");
        }
    } catch (error) {
        showToast(`⛔ CHYBA: ${error.message}`, "error");
        console.error("Assistant Error:", error);
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalText;
        }
    }
}

// ─────────────────────────────────────────────────────────
// 🛠️ POMOCNÉ FUNKCE
// ─────────────────────────────────────────────────────────
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = "info") {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-[10000] bg-slate-900 border-2 ${
        type === 'success' ? 'border-emerald-500' : 
        type === 'error' ? 'border-red-500' : 'border-indigo-500'
    } rounded-lg px-4 py-3 shadow-2xl animate-in slide-in-from-bottom duration-300`;
    toast.innerHTML = `<div class="text-sm font-bold text-white">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('animate-out', 'slide-out-to-bottom');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ─────────────────────────────────────────────────────────
// ⚙️ INICIALIZACE DOM EVENTŮ
// ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Statické reference
    viewCodeBtn = document.getElementById('view-code-btn');
    viewPreviewBtn = document.getElementById('view-preview-btn');
    closeBtn = document.getElementById('close-canvas-btn');
    const editBtn = document.getElementById('edit-canvas-btn');
    const saveBtn = document.getElementById('save-canvas-btn');
    const aiBtn = document.getElementById('ai-assist-btn');
    const closeModalBtn = document.getElementById('close-ai-modal');
    const cancelBtn = document.getElementById('cancel-ai-btn');
    const sendAiBtn = document.getElementById('send-to-ai-btn');

    // Přepínání tabů
    if (viewCodeBtn) {
        viewCodeBtn.onclick = () => {
            canvasEditor = canvasEditor || document.getElementById('canvas-editor');
            canvasPreview = canvasPreview || document.getElementById('canvas-preview');
            if (canvasEditor && canvasPreview) {
                canvasEditor.classList.remove('hidden');
                canvasPreview.classList.add('hidden');
                viewCodeBtn.classList.add('active');
                viewPreviewBtn.classList.remove('active');
            }
        };
    }

    if (viewPreviewBtn) {
        viewPreviewBtn.onclick = () => {
            canvasEditor = canvasEditor || document.getElementById('canvas-editor');
            canvasPreview = canvasPreview || document.getElementById('canvas-preview');
            if (canvasEditor && canvasPreview) {
                canvasEditor.classList.add('hidden');
                canvasPreview.classList.remove('hidden');
                viewPreviewBtn.classList.add('active');
                viewCodeBtn.classList.remove('active');
            }
        };
    }

    // Navázání akcí tlačítek
    if (closeBtn) closeBtn.onclick = closeCanvas;
    if (editBtn) editBtn.onclick = toggleEditMode;
    if (saveBtn) saveBtn.onclick = saveCanvasChanges;
    if (aiBtn) aiBtn.onclick = openAiAssistantModal;
    if (closeModalBtn) closeModalBtn.onclick = closeAiAssistantModal;
    if (cancelBtn) cancelBtn.onclick = closeAiAssistantModal;
    if (sendAiBtn) sendAiBtn.onclick = sendToAiForEdit;

    // Globální klávesové zkratky
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAiAssistantModal();
        }
    });

    // 🚀 AKTIVACE AUTO-DETEKTORU
    initAutoCanvasDetector();
});
