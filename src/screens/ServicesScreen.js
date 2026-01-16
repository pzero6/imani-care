import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados dos serviços baseados nos seus prints
const SERVICES = [
  {
    id: '1',
    title: 'Box Braids',
    price: 'A partir de R$ 250',
    description: 'Tranças soltas com fibra Jumbo. Diversas cores e tamanhos.',
    icon: 'grid-outline'
  },
  {
    id: '2',
    title: 'Trança Nagô',
    price: 'A partir de R$ 80',
    description: 'Tranças rasteiras desenhadas, com ou sem extensão.',
    icon: 'infinite-outline'
  },
  {
    id: '3',
    title: 'Entrelace',
    price: 'A partir de R$ 300',
    description: 'Aplicação de fibra orgânica com acabamento natural.',
    icon: 'git-merge-outline'
  },
  {
    id: '4',
    title: 'Mega Hair',
    price: 'Sob Avaliação',
    description: 'Alongamento e volume com diversas técnicas.',
    icon: 'cut-outline'
  },
];

export default function ServicesScreen({ navigation }) {

  const handleWhatsApp = () => {
    // Substitua pelo número real da Gisele
    // O formato é: https://wa.me/55 + DDD + NUMERO
    Linking.openURL('https://wa.me/5516999999999'); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color="#5D4037" />
        </View>
        <View style={{flex: 1}}>
            <Text style={styles.serviceTitle}>{item.title}</Text>
            <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      </View>
      
      <Text style={styles.serviceDescription}>{item.description}</Text>

      {/* Botão do WhatsApp */}
      <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
        <FontAwesome name="whatsapp" size={20} color="#FFF" style={{marginRight: 10}} />
        <Text style={styles.whatsappText}>Agendar em Araraquara</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho Simples com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#3E2723" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nossos Serviços 💇🏾‍♀️</Text>
      </View>

      <Text style={styles.subtitle}>Atendimento exclusivo em Araraquara-SP</Text>

      <FlatList
        data={SERVICES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Bege clarinho
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, // Margem para barra de status
    marginBottom: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  subtitle: {
    fontSize: 14,
    color: '#8D6E63',
    marginBottom: 20,
    marginLeft: 45, // Alinhar com o texto do título
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#EFEBE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32', // Um verde mais escuro e elegante para o preço
    marginTop: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6D4C41',
    lineHeight: 20,
    marginBottom: 15,
  },
  whatsappButton: {
    backgroundColor: '#25D366', // Verde Oficial do WhatsApp
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  whatsappText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});