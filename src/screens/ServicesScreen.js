import { Ionicons } from '@expo/vector-icons';
import { Alert, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

// 🔴 CONFIGURAÇÃO: Coloque o número do Salão aqui
const PHONE_NUMBER = "5511999999999"; 

const servicesData = [
  {
    id: '1',
    title: 'Box Braids',
    price: 'A partir de R$ 250',
    description: 'Tranças soltas com fibra Jumbo. Diversas cores e tamanhos.',
    icon: 'apps' // Ícone de "quadradinhos" representando as tranças
  },
  {
    id: '2',
    title: 'Trança Nagô',
    price: 'A partir de R$ 80',
    description: 'Tranças rasteiras desenhadas, com ou sem extensão.',
    icon: 'git-network' // Ícone que parece um desenho de caminhos
  },
  {
    id: '3',
    title: 'Entrelace',
    price: 'A partir de R$ 300',
    description: 'Aplicação de fibra orgânica com acabamento natural.',
    icon: 'infinite' // Ícone de infinito representando a costura
  },
  {
    id: '4',
    title: 'Cronograma Capilar',
    price: 'R$ 150 (4 sessões)',
    description: 'Pacote mensal de Hidratação, Nutrição e Reconstrução.',
    icon: 'water' // Ícone de gota
  },
  {
    id: '5',
    title: 'Corte e Finalização',
    price: 'R$ 90',
    description: 'Corte a seco especializado em curvaturas e fitagem.',
    icon: 'cut' // Ícone de tesoura
  }
];

export default function ServicesScreen() {

  const openWhatsApp = (serviceName) => {
    const message = `Olá! Vi o serviço de *${serviceName}* no App Imani Care e gostaria de agendar um horário! 🦁`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color="#fff" />
        </View>
        <View style={styles.headerText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
      </View>
      
      <Text style={styles.cardDescription}>{item.description}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => openWhatsApp(item.title)}>
        <Text style={styles.buttonText}>Agendar Agora</Text>
        <Ionicons name="logo-whatsapp" size={18} color="#fff" style={{marginLeft: 8}} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Nossos Serviços 💇‍♀️</Text>
      <FlatList
        data={servicesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingTop: 20 },
  screenTitle: { fontSize: 26, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginBottom: 20 },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 20,
    elevation: 3, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconContainer: { 
      width: 50, height: 50, 
      backgroundColor: theme.colors.primary, 
      borderRadius: 25, 
      justifyContent: 'center', alignItems: 'center',
      marginRight: 15
  },
  headerText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: theme.colors.accent, marginTop: 2 },
  
  cardDescription: { fontSize: 14, color: theme.colors.textLight, lineHeight: 20, marginBottom: 15 },
  
  button: { 
      backgroundColor: '#25D366', 
      paddingVertical: 10, 
      borderRadius: 8, 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center' 
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});