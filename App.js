import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import CreateOrderScreen from './src/screens/createOrderScreen/CreateOrderScreen';
import HomeTabScreen from './src/screens/HomeTabScreen';


const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='homeTabScreen' options={{headerShown: false}} component={HomeTabScreen} />
            <Stack.Screen name='createOrderScreen' component={CreateOrderScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};


export default (App);
