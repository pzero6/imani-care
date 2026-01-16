const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

// --- FUNÇÃO 1: ANALISAR FOTO ---
export const analyzeHair = async (base64Image, userContext) => {
  try {
    if (!API_KEY) return mockBackup();

    const cleanKey = API_KEY.trim();
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "").trim();
    
    // USANDO O MODELO QUE FUNCIONA NA SUA CONTA (LATEST)
    const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${cleanKey}`;

    const response = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Atue como um Tricologista especialista em cabelos crespos e cacheados.
                       ${userContext ? JSON.stringify(userContext) : ''}
                       Analise a imagem e retorne APENAS um JSON válido (sem markdown) com: 
                       { "type": "ex: 3A", "description": "curta descrição visual", "care": "tratamento principal", "tips": "dica prática" }.` 
              },
              { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } }
            ]
          }]
        })
      }
    );

    const data = await response.json();
    if (data.error) {
        console.error("❌ Erro Google Foto:", data.error);
        return mockBackup();
    }
    
    const textResponse = data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Erro IA Foto:", error);
    return mockBackup();
  }
};

// --- FUNÇÃO 2: CHAT DE TEXTO (CORRIGIDA) ---
export const sendMessageToChat = async (userMessage) => {
    try {
      if (!API_KEY) return "Erro: Chave API não configurada.";
  
      const cleanKey = API_KEY.trim();
      
      // MUDANÇA AQUI: Trocamos 'gemini-1.5-flash' por 'gemini-flash-latest'
      const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${cleanKey}`;
  
      const response = await fetch(MODEL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ 
                  text: `Você é a "Imani AI", uma assistente especialista em cabelos crespos, cacheados e tranças. 
                  Seja direta, curta e use emojis.
                  A pergunta da usuária é: ${userMessage}` 
              }]
            }]
          })
        }
      );
  
      const data = await response.json();
      
      if (data.error) {
        console.error("❌ Erro Google Chat:", JSON.stringify(data.error, null, 2));
        return "Ops! Tive um problema técnico. Tente de novo.";
      }

      if (!data.candidates) {
        return "Desculpe, não entendi. Pode reformular?";
      }
  
      return data.candidates[0].content.parts[0].text;
  
    } catch (error) {
      console.error("Erro Chat:", error);
      return "Estou sem sinal no momento. Verifique sua internet!";
    }
  };

function mockBackup() {
    return {
        type: "Offline",
        description: "Erro de conexão.",
        care: "Hidratação",
        tips: "Verifique a internet."
    };
}