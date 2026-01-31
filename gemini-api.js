// ═══════════════════════════════════════════════════════════
// 🤖 GEMINI API SERVICE - USS PROMETHEUS v3.1
// BEZ ZMĚN (pro kompletnost balíčku)
// ═══════════════════════════════════════════════════════════

import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./system-prompt.js";

// ─────────────────────────────────────────────────────────
// 🔐 ZÍSKÁNÍ EFEKTIVNÍHO API KLÍČE
// ─────────────────────────────────────────────────────────
function getEffectiveApiKey() {
    // Priorita 1: Manuálně uložený klíč velitelem
    const manualKey = localStorage.getItem('PROMETHEUS_MANUAL_KEY');
    if (manualKey) return manualKey;
    
    // Priorita 2: Systémový klíč
    return process.env.API_KEY;
}

// ─────────────────────────────────────────────────────────
// 🚀 HLAVNÍ API CALL
// ─────────────────────────────────────────────────────────
export async function callGeminiAPI(modelName, prompt, history = [], attachment = null) {
    const apiKey = getEffectiveApiKey();
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    try {
        const parts = [{ text: prompt }];
        
        if (attachment) {
            parts.push({
                inlineData: {
                    data: attachment.base64,
                    mimeType: attachment.mimeType
                }
            });
        }

        const response = await ai.models.generateContent({
            model: modelName,
            contents: [
                ...history,
                { role: 'user', parts: parts }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.9,
                topP: 0.95,
                thinkingConfig: (modelName.includes('3') || modelName.includes('2.5')) 
                    ? { thinkingBudget: 16000 } 
                    : undefined
            }
        });

        return response.text;
    } catch (error) {
        console.error("GENAI_CORE_ERROR:", error);
        throw error;
    }
}

// ─────────────────────────────────────────────────────────
// 🎙️ TEXT-TO-SPEECH (TTS)
// ─────────────────────────────────────────────────────────
export async function generateSpeech(text) {
    const apiKey = getEffectiveApiKey();
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ 
                parts: [{ 
                    text: `Say this clearly as a military officer on a starship: ${text}` 
                }] 
            }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Charon' } 
                    }
                }
            }
        });
        
        return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (error) {
        console.error("TTS_ERROR:", error);
        return null;
    }
}
        
        /* Dostupné hlasy:

Puck – mužský, neutrální
Charon – mužský, hlubší
Kore – ženský, profesionální (aktuální)
Fenrir – mužský, autoritativní
Aoede – ženský, teplý

B) Šum z prohlížeče:

Zkus jiný prohlížeč (Chrome vs Firefox)
Restartuj audio context 
*/