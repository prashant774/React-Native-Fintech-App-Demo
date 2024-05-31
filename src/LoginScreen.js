import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextField from './components/TextField'; // input text component
import Button from './components/Button'; // button component
import {useDispatch} from 'react-redux'; // hook for dispatching action to redux
import {login} from './utils/userSlice'; // login slice - redux
import {useNavigation} from '@react-navigation/native';
import users from './utils/users.json'; // user credentials stored in json file
import {useToast} from './utils/ToastContext'; // toast component
import Loader from './components/Loader'; // loader component

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // state to manage the email input text field
  const [password, setPassword] = useState(''); // state to manage the password input text field
  const [loader, setLoader] = useState(false); // state to manage to display loader
  const dispatch = useDispatch(); // dispatch action for saving new data in redux to update the login state
  const navigation = useNavigation(); // using for navigation/routing to other components
  const {showToast} = useToast(); // custom toast to display message or alerts.

  // regex to verify email format
  const isValidEmail = email => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  // login fucntion
  const handleLogin = () => {
    // console.log('handlelogin func');
    // console.log(email, password);
    // Check if the email or password is empty
    // Display the loader
    setLoader(true);

    if (!email || !password) {
      showToast('Oops! You missed something!');
      setLoader(false); // Hide the loader
      return; // Stop the function if any field is empty
    }
    // checking email format
    if (!isValidEmail(email)) {
      //console.log('Login failed: Invalid email format');
      showToast('Login failed: Invalid email format');
      setLoader(false); // Hide the loader
      return; // Stop execution if the email format is invalid
    }
    // Find user cred in the JSON data
    const user = users.find(
      user => user.email === email && user.password === password,
    );
    // authenticating the email and password
    if (user) {
      //console.log('Login successful:', user);
      showToast('Login Successfully!!!');
      setLoader(false); // Hide the loader
      dispatch(login({username: user.username})); // Pass username as payload and dispatching login action
      navigation.navigate('Dashboard'); // navigating to dashboard
    } else {
      //console.log('Login failed: Invalid credentials');
      showToast('Login failed: Invalid credentials');
      setLoader(false); // Hide the loader
    }
    // Hide the loader after processing
    setLoader(false);
  };
  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <View style={{alignItems: 'center', marginBottom: 50, elevation: 2.8}}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.welcomeTxt}>Welcome To Fintech App.</Text>
        <Text style={styles.tagline}>
          Experience the best stock Application
        </Text>
        <TextField placeholder="Email" value={email} setValue={setEmail} />
        <TextField
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <View style={{marginTop: 30}}>
          <Button name="Login" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  welcomeTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#141414',
    fontStyle: 'normal',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    color: '#cacbcf',
    fontStyle: 'normal',
  },
});
