import React, { useContext } from 'react';
import { View, Image, Text } from 'react-native';

import logoImg from '../../assets/images/logo/logo.png';

import { TaskContext } from '../../contexts/task-context';

import { styles } from './styles';

export const Header = () => {
  const { tasks } = useContext(TaskContext);

  const tasksCounterText = tasks.length === 1 ? 'tarefa' : 'tarefas';

  return (
    <View style={styles.container}>
      <Image source={logoImg} />

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Você tem </Text>
        <Text style={styles.tasksCounterBold}>
          {tasks.length} {tasksCounterText}
        </Text>
      </View>
    </View>
  );
};
