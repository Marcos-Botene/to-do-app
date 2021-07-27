import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../../assets/icons/trash/trash.png';
import penIcon from '../../assets/icons/pen/pen.png';
import xIcon from '../../assets/icons/x/x.png';

import { TaskContext } from '../../contexts/task-context';

import { styles } from './styles';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
}

export const TaskItem = ({ item }: TaskItemProps) => {
  const { handleToggleTaskDone, handleRemoveTask, handleEditTask } =
    useContext(TaskContext);

  const [newTaskTitle, setNewTaskTitle] = useState<string>(item.title);
  const [taskIsBeingEditing, setTaskIsBeingEdited] = useState<boolean>(false);

  const textInputRef = useRef<TextInput>(null);

  const handleTaskIsBeingEdited = () => setTaskIsBeingEdited(value => !value);

  const handleCancelTaskEdition = () => {
    setNewTaskTitle(item.title);
    setTaskIsBeingEdited(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (taskIsBeingEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [taskIsBeingEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => handleToggleTaskDone(item.id)}
        >
          <View style={item.done ? styles.taskMarkerDone : styles.taskMarker}>
            {item.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={taskIsBeingEditing}
            onSubmitEditing={() =>
              handleEditTask({
                taskId: item.id,
                newTaskTitle: newTaskTitle,
                taskIsBeingEditing: handleTaskIsBeingEdited,
              })
            }
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskOptions}>
        {taskIsBeingEditing ? (
          <TouchableOpacity
            onPress={handleCancelTaskEdition}
            style={styles.taskCancel}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleTaskIsBeingEdited}
            style={styles.taskEdit}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          disabled={taskIsBeingEditing}
          activeOpacity={0.7}
          style={styles.taskDelete}
          onPress={() => handleRemoveTask(item.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: taskIsBeingEditing ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
