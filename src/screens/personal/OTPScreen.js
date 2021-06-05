import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { isValidLength, isNumber } from '../../../extentions/ArrayEx';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
    verifyOTPRequest, forgotPasswordRequest
} from '../../../actions/userActions';

class OTPScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            code: { value: '', error: '' },
        };
    }

    checkValidate = (name, value) => {
        let errors = this.state.errors;
        switch (name) {
            case 'code':
                value.error = value.value.length > 0 ? isValidLength(value.value, 6, 6).error : 'Chưa nhập';
                if (value.error.length === 0)
                    value.error = !isNumber(value.value).error ? '' : 'Vui lòng nhập số';
                break;
            default: break;
        }
        this.setState({ errors });
    }

    validateForm = errors => {
        let valid = true;
        if (!errors)
            return true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    componentDidUpdate(prevProps) {
        if (this.props.userForgotPasswordReducer !== prevProps.userForgotPasswordReducer) {
            if (this.props.userForgotPasswordReducer.statusVerify) {
                this.props.navigation.navigate('ResetPasswordSreen');
            }
        }
    }

    onChange = (name, value) => {
        this.checkValidate(name, value);
        this.setState({
            [name]: value
        });
    };

    verifyOTP = () => {
        if (!this.validateForm(this.errors))
            return;
        this.props.verifyOTP(this.state.code.value);
    }

    componentDidMount() {
        const { email } = this.props.userForgotPasswordReducer;
        if (email)
            this.setState({ email });
    }



    sendResetPasswordOTP = () => {
        if (this.state.email)
            this.props.forgotPassword(this.state.email);
        else
            this.props.navigation.navigate('ForgotPasswordScreen');
    }

    render() {
        const { message, msgSuccess } = this.props.userForgotPasswordReducer;
        return (
            <Background>
                <BackButton goBack={this.props.navigation.goBack} />
                <Logo />
                <Header>Xác thực OTP</Header>
                <TextInput
                    label="OTP"
                    returnKeyType="done"
                    value={this.state.code.value}
                    onChangeText={(text) => this.onChange('code', { value: text, error: '' })}
                    error={!!this.state.code.error}
                    errorText={this.state.code.error}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    description={msgSuccess || "Bạn sẽ nhận mã OTP thông qua số điện thoại. Mã OTP có hiệu lực trong 5 phút."}
                />
                <View><Text style={{ color: 'red' }}>{message || null}</Text></View>
                <TouchableOpacity onPress={this.sendResetPasswordOTP} style={{ width: '100%', marginTop: 15, marginBottom: 5 }}><Text style={{ textAlign: 'right', color: 'blue' }}>Gửi lại OTP</Text></TouchableOpacity>
                <Button
                    mode="contained"
                    onPress={this.verifyOTP}
                    style={{ marginTop: 16 }}
                >
                    Xác thực
        </Button>
            </Background>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        userForgotPasswordReducer: state.userForgotPasswordReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        verifyOTP: (code) => { dispatch(verifyOTPRequest(code)) },
        forgotPassword: (email) => { dispatch(forgotPasswordRequest(email)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
