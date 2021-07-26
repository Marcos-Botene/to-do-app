import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskContextData {
  tasks: Task[];
  taskTitle: string;
  taskIsBeingEditing: boolean;
  newTaskTitle: string;
  handleTaskTitle: (taskTitle: string) => void;
  handleAddNewTask: () => void;
  handleToggleTaskDone: (taskId: number) => void;
  handleRemoveTask: (taskId: number) => void;
  handleEditTask: (taskId: number, newTaskTitle: string) => void;
  handleNewTaskTitle: (newTaskTitle: string) => void;
  handleTaskIsBeingEdited: () => void;
  handleCancelTaskEdition: () => void;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskIsBeingEditing, setTaskIsBeingEdited] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(taskTitle);

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

  const handleEditTask = (taskId: number, newTaskTitle: string) => {
    const updatedTask = tasks.map(task =>
      task.id === taskId ? { ...task, title: newTaskTitle } : task
    );

    setTasks(updatedTask);
    setTaskIsBeingEdited(false);
  };

  const handleNewTaskTitle = (newTaskTitle: string) => {
    setNewTaskTitle(newTaskTitle);
  };

  const handleTaskIsBeingEdited = () => setTaskIsBeingEdited(true);

  const handleCancelTaskEdition = () => {
    setNewTaskTitle(taskTitle);
    setTaskIsBeingEdited(false);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskTitle,
        taskIsBeingEditing,
        newTaskTitle,
        handleTaskTitle,
        handleAddNewTask,
        handleToggleTaskDone,
        handleRemoveTask,
        handleEditTask,
        handleNewTaskTitle,
        handleTaskIsBeingEdited,
        handleCancelTaskEdition,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
