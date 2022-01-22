import { LabeledTasks } from '@app/types';
import React, { FC, useCallback } from 'react';
import { SectionList } from 'react-native';
import { Divider } from 'react-native-elements';
import Task from './Task';
import { SectionHeaderContainer, SectionHeaderTitle } from './TaskList.styled';

interface Props {
  tasks: LabeledTasks[];
  activeTimerTaskId: string;
  activeTaskSeconds: number;
  onPlayStopIconPress: (id: string) => void;
}

const TaskList: FC<Props> = ({
  tasks,
  activeTimerTaskId,
  activeTaskSeconds,
  onPlayStopIconPress,
}) => {
  const renderItem = useCallback(
    ({ item }) => {
      const isActive = activeTimerTaskId === item.id;
      return (
        <Task
          name={item.name}
          isActive={isActive}
          id={item.id}
          spendTimeInSeconds={
            isActive ? activeTaskSeconds : item.spendTimeInSeconds
          }
          onPlayStopIconPress={onPlayStopIconPress}
        />
      );
    },
    [activeTimerTaskId, onPlayStopIconPress, activeTaskSeconds],
  );

  const renderSectionHeader = useCallback(
    ({ section }) => (
      <SectionHeaderContainer>
        <SectionHeaderTitle>{section.title}</SectionHeaderTitle>
      </SectionHeaderContainer>
    ),
    [],
  );
  const keyExtractor = useCallback(item => item.id.toString(), []);

  return (
    <SectionList
      sections={tasks}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0}
    />
  );
};

export default React.memo(TaskList);
