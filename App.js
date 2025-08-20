import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './reduxtollkit/store';

import Home from './screens/App/Home';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Logout from './screens/Auth/Logout';
import Card from './screens/App/Card';
// import Navbar from './screens/App/Navbar';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Card" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Card" component={Card} options={{ title: 'Card'}}/>
    //     <Stack.Screen name="Navbar" component={Navbar} options={{ title: 'Navbar'}}/>
    //     <Stack.Screen name="ConfirmCheckOut" component={ConfirmCheckOut} options={{ title: 'ConfirmCheckOut'}}/>
    //     <Stack.Screen name="SuccessCheckOut" component={SuccessCheckOut} options={{ title: 'SuccessCheckOut'}}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Logout" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
          <Stack.Screen name="Card" component={Card} options={{ title: 'Card' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
