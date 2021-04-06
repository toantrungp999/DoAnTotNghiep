import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
export default class Rates extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 100,
        marginTop: 10
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 8,
    },
    img: {
        width: '16%'
    },
    avartar: {
        width: 40, height: 40, borderWidth: 1, borderRadius: 20,marginTop:2
    },
    contentArea: {
        width: '84%',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        minHeight: 45
    },
    text: {
        fontSize: 13,
        color: 'black',
        paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 5
    },
    areaAction: {
        flexDirection: 'row', width: '90%',
        marginTop: 5,
        marginLeft: 10,
    },
    textAction: {
        fontSize: 12,
        color: 'rgb(0,119,212)',
        marginLeft: 10,
    }
})