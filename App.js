import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// --- IMPORTANDO TODAS AS TELAS ---
import CameraScreen from './src/screens/CameraScreen';
import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';
import ScheduleScreen from './src/screens/ScheduleScreen'; // <--- A peça que faltava!
import ServicesScreen from './src/screens/ServicesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Tela Inicial */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Fluxo de Análise */}
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        
        {/* Menu de Serviços (Cabeçalho visível) */}
        <Stack.Screen 
          name="Services" 
          component={ServicesScreen} 
          options={{ headerShown: true, title: 'Menu de Serviços' }} 
        />
        
        {/* Tela de Cronograma (Cabeçalho visível) */}
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen} 
          options={{ headerShown: true, title: 'Entenda o Cronograma' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}