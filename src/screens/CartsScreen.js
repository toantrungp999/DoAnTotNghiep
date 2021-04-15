import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fectchCartsRequest, updateCartRequest, deleteCartRequest
} from '../../actions/cartActions';
import CartItem from '../components/cart/CartItem';

class CartsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      selectAll: true,
    }
  }

  componentDidMount() {
    this.props.fectchCarts();
  }

  onUpdateSelectedList = (_id, status) => {
    const selected = this.state.selectedList;
    for (const index in selected) {
      if (selected[index] === _id)
        selected.splice(index, 1)
    }
    if (status === true) {
      selected.push(_id);
    }
    let selectAll = selected.length === this.props.cartsReducer.carts.length ? true : false;
    this.setState({
      selectedList: selected,
      selectAll: selectAll
    })
  }

  onCheck = (event) => {
    let checked = event.target.checked;
    let selected = this.state.selectedList;
    if (!checked) {
      selected = [];
    } else {
      let carts = this.props.cartsReducer.carts;
      selected = [];
      selected = carts ? carts.map((cart, index) => {
        return cart._id;
      }) : [];
    }
    this.setState({
      selectAll: checked,
      selectedList: selected
    });
  }

  // onBuy = () => {
  //   const selectedList = this.state.selectedList;
  //   if (selectedList.length === 0) {
  //     this.setState({
  //       errorMessage: 'Chưa chọn sản phẩm',
  //       showAlert: true
  //     });
  //   } else {
  //     let validQuantity = true;
  //     let carts = this.props.cartsReducer.carts;
  //     carts.forEach(cart => {
  //       let { quantityOptionId } = cart;
  //       if (selectedList.includes(cart._id))
  //         if (cart.quantity > quantityOptionId.quantity)
  //           validQuantity = false;
  //     });
  //     if (validQuantity)
  //       this.props.history.push({
  //         pathname: '/orders/create',
  //         state: {
  //           selectedList: this.state.selectedList
  //         }
  //       })
  //     else
  //       this.setState({
  //         errorMessage: 'Không đủ số lượng',
  //         showAlert: true
  //       });
  //   }
  // }

  deleteCart = (_id) => {
    let selected = this.state.selectedList;
    selected = selected.filter(item => item !== _id);
    this.setState({ selectedList: selected });
    this.props.deleteCart(_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartsReducer !== prevProps.cartsReducer) {
      const { message } = this.props.cartsReducer;
      if (message)
        Alert.alert(
          "Thông báo",
          message,
          [
            {
              text: "Xác nhận"
            }
          ]
        );
    }
  }


  render() {
    let { loading, updateLoading, updateStatus, carts } = this.props.cartsReducer;
    if (loading)
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    let total = 0;
    let totalQuantity = 0;
    let totalSelectQuantity = 0;
    let { selectedList } = this.state;
    let elementCarts = carts ? carts.map((cart, index) => {
      let { colorId, sizeId, quantity, quantityInStore } = cart;
      let { productId } = colorId;
      let { size } = sizeId;
      total += selectedList.includes(cart._id) ? productId.price * quantity - productId.saleOff * quantity : 0;
      totalSelectQuantity += selectedList.includes(cart._id) ? quantity : 0;
      totalQuantity += quantity;
      let type = 'Màu: ' + colorId.color + ', kích cỡ: ' + size;

      let checked = selectedList.includes(cart._id);
      return <CartItem
        _id={cart._id} key={cart._id} index={index} colorId={colorId._id} sizeId={sizeId._id}
        deleteCart={this.deleteCart} updateLoading={updateLoading} updateStatus={updateStatus} updateCart={this.props.updateCart}
        name={productId.name} productId={productId._id} image={colorId.image} type={type} quantity={quantity} quantityInStore={quantityInStore}
        price={productId.price} saleOff={productId.saleOff}
        onUpdateSelectedList={this.onUpdateSelectedList}
        checked={checked} />
    }) : null;
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.containerMain}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Ionicons style={{ backgroundColor: 'rgb(240,242,245)' }} name="arrow-back-sharp" size={30} /></TouchableOpacity>
            <Text style={styles.textHeader}>Giỏ hàng</Text>
          </View>
          <View style={{ backgroundColor: 'white', padding: 10 }}>
            {elementCarts}
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
  }
})

const mapStateToProps = state => {
  return {
    cartsReducer: state.cartsReducer
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fectchCarts: () => { dispatch(fectchCartsRequest()) },
    updateCart: (data) => { dispatch(updateCartRequest(data)) },
    deleteCart: (_id) => { dispatch(deleteCartRequest(_id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartsScreen);
