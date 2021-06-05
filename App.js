import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-native-paper';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import CreateOrderScreen from './src/screens/createOrderScreen/CreateOrderScreen';
import HomeTabScreen from './src/screens/HomeTabScreen';
import OrderStackScreen from './src/screens/orderScreen/OrderStackScreen';
import DetailProductScreen from './src/screens/productScreen/DetailProductScreen';
import ProductScreen from './src/screens/productScreen/ProductScreen';
import alertReducer from './reducers/alerts';
import { hideAlert } from './actions/alertActions';


const Stack = createStackNavigator();


class App extends Component {

  render() {
    if (this.props.alertReducer.alert !== null)
      Alert.alert(
        this.props.alertReducer.alert.message,
        this.props.alertReducer.alert.description,
        [
          {
            text: "OK",
            onPress: () => this.props.hideAlert()

          }
        ]
      );
    return (
      <Provider theme={theme}>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name='homeTabScreen' options={{ headerShown: false }} component={HomeTabScreen} />
            <Stack.Screen name='createOrderScreen' component={CreateOrderScreen} options={{ title: 'Đặt hàng' }} />
            <Stack.Screen name='orderStackScreen' options={{ headerShown: false }} component={OrderStackScreen} />
            <Stack.Screen name='detailProductScreen' component={DetailProductScreen} options={{ title: 'Chi tiết sản phẩm' }} />
            <Stack.Screen name='productScreen' component={ProductScreen} options={({ route }) => ({ title: route.params.title })} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};

const mapStateToProps = state => {
  return {
    alertReducer: state.alertReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      hideAlert: () => dispatch(hideAlert()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
