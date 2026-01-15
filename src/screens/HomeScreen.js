import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Cacheada! 🦁</Text>
      <Text style={styles.subtitle}>O que vamos fazer hoje?</Text>

      {/* Cartão de Ação Principal */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.cardIcon}>📸</Text>
        <View>
          <Text style={styles.cardTitle}>Analisar meu Cabelo</Text>
          <Text style={styles.cardDesc}>Descubra o seu tipo de cacho e dicas.</Text>
        </View>
      </TouchableOpacity>

      {/* Cartão Secundário (Exemplo) */}
      <TouchableOpacity style={[styles.card, { marginTop: 15 }]}>
        <Text style={styles.cardIcon}>📅</Text>
        <View>
          <Text style={styles.cardTitle}>Cronograma Capilar</Text>
          <Text style={styles.cardDesc}>A sua rotina de cuidados.</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary },
  subtitle: { fontSize: 16, color: theme.colors.textLight, marginBottom: 30 },
  
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center',
    // Sombra suave
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
  },
  cardIcon: { fontSize: 30, marginRight: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  cardDesc: { fontSize: 14, color: theme.colors.textLight }
});