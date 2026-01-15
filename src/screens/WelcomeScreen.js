import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { saveUser } from '../services/userService';
import { theme } from '../utils/theme';

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleLogin = async () => {
    if (name.trim() === '') {
      Alert.alert("Ops!", "Por favor, digite seu nome.");
      return;
    }

    // Salva o nome e vai para a Home
    await saveUser(name);
    // O 'replace' impede que o usuário volte para o login ao apertar 'voltar'
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      {/* Círculo decorativo no fundo */}
      <View style={styles.circle} />

      <View style={styles.content}>
        <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo} 
        />
        
        <Text style={styles.title}>Bem-vinda ao Imani Care 🦁</Text>
        <Text style={styles.subtitle}>Sua jornada capilar começa aqui.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Como podemos te chamar?</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center' },
  
  circle: {
    position: 'absolute', top: -100, right: -100,
    width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(193, 161, 99, 0.2)', // Cor dourada transparente
  },

  content: { padding: 30, alignItems: 'center' },
  
  logo: { width: 120, height: 120, marginBottom: 30, borderRadius: 60 },
  
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: theme.colors.textLight, textAlign: 'center', marginBottom: 40 },

  inputContainer: { width: '100%', marginBottom: 25 },
  label: { fontSize: 16, color: theme.colors.text, marginBottom: 8, fontWeight: 'bold' },
  input: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 15, 
    fontSize: 16,
    borderWidth: 1, borderColor: '#ddd'
  },

  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15, paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 5
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});