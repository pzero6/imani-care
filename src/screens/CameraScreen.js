import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Adicionei 'route' aqui para pegar o nome
export default function CameraScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  
  // PEGANDO O NOME QUE VEIO DA TELA ANTERIOR
  const { userName } = route.params || {};

  const [facing, setFacing] = useState('front'); 
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', marginBottom: 20, textAlign: 'center' }}>
          Precisamos de acesso à câmera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={{ backgroundColor: '#FFF', padding: 10, borderRadius: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true, 
        });
        
        // AQUI ESTÁ A MÁGICA: Passamos o userName junto com a foto
        navigation.navigate('Result', { 
            photoBase64: photo.base64,
            userName: userName 
        });

      } catch (error) {
        alert("Erro ao tirar foto: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef}
      >
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFF" />
            <Text style={{color: '#FFF', marginTop: 10, fontWeight: 'bold'}}>Processando...</Text>
          </View>
        )}

        <SafeAreaView style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.footer}>
          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={styles.captureButtonOuter} 
            onPress={takePicture}
            disabled={loading}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={toggleCamera}
            >
              <Ionicons name="camera-reverse-outline" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1, justifyContent: 'space-between' },
  header: { paddingTop: 50, paddingLeft: 20, flexDirection: 'row', alignItems: 'flex-start' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 60, paddingHorizontal: 20, backgroundColor: 'rgba(0,0,0,0.2)', paddingTop: 30 },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  captureButtonOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  captureButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 999 }
});