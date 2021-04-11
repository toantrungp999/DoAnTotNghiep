import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight } from 'react-native';
import { theme } from '../core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CartsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.containerMain}>
          <View style={styles.header}>
            <TouchableHighlight onPress={() => { this.props.navigation.goBack() }}><Ionicons name="arrow-back-sharp" size={30} /></TouchableHighlight>
            <Text style={styles.textHeader}>Giỏ hàng</Text>
          </View>
        </View>
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
  header: {
    padding: 20,
    flexDirection: 'row', width: '100%', backgroundColor: 'rgb(240,242,245)'
  },
  textHeader: {
    fontSize: 24,
    marginLeft: 10
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
  },
  col_35: {
    width: "35%", marginTop: 25
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  col_50_male: {
    flexDirection: 'row', width: '50%', textAlignVertical: 'center'
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    borderRadius: 55,
    borderColor: 'white',
    borderWidth: 3
  },
  rowModal: { opacity: 0.6, flexDirection: 'row', alignItems: 'center', width: '100%', paddingLeft: 10, paddingTop: 15, paddingBottom: 15 },
  textRowModal: { fontSize: 18, paddingLeft: 15, fontWeight: "bold", color: 'black' }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartsScreen);
