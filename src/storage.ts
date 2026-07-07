import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chore } from './types';

const STORAGE_KEY = '@chores_app_chores';

export async function loadChores(): Promise<Chore[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  if (!json) {
    return [];
  }
  return JSON.parse(json) as Chore[];
}

export async function saveChores(chores: Chore[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chores));
}
