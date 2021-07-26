import React, { useContext } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { TodoContext } from '../../contexts/todo-context';

import { styles } from './styles';

export const TodoInput = () => {
  const { taskName, handleTaskName, handleAddNewTask } =
    useContext(TodoContext);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder='Adicionar novo todo...'
        placeholderTextColor='#B2B2B2'
        returnKeyType='send'
        selectionColor='#666666'
        value={taskName}
        onChangeText={handleTaskName}
        onSubmitEditing={handleAddNewTask}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={handleAddNewTask}
      >
        <Icon name='chevron-right' size={24} color='#B2B2B2' />
      </TouchableOpacity>
    </View>
  );
};
