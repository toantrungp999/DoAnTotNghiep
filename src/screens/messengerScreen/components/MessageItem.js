import React, { Component, memo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class MessageItem extends Component {

    render() {

        return (
            <View style={styles.messageItem}>
                {
                    this.props.isReciver ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {this.props.showImage ? <Image style={{ width: 36, height: 36, borderRadius: 18 }} source={this.props.source} /> : <View style={{ width: 36, height: 36 }}></View>}
                            <Text style={styles.messageReciver}>{this.props.message.content.msg}{this.props.message.content.listData}</Text>
                        </View> :
                        <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                            <Text style={styles.messageSend}>{this.props.message.content.msg}{this.props.message.content.listData}</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    messageItem: {
        flexDirection: 'row', width: '100%', marginBottom: 7
    },
    messageReciver: {
        marginLeft: 7, fontSize: 15, paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#E4E6EB',
        borderRadius: 18,
        maxWidth: '80%',
    },
    messageSend: {
        marginLeft: 7, fontSize: 15, paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#0084FF',
        borderRadius: 18,
        color: '#ffffff',
        maxWidth: '80%',
    }
})


export default memo(MessageItem);
