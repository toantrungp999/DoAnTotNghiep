import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    aspectRatio: 1, // <-- this
    resizeMode: 'contain'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row', width: '100%',
    marginTop: 5,
  },
  textSize:{
    fontSize: 18,
    marginLeft: 14,
  },
  text:{
    fontSize: 18,
    marginLeft: 14,
    color: '#0000CD',
    fontWeight: 'bold',
    color: 'black',
  },
  textPrice: {
    fontSize: 18,
    marginLeft: 14,
  },
  price: {
    fontSize: 18,
    color: '#0000CD',
    marginRight: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  salePrice: {
    color: '#ccc',
    fontSize: 18,
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
