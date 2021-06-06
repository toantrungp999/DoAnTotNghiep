import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

class CreateMessengerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }


    render() {
        return (
            <ScrollView style={{ width: '100%' }}>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessengerScreen);
