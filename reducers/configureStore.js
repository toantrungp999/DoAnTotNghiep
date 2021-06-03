import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer
} from './user';
import { citiesReducer, districtsReducer } from './location';
import { productsReducer, productDetailReducer,productHomepagesReducer } from './products';
import { productOptionsReducer } from './productOptions';
import { brandReducer, brandsReducer } from './brands';
import { commentsReducer } from './comments';
import { ratesReducer } from './rates';
import { cartsReducer } from './carts';
import { createOrderReducer,orderReducer, orderDetailReducer } from './orders';
import { notificationsReducer } from './notifications';
import { categoryGroupsReducer } from './categoryGroups';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers(
    {
        userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer,
        citiesReducer, districtsReducer,
        productsReducer, productDetailReducer,productHomepagesReducer, productOptionsReducer,
        brandReducer, brandsReducer,
        commentsReducer,ratesReducer,
        cartsReducer,notificationsReducer,
        createOrderReducer,orderReducer,orderDetailReducer,
        categoryGroupsReducer
    }
);

const middleware = applyMiddleware(thunk);
const configureStore = () => {
    return createStore(rootReducer, {}, composeWithDevTools(middleware));
}
export default configureStore;