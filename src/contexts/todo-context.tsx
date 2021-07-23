import React, { createContext, useState } from 'react';

interface TodoContextData {
  tasks: Task[];
  taskName: string;
  handleTaskName: (taskName: string) => void;
  handleAddNewTask: () => void;
  handleToggleTaskDone: (id: number) => void;
  handleRemoveTask: (id: number) => void;
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

  return (
    <TodoContext.Provider
      value={{
        tasks,
        taskName,
        handleTaskName,
        handleAddNewTask,
        handleToggleTaskDone,
        handleRemoveTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
