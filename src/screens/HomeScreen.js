import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  
  // Lógica para RECEBER o nome
  // route.params pode vir vazio, então usamos || {} para não dar erro
  const { userName } = route.params || {};
  const displayName = userName || 'Cacheada'; // Se não vier nome, usa 'Cacheada'

  const handleNavigation = (screenName) => {
    // Agora que as telas existem, podemos navegar de verdade!
    navigation.navigate(screenName); 
  };

  const handleLogout = () => {
    // Zera o histórico e volta para o login
    navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Cabeçalho + Botão Sair */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {displayName}!</Text>
          <Text style={styles.subGreeting}>Vamos cuidar da sua coroa hoje?</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
           <Ionicons name="log-out-outline" size={24} color="#5D4037" />
           <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Card Dica do Dia */}
      <View style={styles.tipCard}>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Dica do Dia</Text>
          <Text style={styles.tipText}>
            A hidratação é essencial para a definição. Tente usar óleos vegetais hoje!
          </Text>
        </View>
        <Ionicons name="water-outline" size={48} color="#FFF" style={{ opacity: 0.9 }} />
      </View>

      {/* Título da Seção */}
      <Text style={styles.sectionTitle}>O que você precisa?</Text>

      {/* Grade de Botões (Grid) */}
      <View style={styles.gridContainer}>
        
        {/* 1. Analisar */}
        <TouchableOpacity style={styles.gridButton} onPress={() => handleNavigation('Questionnaire')}>
          <View style={styles.iconBox}>
            <Ionicons name="camera-outline" size={28} color="#5D4037" />
          </View>
          <Text style={styles.gridLabel}>Analisar</Text>
        </TouchableOpacity>

        {/* 2. Serviços */}
        <TouchableOpacity style={styles.gridButton} onPress={() => handleNavigation('Servicos')}>
          <View style={styles.iconBox}>
            <Ionicons name="cut-outline" size={28} color="#5D4037" />
          </View>
          <Text style={styles.gridLabel}>Serviços</Text>
        </TouchableOpacity>

        {/* 3. Cronograma */}
        <TouchableOpacity style={styles.gridButton} onPress={() => handleNavigation('Cronograma')}>
          <View style={styles.iconBox}>
            <Ionicons name="calendar-outline" size={28} color="#5D4037" />
          </View>
          <Text style={styles.gridLabel}>Cronograma</Text>
        </TouchableOpacity>

        {/* 4. Fibras e Tranças */}
        <TouchableOpacity style={styles.gridButton} onPress={() => handleNavigation('Fibras')}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="hair-dryer-outline" size={28} color="#5D4037" />
          </View>
          <Text style={styles.gridLabel}>Fibras e Tranças</Text>
        </TouchableOpacity>

      </View>

      {/* Card IA Tira Dúvidas */}
      <TouchableOpacity style={styles.aiCard} onPress={() => handleNavigation('ChatIA')}>
        <View>
            <Text style={styles.aiTitle}>Dúvidas de Cabelo? ✨</Text>
            <Text style={styles.aiSubtitle}>Pergunte para nossa IA.</Text>
        </View>
        <View style={styles.aiIconCircle}>
            <MaterialCommunityIcons name="robot-happy-outline" size={30} color="#FFF" />
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Bege clarinho
    padding: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6D4C41',
    marginTop: 4,
  },
  logoutButton: {
    alignItems: 'center',
    padding: 5,
  },
  logoutText: {
    fontSize: 10,
    color: '#5D4037',
    fontWeight: 'bold',
  },
  tipCard: {
    backgroundColor: '#8D6E63', // Marrom médio
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  tipContent: {
    flex: 1,
    marginRight: 10,
  },
  tipTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipText: {
    color: '#EFEBE9',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridButton: {
    width: '47%', 
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: '#EFEBE9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D4037',
    textAlign: 'center',
  },
  aiCard: {
    backgroundColor: '#A1887F', 
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 12,
    color: '#EFEBE9',
    maxWidth: 200,
  },
  aiIconCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});