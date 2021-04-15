import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { convertNumberToVND } from '../../../extentions/ArrayEx';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CartItem extends Component {

    constructor(props) {
        super(props);
        this.state = { _id: '', quantity: 0, price: 0, type: '', message: '', isLoading: false, showDiaLogChangeType: false }
    }

    componentDidMount() {
        let { _id, quantity, price, type, quantityInStore, defaultCheck } = this.props;
        this.setState({ _id, quantity, price, type, quantityInStore });
        // if (defaultCheck) {
        //     this.props.onUpdateSelectedList(_id, true);
        // }
    }

    onUp = () => {
        let { _id, quantity, quantityInStore } = this.state;
        if (quantity < quantityInStore && quantity < 5) {
            quantity += 1;
            this.setState({ quantity });
            this.onUpdate(_id, quantity);
        }
        else if (quantity >= quantityInStore)
            this.showMessage("Cảnh báo", 'Số lượng sản phẩm vượt quá số lượng có trong kho');

        else
            this.showMessage("Cảnh báo", 'Không thể thêm quá 5 sản phẩm cùng 1 loại vào giỏ hàng!');
    }

    onDown = () => {
        let { _id, quantity } = this.state;
        let checkQuantity = this.props.quantityInStore - quantity;
        if (this.props.quantity === 1)
            this.prepareToDelete();
        else if (checkQuantity < 0) {
            quantity = this.props.quantityInStore;
            this.setState({ quantity });
            this.onUpdate(_id, quantity);
        }
        else if (quantity > 1) {
            quantity -= 1;
            this.setState({ quantity });
            this.onUpdate(_id, quantity);
        }
    }

    prepareToDelete = () => {
        console.log('sfsd')
        Alert.alert(
            "Cảnh báo",
            "Bạn muốn sản phẩm này khỏi giỏ hàng",
            [
                {
                    text: "Đồng ý",
                    onPress: () => this.onDelete()
                },
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }

    showMessage = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Xác nhận"
                }
            ]
        );
    }

    onUpdate = (_id, quantity) => {
        this.props.updateCart({ _id, quantity });
        this.setState({ isLoading: true });
    }

    onDelete = () => {
        this.props.deleteCart(this.state._id);
    }

    // onCheck = (event) => {
    //     let checked = event.target.checked;
    //     this.props.onUpdateSelectedList(this.state._id, checked);

    // }


    componentDidUpdate(prevProps) {
        if (this.props.quantity !== prevProps.quantity || this.props.updateLoading !== prevProps.updateLoading) {
            const { updateLoading, quantity } = this.props;
            if (!updateLoading && this.state.isLoading)
                this.setState({ isLoading: false });
            if (quantity)
                this.setState({ quantity });
        }
    }

    onEditType = () => {
        // this.setState({ showDiaLogChangeType: true });
    }


    render() {
        return (
            <View style={{ backgroundColor: 'white', padding: 10 }}>
                <View style={styles.row}>
                    <View style={styles.col_15}>
                        <RadioButton />
                    </View>
                    <View style={styles.col_25}>
                        <Image style={styles.image} source={{ 'uri': this.props.image }} />
                    </View>
                    <View style={styles.col_60}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{this.props.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity><View style={styles.category}><Text>{this.props.type}  <AntDesign name="caretdown" size={14} /></Text></View></TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>{convertNumberToVND(this.state.quantity * (this.props.price - this.props.saleOff))} ₫</Text>
                            <Text style={styles.salePrice}>{convertNumberToVND(this.state.quantity * this.props.price)} ₫</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rowItemCenter}>
                    <TouchableOpacity onPress={this.onDown}><Text style={styles.btnSubAdd}>-</Text></TouchableOpacity>
                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                    <TouchableOpacity onPress={this.onUp}><Text style={styles.btnSubAdd}>+</Text></TouchableOpacity>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={this.prepareToDelete}><Ionicons style={styles.delete} name="trash" size={20} /></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: 20,
        flexDirection: 'row', width: '100%', backgroundColor: 'rgb(240,242,245)'
    },
    textHeader: {
        fontSize: 24,
        marginLeft: 10
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 4
    },
    rowItemCenter: {
        flexDirection: 'row', width: '100%', justifyContent: 'center',
        marginTop: 10
    },
    col_15: {
        flexDirection: 'row', width: '15%', alignItems: 'center'
    },
    col_25: {
        flexDirection: 'row', width: '25%', textAlignVertical: 'center'
    },
    col_60: {
        width: '60%', textAlignVertical: 'center',
        marginLeft: 15
    },
    image: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    },
    btnSubAdd: {
        fontSize: 18,
        width: 36,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 0.4,
    },
    quantity: {
        width: 40,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 0.2,
        fontSize: 18,
    },
    title: {
        fontSize: 18, textAlign: "center", fontWeight: 'bold',

    },
    category: { padding: 10, backgroundColor: '#F1F2F6', borderRadius: 5 },
    textPrice: {
        fontSize: 18,
    },
    price: {
        fontSize: 18,
        color: '#0000CD',
        marginRight: 10,
        fontWeight: 'bold',
        color: 'red',
    },
    salePrice: {
        color: '#ccc',
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: 'black',
    },
    delete: {
        color: 'red'
    }
})

export default CartItem;
