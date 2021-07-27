import React, { useContext } from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from '../../components';

import { TaskContext } from '../../contexts/task-context';

import { TaskItem } from '../task-item';

export const TasksList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem key={String(item.id)} item={item} />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
};
