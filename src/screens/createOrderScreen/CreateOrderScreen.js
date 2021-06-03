import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as OrderTypes from '../../../constants/OrderTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
    fetchProductRequest, createOrderRequest, clearState, ShippingFeeRequest, fetchStoreAddressesRequest
} from '../../../actions/orderActions';
import { fetchAddressesRequest } from '../../../actions/userActions';
import CreateOrderItem from './component/CreateOrderItem';
import TypeModal from './component/TypeModal';
import Type from './component/Type';
// import ShipType from './component/Type';
import { convertNumberToVND, getStringDate } from '../../../extentions/ArrayEx';


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
            case 'address':
                const userAddresses = this.props.userAddressReducer.addresses;
                if (this.state.receiveType === OrderTypes.ONLINE_ORDER.RECEIVE_TYPE.SHIP) {
                    options = userAddresses ? userAddresses.map((address, index) => {
                        return ({
                            value: index.toString(), label: address.streetOrBuilding + ', ' + address.ward + ', '
                                + address.district + ', ' + address.city
                        });
                    }) : '';
                    if (this.state.addressId === '-99')
                        options.push({
                            value: '-99', label: newAddress.streetOrBuilding + ', ' + newAddress.ward + ', '
                                + newAddress.district + ', ' + newAddress.city
                        })
                    options.push({ value: '-100', label: 'Địa chỉ mới' })
                }
                break;
            case 'shipId': {
                options = [] //use shipInfos props for this case  
            }

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


    changeType = (name, value) => {
        switch (name) {
            case 'paymentType':
                this.setState({
                    [name]: value
                })
                break;
            case 'receiveType':
                this.setState({
                    [name]: value,

                })
                if (value === OrderTypes.ONLINE_ORDER.RECEIVE_TYPE.SHIP) {
                    this.setState({ addressId: '' });
                } else if (value === OrderTypes.ONLINE_ORDER.RECEIVE_TYPE.IN_STORE) {
                    this.setState({ addressId: '-2', shipId: '-2' });
                }
                break;
            case 'address':
                this.setState({
                    addressId: value,
                });
                this.setState({ shipId: '-1' });
                if (value !== '-100') {// '-100' is chosing new Address 
                    if (value === '-99') {
                        this.props.ShippingFeeRequest(this.state.newAddress);
                    } else {
                        const userAddresses = this.props.userAddressReducer.addresses;
                        this.props.ShippingFeeRequest(userAddresses[Number(value)]);
                    }

                }
                break;
            case 'shipId': {
                this.setState({
                    shipId: value.toString()
                });
            }
        }
        this.setState({ [name]: value });
        this.hideModal();
    }




    render() {
        let { loading, carts, shipInfos, storeAddress } = this.props.createOrderReducer;
        const userAddresses = this.props.userAddressReducer.addresses;

        const { addressId, newAddress, orderType, paymentType, receiveType, name, phoneNumber, shipId, shipDialog, firstSubmit,
            showModal, modalType, options } = this.state
        let address;
        if (addressId === '-2' && storeAddress) {
            address = storeAddress;
        } else if (addressId !== '' && userAddresses) {
            address = userAddresses[Number(addressId)];
        }
        console.log(address);
        console.log(addressId);
        console.log(storeAddress);
        const addressString = address ? (address.streetOrBuilding + ', ' + address.ward + ', '
            + address.district + ', ' + address.city) : 'Chọn địa chỉ nhận hàng';
        if (loading)
            return (<Text>123</Text>);
        let total = 0;
        const cartList = carts ? carts.map(cart => {
            let { colorId, quantity } = cart;
            let { price, saleOff } = colorId.productId;
            total += price * quantity - saleOff * quantity;
            return <CreateOrderItem cart={cart} />
        }) : <View></View>;
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
                <ScrollView style={{ width: '100%', backgroundColor: '#ffffff', marginBottom: 70 }}>
                    <View>
                        <TypeModal visible={showModal} type={modalType} options={options} hideModal={this.hideModal}
                            changeType={this.changeType} shipInfos={shipInfos} />
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
                            <Type text={paymentType ? paymentType : 'Chọn phương thức thanh toán'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={e => { e.preventDefault(); this.showModal('receiveType') }}>
                            <Type text={receiveType ? receiveType : 'Chọn phương thức giao hàng'} />
                        </TouchableOpacity>
                        {receiveType === OrderTypes.ONLINE_ORDER.RECEIVE_TYPE.SHIP ? <TouchableOpacity onPress={e => { e.preventDefault(); this.showModal('address') }}>
                            <Type text={addressString} />
                        </TouchableOpacity> : null}
                        {receiveType === OrderTypes.ONLINE_ORDER.RECEIVE_TYPE.IN_STORE ? <TouchableOpacity>
                            <Type text={addressString} />
                        </TouchableOpacity> : null}
                        {shipId !== '-2' ? <TouchableOpacity onPress={e => { e.preventDefault(); this.showModal('shipId') }}>
                            <Type
                                text={shipId !== '-1' ? shipInfos[shipId].name : 'Chọn đơn vị giao hàng'}
                                fee={shipId !== '-1' ? (convertNumberToVND(shipInfos[shipId].shippingFee) + 'đ') : ''}
                                date={shipId !== '-1' ? ('Nhận ' + getStringDate(shipInfos[shipId].date * 1000)) : ''}
                            />
                        </TouchableOpacity> : null}
                    </View>

                </ScrollView>
                <View style={styles.bottomBar}>
                    <View style={styles.text}>
                        {shipId !== '-2' && shipId !== '-1' ?
                            < Text style={styles.fee} >Phí giao hàng: {convertNumberToVND(shipInfos[shipId].shippingFee)}₫</Text>
                            : <Text style={styles.fee} ></Text>}
                        <Text style={styles.total} >Tổng tiền: {convertNumberToVND(total)}đ</Text>
                    </View>
                    <View >
                        <Button mode='contained' color='#228ce3' style={styles.button}>Đặt hàng</Button>
                    </View>
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    orderType: {
        marginLeft: 5,
        marginRight: 5
    },
    textInput: {
        marginTop: 5
    },

    shipContainer: {
        width: 40
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 8,
        paddingRight: 8
    },
    text: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },

    fee: {
        fontSize: 15,
        color: '#444444'
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF2100'

    },

    button: {
        marginTop:'auto',
        paddingLeft: 15,
        paddingRight: 15
    }


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