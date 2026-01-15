import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'; // <--- Importação Nova
import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoData, setPhotoData] = useState(null);
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos da sua permissão para ver os cachos!</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir Câmara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- NOVA FUNÇÃO: ABRIR GALERIA ---
  const pickImage = async () => {
    // Pede permissão para acessar a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Se quiser permitir cortar a foto, mude para true
      quality: 0.5,
      base64: true, // Importante: precisamos do base64 para a IA
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Se o usuário escolheu uma foto, salvamos no estado igualzinho à câmera
      setPhotoData(result.assets[0]);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.3, 
          base64: true,
          skipProcessing: true,
        });
        
        if (data.base64) {
             setPhotoData(data);
        } else {
             Alert.alert("Erro", "A câmara não gerou a imagem.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível tirar a foto.");
      }
    }
  };

  // Ecrã de Pré-visualização (Serve tanto para Foto Tirada quanto para Galeria)
  if (photoData) {
    return (
      <View style={styles.container}>
        <Image 
            source={{ uri: photoData.uri }} 
            // Se veio da câmera frontal, espelhamos. Se veio da galeria, não mexemos.
            style={[
                styles.preview, 
                facing === 'front' && !photoData.fileName ? { transform: [{ scaleX: -1 }] } : {} 
            ]} 
        />
        
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => setPhotoData(null)}>
            <Text style={styles.secondaryText}>Escolher Outra</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]} 
            onPress={() => {
                navigation.navigate('Result', { 
                    photoUri: photoData.uri, 
                    base64: photoData.base64 
                });
            }}
          >
            <Text style={styles.primaryText}>Analisar 🦁</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Ecrã da Câmara Ligada
  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFill} 
        facing={facing}
        ref={cameraRef}
      />
      
      <View style={styles.cameraControls}>
          <Text style={styles.overlayText}>
            {facing === 'front' ? 'Olhe para a câmara 🤳' : 'Enquadre o cabelo 💡'}
          </Text>
          
          <View style={styles.buttonsRow}>
            
            {/* --- BOTÃO GALERIA (Esquerda) --- */}
            <TouchableOpacity style={styles.sideButton} onPress={pickImage}>
                <Ionicons name="images" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Botão de Disparo (Centro) */}
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureInner} />
            </TouchableOpacity>

            {/* Botão de Virar (Direita) */}
            <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
                <Ionicons name="camera-reverse" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  text: { color: '#fff', textAlign: 'center', marginBottom: 20, marginTop: 150 },
  button: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 10, alignSelf: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  
  cameraControls: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    height: 180,
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingBottom: 70 
  },
  overlayText: { color: '#fff', fontSize: 16, marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 5 },
  
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  
  captureButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#fff' },
  
  sideButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25
  },

  preview: { flex: 1 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#fff', paddingBottom: 50 },
  actionButton: { padding: 15, borderRadius: 10, width: '45%', alignItems: 'center' },
  primaryButton: { backgroundColor: theme.colors.primary },
  secondaryButton: { backgroundColor: '#eee' },
  primaryText: { color: '#fff', fontWeight: 'bold' },
  secondaryText: { color: '#333' }
});