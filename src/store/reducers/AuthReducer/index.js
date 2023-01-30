import { REGISTER_SISWA, GET_LIST_SISWA } from "store/actions/AuthAction";

const initialState = {
  registerSiswaLoading: false,
  registerSiswaResult: false,
  registerSiswaError: false,

  getListSiswaLoading: false,
  getListSiswaResult: false,
  getListSiswaError: false,
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

    default:
      return state;
  }
}
