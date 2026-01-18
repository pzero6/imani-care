import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { theme } from '../utils/theme';

export default function ScheduleScreen({ route, navigation }) {
  const { userName, aiResult } = route.params || {};

  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfK1xe3Mhhc_3YM5gx9GemW0i8QpOGUm9eZm1j0rvqb4HeaxA/viewform"; 

  const reiniciarApp = () => {
    navigation.popToTop();
  };

  const darFeedback = async () => {
    try {
      const supported = await Linking.canOpenURL(FORM_URL);
      if (supported) {
        await Linking.openURL(FORM_URL);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o link do formulário.");
      }
    } catch (error) {
      console.error("Erro ao abrir feedback:", error);
      Alert.alert("Ops!", "Ocorreu um erro ao tentar abrir a pesquisa.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Plano de {userName || "Cliente"}</Text>
        <Text style={styles.subHeader}>Siga estas etapas para cuidar dos seus fios ✨</Text>
        
        <View style={styles.card}>
          <Markdown style={markdownStyles}>
            {aiResult || "Nenhuma recomendação disponível no momento."}
          </Markdown>
        </View>

        {/* BOTÃO DE PESQUISA - AGORA COM O MARROM ESCURO (PRIMARY) */}
        <TouchableOpacity style={styles.feedbackButton} onPress={darFeedback}>
          <View style={styles.feedbackIconContainer}>
            <Ionicons name="star" size={24} color="#FFF" />
          </View>
          <View style={styles.feedbackTextContainer}>
            <Text style={styles.feedbackText}>Responder Pesquisa de Inovação</Text>
            <Text style={styles.feedbackSubText}>Sua opinião vale muito para a Gi! ⭐</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* BOTÃO SECUNDÁRIO - NOVA ANÁLISE */}
        <TouchableOpacity style={styles.buttonRestart} onPress={reiniciarApp}>
          <Text style={styles.buttonRestartText}>Fazer Nova Análise 🔄</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const markdownStyles = {
  body: { color: theme.colors.text, fontSize: 16, lineHeight: 24 },
  heading1: { color: theme.colors.primary, fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  heading2: { color: theme.colors.secondary, fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  strong: { fontWeight: 'bold', color: theme.colors.primary },
  bullet_list: { marginVertical: 10 }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  header: { fontSize: 26, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center' },
  subHeader: { fontSize: 14, color: theme.colors.text, textAlign: 'center', marginBottom: 20, opacity: 0.7 },
  card: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 20, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 25 
  },
  
  feedbackButton: {
    backgroundColor: theme.colors.primary, // MUDANÇA AQUI: Usando o marrom mais escuro (#3E2723)
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 8, // Aumentamos um pouco a sombra para destacar mais
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  feedbackIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  feedbackTextContainer: {
    flex: 1,
  },
  feedbackText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  feedbackSubText: { 
    color: '#FFF', 
    fontSize: 12, 
    opacity: 0.85,
    marginTop: 2
  },

  buttonRestart: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.secondary, // Mudamos para o marrom claro para não brigar com o principal
    marginTop: 10
  },
  buttonRestartText: { 
    color: theme.colors.secondary, 
    fontSize: 15, 
    fontWeight: '600' 
  },
});