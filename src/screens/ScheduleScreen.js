import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function ScheduleScreen({ route }) {
  const { userName } = route.params;
  
  // Exemplo de cronograma inicial
  const [tarefas, setTarefas] = useState([
    { id: 1, dia: 'Segunda', tipo: 'Hidratação', produto: '' },
    { id: 2, dia: 'Quarta', tipo: 'Nutrição', produto: '' },
    { id: 3, dia: 'Sexta', tipo: 'Hidratação', produto: '' },
  ]);

  const atualizarProduto = (id, texto) => {
    const novasTarefas = tarefas.map(t => t.id === id ? { ...t, produto: texto } : t);
    setTarefas(novasTarefas);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Cronograma de {userName}</Text>
      <Text style={styles.subtitulo}>Anote abaixo os produtos utilizados em cada etapa:</Text>

      {tarefas.map((item) => (
        <View key={item.id} style={styles.cardTarefa}>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.diaTexto}>{item.dia} - {item.tipo}</Text>
          </View>
          
          <TextInput
            style={styles.inputProduto}
            placeholder="Qual produto você usou?"
            placeholderTextColor={theme.colors.secondary}
            value={item.produto}
            onChangeText={(txt) => atualizarProduto(item.id, txt)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.botaoSalvar} onPress={() => alert('Notas salvas com sucesso!')}>
        <Text style={styles.botaoTexto}>Salvar Registros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 25, paddingTop: 60 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 5 },
  subtitulo: { fontSize: 14, color: theme.colors.secondary, marginBottom: 30 },
  cardTarefa: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  diaTexto: { marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  inputProduto: { 
    borderWidth: 1, 
    borderColor: theme.colors.accent, 
    borderRadius: 8, 
    padding: 10, 
    color: theme.colors.text,
    fontSize: 14,
    backgroundColor: theme.colors.background 
  },
  botaoSalvar: { backgroundColor: theme.colors.secondary, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  botaoTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});