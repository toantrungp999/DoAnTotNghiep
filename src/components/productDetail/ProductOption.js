import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper'
import { convertNumberToVND } from '../../../extentions/ArrayEx';

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
        this.setState({
            [name]: value
        });
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
        else {
            if (name === "quantity") {
                value = value.replace('.', '');
                value = value.replace(',', '');
            }
            this.setState({
                [name]: value
            });
        }
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
                <View style={{ marginLeft: 20 }}>
                    <View style={styles.row}>
                        <Text style={styles.textPrice}>Giá: </Text>
                        <Text style={styles.price}>{convertNumberToVND(this.props.price - (this.props.saleOff || 0))}₫</Text>
                        {this.props.saleOff ? <Text style={styles.salePrice}>{convertNumberToVND(this.props.price)}₫</Text> : null}
                    </View>
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
                    {this.state.quantityOption ? <>

                        <View style={styles.row}>
                            <Text style={styles.text}>Số lượng hiện có: {this.state.quantityOption.quantity}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Số lượng:</Text>
                            <TextInput
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
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 8,
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