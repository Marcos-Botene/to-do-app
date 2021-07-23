import React, { useContext } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../../assets/icons/trash/trash.png';

import { ItemWrapper } from '../../components';

import { TodoContext } from '../../contexts/todo-context';

import { styles } from './styles';

export function TasksList() {
  const { tasks, handleToggleTaskDone, handleRemoveTask } =
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
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => handleToggleTaskDone(item.id)}
              >
                <View
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  {item.done && <Icon name='check' size={12} color='#FFF' />}
                </View>

                <Text style={item.done ? styles.taskTextDone : styles.taskText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => handleRemoveTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
