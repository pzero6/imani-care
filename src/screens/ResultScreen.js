import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ResultScreen({ route, navigation }) {
  // Recebe o nome corretamente agora
  const { photoBase64, userName } = route.params || {};
  const clienteNome = userName || "Cliente Especial";

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [agenda, setAgenda] = useState([]);
  const [focoDetectado, setFocoDetectado] = useState("Analisando...");
  
  // NOVO: Estado para controlar se o texto está aberto ou fechado
  const [expanded, setExpanded] = useState(false);

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
  const RESEARCH_URL = "https://forms.gle/yt9o9h6p8kmDAC18A"; 

  useEffect(() => {
    if (photoBase64) {
      analisarCabelo(photoBase64);
    }
  }, [photoBase64]);

  const gerarAgendaVisual = (textoIA) => {
    const texto = textoIA.toLowerCase();
    let cronograma = [];
    let foco = "Hidratação (Manutenção)";

    if (texto.includes('nutri') || texto.includes('óleo') || texto.includes('crespo') || texto.includes('4c') || texto.includes('4b')) {
        foco = "Nutrição & Óleos (Foco em Curvatura)";
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'H', 'N'] },
            { semana: 3, etapas: ['H', 'N', 'H'] },
            { semana: 4, etapas: ['H', 'N', 'R'] }, 
        ];
    } else if (texto.includes('recons') || texto.includes('quebra') || texto.includes('elástico') || texto.includes('danificado')) {
        foco = "Reconstrução (Foco em Danos)";
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'N', 'R'] },
            { semana: 3, etapas: ['H', 'H', 'N'] },
            { semana: 4, etapas: ['H', 'N', 'R'] }, 
        ];
    } else {
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'H', 'N'] },
            { semana: 3, etapas: ['H', 'N', 'H'] },
            { semana: 4, etapas: ['H', 'H', 'R'] }, 
        ];
    }
    setAgenda(cronograma);
    setFocoDetectado(foco);
  };

  const Etiqueta = ({ tipo }) => {
    let color = '#29B6F6'; 
    let text = 'Hidra';
    if (tipo === 'N') { color = '#FFA726'; text = 'Nutri'; }
    else if (tipo === 'R') { color = '#AB47BC'; text = 'Recons'; }

    return (
        <View style={[styles.tag, { backgroundColor: color }]}>
            <Text style={styles.tagText}>{text}</Text>
        </View>
    );
  };

  const openResearchLink = async () => {
    const supported = await Linking.canOpenURL(RESEARCH_URL);
    if (supported) {
      await Linking.openURL(RESEARCH_URL);
    } else {
      Alert.alert("Erro", "Não foi possível abrir a pesquisa.");
    }
  };

  const analisarCabelo = async (base64) => {
    setLoading(true);
    try {
      const requestBody = {
        contents: [{
          parts: [
            { text: `Aja como Especialista da Imani Care falando diretamente com ${clienteNome}. 1) Identifique a curvatura (ex: 3A, 4C) e condição dos fios. 2) Explique o foco do tratamento ideal. 3) Dê uma dica final. Use o nome dela na resposta. Use emojis. Não desenhe tabelas.` },
            { inline_data: { mime_type: "image/jpeg", data: base64 } }
          ]
        }]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if(data.error) {
        setAnalysis("Erro ao conectar com a IA. Tente novamente.");
        return;
      }

      if (data.candidates && data.candidates[0].content) {
          const resposta = data.candidates[0].content.parts[0].text;
          setAnalysis(resposta);
          gerarAgendaVisual(resposta);
      } else {
          setAnalysis("Não conseguimos ver o cabelo direito. Tente uma foto com mais luz!");
      }

    } catch (error) {
      setAnalysis("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar style="dark" backgroundColor="#FAF9F6" translucent={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Análise de {clienteNome} 🌿</Text>
        
        <View style={styles.resultCard}>
          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#704214" />
              <Text style={styles.loadingText}>Preparando análise exclusiva...</Text>
            </View>
          ) : (
            <View>
              {/* LÓGICA DO TEXTO RETRÁTIL */}
              <Text style={styles.resultText}>
                {expanded ? analysis : (analysis.substring(0, 180).trim() + (analysis.length > 180 ? "..." : ""))}
              </Text>
              
              {!loading && analysis.length > 180 && (
                <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>
                        {expanded ? "Ler Menos ⬆️" : "Ler Análise Completa ⬇️"}
                    </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {!loading && agenda.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Cronograma Visual 📅</Text>
            
            <View style={styles.focusCard}>
                <MaterialCommunityIcons name="robot-happy" size={24} color="#FFF" style={{marginRight: 10}}/>
                <Text style={styles.focusText}>{focoDetectado}</Text>
            </View>

            <View style={styles.calendarCard}>
                {agenda.map((item, index) => (
                    <View key={index} style={styles.weekRow}>
                        <Text style={styles.weekText}>Semana {item.semana}</Text>
                        <View style={styles.tagsContainer}>
                            {item.etapas.map((etapa, i) => (
                                <Etiqueta key={i} tipo={etapa} />
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.legendaRow}>
                <Text style={{fontSize: 12, color: '#555'}}>💧 Hidratação</Text>
                <Text style={{fontSize: 12, color: '#555'}}>🥥 Nutrição</Text>
                <Text style={{fontSize: 12, color: '#555'}}>🔨 Reconstrução</Text>
            </View>
          </View>
        )}

        {!loading && (
          <TouchableOpacity style={styles.researchCard} onPress={openResearchLink}>
            <View style={styles.iconBox}>
              <FontAwesome name="star" size={24} color="#FFF" />
            </View>
            <View style={styles.researchContent}>
              <Text style={styles.researchTitle}>Finalizar Atendimento</Text>
              <Text style={styles.researchSubtitle}>Responda a pesquisa da Gi ⭐</Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

        <View style={{ height: 180 }} /> 
      </ScrollView>

      <View style={styles.footer}>
        {/* Passamos userName de volta para a câmera para não perder o nome se for a mesma pessoa */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Camera', { userName: userName })}>
          <Text style={styles.buttonText}>Tirar Nova Foto 📷</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonTextSecondary}>Encerrar / Início 🏠</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#FAF9F6' },
  scrollContent: { padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4A3F35', textAlign: 'center', marginBottom: 15 },
  resultCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 2, marginBottom: 25 },
  resultText: { fontSize: 15, lineHeight: 24, color: '#3E2723' },
  
  // Botão "Ler Mais"
  readMoreButton: { marginTop: 10, alignSelf: 'center', padding: 5 },
  readMoreText: { color: '#8D6E63', fontWeight: 'bold', fontSize: 14 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#3E2723', marginBottom: 10, marginTop: 10 },
  focusCard: { backgroundColor: '#5D4037', padding: 15, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center' },
  focusText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  calendarCard: { backgroundColor: '#FFF', borderRadius: 15, padding: 15, marginBottom: 15, elevation: 2 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 8 },
  weekText: { fontSize: 14, fontWeight: 'bold', color: '#5D4037' },
  tagsContainer: { flexDirection: 'row', gap: 5 },
  tag: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, minWidth: 50, alignItems: 'center' },
  tagText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  legendaRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25 },
  loadingBox: { alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 15, color: '#704214', fontWeight: 'bold' },
  researchCard: { backgroundColor: '#3E2723', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 3 },
  iconBox: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 10 },
  researchContent: { flex: 1, marginLeft: 15 },
  researchTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  researchSubtitle: { color: '#FFD700', fontSize: 11, marginTop: 2 },
  
  footer: { 
    position: 'absolute', bottom: 0, width: '100%', 
    paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40,
    backgroundColor: 'rgba(250, 249, 246, 0.98)', 
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
    flexDirection: 'column', gap: 10
  },
  buttonPrimary: { backgroundColor: '#704214', padding: 16, borderRadius: 30, alignItems: 'center', elevation: 5 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  buttonSecondary: { backgroundColor: 'transparent', padding: 12, borderRadius: 30, alignItems: 'center', borderWidth: 1, borderColor: '#704214' },
  buttonTextSecondary: { color: '#704214', fontSize: 14, fontWeight: 'bold' }
});