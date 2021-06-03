import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Progress from './component/Progress';
import OrderDetailItem from './component/OrderDetailItem';
import { convertNumberToVND, formatDate, getStringDate } from './../../../extentions/ArrayEx';
import {
    fetchOrderRequest, orderChangeTypeRequest
} from '../../../actions/orderActions';
import * as OrderActions from '../../../constants/OrderActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CancelModal from './component/CancelModal';
import OrderStatuses from '../../../constants/OrderStatuses';



class OrderDetailScreen extends Component {
    state = {
        showCancel: false,
    }

    componentDidMount() {
        this.props.fetchOrderRequest(this.props.route.params._id, '');

    }

    showCancelModal = () => {
        this.setState({ showCancel: true });
    }

    hideCancelModal = () => {
        this.setState({ showCancel: false });
    }

    onConfirmCancel = (reason) => {
        var data = { type: OrderActions.CANCEL, description: reason };
        this.props.orderChangeTypeRequest('customer', this.props.route.params._id, data);
        this.setState({
            showCancel: false,
        });
        this.props.fetchOrderRequest(this.props.route.params._id, '');
    }


    render() {
        let { loading, changeTypeSuccess, message } = this.props.orderDetailReducer;
        if (loading)
            return (<Text>...Loading</Text>);
        var { orderInfo, orderDetails } = this.props.orderDetailReducer.order;;
        const OrderDetailItems = orderDetails ? orderDetails.map((orderDetail, index) => {
            return (<OrderDetailItem orderDetail={orderDetail} end={index === orderDetails.length - 1} />)
        }) : null;
        return (
            <View style={styles.container}>
                <CancelModal visible={this.state.showCancel} hideCancelModal={this.hideCancelModal} 
                onConfirmCancel={this.onConfirmCancel}/>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.progressContainer}>
                        <Progress orderInfo={orderInfo} />
                    </View>
                    <View style={styles.userInfoContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="account-circle-outline" color='#82b1ff' size={25} />
                            <Text style={styles.infoTitle}>Thông tin nhận hàng</Text>
                        </View>
                        <Text style={styles.info}>{orderInfo.customerInfo.name}</Text>
                        <Text style={styles.info}>{orderInfo.customerInfo.phoneNumber}</Text>
                        <Text style={styles.info}>{orderInfo.receiveAddress}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.id}>{orderInfo.orderId}</Text>
                            <Text style={styles.date}>{formatDate(orderInfo.date)}</Text>
                            <Text style={styles.status}>{orderInfo.status}</Text>
                        </View>
                        <View>
                            {OrderDetailItems}
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.fee}>Tổng tiền hàng: {convertNumberToVND(orderInfo.totalPrice)}đ</Text>
                            {orderInfo.shippingFee !== 0 ? <Text style={styles.fee}>Phí vận chuyển: {convertNumberToVND(orderInfo.shippingFee)}đ</Text> : null}
                            <Text style={styles.total}>Tổng: <Text style={styles.price}>{convertNumberToVND(orderInfo.total)}đ</Text></Text>
                        </View>
                    </View>

                    {orderInfo.shipBrand !== '' ? <View style={styles.shipContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="truck-delivery-outline" color='#82b1ff' size={25} />
                            <Text style={styles.infoTitle}>Đơn vị vận chuyển</Text>
                        </View>
                        <Text style={styles.info}>{orderInfo.shipBrand}</Text>
                        <Text style={styles.info}>Ngày nhận dự kiến: {getStringDate(orderInfo.expectedReceiveDate)}</Text>
                    </View> : null}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    {orderInfo.status === OrderStatuses.PENDING_APPROVE || orderInfo.status === OrderStatuses.PENDING_PAY ?
                        <Button style={styles.button} mode="contained" color='#b80000'
                            onPress={() => { this.showCancelModal() }}>Hủy đơn hàng</Button> : null}
                    {orderInfo.status === OrderStatuses.PENDING_PAY ?
                        < Button style={styles.button} mode="contained" color='#05c5ff' labelStyle={{ color: '#ffffff' }}>
                            Thanh toán</Button> : null}
                </View>
            </View >
        );
    }
};



const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 55
    },
    progressContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 8,
        backgroundColor: '#ffffff'
    },
    userInfoContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: '#82b1ff'
    },
    info: {
        paddingLeft: 30,
        paddingTop: 2,
        color: '#555555'
    },
    orderContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 13
    },
    id: {
        marginRight: 8,
        paddingLeft: 8,
        paddingRight: 5,
        // borderRightWidth:0.3,
        // borderRightColor:'#aaaaaa'
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        color: '#444444'
    },
    date: {
        color: '#777777'
    },
    status: {
        textTransform: 'uppercase',
        color: '#eb4934',
        marginLeft: 'auto',
        fontSize: 13
    },
    bottom: {
        paddingTop: 10,
        paddingBottom: 12
    },
    fee: {
        color: '#777777',
        marginLeft: 'auto',
        fontSize: 13,
        marginBottom: 8
    },
    total: {
        fontSize: 15,
        marginLeft: 'auto'
    },
    price: {
        color: '#FF2100',
    },
    shipContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 8
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        width: '45%',
    }
})


const mapStateToProps = state => {
    return {
        orderDetailReducer: state.orderDetailReducer
    }
}

const mapDispatchToProps = dispatch => ({
    fetchOrderRequest: (_id, all) => { dispatch(fetchOrderRequest(_id, all)) },
    orderChangeTypeRequest: (path, _id, action) => { dispatch(orderChangeTypeRequest(path, _id, action)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);