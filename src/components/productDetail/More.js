import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Comments from './Comments';
import Rates from './Rates';
import Description from './Description';

export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  render() {
    const { index } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={() => this.setState({ index: 0 })} style={index === 0 ? styles.chooseBtn : styles.btn} labelStyle={index === 0 ? styles.chooseBtnText : styles.btnText}>Mô tả</Button>
          <Button onPress={() => this.setState({ index: 1 })} style={index === 1 ? styles.chooseBtn : styles.btn} labelStyle={index === 1 ? styles.chooseBtnText : styles.btnText}>Bình luận</Button>
          <Button onPress={() => this.setState({ index: 2 })} style={index === 2 ? styles.chooseBtn : styles.btn} labelStyle={index === 2 ? styles.chooseBtnText : styles.btnText}>Đánh giá</Button>
        </View>
        <View style={styles.row}>
          <View style={{ marginLeft: 10 }}>
            {index === 0 && <Description fectchBrand={this.props.fectchBrand} product={this.props.product} brandReducer={this.props.brandReducer} />}
            {index === 1 && <Comments />}
            {index === 2 && <Rates />}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  row: {
    flexDirection: 'row', width: '100%',
    marginTop: 8,
  },
  btn: {
    width: '33%',
    borderBottomColor: 'rgb(106,119,127)',
    borderBottomWidth: 1,

  },
  chooseBtn: {
    width: '33%',
    borderBottomColor: 'rgb(0,119,212)',
    borderBottomWidth: 2,

  },
  chooseBtnText: {
    color: 'rgb(0,119,212)',
    textAlign: 'center'
  },
  btnText: {
    color: 'rgb(106,119,127)',
    textAlign: 'center'
  },
})