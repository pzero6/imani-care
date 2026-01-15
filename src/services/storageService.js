import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@imani_history_v1';

// SALVAR UMA NOVA ANÁLISE
export const saveAnalysis = async (analysisResult) => {
  try {
    // 1. Pega o histórico antigo
    const existingData = await getHistory();
    
    // 2. Cria o novo item com a data de hoje
    const newItem = {
      id: Date.now().toString(), // Um ID único
      date: new Date().toLocaleDateString('pt-BR'), // Ex: 15/01/2026
      ...analysisResult
    };

    // 3. Junta o novo com o antigo (O novo fica no topo)
    const newHistory = [newItem, ...existingData];

    // 4. Salva tudo de volta no celular
    await AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
    console.log("✅ Análise salva com sucesso!");
    
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
};

// LER TODO O HISTÓRICO
export const getHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Erro ao ler histórico:", error);
    return [];
  }
};

// LIMPAR TUDO (Para testes)
export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch(e) {
    // erro
  }
};