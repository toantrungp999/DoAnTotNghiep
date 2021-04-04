import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
export default class Rates extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Rate</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
})