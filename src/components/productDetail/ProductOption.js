import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Button, TextInput } from 'react-native-paper'
import { convertNumberToVND } from '../../../extentions/ArrayEx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ProductOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeId: '',
            quantityOption: '',
            quantity: 1
        }
    }

    onChange(name, value) {
        if (name === 'colorId') {
            let { quantityOptions } = this.props.productOptionsReducer;
            if (quantityOptions) {
                let total = quantityOptions.length;
                for (let i = 0; i < total; i++) {
                    if (quantityOptions[i].sizeId === this.state.sizeId && quantityOptions[i].colorId === value) {
                        this.setState({
                            quantityOption: quantityOptions[i]
                        });
                        break;
                    }
                }
                // let { colorOptions } = this.props.productOptionsReducer;
                // let index = findIndexById(colorOptions, value);
                // if (index >= 0)
                //     this.props.onShowColorImage(index);
            }
        }
        else if (name === 'sizeId') {
            this.setState({
                sizeId: value,
                quantityOption: ''
            });
        }
        else if (name === 'quantity') {
            let quantity = Number(value);
            if (quantity > 5)
                quantity = 5
            this.setState({
                [name]: quantity
            });
        }
    }

    onAddToCart = () => {
        let { quantityOption, quantity } = this.state;
        this.props.onAddToCart({
            colorId: quantityOption.colorId,
            sizeId: quantityOption.sizeId,
            quantity
        });
    }

    render() {
        const { sizeOptions, colorOptions, quantityOptions, colorLoading, sizeLoading, quantityLoading } = this.props.productOptionsReducer;
        let sizeComponent, colorComponent;
        if (quantityLoading === false && quantityOptions) {
            if (sizeLoading === false && sizeOptions) {
                sizeComponent = sizeOptions.map((sizeOption, index) => {
                    let total = quantityOptions.length;
                    for (let i = 0; i < total; i++) {
                        if (quantityOptions[i].sizeId === sizeOption._id)
                            return <Button style={this.state.sizeId === sizeOption._id ? styles.chooseBtn : styles.btn}
                                labelStyle={this.state.sizeId === sizeOption._id ? styles.chooseBtnText : styles.btnText}
                                key={sizeOption._id} index={index} onPress={() => this.onChange('sizeId', sizeOption._id)}>{sizeOption.size}</Button>
                    }
                    return null;
                });
            }
            if (colorLoading === false && colorOptions) {
                colorComponent = colorOptions.map((colorOption, index) => {
                    let total = quantityOptions.length;
                    for (let i = 0; i < total; i++) {
                        if ((!this.state.sizeId || quantityOptions[i].sizeId === this.state.sizeId) && quantityOptions[i].colorId === colorOption._id)
                            return <Button
                                style={this.state.quantityOption.colorId === colorOption._id ? styles.chooseBtn : styles.btn}
                                labelStyle={this.state.quantityOption.colorId === colorOption._id ? styles.chooseBtnText : styles.btnText}
                                key={colorOption._id} index={index} onPress={() => this.onChange('colorId', colorOption._id)}>{colorOption.color}</Button>
                    }
                    return null;
                });
            }
        }
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: 5 }}>
                    {quantityOptions && quantityOptions.length > 0 &&
                        <>
                            <View style={styles.row}>
                                <Text style={styles.text}>Size:</Text>
                            </View>
                            <View style={styles.row}>
                                {sizeComponent}
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>Màu:</Text>
                            </View>
                            <View style={styles.row}>
                                {colorComponent}
                            </View>
                        </>
                    }
                    <View style={styles.row}>
                        <Text style={styles.textPrice}>Giá: </Text>
                        <Text style={styles.price}>{convertNumberToVND(this.props.price * this.state.quantity - (this.props.saleOff || 0) * this.state.quantity)}₫</Text>
                        {this.props.saleOff ? <Text style={styles.salePrice}>{convertNumberToVND(this.props.price * this.state.quantity)}₫</Text> : null}
                    </View>
                    {this.state.quantityOption ? <>

                        <View style={styles.row}>
                            <Text style={styles.text}>Số lượng hiện có: {this.state.quantityOption.quantity}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Số lượng:</Text>
                            <TextInput
                                onChangeText={(text) => this.onChange('quantity', text)}
                                value={this.state.quantity.toString()}
                                keyboardType="phone-pad"
                                style={styles.input}
                                underlineColor="transparent"
                                mode="outlined"
                                returnKeyType="next"
                            />
                        </View>
                    </> :
                        null}
                    {
                        !quantityOptions || quantityOptions.length === 0 && <View style={styles.row}>
                            <Text style={styles.textRed}>Sản phẩm sắp ra mắt</Text>
                        </View>
                    }
                    {
                        this.state.sizeId && this.state.quantityOption ?
                            <TouchableHighlight style={{ marginTop: 20 }} onPress={this.onAddToCart}>
                                <View style={styles.addToCart}>
                                    <MaterialIcons style={{ color: 'white' }} name="add-shopping-cart" size={20} />
                                    <Text style={{ color: 'white', marginLeft: 10 }}>Thêm vào giỏ hàng</Text>
                                </View>
                            </TouchableHighlight>
                            : null
                    }
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    addToCart: {
        flexDirection: 'row', width: '100%', backgroundColor: '#000000', padding: 10, alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row', width: '100%', marginTop: 8
    },
    text: {
        marginTop: 5,
        marginBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textRed: {
        marginTop: 5,
        marginBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
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
    chooseBtn: {
        borderColor: '#000000',
        backgroundColor: 'rgb(102,102,102)',
        marginRight: 5,
    },
    btn: {
        borderColor: '#909090',
        borderStyle: 'dashed',
        borderWidth: 1,
        marginRight: 5,
    },
    chooseBtnText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    btnText: {
        color: '#909090',
        textAlign: 'center'
    },
    input: {
        marginLeft: 10,
        backgroundColor: 'white',
        width: 50,
        height: 30,
        textAlign: 'center'
    }

})