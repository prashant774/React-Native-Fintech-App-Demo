import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SwipeButton = ({onConfirmed}) => {
  const [buttonText, setButtonText] = useState('Swipe to Buy');
  const [buttonColor, setButtonColor] = useState('#FFFACD');
  const [iconName, setIconName] = useState('arrow-forward');
  const [confirmed, setConfirmed] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const maxTranslateX = 230; // max translateX value (adjust this based on button width)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !confirmed,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dx > 0 && !confirmed) {
        translateX.setValue(Math.min(gestureState.dx, maxTranslateX));
        if (gestureState.dx < 70) {
          setButtonText('Swipe to Buy');
          setIconName('arrow-forward');
          setButtonColor('#FFFACD');
        } else if (gestureState.dx >= 70 && gestureState.dx < maxTranslateX) {
          setButtonText('Release');
          setIconName('arrow-forward');
          setButtonColor('#FFFACD');
        }
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx >= maxTranslateX) {
        setButtonText('Confirmed!');
        setIconName('checkmark');
        setButtonColor('#00FF00');
        setConfirmed(true);
        Animated.spring(translateX, {
          toValue: maxTranslateX,
          useNativeDriver: false,
          tension: 100, // higher tension for quicker response
          friction: 100, // higher friction for smoother stopping
        }).start();
        if (onConfirmed) {
          onConfirmed(); // call the callback function when confirmed to perform  other operation
        }
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
          tension: 100, // higher tension for quicker response
          friction: 100, // higher friction for smoother stopping
        }).start(() => {
          setButtonText('Swipe to Buy');
          setIconName('arrow-forward');
          setButtonColor('#FFFACD');
        });
      }
    },
  });

  return (
    <View style={[styles.button, {backgroundColor: buttonColor}]}>
      <Text style={styles.buttonText}>{buttonText}</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.circle, {transform: [{translateX}]}]}>
        <Ionicon name={iconName} size={24} color="#000000" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    position: 'absolute',
    fontWeight: 'bold',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
  },
});

export default SwipeButton;
