import * as Types from "../constants/ProductsActTypes";

function productsReducer(state = {}, action) {
    switch (action.type) {
        case Types.PRODUCTS_REQUEST:
            return { loading: true };
        case Types.PRODUCTS_VIEW_MORE_REQUEST:
            state.viewMoreloading = true;
            return { ...state };
        case Types.PRODUCTS_SUCCESS:
            const products = action.payload.data.products;
            const pagingInfo = action.payload.data.pagingInfo;
            if (!state.viewMoreloading || !state.products)
                return { loading: false, products: action.payload.data.products, pagingInfo };
            else {
                state.viewMoreloading = false;
                for (let i = 0; i < products.length; i++)
                    state.products.push(products[i]);
                state.pagingInfo = pagingInfo;
                return { ...state };
            }
        case Types.PRODUCTS_FAIL:
            return { loading: false, viewMoreloading: false, message: action.payload.message };
        case Types.PRODUCTS_SEARCH_REQUEST:
            state.loadingSearchProducts = true;
            state.searchProducts = [];
            state.keyword = action.payload.keyword;
            return { ...state };
        case Types.PRODUCTS_SEARCH_SUCCESS:
            if (state.keyword === action.payload.data.keyword) {
                state.loadingSearchProducts = false;
                state.searchProducts = action.payload.data.products;
                state.searchPagingInfo = action.payload.data.searchPagingInfo;
            }
            return { ...state };
        case Types.PRODUCTS_SEARCH_FAIL:
            state.loadingSearchProducts = false;
            return { ...state };
        default: return state;
    }
}

function productDetailReducer(state = { loading: true }, action) {
    switch (action.type) {
        case Types.PRODUCT_DETAIL_REQUEST:
            state.loading = true;
            state.message = '';
            return { ...state };
        case Types.PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload.data };
        case Types.PRODUCT_DETAIL_FAIL:
            state.loading = false;
            state.message = action.payload.message;
            state.success = false;
            return { ...state };
        default: return state;
    }
}


export { productsReducer, productDetailReducer }