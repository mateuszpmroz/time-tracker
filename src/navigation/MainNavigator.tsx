import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStackNavigator';

const MainNavigator = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default MainNavigator;
