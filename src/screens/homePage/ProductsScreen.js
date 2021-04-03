import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';
import Product from '../../components/product/Product';
import { connect } from 'react-redux';
import {
  fectchProductsRequest, searchProductsRequest
} from '../../../actions/productActions';

class ProductsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fectchProducts(0, 0, 1, 0);
  }

  render() {
    const { products, loading } = this.props.productsReducer;
    console.log(products);
    if (loading)
      return <View>
        <Text>LOADING...</Text>
      </View>
    else
      return (
        <View style={styles.container}>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={products}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <Product navigation={this.props.navigation} id={item._id} image={item.images[0]} name={item.name} price={item.price} salePrice="50 USD" avgRate={item.avgRate} />
              )
            }} />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    productsReducer: state.productsReducer,
    // categoriesReducer: state.categoriesReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fectchProducts: (brandId, categoryId, page, option) => {
      dispatch(fectchProductsRequest(brandId, categoryId, page, option, 'true'));
    },
    searchProducts: (search, page, pageSize, isSearch, option) => {
      dispatch(searchProductsRequest(search, page, pageSize, isSearch, option, 'true'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);