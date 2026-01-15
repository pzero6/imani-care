import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function QuestionnaireScreen({ navigation }) {
  // Estados para guardar as respostas
  const [hasChemical, setHasChemical] = useState(false);
  const [usesHeat, setUsesHeat] = useState(false);
  const [complaint, setComplaint] = useState('Ressecamento');

  // Opções de queixas
  const complaints = ['Ressecamento', 'Frizz', 'Quebra', 'Sem Definição', 'Queda'];

  const handleNext = () => {
    // Empacota as respostas
    const formData = {
      hasChemical,
      usesHeat,
      mainComplaint: complaint
    };

    // Navega para a Câmera, LEVANDO os dados na mochila (params)
    navigation.navigate('Camera', { formData });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajude a IA 🧠</Text>
      <Text style={styles.subtitle}>Responda 3 perguntas rápidas para uma análise perfeita.</Text>

      {/* PERGUNTA 1: QUÍMICA */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.questionTitle}>Tem Química?</Text>
            <Text style={styles.questionSub}>Tintura, alisamento, relaxamento...</Text>
          </View>
          <Switch 
            value={hasChemical} 
            onValueChange={setHasChemical}
            trackColor={{ false: "#767577", true: theme.colors.primary }}
          />
        </View>
      </View>

      {/* PERGUNTA 2: CALOR */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.questionTitle}>Usa Fonte de Calor?</Text>
            <Text style={styles.questionSub}>Secador, chapinha, difusor frequente...</Text>
          </View>
          <Switch 
            value={usesHeat} 
            onValueChange={setUsesHeat}
            trackColor={{ false: "#767577", true: theme.colors.primary }}
          />
        </View>
      </View>

      {/* PERGUNTA 3: QUEIXA PRINCIPAL */}
      <Text style={styles.sectionTitle}>Qual o maior problema hoje?</Text>
      <View style={styles.tagsContainer}>
        {complaints.map((item) => (
          <TouchableOpacity 
            key={item} 
            style={[styles.tag, complaint === item && styles.tagSelected]}
            onPress={() => setComplaint(item)}
          >
            <Text style={[styles.tagText, complaint === item && styles.tagTextSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Ir para a Câmera 📸</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginTop: 20 },
  subtitle: { fontSize: 16, color: theme.colors.textLight, marginBottom: 30 },
  
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  questionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  questionSub: { fontSize: 14, color: theme.colors.textLight, maxWidth: 200 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 15, marginTop: 10 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 40 },
  
  tag: { 
    backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20, 
    borderRadius: 20, borderWidth: 1, borderColor: '#ddd' 
  },
  tagSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  tagText: { color: '#666', fontWeight: 'bold' },
  tagTextSelected: { color: '#fff' },

  button: {
    backgroundColor: theme.colors.primary, padding: 18, borderRadius: 12, 
    alignItems: 'center', marginBottom: 30, elevation: 3
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});