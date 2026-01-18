import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;
const MODEL_ID = "gemini-flash-latest"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;

export default function ResultScreen({ route, navigation }) {
  const { formData = {}, imageUri } = route.params || {};
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(true);

  const analisarCabeloComIA = async () => {
    try {
      if (!GEMINI_API_KEY) throw new Error("Configuração de API pendente.");
      if (!imageUri) throw new Error("Foto não detectada.");
      
      const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

      // Prompt 100% focado no salão da Gi e em Markdown
      const prompt = `Você é uma especialista em cabelos crespos e cacheados do salão IMANI.
        Analise a foto da cliente ${formData.userName || "Cliente"}.
        Dados informados: Cabelo ${formData.isNatural === 'natural' ? 'Natural' : 'com Química'}, Porosidade ${formData.porosity || "não informada"}.
        
        Responda obrigatoriamente usando MARKDOWN:
        1. # Diagnóstico (Uma frase curta e carinhosa).
        2. ## Plano de 4 Semanas (Divida em Semana 1, 2, 3 e 4).
        3. Use **negrito** para destacar produtos como máscaras de hidratação ou óleos.
        Foque em curvatura e saúde do fio. Seja profissional e acolhedora. ✨`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: "image/jpeg", data: base64Image } }
            ]
          }]
        })
      });

      if (!response.ok) throw new Error("Instabilidade na conexão com a IA.");

      const data = await response.json();
      const textoIA = data.candidates[0].content.parts[0].text;

      setAnalise({ diagnostico: "Análise Concluída ✨", recomendacao: textoIA });
    } catch (error) {
      Alert.alert("Aviso", "Não conseguimos processar a imagem. Tente uma foto com mais luz.");
      setAnalise({ diagnostico: "Erro", recomendacao: "Tente novamente em instantes." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { analisarCabeloComIA(); }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Imani AI analisando seus fios...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Resultado</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Resumo do Diagnóstico:</Text>
        <Text style={styles.textoIA}>{analise?.recomendacao.substring(0, 120)}...</Text>
      </View>
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate('Schedule', { userName: formData.userName, aiResult: analise?.recomendacao })}
      >
        <Text style={styles.botaoTexto}>Ver Cronograma Completo 📅</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { justifyContent: 'center', alignItems: 'center' },
  content: { padding: 25, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, elevation: 4, marginBottom: 30 },
  label: { fontSize: 12, fontWeight: 'bold', color: theme.colors.secondary, marginBottom: 5, textTransform: 'uppercase' },
  textoIA: { fontSize: 15, color: theme.colors.text, lineHeight: 22, fontStyle: 'italic' },
  loadingText: { marginTop: 15, color: theme.colors.primary, fontWeight: '500' },
  botao: { backgroundColor: theme.colors.primary, padding: 20, borderRadius: 15, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});