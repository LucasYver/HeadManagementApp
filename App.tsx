import * as dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { useThemeColor } from './components/Themed';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { store } from './store';

require('dayjs/locale/fr');

dayjs.locale('fr');

export default function App() {
  const isLoadingComplete = useCachedResources();
  const useTheme = useThemeColor();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
