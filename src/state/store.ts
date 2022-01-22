import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { reducer as tasksReducer, consts as tasksConsts } from './tasks';
import { reducer as timerReducer, consts as timerConsts } from './timer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import AsyncStorage from '@react-native-community/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  timeout: undefined,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  [tasksConsts.NAME]: tasksReducer.tasksSlice.reducer,
  [timerConsts.NAME]: timerReducer.timerSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export interface ApplicationState {
  [tasksConsts.NAME]: tasksReducer.TasksState;
  [timerConsts.NAME]: timerReducer.TimerState;
}

export { store, persistor };
