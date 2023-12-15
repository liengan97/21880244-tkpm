
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/LoginScreen';
import AuthenticatedContainer from './AuthenticatedContainer';
import SignUp from '../screens/SignUp';
import { ChooseLocation } from '../screens/ChooseLocation';
import React from 'react';
import BookATripScreen from '../screens/BookATripScreen';
import GooglePlacesInput from '../screens/TestInput';
import TripContainer from './TripContainer';

const Stack = createNativeStackNavigator();

export default function CargoContainer() {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen
            name='Index'
            component={AuthenticatedContainer}
            options={{ headerShown: false }}
          />
          // <Stack.Group>
          //   <Stack.Screen name='Home' component={ChooseLocation} options={{ headerShown: false }} />
          //   <Stack.Screen name='TripContainer' component={TripContainer} options={{ headerShown: false }} />
          //   {/* <Stack.Screen name='BookATripRequest' component={BookATripScreen} options={{ headerShown: false }} initialParams={{ sa: 's' }} /> */}
          // </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name='SignIn' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}