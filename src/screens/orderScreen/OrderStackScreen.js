import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from './OrderScreen';
import OrderDetailScreen from './OrderDetailScreen';


const Stack = createStackNavigator();



class OrderStackScreen extends Component {
  render() {
    return (
          <Stack.Navigator>
            <Stack.Screen name='orderScreen' options={{headerShown: true, title:'Đơn hàng'}} component={OrderScreen} />
            <Stack.Screen name='orderDetailScreen' options={{headerShown: true, title:'Chi tiết đơn hàng'}} component={OrderDetailScreen} />
          </Stack.Navigator>
    );
  }
};


export default (OrderStackScreen);
