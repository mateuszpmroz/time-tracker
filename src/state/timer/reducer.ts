/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NAME } from './consts';

export interface TimerState {
  taskId: string;
  timeInSeconds: number;
  error: string;
}

const initialState = {
  taskId: '',
  timeInSeconds: 0,
  error: '',
} as TimerState;

export const timerSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    startTimer(state, action: PayloadAction<string>) {},
    startTimerSuccess(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
      state.error = '';
    },
    startTimerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    stopTimer(state, action: PayloadAction<string>) {},
    stopTimerSuccess(state) {
      state.taskId = '';
    },
    stopTimerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    bootstrapTimer(state, action: PayloadAction<string>) {},
  },
});

export const {
  startTimer,
  startTimerSuccess,
  stopTimer,
  stopTimerSuccess,
  stopTimerFailure,
  startTimerFailure,
  bootstrapTimer,
} = timerSlice.actions;
