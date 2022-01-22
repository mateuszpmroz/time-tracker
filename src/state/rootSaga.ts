import { all } from 'redux-saga/effects';
import { sagas as timerSagas } from './timer';

export function* rootSaga() {
  yield all(timerSagas);
}

export default rootSaga;
