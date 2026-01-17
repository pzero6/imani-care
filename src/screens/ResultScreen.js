import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

// Substitua pelo endpoint correto ou importe sua função de configuração da API
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function ResultScreen({ route, navigation }) {
  const { formData, imageUri } = route.params;
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(true);

  const analisarCabeloComIA = async () => {
    try {
      // 1. Converter imagem para Base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 2. Montar o Prompt com os dados reais do questionário
      const prompt = `Analise a foto deste cabelo e os seguintes dados:
        - Cliente: ${formData.userName}
        - Condição: ${formData.isNatural === 'natural' ? 'Cabelo Natural' : 'Possui Química'}
        - Porosidade relatada: ${formData.porosity}
        - Alergias/Sensibilidade: ${formData.allergies}
        
        Com base nisso, forneça um diagnóstico curto e um cronograma capilar recomendado (Hidratação, Nutrição ou Reconstrução).`;

      // 3. Chamada para a API do Gemini
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

      const data = await response.json();
      const textoIA = data.candidates[0].content.parts[0].text;

      setAnalise({
        diagnostico: `Olá ${formData.userName}! Analisamos seu perfil e seus fios.`,
        recomendacao: textoIA
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro na análise", "Não conseguimos conectar com a Imani AI agora.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analisarCabeloComIA();
  }, []);

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
      <Text style={styles.titulo}>Seu Diagnóstico</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Diagnóstico Imani AI:</Text>
        <Text style={styles.texto}>{analise?.diagnostico}</Text>
        
        <View style={styles.divisor} />
        
        <Text style={styles.label}>Plano Recomendado:</Text>
        <Text style={styles.textoIA}>{analise?.recomendacao}</Text>
      </View>

      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate('Schedule', { userName: formData.userName })}
      >
        <Text style={styles.botaoTexto}>Ver Meu Cronograma</Text>
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
  label: { fontSize: 12, fontWeight: 'bold', color: theme.colors.secondary, letterSpacing: 1, marginBottom: 5, textTransform: 'uppercase' },
  texto: { fontSize: 16, color: theme.colors.text, marginBottom: 15 },
  textoIA: { fontSize: 15, color: theme.colors.text, lineHeight: 22, fontStyle: 'italic' },
  divisor: { height: 1, backgroundColor: theme.colors.accent, marginVertical: 15 },
  loadingText: { marginTop: 15, color: theme.colors.primary, fontWeight: '500' },
  botao: { backgroundColor: theme.colors.primary, padding: 20, borderRadius: 15, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});