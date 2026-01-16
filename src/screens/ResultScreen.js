import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { analyzeHair } from '../services/geminiService'; // Certifique-se que o caminho está certo
import { theme } from '../utils/theme';

export default function ResultScreen({ route, navigation }) {
  const { photoUri, base64, formData } = route.params || {};
  
  // Estados para controlar o carregamento e o resultado da IA
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    // Função que chama a IA assim que a tela abre
    const fetchDiagnosis = async () => {
      if (base64) {
        const result = await analyzeHair(base64, formData);
        setAiResult(result);
        setLoading(false);
      } else {
        // Se não tiver foto (teste), encerra o loading
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, []);

  // Ícone dinâmico baseado no tratamento sugerido pela IA
  const getIcon = (careType) => {
      const care = careType ? careType.toLowerCase() : '';
      if (care.includes('nutri')) return 'water-off'; // Gota cortada (óleo)
      if (care.includes('hidra')) return 'water';
      if (care.includes('recons')) return 'hammer-wrench';
      return 'sparkles';
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Foto do Cabelo */}
      <View style={styles.imageContainer}>
        {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
            <View style={styles.placeholderImage}>
                <Ionicons name="person" size={80} color="#FFF" />
                <Text style={{color:'#FFF'}}>Sem foto</Text>
            </View>
        )}
        
        {/* Badge de Status (Etiqueta no canto da foto) */}
        <View style={[styles.badge, { backgroundColor: loading ? '#FFA000' : '#4CAF50' }]}>
            <Text style={styles.badgeText}>
                {loading ? 'IA Analisando...' : 'Análise Concluída'}
            </Text>
        </View>
      </View>

      <View style={styles.content}>
        
        {loading ? (
            // --- TELA DE CARREGAMENTO (LOADING) ---
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Estamos examinando seus fios...</Text>
                <Text style={styles.loadingSub}>A IA está identificando a curvatura e danos.</Text>
            </View>
        ) : (
            // --- TELA DE RESULTADO (DIAGNÓSTICO) ---
            <>
                <Text style={styles.greeting}>Diagnóstico da Imani AI 🤖:</Text>
                
                {/* Card Principal: Tipo e Descrição */}
                <View style={styles.mainCard}>
                    <View style={styles.headerCard}>
                        <MaterialCommunityIcons 
                            name="face-woman-shimmer" 
                            size={40} 
                            color={theme.colors.primary} 
                        />
                        <View style={{marginLeft: 15, flex: 1}}>
                            <Text style={styles.diagnosisTitle}>
                                {aiResult?.type || "Cacho Identificado"}
                            </Text>
                            <Text style={styles.diagnosisSub}>Curvatura Estimada</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        {aiResult?.description || "Análise concluída com sucesso."}
                    </Text>
                </View>

                {/* Card de Tratamento (Foco da Semana) */}
                <Text style={styles.sectionTitle}>Tratamento Recomendado ✨</Text>
                <View style={styles.treatmentCard}>
                    <View style={styles.treatmentHeader}>
                         <MaterialCommunityIcons 
                            name={getIcon(aiResult?.care)} 
                            size={28} 
                            color={theme.colors.primary} 
                        />
                        <Text style={styles.treatmentLabel}>FOCO DA SEMANA</Text>
                    </View>
                    <Text style={styles.treatmentValue}>
                        {aiResult?.care || "Cronograma Capilar"}
                    </Text>
                    
                    {formData?.hasChemical && (
                        <View style={styles.alertBox}>
                            <Ionicons name="warning-outline" size={16} color="#D84315" />
                            <Text style={styles.alertText}>Cabelo quimicamente tratado requer cuidado redobrado!</Text>
                        </View>
                    )}
                </View>

                {/* Dica Extra da IA */}
                <Text style={styles.sectionTitle}>Dica Personalizada 💡</Text>
                <View style={styles.tipCard}>
                    <Text style={styles.tipText}>
                        "{aiResult?.tips || "Siga seu cronograma corretamente para ver resultados!"}"
                    </Text>
                </View>

                {/* --- BOTÕES DE AÇÃO --- */}
                
                {/* Botão Principal: Gera o cronograma baseado no resultado */}
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Cronograma', { foco: aiResult?.care })}
                >
                    <Text style={styles.actionButtonText}>Gerar Meu Cronograma</Text>
                    <Ionicons name="calendar" size={20} color="#FFF" />
                </TouchableOpacity>

                {/* Botão Secundário: Voltar */}
                <TouchableOpacity 
                    style={styles.outlineButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.outlineButtonText}>Voltar ao Início</Text>
                </TouchableOpacity>
            </>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  imageContainer: { height: 300, width: '100%', position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: '100%', backgroundColor: '#BCAAA4', justifyContent: 'center', alignItems: 'center' },
  badge: {
    position: 'absolute', bottom: 20, right: 20,
    paddingHorizontal: 15, paddingVertical: 8,
    borderRadius: 20, elevation: 5
  },
  badgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  
  content: { 
    flex: 1, padding: 25, marginTop: -30, 
    backgroundColor: theme.colors.background, 
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    minHeight: 500 
  },
  
  // Estilos de Loading
  loadingContainer: { alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  loadingSub: { marginTop: 5, fontSize: 14, color: theme.colors.textLight },

  // Estilos de Resultado
  greeting: { fontSize: 18, color: theme.colors.textLight, marginBottom: 15 },
  mainCard: {
    backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 25,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, elevation: 4
  },
  headerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  diagnosisTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary },
  diagnosisSub: { fontSize: 14, color: '#999' },
  description: { fontSize: 16, color: theme.colors.text, lineHeight: 24 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 10 },
  treatmentCard: {
    backgroundColor: '#EFEBE9', padding: 20, borderRadius: 15, marginBottom: 25,
    borderLeftWidth: 5, borderLeftColor: theme.colors.primary
  },
  treatmentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  treatmentLabel: { fontSize: 12, color: theme.colors.textLight, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 },
  treatmentValue: { fontSize: 22, fontWeight: 'bold', color: theme.colors.primary, marginTop: 5 },
  
  alertBox: { flexDirection: 'row', alignItems: 'center', marginTop: 15, backgroundColor: '#FFCCBC', padding: 10, borderRadius: 8 },
  alertText: { fontSize: 12, color: '#BF360C', marginLeft: 8, flex: 1 },

  tipCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 30, borderWidth: 1, borderColor: '#EEE' },
  tipText: { fontStyle: 'italic', color: '#666', fontSize: 15, lineHeight: 22 },

  // Botões
  actionButton: {
    backgroundColor: theme.colors.primary, padding: 18, borderRadius: 15,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  outlineButton: {
    padding: 15, alignItems: 'center',
    borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 15, marginBottom: 30
  },
  outlineButtonText: { color: theme.colors.primary, fontWeight: 'bold' }
});