import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen({ navigation, route }) {
  // Permissões
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

  const [facing, setFacing] = useState('front'); 
  const cameraRef = useRef(null);
  const formData = route.params?.formData || {};

  useEffect(() => {
    if (cameraPermission && !cameraPermission.granted) {
      requestCameraPermission();
    }
  }, [cameraPermission]);

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

  const pickImage = async () => {
    // 1. Pede permissão se não tiver
    if (!galleryPermission?.granted) {
      const permissionResponse = await requestGalleryPermission();
      if (!permissionResponse.granted) {
        Alert.alert("Permissão negada", "Precisamos de acesso às suas fotos.");
        return;
      }
    }

    try {
      // 2. Abre a Galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        // CORREÇÃO AQUI: Voltamos para o 'MediaTypeOptions' que é garantido funcionar
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: false, 
        aspect: [4, 4],
        quality: 0.5,
        base64: true, 
      });

      if (!result.canceled) {
        navigation.navigate('Result', { 
          photoUri: result.assets[0].uri, 
          base64: result.assets[0].base64,
          formData: formData 
        });
      }
    } catch (error) {
      console.error("Erro Galeria:", error);
      Alert.alert("Erro", "Não conseguimos abrir a galeria.");
    }
  };

  if (!cameraPermission) return <View />;
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50, color: '#FFF' }}>Precisamos de acesso à câmera</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.permButton}>
            <Text style={{color: '#fff'}}>Permitir Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing={facing} 
        ref={cameraRef}
      />

      <View style={styles.overlay}>
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Ionicons name="images" size={28} color="white" />
            <Text style={styles.iconText}>Galeria</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleCamera}>
            <Ionicons name="camera-reverse" size={28} color="white" />
            <Text style={styles.iconText}>Virar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  permButton: { backgroundColor: '#5D4037', padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 20 },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'flex-end',
    paddingHorizontal: 20
  },
  captureButton: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
  innerCircle: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 2, borderColor: '#5D4037', backgroundColor: 'white'
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 25,
    width: 60
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center'
  }
});