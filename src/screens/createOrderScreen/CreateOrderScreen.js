import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as OrderTypes from '../../../constants/OrderTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import {
    fetchProductRequest, createOrderRequest, clearState, ShippingFeeRequest, fetchStoreAddressesRequest
} from '../../../actions/orderActions';
import { fetchAddressesRequest } from '../../../actions/userActions';
import CreateOrderItem from './component/CreateOrderItem';
import TypeModal from './component/TypeModal';
import Type from './component/Type';

class CreateOrderScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            orderType: OrderTypes.ONLINE_ORDER.ORDER_TYPE,
            paymentType: '',
            receiveType: '',
            addressId: '', //'' require to choose user Address  , '-2' storeAddress, '-99' new address, '-100' chosing new address
            newAddress: '',
            name: '',
            phoneNumber: '',
            shipId: '-2', //-2 not Ship //-1 require Ship but not choose yet
            shipDialog: false,
            firstSubmit: false,
            showModal: false,
            modalType: '',
            options: ''
        }
    }

    componentDidMount() {
        if (this.props.route.params && this.props.route.params.selectedList) {
            const { selectedList } = this.props.route.params;
            this.props.fetchStoreAddressesRequest();
            this.props.fetchAddressesRequest();
            this.props.fetchProductRequest({ cartIdList: selectedList });
            this.setState({
                name: this.props.userInfoReducer.userInfo.name,
                // phoneNumber: this.props.userInfoReducer.userInfo.phoneNumber
                phoneNumber: '123'
            })
        } else {
            this.props.navigation.navigate('cartsScreen');
        }
    }

    showModal = (type) => {
        let options = [];
        const paymentTypes = OrderTypes.ONLINE_ORDER.PAYMENT_TYPE;
        const receiveTypes = OrderTypes.ONLINE_ORDER.RECEIVE_TYPE;
        switch (type) {
            case 'paymentType':
                for (const [index, value] of Object.entries(paymentTypes)) {
                    options.push({ value: value, label: value });
                }
                break;
            case 'receiveType':
                for (const [index, value] of Object.entries(receiveTypes)) {
                    options.push({ value: value, label: value });
                }
                break;
        }
        console.log('123');
        this.setState({
            showModal: true,
            modalType: type,
            options
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false,
            modalType: '',
            options: []
        })
    }





    render() {
        let { loading, carts } = this.props.createOrderReducer;
        const { addressId, newAddress, orderType, paymentType, receiveType, name, phoneNumber, shipId, shipDialog, firstSubmit,
            showModal, modalType, options } = this.state

        if (loading)
            return (<Text>123</Text>);
        const cartList = carts ? carts.map(cart => { return <CreateOrderItem cart={cart} /> }) : <View></View>;
        return (
            <ScrollView style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View>
                    <TypeModal visible={showModal} type={modalType} options={options} hideModal={this.hideModal} />
                </View>
                {cartList}
                <View style={styles.orderType}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        mode="outlined"
                        label="Tên người đặt"
                        placeholder="Tên người đặt"

                    />
                    <TextInput
                        style={styles.textInput}
                        value={phoneNumber}
                        mode="outlined"
                        label="Số điện thoại"
                        placeholder="Số điện thoại"

                    />
                    <TouchableOpacity onPress={e => { e.preventDefault(); this.showModal('paymentType') }}>
                        <Type text={paymentType ? paymentType : 'Chọn phương thức giao hàng'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e => { e.preventDefault(); this.showModal('receiveType') }}>
                        <Type text={paymentType ? paymentType : 'Chọn phương thức giao hàng'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    orderType: {
        marginLeft:5,
        marginRight:5
    },
    textInput: {
       marginTop:5
    },

});

const mapStateToProps = state => {
    return {
        createOrderReducer: state.createOrderReducer,
        userInfoReducer: state.userInfoReducer,
        userAddressReducer: state.userAddressReducer
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProductRequest: (cartIdList) => { dispatch(fetchProductRequest(cartIdList)) },
    createOrderRequest: (Order) => { dispatch(createOrderRequest(Order)) },
    fetchAddressesRequest: () => { dispatch(fetchAddressesRequest()) },
    clearState: () => { dispatch(clearState()) },
    ShippingFeeRequest: (addressId) => { dispatch(ShippingFeeRequest(addressId)) },
    fetchStoreAddressesRequest: () => { dispatch(fetchStoreAddressesRequest()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderScreen);