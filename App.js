import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import CreateOrderScreen from './src/screens/createOrderScreen/CreateOrderScreen';
import HomeTabScreen from './src/screens/HomeTabScreen';
import OrderStackScreen from './src/screens/orderScreen/OrderStackScreen';
import DetailProductScreen from './src/screens/productScreen/DetailProductScreen';
import ProductScreen from './src/screens/productScreen/ProductScreen';


const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='homeTabScreen' options={{headerShown: false}} component={HomeTabScreen} />
            <Stack.Screen name='createOrderScreen' component={CreateOrderScreen} />
            <Stack.Screen name='orderStackScreen' options={{headerShown: false}} component={OrderStackScreen} />
            <Stack.Screen name='detailProductScreen' component={DetailProductScreen}/>
            <Stack.Screen name='productScreen' component={ProductScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};


export default (App);
