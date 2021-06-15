import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { convertNumberToVND } from '../../../../../extentions/ArrayEx'

let filledIconName = 'ios-star';
let emptyIconName = 'ios-star-outline';
if (Platform.OS === 'android') {
    filledIconName = 'md-star';
    emptyIconName = 'md-star-outline';
}
const MAX_RATING = 5;

const Product = (props) => {
    const { _id, name, price, saleOff, images, avgRate, numberRate } = props.product;
    const index = props.index;
    let rangeView = [];
    if (avgRate)
        for (let i = 0; i < MAX_RATING; i++) {
            rangeView.push(<Icon key={i} id={i}
                name={avgRate > i ? filledIconName : emptyIconName}
                size={12}
                color="#FFD700"
                style={styles.icon}
            />)
        }
    return (
        <View style={[styles.card, (index % 2 === 1 && null)]}>
            <TouchableOpacity onPress={()=>{props.navigation.push('detailProductScreen',{_id,title:name})}}>
                <Image style={styles.image} source={{ uri: images[0] }} />
                <View style={styles.cardHeader}>
                    <View style={styles.bottom}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.priceSection}>
                            {saleOff !== 0 && <Text style={styles.orginPrice}>{convertNumberToVND(price)}₫</Text>}
                            <Text style={styles.price}>{convertNumberToVND(price - saleOff)}₫</Text>
                        </View>
                        <View style={styles.rateSection}>
                            {rangeView}
                            {numberRate && numberRate !== 0 && <Text style={styles.numberRate}>({numberRate})</Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </View >
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        width: '47.75%',
        marginLeft: '1.5%',
        marginBottom: windowWidth * 1.5 / 100,
        backgroundColor: '#ffffff'
    },
    image: {
        width: '100%',
        height: 150
    },
    bottom: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 5
    },
    priceSection: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
    },
    name: {
        fontSize: 12,
        color: '#111111',
    },
    price: {
        fontSize: 15,
        color: '#ff1500'
    },
    orginPrice: {
        fontSize: 13,
        color: '#444444',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    rateSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 5,
    },
    numberRate: {
        fontSize: 12,
        color: '#777777',
    }

});

export default Product;