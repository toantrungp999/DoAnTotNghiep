import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from './src/core/theme';
import {
  HomeScreen,
  PersonalSreen,
  CartsScreen,
  NotificationsScreen
} from './src/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initial } from './/actions/userActions';
// import AsyncStorage from '@react-native-community/async-storage';
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
class App extends Component {

  componentDidMount(){
    this.props.initial();
  }

  render() {
    const { userInfo } = this.props.userInfoReducer;
    return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Trang chủ"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Trang chủ') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Đăng nhập') {
                  iconName = focused ? 'log-in' : 'log-in-outline';
                }
                else if (route.name === 'Thông báo') {
                  iconName = focused ? 'notifications' : 'notifications-outline';
                }
                else if (route.name === 'Giỏ hàng') {
                  iconName = focused ? 'cart' : 'cart-outline';
                }
                else if (route.name === 'Cá nhân') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Trang chủ" component={HomeScreen} options={{ tabBarBadge: 3 }} />
            {userInfo ? <Tab.Screen name="Giỏ hàng" component={CartsScreen} /> : null}
            {userInfo ? <Tab.Screen name="Thông báo" component={NotificationsScreen} /> : null}
            <Tab.Screen name={userInfo ? "Cá nhân" : "Đăng nhập"} component={PersonalSreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};

const mapStateToProps = state => {
  return {
    userInfoReducer: state.userInfoReducer
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    initial: () => {
      dispatch(initial())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
