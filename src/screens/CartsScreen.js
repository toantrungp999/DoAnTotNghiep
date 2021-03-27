import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Background from '../components/Background';

class CartsScreen extends Component {

  render() {
    return (
      <ScrollView style={{ width: '100%' }}>
        <Background>
          <View style={{height:50}}></View>
        </Background>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(CartsScreen);
