import {
  REGISTER_SISWA,
  GET_LIST_SISWA,
  LOGIN_ADMIN,
  REGISTER_ADMIN,
  CHECK_LOGIN,
  LOGOUT,
} from "store/actions/AuthAction";

const initialState = {
  registerSiswaLoading: false,
  registerSiswaResult: false,
  registerSiswaError: false,

  getListSiswaLoading: false,
  getListSiswaResult: false,
  getListSiswaError: false,

  loginLoading: false,
  loginResult: false,
  loginError: false,

  registerAdminLoading: false,
  registerAdminResult: false,
  registerAdminError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,

  logoutLoading: false,
  logoutResult: false,
  logoutError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SISWA:
      return {
        ...state,
        registerSiswaLoading: action.payload.loading,
        registerSiswaResult: action.payload.data,
        registerSiswaError: action.payload.errorMessage,
      };

    case GET_LIST_SISWA:
      return {
        ...state,
        getListSiswaLoading: action.payload.loading,
        getListSiswaResult: action.payload.data,
        getListSiswaError: action.payload.errorMessage,
      };

    case LOGIN_ADMIN:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    case REGISTER_ADMIN:
      return {
        ...state,
        registerAdminLoading: action.payload.loading,
        registerAdminResult: action.payload.data,
        registerAdminError: action.payload.errorMessage,
      };

    case CHECK_LOGIN:
      return {
        ...state,
        checkLoginLoading: action.payload.loading,
        checkLoginResult: action.payload.data,
        checkLoginError: action.payload.errorMessage,
      };

    case LOGOUT:
      return {
        ...state,
        logoutLoading: action.payload.loading,
        logoutResult: action.payload.data,
        logoutError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
