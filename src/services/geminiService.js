// Agora a chave vem do arquivo .env (segurança máxima!)
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

export const analyzeHair = async (base64Image) => {
  try {
    // Verificação de segurança
    if (!API_KEY) {
        console.error("❌ ERRO: Chave de API não encontrada. Verifique o arquivo .env");
        return mockBackup();
    }

    const cleanKey = API_KEY.trim();
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "").trim();

    console.log("🚀 Tentando modelo da lista: gemini-flash-latest...");

    const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${cleanKey}`;

    const response = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Você é um especialista em cabelos. Retorne APENAS um JSON válido: { \"type\": \"3A\", \"description\": \"Cachos soltos\", \"care\": \"Hidratação\", \"products\": [\"Creme de Pentear\", \"Gelatina\"], \"tips\": \"Use fronha de cetim.\" }." },
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
        type: "3B (Modo Offline)",
        description: "Não conseguimos conectar à IA agora, mas seu cabelo parece ter curvatura média com necessidade de definição.",
        care: "Hidratação Potente",
        products: ["Salon Line Definição", "Óleo de Argan"],
        tips: "A IA está instável no momento. Tente novamente em alguns minutos para uma análise precisa."
    };
}