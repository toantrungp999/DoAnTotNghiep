import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    SettingScreen,
    ProfileScreen
} from './index';

const Stack = createStackNavigator();

class PersonalSreen extends Component {

    render() {
        const { userInfo } = this.props.userInfoReducer;
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {!userInfo && <Stack.Screen name="LoginScreen" component={LoginScreen} />}
                {!userInfo && <Stack.Screen name="RegisterScreen" component={RegisterScreen} />}
                {!userInfo && <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />}
                {userInfo && <Stack.Screen name="SettingScreen" component={SettingScreen} />}
                {userInfo && <Stack.Screen name="ProfileScreen" component={ProfileScreen} />}
            </Stack.Navigator>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfoReducer: state.userInfoReducer
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalSreen);

