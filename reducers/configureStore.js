import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer
} from './user';
import { citiesReducer, districtsReducer } from './location';
import { productsReducer, productDetailReducer } from './products';
import { productOptionsReducer } from './productOptions';
import { brandReducer, brandsReducer } from './brands';
import { commentsReducer } from './comments';
import { ratesReducer } from './rates';
import { cartsReducer } from './carts';
import { createOrderReducer } from './orders';
import { notificationsReducer } from './notifications';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers(
    {
        userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer,
        citiesReducer, districtsReducer,
        productsReducer, productDetailReducer, productOptionsReducer,
        brandReducer, brandsReducer,
        commentsReducer,ratesReducer,
        cartsReducer,notificationsReducer,
        createOrderReducer
    }
);

const middleware = applyMiddleware(thunk);
const configureStore = () => {
    return createStore(rootReducer, {}, composeWithDevTools(middleware));
}
export default configureStore;