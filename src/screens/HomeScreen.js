import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUser } from '../services/userService'; // Importando o serviço para ler o nome
import { theme } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('Cacheada'); // Nome padrão caso não ache

  // Carrega o nome assim que a tela abre
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const name = await getUser();
    if (name) {
      setUserName(name);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {userName}! 🦁</Text>
          <Text style={styles.subGreeting}>O que vamos fazer hoje?</Text>
        </View>
        
        {/* BOTÃO DO HISTÓRICO (Lado direito) */}
        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* --- MENU DE OPÇÕES --- */}
      <View style={styles.menuContainer}>
        
        {/* 1. ANÁLISE (CÂMERA) */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Camera')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="camera" size={32} color={theme.colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Analisar meu Cabelo</Text>
            <Text style={styles.cardSubtitle}>Descubra o seu tipo de cacho e dicas com IA.</Text>
          </View>
        </TouchableOpacity>

        {/* 2. SERVIÇOS DO SALÃO */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Services')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}> 
            {/* Ícone verde claro */}
            <Ionicons name="cut" size={32} color="#2E7D32" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Menu de Serviços</Text>
            <Text style={styles.cardSubtitle}>Tranças, cortes, entrelace e tratamentos.</Text>
          </View>
        </TouchableOpacity>

        {/* 3. CRONOGRAMA CAPILAR (EDUCATIVO) */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Schedule')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
            {/* Ícone laranja claro */}
            <Ionicons name="calendar" size={32} color={theme.colors.accent} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Cronograma Capilar</Text>
            <Text style={styles.cardSubtitle}>Entenda o que seu cabelo precisa.</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  
  // Estilo do Cabeçalho com Flexbox para separar Texto e Botão
  header: { 
    marginTop: 40, 
    marginBottom: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  
  greeting: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary }, // Ajustei um pouco o tamanho
  subGreeting: { fontSize: 16, color: theme.colors.textLight, marginTop: 5 },

  // Botão redondinho do histórico
  historyButton: {
    width: 45, height: 45,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
    // Sombra
    elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },

  menuContainer: { gap: 20 }, // Espaçamento entre os cartões

  // ESTILO PADRÃO DOS CARTÕES
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  cardSubtitle: { fontSize: 14, color: theme.colors.textLight, marginTop: 4 }
});