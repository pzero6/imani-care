import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Imports das Telas
import CameraScreen from './src/screens/CameraScreen';
import ChatScreen from './src/screens/ChatScreen';
import CronogramaScreen from './src/screens/CronogramaScreen';
import FibersScreen from './src/screens/FibersScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import ResultScreen from './src/screens/ResultScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        
        {/* Telas Principais */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Funcionalidades */}
        <Stack.Screen name="Servicos" component={ServicesScreen} />
        <Stack.Screen name="Cronograma" component={CronogramaScreen} />
        <Stack.Screen name="Fibras" component={FibersScreen} />
        <Stack.Screen name="ChatIA" component={ChatScreen} />
        
        {/* Fluxo de Análise */}
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}