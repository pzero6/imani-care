import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function ResultScreen({ route, navigation }) {
  const { formData, imageUri } = route.params;
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você chamaria sua função de integração com o Gemini
    // Simulando um delay de processamento da IA
    setTimeout(() => {
      setAnalise({
        diagnostico: `Olá ${formData.userName}, seu cabelo apresenta porosidade ${formData.porosity}.`,
        recomendacao: "Baseado na análise, recomendamos um cronograma focado em Nutrição profunda."
      });
      setLoading(false);
    }, 2000);
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
        <Text style={styles.texto}>{analise.diagnostico}</Text>
        <Text style={[styles.texto, { marginTop: 10, fontWeight: 'bold' }]}>{analise.recomendacao}</Text>
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
  texto: { fontSize: 16, color: theme.colors.text, lineHeight: 24 },
  loadingText: { marginTop: 15, color: theme.colors.primary, fontWeight: '500' },
  botao: { backgroundColor: theme.colors.primary, padding: 20, borderRadius: 15, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});