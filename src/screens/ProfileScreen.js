import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
// import DateInput from '../components/DateInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { isValidLength, isValidDate } from '../../extentions/ArrayEx';
import {
    fetchProfileRequest,
    updateProfileRequest,
    clearInform
} from '../../actions/userActions';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            male: true,
            data: '',
            birthday: '1-1-2000',
            updateImage: false,
            isEditing: false,
            errors: {
                name: '',
                birthday: ''
            },
        };
    }

    componentDidMount() {
        this.props.fetchProfile();
    }

    checkValidate = (name, value) => {
        let errors = this.state.errors;
        switch (name) {
            case 'name':
                errors.name = value.length > 0 ? isValidLength(value, 6, 500).error : 'Chưa nhập';
                break;
            case 'birthday':
                errors.birthday = isValidDate(value) ? '' : 'Ngày sinh không hợp lệ';
                break;
            default:
        }
        this.setState({ errors });
    }

    onSubmit = () => {

    }

    componentDidUpdate(prevProps) {
        if (this.props.userProfileReducer !== prevProps.userProfileReducer && this.props.userProfileReducer.loading === false) {
            const { userProfile } = this.props.userProfileReducer;
            if (userProfile && !this.state.name)
                this.setState({
                    name: userProfile.name,
                    birthday: userProfile.birthday || '1-1-2000',
                    male: (userProfile.male === true || userProfile.male === false) ? userProfile.male : true,
                    image: userProfile.image,
                    oldImage: userProfile.image,
                });
        }
    }

    onChange = (name, value) => {
        this.checkValidate(name, value);
        this.setState({
            [name]: value
        });
    };

    render() {
        const { message, loading } = this.props.userProfileReducer;
        return (
            <ScrollView style={{ width: '100%' }}>
                <Background>
                    <BackButton goBack={this.props.navigation.goBack} />
                    <Logo />
                    <Header>Thông tin tài khoản</Header>
                    <TextInput
                        label="Tên"
                        returnKeyType="next"
                        value={this.state.name}
                        onChangeText={(text) => this.onChange('name', text)}
                        error={!!this.state.errors.name}
                        errorText={this.state.errors.name} />
                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={this.state.email}
                        onChangeText={(text) => this.onChange('email', text)}
                        error={!!this.state.errors.email}
                        errorText={this.state.errors.email}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address" />
                    <View style={styles.row}>
                        <View style={styles.col_35}><Text style={{ textAlign: 'center' }}>Ngày sinh:</Text></View>
                        <View style={{ width: "65%" }}>
                            {/* <DateInput
                                returnKeyType="next"
                                value={this.state.birthday}
                                onDateChange={(date) => this.onChange('birthday', date)}
                                error={!!this.state.errors.birthday}
                                errorText={this.state.errors.birthday} /> */}
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col_35}><Text style={{ textAlign: 'center' }}>Giới tính:</Text></View>
                        <View style={{ width: "65%", marginTop: 12 }}>
                            <View style={styles.row}>
                                <View style={styles.col_50_male}>
                                    <RadioButton
                                        value="Nam"
                                        status={this.state.male ? 'checked' : 'unchecked'}
                                        onPress={() => this.onChange('male', true)}
                                    />
                                    <Text style={{ marginTop: 8 }}>Nam</Text>
                                </View>
                                <View style={styles.col_50_male}>
                                    <RadioButton
                                        value="Nữ"
                                        status={!this.state.male ? 'checked' : 'unchecked'}
                                        onPress={() => this.onChange('male', false)}
                                    />
                                    <Text style={{ marginTop: 8 }}>Nữ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ color: 'red' }}>{message ? message : ''}</Text>
                    </View>
                    {
                        loading
                            ?
                            <Button
                                mode="contained"
                                style={{ marginTop: 24 }}>
                                LOADING...
                        </Button>
                            :
                            <Button
                                mode="contained"
                                // onPress={this.onSubmit}
                                style={{ marginTop: 24 }}>
                                Cập nhật
                        </Button>
                    }
                </Background>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 4
    },
    bottom: {
        flexDirection: 'row', width: '100%',
        marginTop: 4, justifyContent: 'center',
        marginBottom: 50
    },
    col_35: {
        width: "35%", marginTop: 25
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    col_50_male: {
        flexDirection: 'row', width: '50%', textAlignVertical: 'center'
    }
})

const mapStateToProps = state => {
    return {
        userProfileReducer: state.userProfileReducer,
        userInfoReducer: state.userInfoReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProfile: () => {
            dispatch(fetchProfileRequest());
        },
        updateProfile: (profile) => {
            dispatch(updateProfileRequest(profile))
        },
        updateAvatar: (file) => {
            dispatch(updateAvatarRequest(file));
        },
        clearInform: () => { dispatch(clearInform()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
