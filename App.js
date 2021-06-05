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

const config = {
  screens: {
    orderStackScreen: {
      screens: {
        orderDetailScreen: {
          path: 'detail/:id',
          parse: {
            _id: (id) => `${id}`
          }
        }
      }
    }
  }
}

const linking = {
  prefixes: ['demo://app'],
  config,
}

class App extends Component {

  render() {
    return (
      <Provider theme={theme}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen name='homeTabScreen' options={{ headerShown: false }} component={HomeTabScreen} />
            <Stack.Screen name='createOrderScreen' component={CreateOrderScreen} />
            <Stack.Screen name='orderStackScreen' options={{ headerShown: false }} component={OrderStackScreen} />
            <Stack.Screen name='detailProductScreen' component={DetailProductScreen}      options={{ title: 'Chi tiết sản phẩm' }}/>
            <Stack.Screen name='productScreen' component={ProductScreen} options={({ route }) => ({ title: route.params.title })} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};


export default (App);
