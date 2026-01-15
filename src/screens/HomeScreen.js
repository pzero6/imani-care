import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Cacheada! 🦁</Text>
        <Text style={styles.subGreeting}>O que vamos fazer hoje?</Text>
      </View>

      <View style={styles.menuContainer}>
        
        {/* OPÇÃO 1: ANÁLISE (Destaque Principal) */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Camera')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="camera" size={32} color={theme.colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Analisar meu Cabelo</Text>
            <Text style={styles.cardSubtitle}>Descubra o seu tipo de cacho e dicas.</Text>
          </View>
        </TouchableOpacity>

        {/* OPÇÃO 2: SERVIÇOS (Novo - Agora Padronizado!) */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Services')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}> 
            {/* Ícone verde claro para diferenciar */}
            <Ionicons name="cut" size={32} color="#2E7D32" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Menu de Serviços</Text>
            <Text style={styles.cardSubtitle}>Tranças, cortes e tratamentos.</Text>
          </View>
        </TouchableOpacity>

        {/* OPÇÃO 3: CRONOGRAMA (Futuro) */}
        <TouchableOpacity 
          style={styles.card}
          // Por enquanto não faz nada ou vai para uma tela em construção
          onPress={() => navigation.navigate('Schedule')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="calendar" size={32} color={theme.colors.accent} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Cronograma Capilar</Text>
            <Text style={styles.cardSubtitle}>Sua rotina de cuidados.</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  
  header: { marginTop: 40, marginBottom: 30 },
  greeting: { fontSize: 32, fontWeight: 'bold', color: theme.colors.primary },
  subGreeting: { fontSize: 18, color: theme.colors.textLight, marginTop: 5 },

  menuContainer: { gap: 20 }, // Espaço entre os cartões

  // ESTILO PADRÃO DO CARTÃO (Card)
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombra suave
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#F5F5F5', // Cor padrão do fundo do ícone
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  cardSubtitle: { fontSize: 14, color: theme.colors.textLight, marginTop: 4 }
});