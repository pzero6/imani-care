import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    // Se a pessoa não digitar nada, usamos "Cacheada" como padrão
    const userName = name.trim() || "Cacheada";
    
    // Navega para a Home enviando o nome digitado
    navigation.replace('Home', { userName: userName });
  };

  return (
    <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        
        {/* Logo da Imani (Sem círculo) */}
        <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo} 
        />

        {/* Título (Sem emoji) */}
        <Text style={styles.title}>Bem-vinda à Imani Care</Text>
        <Text style={styles.subtitle}>Sua jornada capilar começa aqui.</Text>

        {/* Campo para digitar o nome */}
        <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#5D4037" style={{marginRight: 10}} />
            <TextInput
                style={styles.input}
                placeholder="Como quer ser chamada?"
                placeholderTextColor="#A1887F"
                value={name}
                onChangeText={setName}
            />
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Entrar</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Fundo Bege
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  // ESTILO DA LOGO ALTERADO
  logo: {
    width: 180, // Aumentei um pouco
    height: 180,
    marginBottom: 30,
    resizeMode: 'contain',
    // Removi: borderRadius, borderWidth, borderColor, backgroundColor
  },
  title: {
    fontSize: 28, // Fonte ligeiramente maior
    fontWeight: 'bold',
    color: '#3E2723', // Marrom Escuro
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#6D4C41',
    marginBottom: 40,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: '#EFEBE9'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#3E2723',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#5D4037',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 18,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  }
});