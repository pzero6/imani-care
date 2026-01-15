import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Importante para atualizar a lista ao voltar
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearHistory, getHistory } from '../services/storageService';
import { theme } from '../utils/theme';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  // Carrega o histórico toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleClear = async () => {
    Alert.alert(
      "Apagar Histórico",
      "Tem certeza? Isso não pode ser desfeito.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: async () => {
            await clearHistory();
            loadData();
        }}
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.hairType}>Tipo: {item.type}</Text>
        <Text style={styles.careText}>Precisava de: {item.care}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </View>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma análise salva ainda.</Text>
          <Text style={styles.emptySubText}>Tire uma foto para começar!</Text>
        </View>
      ) : (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.listTitle}>Minhas Análises ({history.length})</Text>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -50 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textLight, marginTop: 20 },
  emptySubText: { fontSize: 14, color: '#999', marginTop: 5 },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  listTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.primary },
  clearText: { color: 'red', fontSize: 14 },

  list: { paddingBottom: 20 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  dateBadge: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 5, paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 15
  },
  dateText: { fontSize: 12, fontWeight: 'bold', color: '#666' },
  cardContent: { flex: 1 },
  hairType: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  careText: { fontSize: 14, color: theme.colors.textLight, marginTop: 2 }
});