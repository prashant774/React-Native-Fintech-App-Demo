import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';

const TextField = ({
  value,
  onChange,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <SafeAreaView style={{marginTop: 30}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000000',
          marginVertical: 5,
        }}>
        {placeholder}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholderTextColor={'#BBB6B6'}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChange={onChange}
      />
    </SafeAreaView>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderWidth: 1,
    padding: 10,
    borderColor: '#BBB6B6',
    fontSize: 18,
    color: '#000000',
    borderRadius: 8,
  },
});
