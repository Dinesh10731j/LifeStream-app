import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
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
