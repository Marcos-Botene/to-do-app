import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

interface TodoInputProps {
  addTask: (task: string) => void;
}

export const TodoInput = ({ addTask }: TodoInputProps) => {
  const [task, setTask] = useState<string>('');

  function handleAddNewTask() {
    //TODO - Call addTask if task not empty and clean input value
    if (!task) return;
    addTask(task);
    setTask('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder='Adicionar novo todo...'
        placeholderTextColor='#B2B2B2'
        returnKeyType='send'
        selectionColor='#666666'
        //TODO - use value, onChangeText and onSubmitEditing props
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        testID='add-new-task-button'
        activeOpacity={0.7}
        style={styles.addButton}
        //TODO - onPress prop
        onPress={handleAddNewTask}
      >
        <Icon name='chevron-right' size={24} color='#B2B2B2' />
      </TouchableOpacity>
    </View>
  );
};
