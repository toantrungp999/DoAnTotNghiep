import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, FlatList, Text, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';
import ProductItem from './ProductItem';


class ProductSection extends Component {
    render() {
        const { products, title, description, colorOptions, sizeOptions } = this.props;
        let _products = products.slice(0, 8);
        let productElements = _products ? _products.map((product, index) => {
            return <ProductItem key={product._id} index={index} product={product} navigation={this.props.navigation}/>
        }) : null;
        return (
            <View style={styles.container}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                    {productElements}
                </ScrollView>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eeeeee"
    },
    scrollView: {

    },
    content: {
        width: windowWidth,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    titleSection: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#ffffff',
        marginBottom:windowWidth*1.5/100,
        marginTop: windowWidth * 3/ 100,
        marginLeft:'1.5%',
        marginRight:'1.5%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3694ff',
        paddingLeft: '2%',
        textTransform: 'uppercase'

    }

});

export default ProductSection;