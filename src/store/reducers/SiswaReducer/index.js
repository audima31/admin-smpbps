import {
  TAMBAH_SISWA,
  GET_LIST_SISWA,
  GET_DETAIL_SISWA,
  UPDATE_SISWA,
  DELETE_SISWA,
  TOTAL_SISWA,
} from "store/actions/SiswaAction";

const initialState = {
  tambahSiswaLoading: false,
  tambahSiswaResult: false,
  tambahSiswaError: false,

  getListSiswaLoading: false,
  getListSiswaResult: false,
  getListSiswaError: false,

  detailSiswaLoading: false,
  detailSiswaResult: false,
  detailSiswaError: false,

  updateSiswaLoading: false,
  updateSiswaResult: false,
  updateSiswaError: false,

  deleteSiswaLoading: false,
  deleteSiswaResult: false,
  deleteSiswaError: false,

  totalSiswaLoading: false,
  totalSiswaResult: false,
  totalSiswaError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TAMBAH_SISWA:
      return {
        ...state,
        tambahSiswaLoading: action.payload.loading,
        tambahSiswaResult: action.payload.data,
        tambahSiswaError: action.payload.errorMessage,
      };

    case GET_LIST_SISWA:
      return {
        ...state,
        getListSiswaLoading: action.payload.loading,
        getListSiswaResult: action.payload.data,
        getListSiswaError: action.payload.errorMessage,
      };

    case GET_DETAIL_SISWA:
      return {
        ...state,
        detailSiswaLoading: action.payload.loading,
        detailSiswaResult: action.payload.data,
        detailSiswaError: action.payload.errorMessage,
      };

    case UPDATE_SISWA:
      return {
        ...state,
        updateSiswaLoading: action.payload.loading,
        updateSiswaResult: action.payload.data,
        updateSiswaError: action.payload.errorMessage,
      };

    case DELETE_SISWA:
      return {
        ...state,
        deleteSiswaLoading: action.payload.loading,
        deleteSiswaResult: action.payload.data,
        deleteSiswaError: action.payload.errorMessage,
      };

    case TOTAL_SISWA:
      return {
        ...state,
        totalSiswaLoading: action.payload.loading,
        totalSiswaResult: action.payload.data,
        totalSiswaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
