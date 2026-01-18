import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Imports das telas
import CameraScreen from './src/screens/CameraScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import ResultScreen from './src/screens/ResultScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import WelcomeAlphaScreen from './src/screens/WelcomeAlphaScreen';

// Import do Tema
import { theme } from './src/utils/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName="WelcomeAlpha"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen name="WelcomeAlpha" component={WelcomeAlphaScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}