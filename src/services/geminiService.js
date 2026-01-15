const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

export const analyzeHair = async (base64Image, userContext) => {
  try {
    if (!API_KEY) {
        console.error("❌ ERRO: Chave de API não encontrada.");
        return mockBackup();
    }

    // Monta um texto com as respostas da cliente
    const contextText = userContext 
      ? `DADOS DA CLIENTE:
         - Tem Química? ${userContext.hasChemical ? 'SIM' : 'NÃO'}
         - Usa Fonte de Calor (Secador/Chapinha)? ${userContext.usesHeat ? 'SIM' : 'NÃO'}
         - Maior Queixa: ${userContext.mainComplaint}
         
         Leve esses dados em consideração extrema para o diagnóstico.`
      : "";

    const cleanKey = API_KEY.trim();
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "").trim();

    console.log("🚀 Enviando foto + contexto para a IA...");

    const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${cleanKey}`;

    const response = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Você é um especialista em cabelos crespos e cacheados (Visagista e Tricologista).
                       ${contextText}
                       Analise a imagem e retorne APENAS um JSON válido (sem markdown) com: 
                       { "type": "ex: 3A", "description": "ex: Cachos soltos", "care": "ex: Nutrição", "products": ["ex: Óleo"], "tips": "Dica baseada na queixa e na foto" }.` 
              },
              { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } }
            ]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("❌ ERRO GOOGLE:", JSON.stringify(data.error, null, 2));
      return mockBackup(); 
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("❌ ERRO DE CONEXÃO:", error);
    return mockBackup();
  }
};

function mockBackup() {
    return {
        type: "Análise Offline",
        description: "Não conseguimos conectar à IA agora.",
        care: "Hidratação Básica",
        products: ["Creme de Pentear"],
        tips: "Tente novamente mais tarde."
    };
}