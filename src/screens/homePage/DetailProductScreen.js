import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, Dimensions, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  fectchProductRequest
} from '../../../actions/productActions';
import {
  fectchColorOptionsRequest, fectchQuantityOptionsRequest, fectchSizeOptionsRequest
} from '../../../actions/productOptionActions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import ProductOption from '../../components/productOption/ProductOption';

const { width: viewportWidth } = Dimensions.get('window');

class DetailProductScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      this.props.fectchProduct(id);
      this.props.fectchColorOptions(id);
      this.props.fectchSizeOptions(id);
      this.props.fectchQuantityOptions(id);
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
    if (loading)
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOADING...</Text>
      </View>
    else
      return (
        <ScrollView style={styles.container}>
          <View style={styles.carouselContainer}>
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
              <ProductOption productOptionsReducer={this.props.productOptionsReducer} price={product.price} saleOff={product.saleOff} />
              <View style={styles.infoContainer}>
                <Text style={styles.infoDescriptionRecipe}>{product.description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      );
  }
}

const mapStateToProps = state => {
  return {
    productDetailReducer: state.productDetailReducer,
    productOptionsReducer: state.productOptionsReducer
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductScreen);
