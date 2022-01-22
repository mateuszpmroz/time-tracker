import { createSelector } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';

const selectSelf = (state: ApplicationState) => state.timer;
export const activeTimerTaskId = createSelector(
  selectSelf,
  state => state.taskId,
);
