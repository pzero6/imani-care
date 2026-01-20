import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const PERGUNTAS = [
  {
    id: 'userName',
    pergunta: "Para quem faremos o diagnóstico hoje?",
    tipo: 'input',
    placeholder: "Digite o nome aqui..."
  },
  {
    id: 'isNatural',
    pergunta: "Qual a condição atual dos fios?",
    opcoes: [
      { label: "Cabelo Natural", value: "natural" },
      { label: "Cabelo com Química", value: "quimica" }
    ]
  },
  {
    id: 'porosity',
    pergunta: "Como sente a absorção de água?",
    opcoes: [
      { label: "Alta (seca muito rápido)", value: "alta" },
      { label: "Média (equilibrado)", value: "media" },
      { label: "Baixa (demora a molhar)", value: "baixa" }
    ]
  },
  {
    id: 'allergies',
    pergunta: "Existe alguma sensibilidade no couro cabeludo?",
    opcoes: [
      { label: "Não, pele saudável", value: "nao" },
      { label: "Sim, possuo alergias/sensibilidade", value: "sim" }
    ]
  }
];

export default function QuestionnaireScreen({ navigation }) {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [inputValue, setInputValue] = useState('');

  const perguntaAtual = PERGUNTAS[passo];
  const progresso = ((passo + 1) / PERGUNTAS.length) * width;

  const proximo = (valor) => {
    // Validação simples para não deixar passar sem nome
    if (perguntaAtual.tipo === 'input' && !inputValue) return alert("Por favor, insira um nome.");

    const respostaAtual = valor || inputValue;
    const novasRespostas = { ...respostas, [perguntaAtual.id]: respostaAtual };
    
    setRespostas(novasRespostas);
    setInputValue('');

    if (passo < PERGUNTAS.length - 1) {
      setPasso(passo + 1);
    } else {
      // CORREÇÃO AQUI: Passando o userName explicitamente para a Câmera
      navigation.navigate('Camera', { 
        userName: novasRespostas.userName // Agora a câmera vai pegar o nome certo!
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progresso }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stepIndicator}>PASSO {passo + 1} DE {PERGUNTAS.length}</Text>
        <Text style={styles.titulo}>{perguntaAtual.pergunta}</Text>
        
        {perguntaAtual.tipo === 'input' ? (
          <View>
            <TextInput 
              style={styles.input}
              placeholder={perguntaAtual.placeholder}
              placeholderTextColor={theme.colors.secondary}
              value={inputValue}
              onChangeText={setInputValue}
              autoFocus
            />
            <TouchableOpacity style={styles.botaoPrincipal} onPress={() => proximo()}>
              <Text style={styles.botaoPrincipalTexto}>Continuar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          perguntaAtual.opcoes.map((opt, i) => (
            <TouchableOpacity key={i} style={styles.botaoOpcao} onPress={() => proximo(opt.value)}>
              <Text style={styles.botaoOpcaoTexto}>{opt.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.accent} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  progressBarContainer: { height: 4, backgroundColor: '#EAEAEA', marginTop: 50 },
  progressBar: { height: 4, backgroundColor: theme.colors.primary },
  content: { flex: 1, padding: 30, paddingTop: 50 },
  stepIndicator: { fontSize: 12, letterSpacing: 2, color: theme.colors.secondary, marginBottom: 10, fontWeight: 'bold' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 40, lineHeight: 36 },
  input: { borderBottomWidth: 2, borderBottomColor: theme.colors.accent, paddingVertical: 15, fontSize: 20, color: theme.colors.text, marginBottom: 40 },
  botaoPrincipal: { backgroundColor: theme.colors.primary, padding: 20, borderRadius: 15, alignItems: 'center' },
  botaoPrincipalTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  botaoOpcao: { 
    backgroundColor: '#FFF', 
    padding: 22, 
    borderRadius: 18, 
    marginBottom: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  botaoOpcaoTexto: { fontSize: 16, fontWeight: '500', color: theme.colors.text }
});