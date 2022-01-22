import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRoute, RootRouteNavigatorParams } from './Routes';
import { TaskListScreen } from '@app/screens';

const Stack = createNativeStackNavigator<RootRouteNavigatorParams>();

const RootStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={RootRoute.TaskListScreen} component={TaskListScreen} />
  </Stack.Navigator>
);

export default RootStackNavigator;
