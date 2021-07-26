import React, { useContext } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../../assets/icons/trash/trash.png';
import penIcon from '../../assets/icons/pen/pen.png';
import xIcon from '../../assets/icons/x/x.png';

import { ItemWrapper } from '../../components';

import { TodoContext } from '../../contexts/todo-context';

import { styles } from './styles';

export function TasksList() {
  const { tasks, taskIsBeingEdited, handleToggleTaskDone, handleRemoveTask } =
    useContext(TodoContext);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => handleToggleTaskDone(item.id)}
              >
                <View
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  {item.done && <Icon name='check' size={12} color='#FFF' />}
                </View>

                <TextInput
                  style={item.done ? styles.taskTextDone : styles.taskText}
                >
                  {item.title}
                </TextInput>
              </TouchableOpacity>
            </>

            <View style={styles.taskOptions}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={taskIsBeingEdited ? styles.taskCancel : styles.taskEdit}
                onPress={() => {}}
              >
                {taskIsBeingEdited ? (
                  <Image source={xIcon} />
                ) : (
                  <Image source={penIcon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskDelete}
                onPress={() => handleRemoveTask(item.id)}
              >
                <Image source={trashIcon} />
              </TouchableOpacity>
            </View>
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
