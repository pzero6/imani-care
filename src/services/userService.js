import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@imani_user_v1';

// Salvar o nome
export const saveUser = async (name) => {
  try {
    await AsyncStorage.setItem(USER_KEY, name);
  } catch (e) {
    console.error("Erro ao salvar usuário", e);
  }
};

// Ler o nome
export const getUser = async () => {
  try {
    const name = await AsyncStorage.getItem(USER_KEY);
    return name;
  } catch (e) {
    return null;
  }
};

// Sair (Logout)
export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {}
};
