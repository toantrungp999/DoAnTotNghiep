import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Comment</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:500
    },
})