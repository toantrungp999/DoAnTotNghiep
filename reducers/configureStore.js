import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer
} from './user';
import { citiesReducer, districtsReducer } from './location';
import { productsReducer, productDetailReducer } from './products';
const rootReducer = combineReducers(
    {
        userInfoReducer, userRegisterReducer, userForgotPasswordReducer, userProfileReducer, userActionReducer, userAddressReducer,
        citiesReducer, districtsReducer,
        productsReducer, productDetailReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;