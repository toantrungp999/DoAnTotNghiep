import React, { Component } from 'react';
import {StyleSheet, View, FlatList,Text,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import ProductSection from './components/productItem/ProductSection';
import Drawer from 'react-native-drawer'
import GestureRecognizer from 'react-native-swipe-gestures';
import LeftMenu from '../../components/LeftMenu';
import {fectchProductHomepagesRequest} from '../../../actions/productActions';
import { fectchCategoryGroupsWithCategoryRequest } from '../../../actions/categoryGroupActions';
import Loading from '../../components/Loading';


class HomeScreen extends Component {
  state = { open: false }

  componentDidMount() {
    this.props.fectchProducts();
    this.props.fectchCategoryGroupsWithCategory();
  }

  onSwipeLeft = (state) => {
    this.setState({ open: false })
  }

  onSwipeRight = (state) => {
    this.setState({ open: true })
  }

  navigate = (path, key, title) => {
    this.props.navigation.push('productScreen', { path, key, title });
  }
  render() {
    const { loading, message, productHomepages } = this.props.productHomepagesReducer;
    if (loading)
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Loading/>
      </View>
    else {
      // var { hots, news, bestSellers, colorOptions, sizeOptions } = productHomepages;
      const config = {
        
      };
      return (
        <GestureRecognizer
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1
          }}
        >
          {/* <Drawer
            type="overlay"
            content={<LeftMenu navigate={this.navigate} categoryGroupsReducer={this.props.categoryGroupsReducer} />}
            tapToClose={false}
            openDrawerOffset={0.3} // 30% gap on the right side of drawer
            panCloseMask={0.2}
            styles={drawerStyles}
            open={this.state.open}

          >
            <ScrollView >
              <ProductSection products={news} navigation={this.props.navigation} sizeOptions={sizeOptions} colorOptions={colorOptions} title='Sản phẩm mới' description='Xu hướng thời trang dành cho bạn' />
              <ProductSection products={hots} navigation={this.props.navigation} sizeOptions={sizeOptions} colorOptions={colorOptions} title='Sản phẩm mổi bật' description='Xu hướng thời trang dành cho bạn' />
              <ProductSection products={hots} navigation={this.props.navigation} sizeOptions={sizeOptions} colorOptions={colorOptions} title='Sản phẩm bán chạy' description='Xu hướng thời trang dành cho bạn' />
            </ScrollView>
          </Drawer > */}
        </GestureRecognizer>
      );
    }
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3   },
  main: { paddingLeft: 0 },
}



const mapStateToProps = state => {
  return {
    productHomepagesReducer: state.productHomepagesReducer,
    categoryGroupsReducer: state.categoryGroupsReducer

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fectchProducts: () => {
      dispatch(fectchProductHomepagesRequest());
    },
    fectchCategoryGroupsWithCategory: () => {
      dispatch(fectchCategoryGroupsWithCategoryRequest('true'));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);