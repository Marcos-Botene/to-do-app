import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

interface TodoContextData {
  tasks: Task[];
  taskName: string;
  taskIsBeingEdited: boolean;
  handleTaskName: (taskName: string) => void;
  handleAddNewTask: () => void;
  handleToggleTaskDone: (id: number) => void;
  handleRemoveTask: (id: number) => void;
  taskDeleteAlert: (id: number) => void;
}

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export const TodoContext = createContext<TodoContextData>(
  {} as TodoContextData
);

export const TodoProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [taskIsBeingEdited, setTaskIsBeingEdited] = useState<boolean>(false);

  const handleTaskName = (taskName: string) => {
    if (!taskName) return;
    setTaskName(taskName);
  };

  const handleAddNewTask = () => {
    const newTask: Task = {
      id: new Date().getTime(),
      title: taskName,
      done: false,
    };

    setTasks(oldState => [...oldState, newTask]);
    setTaskName('');
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

  const taskDeleteAlert = (id: number) => {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'NÃO',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => handleRemoveTask(id),
        },
      ]
    );
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        taskName,
        taskIsBeingEdited,
        handleTaskName,
        handleAddNewTask,
        handleToggleTaskDone,
        handleRemoveTask,
        taskDeleteAlert,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
