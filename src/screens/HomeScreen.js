import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ProductsScreen,
  DetailProductScreen,
} from './homePage/index';

const Stack = createStackNavigator();

class HomeScreen extends Component {

  render() {
    return (
      <Stack.Navigator
        initialRouteName="ProductsScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="DetailProductScreen" component={DetailProductScreen} />
      </Stack.Navigator>
    );
  }
}

export default HomeScreen;