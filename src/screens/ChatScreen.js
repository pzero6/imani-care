import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { sendMessageToChat } from '../services/geminiService'; // Importando a nova função

export default function ChatScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Mensagem inicial da IA
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Sou a Imani AI 🤖. Pode me perguntar qualquer coisa sobre seu cabelo!', sender: 'ai' }
  ]);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // 1. Adiciona a mensagem do usuário na tela
    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    // 2. Chama a IA
    const aiResponseText = await sendMessageToChat(userMsg.text);

    // 3. Adiciona a resposta da IA na tela
    const aiMsg = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.bubble, 
        isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
            {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Imani AI ✨</Text>
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Loading (Digitando...) */}
      {loading && (
        <View style={{ padding: 10, marginLeft: 20 }}>
            <Text style={{ color: '#888', fontStyle: 'italic' }}>Imani está digitando...</Text>
        </View>
      )}

      {/* Área de Input */}
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Digite sua dúvida..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Ionicons name="send" size={20} color="#FFF" />
            )}
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  
  header: {
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20,
    backgroundColor: '#5D4037', flexDirection: 'row', alignItems: 'center',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 5
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },

  listContent: { padding: 20, paddingBottom: 10 },
  
  bubble: {
    padding: 15, borderRadius: 15, marginBottom: 15, maxWidth: '80%'
  },
  userBubble: {
    backgroundColor: '#5D4037', alignSelf: 'flex-end', borderBottomRightRadius: 2
  },
  aiBubble: {
    backgroundColor: '#FFF', alignSelf: 'flex-start', borderBottomLeftRadius: 2,
    borderWidth: 1, borderColor: '#E0E0E0'
  },
  messageText: { fontSize: 16, lineHeight: 22 },
  userText: { color: '#FFF' },
  aiText: { color: '#333' },

  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15, // Espaço nos lados
    paddingTop: 15,        // Espaço em cima
    paddingBottom: 50,     // <--- AUMENTEI AQUI: Empurra tudo para cima, fugindo dos botões do Android
    backgroundColor: '#FFF',
    borderTopWidth: 1, 
    borderTopColor: '#EEE', 
    alignItems: 'center'
  },
  input: {
    flex: 1, backgroundColor: '#F5F5F5', borderRadius: 25,
    paddingHorizontal: 20, paddingVertical: 10, fontSize: 16, maxHeight: 100, color: '#333'
  },
  sendButton: {
    backgroundColor: '#5D4037', width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginLeft: 10
  }
});