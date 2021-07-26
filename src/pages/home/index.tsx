import React from 'react';
import { View } from 'react-native';

import { Header, TaskInput, TasksList } from '../../components';

import { styles } from './styles';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />

      <TaskInput />

      <TasksList />
    </View>
  );
};
