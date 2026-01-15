import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

// 🔴 ATENÇÃO: Número do Salão aqui
const PHONE_NUMBER = "5511999999999"; 

export default function ScheduleScreen() {

  const openWhatsApp = () => {
    const message = "Olá! Li sobre o Cronograma Capilar no app e quero agendar uma avaliação para saber o que meu cabelo precisa! 🦁";
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o WhatsApp."));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>O que é Cronograma? 📅</Text>
        <Text style={styles.subtitle}>
          É uma rotina de cuidados de 4 semanas para repor tudo o que seu cabelo perdeu.
        </Text>
      </View>

      {/* --- FASE 1: HIDRATAÇÃO --- */}
      <View style={[styles.card, { borderLeftColor: '#29B6F6' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="water" size={28} color="#29B6F6" />
          <Text style={styles.cardTitle}>1. Hidratação</Text>
        </View>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>O que faz:</Text> Repõe a ÁGUA dos fios.
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Sintoma:</Text> Cabelo opaco e ressecado.
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Ativos:</Text> Babosa, Pantenol, Glicerina.
        </Text>
      </View>

      {/* --- FASE 2: NUTRIÇÃO --- */}
      <View style={[styles.card, { borderLeftColor: '#FFA726' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="flask" size={28} color="#FFA726" />
          <Text style={styles.cardTitle}>2. Nutrição</Text>
        </View>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>O que faz:</Text> Repõe os ÓLEOS e gorduras.
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Sintoma:</Text> Muito frizz, sem definição e desalinhado.
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Ativos:</Text> Óleo de Coco, Argan, Rícino.
        </Text>
      </View>

      {/* --- FASE 3: RECONSTRUÇÃO --- */}
      <View style={[styles.card, { borderLeftColor: '#AB47BC' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="hammer" size={28} color="#AB47BC" />
          <Text style={styles.cardTitle}>3. Reconstrução</Text>
        </View>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>O que faz:</Text> Repõe a MASSA (proteína).
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Sintoma:</Text> Cabelo elástico, quebrando fácil e fino.
        </Text>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: 'bold'}}>Ativos:</Text> Queratina, Colágeno, Aminoácidos.
        </Text>
      </View>

      {/* --- CHAMADA PARA AÇÃO --- */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>Não sabe do que seu cabelo precisa?</Text>
        <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
          <Text style={styles.buttonText}>Agendar Avaliação Gratuita</Text>
          <Ionicons name="logo-whatsapp" size={20} color="#fff" style={{marginLeft: 10}} />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: theme.colors.textLight, lineHeight: 22 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 6, // A faixa colorida na lateral
    elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginLeft: 10 },
  cardText: { fontSize: 15, color: theme.colors.textLight, marginBottom: 8, lineHeight: 20 },

  ctaContainer: { marginTop: 10, alignItems: 'center', marginBottom: 40, backgroundColor: '#E8F5E9', padding: 20, borderRadius: 15 },
  ctaText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 15 },
  button: {
    backgroundColor: '#25D366',
    paddingVertical: 12, paddingHorizontal: 25, borderRadius: 30,
    flexDirection: 'row', alignItems: 'center', elevation: 3
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});