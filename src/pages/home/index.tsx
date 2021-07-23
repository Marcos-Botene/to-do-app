import React from 'react';
import { View } from 'react-native';

import { Header, TodoInput, TasksList } from '../../components';

import { styles } from './styles';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />

      <TodoInput />

      <TasksList />
    </View>
  );
};
