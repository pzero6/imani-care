import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleLogin = () => {
    const nameToSend = name.trim() !== '' ? name : 'Cacheada';
    navigation.navigate('Home', { userName: nameToSend });
  };

  const handleVisitante = () => {
    navigation.navigate('Home', { userName: 'Visitante' });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        
        {/* Logo Imani */}
        <View style={styles.logoContainer}>
           <Image
            // O caminho ../../ volta para a raiz do projeto para achar a pasta assets
            source={require('../../assets/icon.png')} 
            style={styles.logoImage}
            resizeMode="contain"
           />
        </View>

        <Text style={styles.title}>Bem-vinda ao Imani Care</Text>

        <Text style={styles.subtitle}>Sua jornada capilar começa aqui.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Como podemos te chamar?</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            placeholderTextColor="#A1887F"
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleVisitante}>
          <Text style={styles.guestLink}>Entrar como Visitante</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Off-white
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180, 
  },
  logoImage: {
    width: 150, // Ajuste este valor se a logo ficar muito grande ou pequena
    height: 150, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5D4037', // Marrom café
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#3E2723',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#5D4037',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestLink: {
    color: '#8D6E63',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});