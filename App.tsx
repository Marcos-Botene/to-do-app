import React from 'react';
import { StatusBar } from 'react-native';

import { TaskProvider } from './src/contexts/task-context';

import { Home } from './src/pages/home';

export default function App() {
  return (
    <TaskProvider>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <Home />
    </TaskProvider>
  );
}
