import * as Types from "../constants/StoreActTypes";

function storesReducer(state = {}, action) {
    switch (action.type) {
        case Types.STORES_REQUEST:
            return { loading: true }
        case Types.STORES_SUCCESS:
            return { loading: false, stores: action.payload.data };
        case Types.STORES_FAIL:
            return { loading: false, message: action.payload.message };
        default: return state;
    }
}

function storeCreateReducer(state = {}, action) {
    switch (action.type) {
        case Types.STORE_CREATE_REQUEST:
            return { loading: true }
        case Types.STORE_CREATE_SUCCESS:
            return { loading: false };
        case Types.STORE_CREATE_FAIL:
            return { loading: false, success: false, message: action.payload.message };
        default: return state;
    }
}

function storeDetailReducer(state = { loading: true }, action) {
    switch (action.type) {
        case Types.STORE_DETAIL_REQUEST:
            state.loading = true;
            state.message = '';
            return { ...state };
        case Types.STORE_UPDATE_REQUEST:
            state.message = null;
            state.success = null;
            state.loading = false;
            return { ...state };
        case Types.STORE_DETAIL_SUCCESS:
            return { loading: false, store: action.payload.data };
        case Types.STORE_UPDATE_SUCCESS:
            state.store = action.payload.data;
            state.loading = false;
            state.success = true;
            return { ...state };
        case Types.STORE_UPDATE_FAIL || Types.STORE_DETAIL_FAIL:
            state.loading = false;
            state.message = action.payload.message;
            state.success = false;
            return { ...state };
        default: return state;
    }
}


export { storesReducer, storeCreateReducer, storeDetailReducer }