import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles'

export default class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.row}>
                <View style={styles.img}>
                    <Image source={require('../../../../assets/avatar.png')} style={styles.avartarReply} />
                </View>
                <View style={styles.contentArea}>
                    <View style={styles.content}>
                        <Text style={styles.text}>This is comment!fdsffffffffffffffffffffffffffffffffffffsfsdfsdfsd</Text>
                    </View>
                    <View style={styles.areaAction}><Text style={styles.textAction}>Phản hổi</Text><Text style={styles.textAction}>Xóa</Text></View>
                </View>
            </View>
        );
    }
}