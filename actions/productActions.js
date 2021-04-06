import * as Types from "../constants/ProductsActTypes";
import { callApi } from '../utils/apiCaller';

export const fectchProductsRequest = (brand, type, page, option = 0, status = 'all') => {
  return (dispatch) => {
    dispatch({ type: Types.PRODUCTS_REQUEST });
    callApi(`products/brandId=${brand}&categoryId=${type}&page=${page}&option=${option}&status=${status}`, 'GET', null).then(response => {
      const type = response.status === 0 ? Types.PRODUCTS_SUCCESS : Types.PRODUCTS_FAIL;
      dispatch({ type, payload: response });
    });
  };
}

export const searchProductsRequest = (keyword, page, pageSize, isSearch = false, option = 0, status = 'all') => {
  return (dispatch) => {
    if (isSearch)
      dispatch({ type: Types.PRODUCTS_REQUEST });
    else
      dispatch({ type: Types.PRODUCTS_SEARCH_REQUEST, payload: { keyword } });
    callApi(`products/searchString=${keyword}&page=${page}&pagesize=${pageSize}&option=${option}&status=${status}`, 'GET', null).then(response => {
      let type = null;
      if (isSearch)
        type = response.status === 0 ? Types.PRODUCTS_SUCCESS : Types.PRODUCTS_FAIL;
      else {
        if (response.status === 0) {
          response.data.keyword = keyword;
          type = Types.PRODUCTS_SEARCH_SUCCESS
        }
        else type = Types.PRODUCTS_SEARCH_FAIL;
      }
      dispatch({ type, payload: response });
    });
  };
}

export const fectchProductRequest = (_id) => {
  return (dispatch) => {
    dispatch({ type: Types.PRODUCT_DETAIL_REQUEST });
    callApi(`products/${_id}`, 'GET', null).then(response => {
      const type = response.status === 0 ? Types.PRODUCT_DETAIL_SUCCESS : Types.PRODUCT_DETAIL_FAIL;
      dispatch({ type, payload: response });
    });
  };
}