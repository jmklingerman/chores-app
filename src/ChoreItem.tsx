import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chore } from './types';

type Props = {
  chore: Chore;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ChoreItem({ chore, onToggleComplete, onDelete }: Props) {
  return (
    <View style={[styles.card, chore.completed && styles.cardCompleted]}>
      <View style={styles.textRow}>
        {chore.completed && <Text style={styles.checkmark}>✓</Text>}
        <Text
          style={[styles.title, chore.completed && styles.titleCompleted]}
          numberOfLines={3}
        >
          {chore.title}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.completeButton, chore.completed && styles.undoButton]}
          onPress={() => onToggleComplete(chore.id)}
        >
          <Text style={styles.buttonText}>
            {chore.completed ? 'Mark Not Done' : 'Complete'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(chore.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardCompleted: {
    backgroundColor: '#f0f0f0',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkmark: {
    fontSize: 20,
    color: '#2e7d32',
    marginRight: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: '#1a1a1a',
    flexShrink: 1,
  },
  titleCompleted: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: '#2e7d32',
  },
  undoButton: {
    backgroundColor: '#757575',
  },
  deleteButton: {
    backgroundColor: '#c62828',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
