import React, { FC, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootRoute, RootRouteNavigatorParams } from '@app/navigation/Routes';
import { TaskList } from '@app/components';
import {
  selectors as tasksSelectors,
  reducer as tasksReducer,
} from '@app/state/tasks';
import {
  reducer as timerReducer,
  selectors as timerSelectors,
} from '@app/state/timer';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import {
  AddTaskInputContainer,
  Container,
  InputContainer,
} from './TaskListScreen.styled';
import { useInterval } from '@app/hooks';
import { ApplicationState } from '@app/state/store';
import { MILLIS_IN_SECOND } from '@app/consts';
import { Alert } from 'react-native';

interface Props {
  navigation: NativeStackNavigationProp<
    RootRouteNavigatorParams,
    RootRoute.TaskListScreen
  >;
}

const TaskListScreen: FC<Props> = () => {
  const dispatch = useDispatch();
  const labeledTasks = useSelector(tasksSelectors.labeledTasks);
  const activeTimerTaskId = useSelector(timerSelectors.activeTimerTaskId);
  const activeTask = useSelector(
    (state: ApplicationState & tasksReducer.TasksState) =>
      tasksSelectors.taskById(state, activeTimerTaskId),
  );
  const [taskName, setTaskName] = useState('');
  const [activeTaskSeconds, setActiveTaskSeconds] = useState(
    activeTask?.spendTimeInSeconds || 0,
  );

  useInterval(
    () => {
      setActiveTaskSeconds(prevSeconds => prevSeconds + 1);
    },
    activeTask?.id === activeTimerTaskId ? MILLIS_IN_SECOND : null,
  );

  useEffect(() => {
    if (activeTask) {
      setActiveTaskSeconds(activeTask.spendTimeInSeconds);
    }
  }, [activeTask, activeTimerTaskId, dispatch]);

  useEffect(() => {
    dispatch(timerReducer.bootstrapTimer(activeTimerTaskId));
  }, [activeTimerTaskId, dispatch]);

  const onAddTaskButtonPress = () => {
    if (!taskName) {
      return Alert.alert('Please provide task name.');
    }
    dispatch(tasksReducer.addTask({ name: taskName }));
    setTaskName('');
  };

  const onPlayStopIconPress = (id: string) => {
    activeTimerTaskId === id
      ? dispatch(timerReducer.stopTimer(id))
      : dispatch(timerReducer.startTimer(id));
  };

  return (
    <Container>
      <AddTaskInputContainer>
        <InputContainer>
          <Input
            placeholder="What are you doing?"
            onChangeText={setTaskName}
            value={taskName}
            autoCompleteType="name"
          />
        </InputContainer>
        <Button title="ADD" onPress={onAddTaskButtonPress} />
      </AddTaskInputContainer>
      <TaskList
        tasks={labeledTasks}
        activeTaskSeconds={activeTaskSeconds}
        activeTimerTaskId={activeTimerTaskId}
        onPlayStopIconPress={onPlayStopIconPress}
      />
    </Container>
  );
};

export default TaskListScreen;
