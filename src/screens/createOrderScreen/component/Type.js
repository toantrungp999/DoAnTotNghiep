import React, { Component } from 'react';
import { Modal, Portal, Provider, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

class Type extends Component {
    render() {
        const { text } = this.props;
        return (
            <View style={styles.container}>

                <Button icon="chevron-right" mode='outlined' contentStyle={styles.contentStyle} 
                    color={'#648aa3'}>
                    {text}
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:11
    },

    contentStyle:{
        flexDirection:'row-reverse' ,
        width:'100%',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:9
    }
});


export default Type;