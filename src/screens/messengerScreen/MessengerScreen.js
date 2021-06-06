import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class MessengerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
    }

    onSearch = (value) => {
        this.setState({
            searchValue: value
        });
    };

    render() {
        return (
            <View style={styles.messengerScren}>
                <View style={styles.rowReverse}>
                    <MaterialIcons style={styles.createMessengerIcon} name='create' size={28} color='black' />
                </View>

                <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => this.onSearch(text)}
                    onClear={() => this.onSearch('')}
                    placeholder="Tìm kiếm..."
                    value={this.state.searchValue}
                />

                <ScrollView style={{ width: '100%' }}>

                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    messengerScren: {
        width: '100%',
        height: '100%',
        padding: 5
    },
    bottomView: {
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    createMessengerIcon: {
        marginRight:10
    },
    row: {
        flexDirection: 'row', width: '100%',
        marginTop: 4
    },
    rowReverse: {
        flexDirection: 'row-reverse', width: '100%',
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

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);
