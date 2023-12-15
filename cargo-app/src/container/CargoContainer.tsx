
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/LoginScreen';
import AuthenticatedContainer from './AuthenticatedContainer';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export default function CargoContainer() {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      {authenticated ? (
        <AuthenticatedContainer />
      ) : (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name='SignIn' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}