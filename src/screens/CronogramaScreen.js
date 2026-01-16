import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CronogramaScreen({ navigation, route }) {
  const { foco } = route.params || {};
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    gerarAgendaInteligente();
  }, [foco]);

  const gerarAgendaInteligente = () => {
    const necessidade = foco ? foco.toLowerCase() : 'hidratação';
    
    let cronograma = [];

    // Lógica para definir o calendário
    if (necessidade.includes('nutri') || necessidade.includes('óleo')) {
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'H', 'N'] },
            { semana: 3, etapas: ['H', 'N', 'H'] },
            { semana: 4, etapas: ['H', 'N', 'R'] }, 
        ];
    } else if (necessidade.includes('recons') || necessidade.includes('quebra')) {
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'N', 'R'] },
            { semana: 3, etapas: ['H', 'H', 'N'] },
            { semana: 4, etapas: ['H', 'N', 'R'] }, 
        ];
    } else {
        // Padrão (Hidratação)
        cronograma = [
            { semana: 1, etapas: ['H', 'N', 'H'] },
            { semana: 2, etapas: ['H', 'H', 'N'] },
            { semana: 3, etapas: ['H', 'N', 'H'] },
            { semana: 4, etapas: ['H', 'H', 'R'] }, 
        ];
    }
    setAgenda(cronograma);
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#3E2723" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cronograma 📅</Text>
      </View>

      <Text style={styles.labelTitle}>Diagnóstico da IA:</Text>
      
      {/* Caixa de Texto Ajustada */}
      <View style={styles.focusCard}>
        <MaterialCommunityIcons name="robot-happy" size={24} color="#FFF" style={{marginBottom: 10}}/>
        <Text style={styles.focusText}>
            {foco || "Manutenção Básica e Hidratação."}
        </Text>
      </View>

      <View style={styles.calendarCard}>
        <Text style={styles.cardTitle}>Agenda Personalizada</Text>
        {agenda.map((item, index) => (
            <View key={index} style={styles.weekRow}>
                <Text style={styles.weekText}>Semana {item.semana}:</Text>
                <View style={styles.tagsContainer}>
                    {item.etapas.map((etapa, i) => (
                        <Etiqueta key={i} tipo={etapa} />
                    ))}
                </View>
            </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Legenda</Text>

      <View style={[styles.infoCard, { borderLeftColor: '#29B6F6' }]}>
        <Text style={styles.infoTitle}>💧 Hidratação (H)</Text>
        <Text style={styles.infoText}>Repõe água. Use Babosa ou Pantenol.</Text>
      </View>

      <View style={[styles.infoCard, { borderLeftColor: '#FFA726' }]}>
        <Text style={styles.infoTitle}>🥥 Nutrição (N)</Text>
        <Text style={styles.infoText}>Repõe óleos. Use Óleo de Coco ou Rícino.</Text>
      </View>

      <View style={[styles.infoCard, { borderLeftColor: '#AB47BC' }]}>
        <Text style={styles.infoTitle}>🔨 Reconstrução (R)</Text>
        <Text style={styles.infoText}>Repõe massa. Use Queratina (cuidado com excesso).</Text>
      </View>

      <View style={{height: 30}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 15 },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#3E2723' },
  
  labelTitle: { fontSize: 16, color: '#6D4C41', marginBottom: 10, fontWeight: 'bold' },
  
  // Nova caixa de destaque mais bonita
  focusCard: { 
    backgroundColor: '#5D4037', padding: 20, borderRadius: 15, 
    marginBottom: 25, elevation: 3, justifyContent: 'center', alignItems: 'flex-start'
  },
  focusText: { color: '#FFF', fontSize: 15, lineHeight: 22 },

  calendarCard: {
    backgroundColor: '#FFF', borderRadius: 15, padding: 20, marginBottom: 30,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 3
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#3E2723', marginBottom: 20, textAlign: 'center' },
  weekRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', paddingBottom: 10
  },
  weekText: { fontSize: 14, fontWeight: 'bold', color: '#5D4037', width: 80 },
  tagsContainer: { flexDirection: 'row', gap: 8 },
  tag: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, minWidth: 55, alignItems: 'center' },
  tagText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },

  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#3E2723', marginBottom: 15 },
  infoCard: {
    backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 10,
    borderLeftWidth: 5, elevation: 1
  },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#3E2723', marginBottom: 4 },
  infoText: { fontSize: 13, color: '#6D4C41' },
});