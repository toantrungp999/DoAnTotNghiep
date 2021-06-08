import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessageItem from './components/MessageItem';
import { closeMessage, sendMessageToBot, sendMessageToUser, fectchMessagesRequest, updateMessengerCheck } from '../../../actions/messengerActions';

class DetailMessengerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { index: -1, content: '', lengthMessages: 0, currentPage: 1, pageSize: 7, firstFetch: false };
    }

    componentDidMount() {
        const { index } = this.props.messengersReducer;
        this.setState({ index: index });
        if (index > -1) {
            const { messengers } = this.props.messengersReducer;
            this.props.fectchMessages(messengers[index]._id, this.state.pageSize, this.state.currentPage);
        }
    }


    render() {
        const { messengers, to, index } = this.props.messengersReducer;
        const userId = this.props.userInfoReducer.userInfo._id;

        if (!messengers && index > -1)
            return <View></View>

        const source = !to ? require('../../../assets/CSKH.jpg') : { uri: to.image };
        const messages = messengers ? messengers[index].messages : null;

        const messageItems = [];

        if (messages) {
            const currentUser = messengers[index].user1._id === userId ? 'user1' : 'user2';
            let showImage = false;
            const total = messages.length;
            for (let i = 0; i < total; i++) {
                let isReciver = false;
                if (currentUser !== messages[i].sender) {
                    isReciver = true;
                    if ((i + 1) === total || ((i + 1) < total && currentUser === messages[i + 1].sender))
                        showImage = true;
                    else
                        showImage = false;
                }
                else
                    showImage = false;
                messageItems.push(<MessageItem source={source} isReciver={isReciver} showImage={showImage} index={i} key={i} message={messages[i]} />)
            }
        }
        return (
            <View style={styles.containerMain}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Ionicons style={{ marginTop: 4 }} name="arrow-back-sharp" size={25} /></TouchableOpacity>
                    <Image style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 20 }} source={source} />
                    <Text style={styles.reciverName}>{!to ? "Chăm sóc khách hàng" : to.name}</Text>
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ padding: 15 }}>
                        {messageItems}
                    </View>

                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
    header: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderBottomColor: "black",
        borderBottomWidth: 0.2
    },
    reciverName: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15
    },
    bottomView: {
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 4
    },
    bottom: {
        flexDirection: 'row', width: '100%',
        marginTop: 4, justifyContent: 'center',
        marginBottom: 50
    }
})

const mapStateToProps = state => {
    return {
        messengersReducer: state.messengersReducer,
        userInfoReducer: state.userInfoReducer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fectchMessages: (mesengerId, pageSize, currentPage) => dispatch(fectchMessagesRequest(mesengerId, pageSize, currentPage)),
        closeMessage: () => dispatch(closeMessage()),
        sendMessageToBot: (content) => dispatch(sendMessageToBot(content)),
        sendMessageToUser: (to, content, isCustomerCare) => dispatch(sendMessageToUser(to, content, isCustomerCare))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMessengerScreen);
