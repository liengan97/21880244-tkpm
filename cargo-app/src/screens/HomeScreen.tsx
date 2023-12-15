
import React, {  } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChooseLocation } from './ChooseLocation';
import TripContainer from '../container/TripContainer';

const Stack = createNativeStackNavigator();

export default function HomeScreen(props: any) {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name='ChooseLocation' component={ChooseLocation} options={{ headerShown: false }} />
        <Stack.Screen name='TripContainer' component={TripContainer} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
