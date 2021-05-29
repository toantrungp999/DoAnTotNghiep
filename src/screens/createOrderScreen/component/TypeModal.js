import React, { Component } from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



class TypeModal extends Component {
    render() {
        const { visible, type, options, hideModal } = this.props;
        const optionsList = options ? options.map(option => {
            return <TouchableOpacity style={styles.row}><Text style={styles.fontRow}>{option.label}</Text></TouchableOpacity>
        }) : ''
        console.log(visible);
        return (
            <Portal>
                <Modal visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.containerStyle}
                    animationType="slide">
                    <View><Text style={styles.title}>Chọn phương thức</Text></View>
                    <View>
                        {optionsList}
                    </View>
                </Modal>
            </Portal>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        paddingTop:30,
        paddingBottom:40
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        paddingBottom: 15,
        fontWeight: 'bold'
    },
    row: {
        paddingTop: 18,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
    },
    rowTop: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderBottomColor: '#dddddd',
    },
    fontRow: {
        fontSize: 16,
    }
});


export default TypeModal;