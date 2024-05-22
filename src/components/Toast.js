import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Toast = ({message}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50, // Adjust the position as needed
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'gray',
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

export default Toast;
