import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header, TodoInput, TasksList, Task } from '../components';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldState => [...oldState, newTask]);
  };

  const handleToggleTaskDone = (id: number) => {
    const updatedTask = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTasks(updatedTask);
  };

  const handleRemoveTask = (id: number) => {
    setTasks(oldState => oldState.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
