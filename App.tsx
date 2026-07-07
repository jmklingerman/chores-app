import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ChoreItem from './src/ChoreItem';
import { loadChores, saveChores } from './src/storage';
import { Chore } from './src/types';

export default function App() {
  const [chores, setChores] = useState<Chore[]>([]);
  const [newChoreText, setNewChoreText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedOnce = useRef(false);

  // Load saved chores once when the app starts.
  useEffect(() => {
    (async () => {
      const stored = await loadChores();
      setChores(stored);
      setIsLoaded(true);
    })();
  }, []);

  // Save chores to the device any time the list changes (after the initial load).
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!hasLoadedOnce.current) {
      hasLoadedOnce.current = true;
      return;
    }
    saveChores(chores);
  }, [chores, isLoaded]);

  function handleAddChore() {
    const trimmed = newChoreText.trim();
    if (trimmed.length === 0) {
      return;
    }
    const newChore: Chore = {
      id: Date.now().toString(),
      title: trimmed,
      completed: false,
    };
    setChores((prev) => [newChore, ...prev]);
    setNewChoreText('');
  }

  function handleToggleComplete(id: string) {
    setChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, completed: !chore.completed } : chore
      )
    );
  }

  function handleDeleteChore(id: string) {
    setChores((prev) => prev.filter((chore) => chore.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.header}>My Chores</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a new chore..."
            placeholderTextColor="#9e9e9e"
            value={newChoreText}
            onChangeText={setNewChoreText}
            onSubmitEditing={handleAddChore}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddChore}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {chores.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No chores yet. Add one above to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={chores}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ChoreItem
                chore={item}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteChore}
              />
            )}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  addButton: {
    backgroundColor: '#1565c0',
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9e9e9e',
    textAlign: 'center',
  },
});
