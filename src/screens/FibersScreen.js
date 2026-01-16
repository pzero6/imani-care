import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FibersScreen({ navigation }) {

  // Componente de Card de Dica
  const InfoCard = ({ title, icon, color, text }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={styles.cardText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#3E2723" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cuidados com Fibras</Text>
      </View>

      {/* Imagem de Capa Ilustrativa (Placeholder) */}
      <View style={styles.heroContainer}>
         <MaterialCommunityIcons name="hair-dryer" size={80} color="#8D6E63" />
         <Text style={styles.heroText}>Sua trança, sua coroa.</Text>
         <Text style={styles.heroSubText}>Veja como fazer sua fibra durar mais.</Text>
      </View>

      <Text style={styles.sectionTitle}>Guia de Manutenção ✨</Text>

      {/* Lista de Dicas */}
      <View style={styles.cardsContainer}>
        
        <InfoCard 
            title="Como Lavar?" 
            icon="water" 
            color="#29B6F6" // Azul
            text="Use shampoo diluído em água e aplique apenas no couro cabeludo. Esfregue suavemente com a ponta dos dedos. Evite condicionador na raiz para não escorregar a fibra."
        />

        <InfoCard 
            title="Hora de Dormir" 
            icon="sleep" 
            color="#7E57C2" // Roxo
            text="Sempre use touca de cetim! Ela evita o atrito com o travesseiro, reduzindo o frizz e mantendo a trança bonita por muito mais tempo."
        />

        <InfoCard 
            title="Coceira e Irritação" 
            icon="feather" 
            color="#FFA726" // Laranja
            text="Se sentir coceira, use tônicos calmantes de hortelã ou babosa. Evite coçar com as unhas para não ferir o couro cabeludo ou desmanchar a trança."
        />

        <InfoCard 
            title="Tempo de Permanência" 
            icon="clock-outline" 
            color="#EF5350" // Vermelho
            text="O ideal é ficar no máximo 3 meses com as tranças. Passar desse tempo pode causar 'scab hair' e enfraquecer a raiz do seu cabelo natural."
        />

      </View>

      {/* Botão para Agendar Manutenção */}
      <TouchableOpacity style={styles.maintenanceButton} onPress={() => navigation.navigate('Servicos')}>
        <Text style={styles.maintenanceButtonText}>Precisa de Manutenção? Agende aqui</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFF" />
      </TouchableOpacity>

      <View style={{height: 30}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
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
  heroContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#EFEBE9',
    borderRadius: 20,
  },
  heroText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 10,
  },
  heroSubText: {
    fontSize: 14,
    color: '#8D6E63',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 15,
  },
  cardsContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5D4037',
  },
  cardText: {
    fontSize: 14,
    color: '#6D4C41',
    lineHeight: 22,
  },
  maintenanceButton: {
    backgroundColor: '#5D4037',
    padding: 18,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  maintenanceButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
});