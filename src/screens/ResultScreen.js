import { Ionicons } from '@expo/vector-icons'; // Importando ícones
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { analyzeHair } from '../services/geminiService';
import { theme } from '../utils/theme';

// 🔴 🔴 ATENÇÃO: COLOQUE O NÚMERO DA GI AQUI (COM 55 E DDD) 🔴 🔴
const PHONE_NUMBER = "5516981395293"; 

export default function ResultScreen({ route, navigation }) {
  const { photoUri, base64 } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    analyzePhoto();
  }, []);

  const analyzePhoto = async () => {
    try {
      if (!base64) throw new Error("Imagem não processada.");
      const aiData = await analyzeHair(base64);
      setResult(aiData);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir o WhatsApp com mensagem personalizada
  const openWhatsApp = () => {
    if (!result) return;

    // A mensagem mágica que já chega pronta
    const message = `Olá! 🦁 Fiz a análise no App Imani Care.\n\nMeu cabelo foi identificado como *${result.type}*.\nA recomendação foi: *${result.care}*.\n\nGostaria de agendar um horário para tratar meus cachos!`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>A IA está analisando... 🦁</Text>
      </View>
    );
  }

  if (!result) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.heroImage} />

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Análise Concluída</Text>
        </View>
        
        <Text style={styles.title}>Seu tipo é {result.type}</Text>
        <Text style={styles.description}>{result.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Diagnóstico 🩺</Text>
        
        <View style={styles.careCard}>
          <Text style={styles.careEmoji}>✨</Text>
          <View style={styles.careTextArea}>
            <Text style={styles.careTitle}>Precisa de: {result.care}</Text>
            <Text style={styles.careSubtitle}>{result.tips || "Sem dicas adicionais."}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sugestão Econômica 💰</Text>
        {result.products && result.products.map((prod, index) => (
          <View key={index} style={styles.productRow}>
            <Text style={styles.check}>✓</Text>
            <Text style={[styles.productName, { flex: 1 }]}>{prod}</Text>
          </View>
        ))}

        {/* --- ÁREA DE AÇÃO --- */}
        <View style={styles.actionsContainer}>
            
            {/* BOTÃO DO WHATSAPP (DESTAQUE) */}
            <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
                <Ionicons name="logo-whatsapp" size={24} color="#fff" style={{marginRight: 10}} />
                <Text style={styles.whatsappText}>Agendar Tratamento</Text>
            </TouchableOpacity>

            {/* BOTÃO VOLTAR (SECUNDÁRIO) */}
            <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
            >
            <Text style={styles.secondaryText}>Fazer Nova Análise</Text>
            </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  loadingText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  
  heroImage: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20, marginTop: -20, backgroundColor: theme.colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  
  badge: { alignSelf: 'flex-start', backgroundColor: theme.colors.accent, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 10 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 10 },
  description: { fontSize: 16, color: theme.colors.textLight, lineHeight: 24 },
  
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginBottom: 15 },
  
  careCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF3E0', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 25 
  },
  careEmoji: { fontSize: 30, marginRight: 15 },
  careTextArea: { flex: 1 },
  careTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, flexWrap: 'wrap', marginBottom: 4 },
  careSubtitle: { fontSize: 14, color: theme.colors.textLight, flexWrap: 'wrap' },
  
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', padding: 12, borderRadius: 10 },
  check: { color: theme.colors.accent, fontWeight: 'bold', fontSize: 18, marginRight: 10 },
  productName: { fontSize: 16, color: theme.colors.text },
  
  // --- NOVOS ESTILOS DOS BOTÕES ---
  actionsContainer: {
      marginTop: 30,
      marginBottom: 20,
      gap: 15 // Espaço entre os botões
  },
  
  whatsappButton: { 
      backgroundColor: '#25D366', // Verde Oficial WhatsApp
      padding: 18, 
      borderRadius: 12, 
      alignItems: 'center', 
      flexDirection: 'row',
      justifyContent: 'center',
      elevation: 3, // Sombra no Android
      shadowColor: '#000', // Sombra no iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
  },
  whatsappText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  secondaryButton: { 
      backgroundColor: '#f0f0f0', 
      padding: 15, 
      borderRadius: 12, 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd'
  },
  secondaryText: { color: '#666', fontWeight: 'bold', fontSize: 16 }
});