import { Task } from '@app/types';
import { date } from '@app/utils';
import { createSelector } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';
import { TasksState } from './reducer';

const selectSelf = (state: ApplicationState) => state.tasks;
export const tasks = createSelector(selectSelf, state => state.tasks);

export const tasksArray = createSelector(selectSelf, state =>
  Object.values(state.tasks),
);

export const taskById = createSelector(
  tasksArray,
  (_: TasksState, id: string) => id,
  (tasksArrayList: Task[], id: string) =>
    tasksArrayList.filter(task => task.id === id)[0],
);

export const labeledTasks = createSelector(tasksArray, tasksArrayList => {
  const sections: Record<string, Task[]> = {};

  tasksArrayList.forEach(task => {
    const dateOfCreation = date.formatDate(task.createdOnTimestamp);

    if (sections[dateOfCreation]) {
      sections[dateOfCreation].push(task);
    } else {
      sections[dateOfCreation] = [task];
    }
  });

  return Object.entries(sections)
    .map(([key, value]) => ({
      title: key,
      data: value as Task[],
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
});
