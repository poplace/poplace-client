import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name='bottom' component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
