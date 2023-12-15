import 'react-native-gesture-handler';
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast';
import { CargoProvider } from './src/context/CargoContext';
import CargoContainer from './src/container/CargoContainer';

export default function App() {
  return (
    <SafeAreaProvider>
      <PopupRootProvider>
        <GluestackUIProvider config={config}>
          <CargoProvider>
            <CargoContainer />
          </CargoProvider>
        </GluestackUIProvider>
      </PopupRootProvider>
    </SafeAreaProvider>
  );
}
