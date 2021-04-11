import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, Dimensions, View, Image, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  fectchProductRequest
} from '../../../actions/productActions';
import {
  fectchBrandRequest
} from '../../../actions/brandActions';
import {
  fectchColorOptionsRequest, fectchQuantityOptionsRequest, fectchSizeOptionsRequest
} from '../../../actions/productOptionActions';
import {
  fectchCommentsRequest, createCommentRequest, updateCommentRequest,
  createReplyRequest, updateReplyRequest,
  deleteCommentRequest, deleteReplyRequest
} from '../../../actions/commentActions';
import {
  fectchRatesRequest, createRateRequest, updateRateRequest,
  createRateReplyRequest, updateRateReplyRequest,
  deleteRateRequest, deleteRateReplyRequest
} from '../../../actions/rateActions';
import {
  createCartRequest, clearStateCart
} from '../../../actions/cartActions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import ProductOption from '../../components/productDetail/ProductOption';
import More from '../../components/productDetail/More';

const { width: viewportWidth } = Dimensions.get('window');

class DetailProductScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      images: '',
      activeSlide: 0,
      lengthCmt: 5,
      lengthRate: 5,
    }
  }

  onCreateComment = (content, dataUser) => {
    this.props.createComment({ productId: this.state.id, content }, dataUser);
  }

  onCreateRate = (data, dataUser) => {
    data.productId = this.state.id;
    this.props.createRate(data, dataUser);
  }

  viewMoreComments = () => {
    this.props.fectchComments(this.state.id, this.state.lengthCmt + 5);
    this.setState({ lengthCmt: this.state.lengthCmt + 5 })
  }

  viewMoreRates = () => {
    this.props.fectchRates(this.state.id, this.state.lengthRate + 5);
    this.setState({ lengthRate: this.state.lengthRate + 5 })
  }

  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      this.setState({ id });
      this.props.clearStateCart();
      this.props.fectchProduct(id);
      this.props.fectchColorOptions(id);
      this.props.fectchSizeOptions(id);
      this.props.fectchQuantityOptions(id);
      this.props.fectchComments(id, this.state.lengthCmt);
      this.props.fectchRates(id, this.state.lengthRate);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartsReducer !== prevProps.cartsReducer) {
      const { messageCreate, createStatus, createLoading } = this.props.cartsReducer;
      if (createLoading === false) {
        if (messageCreate)
          Alert.alert(
            "Cảnh báo",
            messageCreate,
            [
              {
                text: "Xác nhận",
              },
            ]
          );
        if (createStatus === true)
          Alert.alert(
            "Thông báo",
            "Thêm vào giỏ hàng thành công",
            [
              {
                text: "Xác nhận",
              },
            ]
          );
      }
    }
  }

  onAddToCart = (data) => {
    const { userInfo } = this.props.userInfoReducer;
    if (!userInfo)
      this.props.navigation.navigate('Đăng nhập');
    else {
      this.setState({ isAddToCart: true });
      this.props.createCart(data);
    }
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  render() {
    const { product, loading } = this.props.productDetailReducer;
    const { activeSlide } = this.state;
    const { userInfo } = this.props.userInfoReducer;
    if (loading)
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    else
      return (
        <ScrollView style={styles.container}>
          <View style={styles.carouselContainer}>
            <View style={styles.carousel}>
              <Carousel
                ref={c => {
                  this.slider1Ref = c;
                }}
                data={product.images}
                renderItem={this.renderImage}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
                loop={false}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={product.images.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor="rgba(255, 255, 255, 0.92)"
                dotStyle={styles.paginationDot}
                inactiveDotColor="white"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this.slider1Ref}
                tappableDots={!!this.slider1Ref}
              />
            </View>
          </View>
          <View style={styles.infoRecipeContainer}>
            <Text style={styles.infoRecipeName}>{product.name}</Text>
            <ProductOption productOptionsReducer={this.props.productOptionsReducer} price={product.price} saleOff={product.saleOff} onAddToCart={this.onAddToCart} />
            <More
              product={product} fectchBrand={this.props.fectchBrand} brandReducer={this.props.brandReducer}
              viewMoreRates={this.viewMoreRates} lengthRate={this.state.lengthRate} totalRate={this.props.ratesReducer.total}
              onCreateRate={this.onCreateRate} onCreateRateReply={this.props.createRateReply} onUpdateRate={this.props.updateRate}
              onUpdateRateReply={this.props.updateRateReply} onDeleteRate={this.props.deleteRate} onDeleteRateReply={this.props.deleteRateReply}
              ratesReducer={this.props.ratesReducer}
              viewMoreComments={this.viewMoreComments} lengthCmt={this.state.lengthCmt} totalCmt={this.props.commentsReducer.total}
              onCreateComment={this.onCreateComment} onCreateReply={this.props.createReply}
              onUpdateComment={this.props.updateComment} onDeleteComment={this.props.deleteComment}
              onUpdateCommentReply={this.props.updateReply} onDeleteCommentReply={this.props.deleteReply}
              commentsReducer={this.props.commentsReducer}
              userInfo={userInfo}


            />
          </View>

        </ScrollView>
      );
  }
}

const mapStateToProps = state => {
  return {
    userInfoReducer: state.userInfoReducer,
    productDetailReducer: state.productDetailReducer,
    productOptionsReducer: state.productOptionsReducer,
    brandReducer: state.brandReducer,
    commentsReducer: state.commentsReducer,
    ratesReducer: state.ratesReducer,
    cartsReducer: state.cartsReducer,
  }
}

const mapDispatchToProps = dispatch => ({
  fectchProduct: (id) => {
    dispatch(fectchProductRequest(id));
  },
  fectchColorOptions: (id) => {
    dispatch(fectchColorOptionsRequest(id));
  },
  fectchQuantityOptions: (id) => {
    dispatch(fectchQuantityOptionsRequest(id));
  },
  fectchSizeOptions: (id) => {
    dispatch(fectchSizeOptionsRequest(id));
  },
  fectchBrand: (id) => {
    dispatch(fectchBrandRequest(id))
  },
  fectchComments: (_id, length) => { dispatch(fectchCommentsRequest(_id, length)) },
  fectchRates: (_id, length) => { dispatch(fectchRatesRequest(_id, length)) },
  //
  createComment: (data, dataUser) => { dispatch(createCommentRequest(data, dataUser)) },
  updateComment: (data) => { dispatch(updateCommentRequest(data)) },
  updateReply: (data) => { dispatch(updateReplyRequest(data)) },
  createReply: (data) => { dispatch(createReplyRequest(data)) },
  deleteComment: (data) => { dispatch(deleteCommentRequest(data)) },
  deleteReply: (data) => { dispatch(deleteReplyRequest(data)) },
  ///
  createRate: (data, dataUser) => { dispatch(createRateRequest(data, dataUser)) },
  createRateReply: (data) => { dispatch(createRateReplyRequest(data)) },
  updateRate: (data) => { dispatch(updateRateRequest(data)) },
  updateRateReply: (data) => { dispatch(updateRateReplyRequest(data)) },
  deleteRate: (data) => { dispatch(deleteRateRequest(data)) },
  deleteRateReply: (data) => { dispatch(deleteRateReplyRequest(data)) },

  createCart: (data) => { dispatch(createCartRequest(data)) },
  clearStateCart: () => { dispatch(clearStateCart()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductScreen);
