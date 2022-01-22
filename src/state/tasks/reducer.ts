import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@app/types';
import { NAME } from './consts';
import { v4 as uuidv4 } from 'uuid';
import { TaskWithoutGeneratedParameters } from '@app/types/Task';

export interface TasksState {
  tasks: Record<string, Task>;
  error: string;
}

const initialState = {
  tasks: {},
  error: '',
} as TasksState;

export const tasksSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskWithoutGeneratedParameters>) {
      const id = uuidv4();
      state.tasks = {
        ...state.tasks,
        [id]: {
          ...action.payload,
          id,
          createdOnTimestamp: Date.now(),
          spendTimeInSeconds: 0,
          startTimestamp: 0,
        },
      };
    },
    updateTask(state, action: PayloadAction<Task>) {
      state.tasks = {
        ...state.tasks,
        [action.payload.id]: action.payload,
      };
    },
    deleteTask(state, action: PayloadAction<Task>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload.id]: deleted, ...tasks } = state.tasks;

      state.tasks = tasks;
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
