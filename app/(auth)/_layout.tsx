import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import ReactQueryProvider from '../react-query-provider';
const AuthLayout = () => {
  return (
    <ReactQueryProvider>
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
    </ReactQueryProvider>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Light grey background for auth pages
    justifyContent: 'center',
  },
});
