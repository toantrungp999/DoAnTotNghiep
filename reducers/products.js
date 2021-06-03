import * as Types from "../constants/ProductsActTypes";

function productsReducer(state = { loading: true }, action) {
    switch (action.type) {
        case Types.PRODUCTS_REQUEST:
            return { loading: true }
        case Types.PRODUCTS_VIEW_MORE_REQUEST:
            state.viewMoreloading = true;
            return { ...state };
        case Types.PRODUCTS_SUCCESS:
            var products = action.payload.data.products;
            if (state.viewMoreloading)
                products = state.products.concat(products);
            return {
                loading: false,
                products,
                colorOptions: action.payload.data.colorOptions,
                sizeOptions: action.payload.data.sizeOptions,
                pagingInfo: action.payload.data.pagingInfo,
                searchInfo: action.payload.data.searchInfo
            };
        case Types.PRODUCTS_FAIL:
            return { loading: false, message: action.payload.message };

        default: return state;
    }
}


function productHomepagesReducer(state = { loading: true }, action) {
    switch (action.type) {
        case Types.PRODUCT_HOMEPAGE_REQUEST:
            return { loading: true };
        case Types.PRODUCT_HOMEPAGE_SUCCESS:
            return { loading: false, productHomepages: action.payload.data };
        case Types.PRODUCT_HOMEPAGE_FAIL:
            state.loading = false;
            state.message = action.payload.message;
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


export { productsReducer, productDetailReducer, productHomepagesReducer }