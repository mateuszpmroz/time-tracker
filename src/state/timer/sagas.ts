import { takeEvery, put, select, takeLatest } from 'redux-saga/effects';
import {
  startTimer,
  stopTimer,
  startTimerSuccess,
  startTimerFailure,
  stopTimerFailure,
  stopTimerSuccess,
  bootstrapTimer,
} from './reducer';
import { selectors as tasksSelectors, reducer as tasksReducer } from '../tasks';
import { Task } from '@app/types';
import { activeTimerTaskId } from './selectors';
import { differenceInSeconds } from 'date-fns';

export function* startTimerSaga(action: any) {
  const { payload } = action;
  try {
    const activeTaskId: string = yield select(activeTimerTaskId);
    if (activeTaskId && payload !== activeTaskId) {
      yield put(stopTimer(activeTaskId));
    }
    const activeTask: Task = yield select(tasksSelectors.taskById, payload);
    yield put(
      tasksReducer.updateTask({ ...activeTask, startTimestamp: Date.now() }),
    );
    yield put(startTimerSuccess(payload));
  } catch (e) {
    yield put(startTimerFailure(e.message));
  }
}

export function* stopTimerSaga(action: any) {
  const { payload } = action;

  try {
    const activeTask: Task = yield select(tasksSelectors.taskById, payload);
    const seconds = differenceInSeconds(Date.now(), activeTask.startTimestamp);
    yield put(
      tasksReducer.updateTask({
        ...activeTask,
        startTimestamp: 0,
        spendTimeInSeconds: activeTask.spendTimeInSeconds + seconds,
      }),
    );
    yield put(stopTimerSuccess());
  } catch (e) {
    yield put(stopTimerFailure(e.message));
  }
}

export function* bootstrapTimerSaga(action: any) {
  const { payload } = action;

  try {
    const activeTask: Task = yield select(tasksSelectors.taskById, payload);
    const seconds = differenceInSeconds(Date.now(), activeTask.startTimestamp);
    yield put(
      tasksReducer.updateTask({
        ...activeTask,
        startTimestamp: Date.now(),
        spendTimeInSeconds: activeTask.spendTimeInSeconds + seconds,
      }),
    );
  } catch (e) {
    yield put(stopTimerFailure(e.message));
  }
}

export default [
  takeEvery(startTimer.type, startTimerSaga),
  takeEvery(stopTimer.type, stopTimerSaga),
  takeLatest(bootstrapTimer.type, bootstrapTimerSaga),
];
