import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/utils/store';
import {ToastProvider} from './src/utils/ToastContext';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/LoginScreen';
import Dashboard from './src/Dashboard';
import StockDetails from './src/StockDetails';
import OrdersScreen from './src/OrdersScreen';
import './src/utils/NotificationConfig'; // push notification config file

const Stack = createStackNavigator(); // Defining the Stack Navigator

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //standard spalsh screen fucntion
  }, []);

  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{header: () => null}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="StockDetails" component={StockDetails} />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
};

export default App;
