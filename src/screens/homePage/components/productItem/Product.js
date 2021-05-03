import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

let filledIconName = 'ios-star';
let emptyIconName = 'ios-star-outline';
if (Platform.OS === 'android') {
    filledIconName = 'md-star';
    emptyIconName = 'md-star-outline';
}
const MAX_RATING = 5;

const Product = (props) => {
    const { id, name, price, salePrice, image, avgRate } = props;
    let rangeView = [];
    if (avgRate)
        for (let i = 0; i < MAX_RATING; i++) {
            rangeView.push(<Icon key={i} id={i}
                name={avgRate > i ? filledIconName : emptyIconName}
                size={18}
                color="#FFD700"
                style={styles.icon}
            />)
        }
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => props.navigation.navigate('DetailProductScreen', { id: id })}>
                <Image style={styles.cardImage} source={{ uri: image }} />
                <View style={styles.cardHeader}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.price}>{price}</Text>
                        {salePrice && <Text style={styles.salePrice}>{salePrice}</Text>}
                    </View>
                    <View style={styles.row}>
                        {rangeView}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: '47%',
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 4, justifyContent: 'center',
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 14, textAlignVertical: "center", textAlign: "center"
    },
    price: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0000CD',
        marginRight: 10
    },
    salePrice: {
        color: '#ccc',
        fontWeight: '600',
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    icon: {
        width: 20,
        height: 20,
    }
}); 

export default Product;