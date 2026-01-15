import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Imports das Telas
import CameraScreen from './src/screens/CameraScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import WelcomeScreen from './src/screens/WelcomeScreen'; // <--- IMPORT NOVO

// Import do Serviço de Usuário
import { getUser } from './src/services/userService';
import { theme } from './src/utils/theme';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  // Verifica se o usuário já existe ao abrir o app
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await getUser();
    // Se tiver usuário, vai pra Home. Se não, vai pra Welcome.
    setInitialRoute(user ? 'Home' : 'Welcome');
  };

  // Enquanto decide, mostra um loading
  if (initialRoute === null) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ headerShown: true, title: 'Menu de Serviços' }} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: true, title: 'Entenda o Cronograma' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Diário Capilar', headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}