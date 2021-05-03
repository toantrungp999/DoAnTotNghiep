import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Product from './components/productItem/Product';
import { connect } from 'react-redux';
import {
  fectchProductsRequest, searchProductsRequest
} from '../../../actions/productActions';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 20;
};

class ProductsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      pageSize: '',
      paging: 1,
      option: 0,
    };
  }

  componentDidMount() {
    this.props.fectchProducts(0, 0, 1, 0);
  }

  onSearch = (value) => {
    this.setState({
      searchValue: value
    });
    if (value)
      // this.props.searchProducts(value, this.state.paging, 12, true, this.state.option);
      this.props.searchProducts(value, 1, 4, true, 0);
    else
      this.props.fectchProducts(0, 0, 1, 0);
  };

  viewMore = () => {
    const { viewMoreloading, pagingInfo } = this.props.productsReducer;
    if (!viewMoreloading && pagingInfo && pagingInfo.currentPage < pagingInfo.totalPage) {
      if (this.state.searchValue)
        // this.props.searchProducts(value, this.state.paging, 12, true, this.state.option);
        this.props.searchProducts(this.state.searchValue, pagingInfo.currentPage + 1, 4, true, 0);
      else
        this.props.fectchProducts(0, 0, pagingInfo.currentPage + 1, 0);
    }
  }

  render() {
    const { products, loading, viewMoreloading } = this.props.productsReducer;
    let partScreen = '';
    if (loading)
      partScreen = <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    else
      partScreen = <FlatList style={styles.list}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            this.viewMore();
          }
        }}
        contentContainerStyle={styles.listContainer}
        data={products}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item._id;
        }}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator} />
          )
        }}
        renderItem={(post) => {
          const item = post.item;
          return (
            <Product navigation={this.props.navigation} key={item._id} id={item._id} image={item.images[0]} name={item.name} price={item.price} salePrice="50 USD" avgRate={item.avgRate} />
          )
        }} />
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.onSearch(text)}
          onClear={() => this.onSearch('')}
          placeholder="Tìm kiếm..."
          value={this.state.searchValue}
        />
        {partScreen}
        {/* {!loading && <DataTable>
          <DataTable.Pagination
            page={pagingInfo.totalPage}
            numberOfPages={pagingInfo.pageSize}
            onPageChange={page => this.setPage(page)}
            label={`Hiển thị từ ${(pagingInfo.currentPage - 1) * pagingInfo.pageSize + 1} đến ${(pagingInfo.currentPage - 1) * pagingInfo.pageSize + products.length} của ${pagingInfo.totalPage * pagingInfo.pageSize} kết quả`}
          />
        </DataTable>
        } */}
        {viewMoreloading && <View style={{ justifyContent: "center", alignItems: "center", height: 30 }}>
          <Text>LOADING...</Text>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    // marginTop: 10,
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