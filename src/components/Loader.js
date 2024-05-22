import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
        Please Wait...
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
        Loading...
      </Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});
