import * as Types from "../constants/UsersActTypes";

function usersReducer(state = { loading: true }, action) {
  switch (action.type) {
    case Types.USERS_REQUEST:
      return { loading: true }
    case Types.USERS_SUCCESS:
      return { loading: false, users: action.payload.data.users, pagingInfo: action.payload.data.pagingInfo };
    case Types.USERS_FAIL:
      return { loading: false, message: action.payload.message };
    case Types.USERS_SEARCH_REQUEST:
      state.loadingSearchUsers = true;
      state.searchResult = [];
      state.keyword = action.payload.keyword;
      return { ...state };
    case Types.USERS_SEARCH_SUCCESS:
      if (state.keyword === action.payload.data.keyword) {
        state.loadingSearchUsers = false;
        state.searchResult = action.payload.data.users;
        state.searchPagingInfo = action.payload.data.pagingInfo;
      }
      return { ...state };
    case Types.USERS_SEARCH_FAIL:
      state.loadingSearchUsers = false;
      return { ...state };
    default: return state;
  }
}

function employeesReducer(state = {}, action) {
  switch (action.type) {
      case Types.EMPLOYEES_REQUEST:
          return { loading: true }
      case Types.EMPLOYEES_SUCCESS:
          return { loading: false, employees: action.payload.data };
      case Types.EMPLOYEES_FAIL:
          return { loading: false, message: action.payload.message };
      default: return state;
  }
}


function userDetailReducer(state = { loading: true }, action) {
  switch (action.type) {
    case Types.USER_DETAIL_REQUEST:
      return { loading: true }
    case Types.USER_UPDATE_REQUEST:
      state.loading = false;
      return state;
    case Types.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload.data };
    case Types.USER_UPDATE_SUCCESS:
      state.user.status = action.payload.data.status;
      state.user.role = action.payload.data.role;
      return { loading: false, user: state.user, success: true };
    case Types.USER_DETAIL_FAIL:
      return { loading: false, message: action.payload.message };
    default: return state;
  }
}

export { usersReducer, userDetailReducer, employeesReducer }