import React, { useContext } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { TaskContext } from '../../contexts/task-context';

import { styles } from './styles';

export const TaskInput = () => {
  const { taskTitle, handleTaskTitle, handleAddNewTask } =
    useContext(TaskContext);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder='Adicionar novo todo...'
        placeholderTextColor='#B2B2B2'
        returnKeyType='send'
        selectionColor='#666666'
        value={taskTitle}
        onChangeText={handleTaskTitle}
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
