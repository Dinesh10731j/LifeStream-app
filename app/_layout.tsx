import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ReactQueryProvider from './react-query-provider';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router'; // expo-router already handles navigation container

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Splash screen stays visible until fonts are loaded
  }

  return (
    <ReactQueryProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Expo Router already provides a NavigationContainer */}
        <Stack initialRouteName='(auth)/login' screenOptions={{headerShown:false}}>
          
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
