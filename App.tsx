import React from 'react';
import { StatusBar } from 'react-native';

import { TodoProvider } from './src/contexts/todo-context';

import { Home } from './src/pages/home';

export default function App() {
  return (
    <TodoProvider>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <Home />
    </TodoProvider>
  );
}
