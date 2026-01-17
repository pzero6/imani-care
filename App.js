import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importação das Telas (Certifique-se de que os nomes dos arquivos estão corretos)
import CameraScreen from './src/screens/CameraScreen'; // Tela que tira a foto
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import ResultScreen from './src/screens/ResultScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import WelcomeAlphaScreen from './src/screens/WelcomeAlphaScreen';

// Importação do Tema
import { theme } from './src/utils/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName="WelcomeAlpha"
        screenOptions={{
          headerShown: false, // Escondemos o header padrão para manter o design limpo
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        {/* 1. Tela de Boas-vindas Alpha */}
        <Stack.Screen 
          name="WelcomeAlpha" 
          component={WelcomeAlphaScreen} 
        />

        {/* 2. Questionário Automatizado */}
        <Stack.Screen 
          name="Questionnaire" 
          component={QuestionnaireScreen} 
        />

        {/* 3. Captura de Foto */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
        />

        {/* 4. Resultado do Diagnóstico IA */}
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
        />

        {/* 5. Cronograma com Notas de Produtos */}
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}