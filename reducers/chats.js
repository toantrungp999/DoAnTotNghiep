import * as Types from "../constants/ChatActTypes";

function chatsReducer(state = {}, action) {
    switch (action.type) {
        case Types.CHATS_REQUEST:
            return { loading: true }
        case Types.CHATS_SUCCESS:
            return { loading: false, chats: action.payload.data };
        case Types.CHATS_FAIL:
            return { loading: false, message: action.payload.message };
        default: return state;
    }
}

function chatCreateReducer(state = {}, action) {
    switch (action.type) {
        case Types.CHAT_CREATE_REQUEST:
            return { loading: true }
        case Types.CHAT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case Types.CHAT_CREATE_FAIL:
            return { loading: false, success: false, message: action.payload.message };
        default: return state;
    }
}

function chatDetailReducer(state = { loading: true }, action) {
    switch (action.type) {
        case Types.CHAT_DETAIL_REQUEST:
            state.loading = true;
            state.message = '';
            return { ...state };
        case Types.CHAT_DETAIL_SUCCESS:
            return { loading: false, chat: action.payload.data };
        case Types.CHAT_UPDATE_CHECK:
            state.chat.check = true;
            return { ...state };
        case Types.CHAT_DETAIL_FAIL:
            return { loading: false, message: action.payload.message };
        default: return state;
    }
}


export { chatsReducer, chatCreateReducer, chatDetailReducer }