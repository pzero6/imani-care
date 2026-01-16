import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guia do Cronograma 🦁</Text>
        <Text style={styles.subtitle}>
          Siga este calendário mensal para recuperar a saúde dos seus cachos em casa.
        </Text>
      </View>

      {/* TABELA DE 4 SEMANAS */}
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>📅 Sugestão de Agenda Mensal</Text>
        
        <View style={styles.weekRow}>
          <Text style={styles.weekText}>Semana 1:</Text>
          <View style={styles.badges}>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
            <Text style={[styles.badge, {backgroundColor: '#FFA726'}]}>Nutri</Text>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
          </View>
        </View>

        <View style={styles.weekRow}>
          <Text style={styles.weekText}>Semana 2:</Text>
          <View style={styles.badges}>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
            <Text style={[styles.badge, {backgroundColor: '#FFA726'}]}>Nutri</Text>
          </View>
        </View>

        <View style={styles.weekRow}>
          <Text style={styles.weekText}>Semana 3:</Text>
          <View style={styles.badges}>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
            <Text style={[styles.badge, {backgroundColor: '#FFA726'}]}>Nutri</Text>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
          </View>
        </View>

        <View style={styles.weekRow}>
          <Text style={styles.weekText}>Semana 4:</Text>
          <View style={styles.badges}>
            <Text style={[styles.badge, {backgroundColor: '#29B6F6'}]}>Hidra</Text>
            <Text style={[styles.badge, {backgroundColor: '#FFA726'}]}>Nutri</Text>
            <Text style={[styles.badge, {backgroundColor: '#AB47BC'}]}>Recons</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {marginTop: 20, marginBottom: 10}]}>📖 Entenda as Etapas</Text>

      {/* FASE 1: HIDRATAÇÃO */}
      <View style={[styles.card, { borderLeftColor: '#29B6F6' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="water" size={24} color="#29B6F6" />
          <Text style={styles.cardTitle}>Hidratação (H)</Text>
        </View>
        <Text style={styles.cardText}>Repõe a ÁGUA. Use máscaras com Babosa, Pantenol ou Glicerina.</Text>
      </View>

      {/* FASE 2: NUTRIÇÃO */}
      <View style={[styles.card, { borderLeftColor: '#FFA726' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="flask" size={24} color="#FFA726" />
          <Text style={styles.cardTitle}>Nutrição (N)</Text>
        </View>
        <Text style={styles.cardText}>Repõe ÓLEOS. Use óleos vegetais (Coco, Argan, Rícino).</Text>
      </View>

      {/* FASE 3: RECONSTRUÇÃO */}
      <View style={[styles.card, { borderLeftColor: '#AB47BC' }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="hammer" size={24} color="#AB47BC" />
          <Text style={styles.cardTitle}>Reconstrução (R)</Text>
        </View>
        <Text style={styles.cardText}>Repõe MASSA. Use Queratina (apenas a cada 15 ou 30 dias).</Text>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 5 },
  subtitle: { fontSize: 16, color: theme.colors.textLight },

  calendarContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 2, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 15 },
  
  weekRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, justifyContent: 'space-between' },
  weekText: { fontWeight: 'bold', color: '#666', width: 80 },
  badges: { flexDirection: 'row', gap: 5 },
  badge: { 
    color: '#fff', paddingVertical: 4, paddingHorizontal: 8, 
    borderRadius: 5, fontSize: 12, fontWeight: 'bold', overflow: 'hidden'
  },

  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15,
    borderLeftWidth: 6, elevation: 1
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginLeft: 10 },
  cardText: { fontSize: 14, color: theme.colors.textLight, lineHeight: 20 }
});