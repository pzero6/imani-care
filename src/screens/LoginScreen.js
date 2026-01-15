import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imani Care</Text>
      <Text style={styles.subtitle}>Beleza que vem da raiz</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('Home')} // Vai para a Home
      >
        <Text style={styles.buttonText}>Entrar (Modo Visitante)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textLight,
    marginBottom: 50,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: theme.borderRadius.medium,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});