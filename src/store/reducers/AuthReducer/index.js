import {
  LOGIN_ADMIN,
  REGISTER_ADMIN,
  CHECK_LOGIN,
  LOGOUT_ADMIN,
} from "store/actions/AuthAction";

const initialState = {
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
    case LOGIN_ADMIN:
      console.log("Reducer");
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

    case LOGOUT_ADMIN:
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
