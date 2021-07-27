import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTask {
  taskId: number;
  newTaskTitle: string;
}

interface TaskContextData {
  tasks: Task[];
  taskTitle: string;
  handleTaskTitle: (taskTitle: string) => void;
  handleAddNewTask: () => void;
  handleToggleTaskDone: (taskId: number) => void;
  handleRemoveTask: (taskId: number) => void;
  handleEditTask: ({ taskId, newTaskTitle }: EditTask) => void;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>('');

  const handleTaskTitle = (taskTitle: string) => setTaskTitle(taskTitle);

  const handleAddNewTask = () => {
    if (!taskTitle) return;

    if (tasks.find(task => task.title === taskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: taskTitle,
      done: false,
    };

    setTasks(oldState => [...oldState, newTask]);
    setTaskTitle('');
  };

  const handleToggleTaskDone = (taskId: number) => {
    const updatedTask = tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );

    setTasks(updatedTask);
  };

  const handleRemoveTask = (taskId: number) => {
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
          onPress: () => {
            setTasks(oldState => oldState.filter(task => task.id !== taskId));
          },
        },
      ]
    );
  };

  const handleEditTask = ({ taskId, newTaskTitle }: EditTask) => {
    const updatedTask = tasks.map(task =>
      task.id === taskId ? { ...task, title: newTaskTitle } : task
    );

    setTasks(updatedTask);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskTitle,
        handleTaskTitle,
        handleAddNewTask,
        handleToggleTaskDone,
        handleRemoveTask,
        handleEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
