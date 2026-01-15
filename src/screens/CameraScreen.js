import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Precisamos de acesso à câmera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permButton}>
            <Text style={{color: '#fff'}}>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        
        // Pega os dados que vieram do questionário (ou vazio se não tiver)
        const formData = route.params?.formData || {};

        // Passa a FOTO + os DADOS para a tela de resultado
        navigation.navigate('Result', { 
            photoUri: photo.uri, 
            base64: photo.base64,
            formData: formData 
        });

      } catch (error) {
        Alert.alert("Erro", "Não foi possível tirar a foto.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>

          <View style={{width: 50}} /> 
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  permButton: { backgroundColor: '#C1A163', padding: 10, borderRadius: 5, alignSelf: 'center' },
  buttonContainer: {
    flex: 1, flexDirection: 'row', backgroundColor: 'transparent', 
    marginBottom: 40, justifyContent: 'space-around', alignItems: 'flex-end'
  },
  flipButton: { 
    width: 50, height: 50, borderRadius: 25, 
    backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' 
  },
  captureButton: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center'
  },
  innerCircle: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 2, borderColor: '#C1A163', backgroundColor: 'white'
  }
});