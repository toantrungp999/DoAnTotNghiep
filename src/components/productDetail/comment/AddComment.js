import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { TextInput } from 'react-native-paper';
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.row}>
                <View style={styles.addComent}>
                    <TextInput
                        style={styles.input}
                        label="Nhập nội dung bình luận"
                        underlineColor="transparent"
                        // mode="outlined"
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewSend}>
                    <Text style={styles.sendBtn}>Bình luận</Text>
                </View>
            </View>
        );
    }
}