import React from 'react';
import { View, Image, Text } from 'react-native';

import logoImg from '../../assets/images/logo/logo.png';

import { styles } from './styles';

interface HeaderProps {
  tasksCounter: number;
}

export const Header = ({ tasksCounter }: HeaderProps) => {
  //TODO render 'tarefa' if tasksCounter equals 1, otherwise render 'tarefas'
  const tasksCounterText = tasksCounter === 1 ? 'tarefa' : 'tarefas';

  return (
    <View style={styles.container}>
      <Image source={logoImg} />

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Você tem </Text>
        <Text style={styles.tasksCounterBold}>
          {tasksCounter} {tasksCounterText}
        </Text>
      </View>
    </View>
  );
};
