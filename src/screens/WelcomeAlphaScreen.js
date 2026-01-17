import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function WelcomeAlphaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="beaker-outline" size={60} color={theme.colors.primary} />
        </View>

        <Text style={styles.badge}>VERSÃO ALPHA TEST</Text>
        
        <Text style={styles.titulo}>Bem-vinda ao Imani Care</Text>
        
        <Text style={styles.texto}>
          Estamos muito felizes em ter você aqui! Este é um momento especial onde nossa tecnologia encontra o cuidado real.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTexto}>
            Como esta é uma <Text style={{fontWeight: 'bold'}}>versão de testes</Text>, suas opiniões e sugestões são o que nos ajudará a construir a melhor experiência para você.
          </Text>
        </View>

        <Text style={styles.textoFinal}>
          Sinta-se em casa e aproveite seu diagnóstico personalizado.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => navigation.navigate('Questionnaire')} // Nome da sua tela inicial de perguntas
        >
          <Text style={styles.botaoTexto}>Começar Experiência</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 30, paddingTop: 80, alignItems: 'center' },
  iconContainer: { marginBottom: 30 },
  badge: { 
    fontSize: 10, 
    letterSpacing: 2, 
    color: theme.colors.secondary, 
    borderWidth: 1, 
    borderColor: theme.colors.secondary, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 5,
    marginBottom: 20
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: theme.colors.primary, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  texto: { 
    fontSize: 16, 
    color: theme.colors.text, 
    textAlign: 'center', 
    lineHeight: 24,
    marginBottom: 25
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    elevation: 3,
    marginBottom: 25
  },
  infoTexto: { fontSize: 14, color: theme.colors.text, lineHeight: 22 },
  textoFinal: { fontSize: 15, color: theme.colors.secondary, textAlign: 'center', fontStyle: 'italic' },
  footer: { padding: 30, paddingBottom: 50 },
  botao: { 
    backgroundColor: theme.colors.primary, 
    flexDirection: 'row',
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  botaoTexto: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 }
});