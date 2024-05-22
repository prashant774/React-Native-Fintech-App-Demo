import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({name, onPress, type}) => {
  return (
    <View>
      <TouchableOpacity
        //onpress fucntion to be received from parent
        onPress={onPress}
        activeOpacity={0.7}
        // added a type property for changing color or any css in any button instead of creating new button
        style={[styles.button, styles[`button_${type}`]]}>
        <Text
          //btn name/text to be received from parent
          style={[styles.btnText, styles[`btnText_${type}`]]}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#01060d',
    padding: 15,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 24,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#ffffff',
  },
  btnText_PRIMARY: {
    color: '#000000',
  },
  button_PRIMARY: {
    backgroundColor: '#ECD996',
  },
});
