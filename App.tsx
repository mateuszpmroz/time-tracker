import React from 'react';
import { MainNavigator } from '@app/navigation';
import { Provider } from 'react-redux';
import { store, persistor } from '@app/state';
import 'react-native-get-random-values';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
