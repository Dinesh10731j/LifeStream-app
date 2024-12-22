import React from 'react';
import { View, StyleSheet } from 'react-native';

const BgBubble = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.bubble, styles.bubble1, { backgroundColor: '#ef4444' }]} />
      <View style={[styles.bubble, styles.bubble2, { backgroundColor: '#ec4899' }]} />
      <View style={[styles.bubble, styles.bubble3, { backgroundColor: '#fda4af' }]} />
    </View>
  );
};

export default BgBubble;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.7, 
  },
  bubble1: {
    top: 40,
    left: 40,
    width: 200,
    height: 200,
  },
  bubble2: {
    top: 150,
    left: '50%',
    marginLeft: -150,
    width: 300,
    height: 300,
  },
  bubble3: {
    top: 300,
    right: 20,
    width: 270,
    height: 270,
  },
});
