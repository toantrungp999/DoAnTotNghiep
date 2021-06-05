import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScreen,
    PersonalScreen,
    NotificationsScreen
} from '../screens';
import CartsScreen from '../screens/cartScreen/CartsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initial } from '../../actions/userActions';
import { fectchNewNotificationsRequest } from '../../actions/notifacationActions';
import {
    fectchCartsRequest
} from '../../actions/cartActions';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
class HomeTabScreen extends Component {

    intervalId = 0;

    componentDidMount() {
        this.props.fectchCarts();
        this.props.initial();
        this.intervalId = setInterval(this.fectchNotifications, 5000);
    }

    fectchNotifications = () => {
        const { userInfo } = this.props.userInfoReducer;
        if (userInfo) {
            const { loading, feedNews } = this.props.notificationsReducer;
            if (!loading && !feedNews)
                this.props.fectchNotifications(7);
        }
    }

    render() {
        const { userInfo } = this.props.userInfoReducer;
        let count = 0;
        const { pagingInfo } = this.props.notificationsReducer;
        if (pagingInfo) {
            const { notSeen } = pagingInfo;
            count = notSeen;
        }

        let { carts } = this.props.cartsReducer;
        let lengthCarts = 0;
        if (carts)
            lengthCarts = carts.length;


        return (
            <Tab.Navigator
                initialRouteName="Trang chủ"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Trang chủ') {
                            iconName = focused
                                ? 'home-outline'
                                : 'home';
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
                <Tab.Screen name="Trang chủ" component={HomeScreen} />
                {userInfo ? <Tab.Screen name="Giỏ hàng" options={{ tabBarBadge: lengthCarts }} component={CartsScreen} /> : null}
                {userInfo ? <Tab.Screen name="Thông báo" options={{ tabBarBadge: count }} component={NotificationsScreen} /> : null}
                <Tab.Screen name={userInfo ? "Cá nhân" : "Đăng nhập"} component={PersonalScreen} />
            </Tab.Navigator>
        );
    }
};


const mapStateToProps = state => {
    return {
        userInfoReducer: state.userInfoReducer,
        notificationsReducer: state.notificationsReducer,
        cartsReducer: state.cartsReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        initial: () => {
            dispatch(initial())
        },
        fectchNotifications: (pageSize) => dispatch(fectchNewNotificationsRequest(pageSize, 1)),
        fectchCarts: () => { dispatch(fectchCartsRequest()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabScreen);
