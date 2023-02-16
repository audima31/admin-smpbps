import {
  TAMBAH_KELAS,
  GET_LIST_KELAS,
  GET_DETAIL_KELAS,
  UPDATE_KELAS,
  DELETE_KELAS,
  TOTAL_KELAS,
} from "store/actions/KelasAction";

const initialState = {
  tambahKelasLoading: false,
  tambahKelasResult: false,
  tambahKelasError: false,

  getListKelasLoading: false,
  getListKelasResult: false,
  getListKelasError: false,

  detailKelasLoading: false,
  detailKelasResult: false,
  detailKelasError: false,

  updateKelasLoading: false,
  updateKelasResult: false,
  updateKelasError: false,

  deleteKelasLoading: false,
  deleteKelasResult: false,
  deleteKelasError: false,

  totalKelasLoading: false,
  totalKelasResult: false,
  totalKelasError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TAMBAH_KELAS:
      return {
        ...state,
        tambahKelasLoading: action.payload.loading,
        tambahKelasResult: action.payload.data,
        tambahKelasError: action.payload.errorMessage,
      };

    case GET_LIST_KELAS:
      return {
        ...state,
        getListKelasLoading: action.payload.loading,
        getListKelasResult: action.payload.data,
        getListKelasError: action.payload.errorMessage,
      };

    case GET_DETAIL_KELAS:
      return {
        ...state,
        detailKelasLoading: action.payload.loading,
        detailKelasResult: action.payload.data,
        detailKelasError: action.payload.errorMessage,
      };

    case UPDATE_KELAS:
      return {
        ...state,
        updateKelasLoading: action.payload.loading,
        updateKelasResult: action.payload.data,
        updateKelasError: action.payload.errorMessage,
      };

    case DELETE_KELAS:
      return {
        ...state,
        deleteKelasLoading: action.payload.loading,
        deleteKelasResult: action.payload.data,
        deleteKelasError: action.payload.errorMessage,
      };

    case TOTAL_KELAS:
      return {
        ...state,
        totalKelasLoading: action.payload.loading,
        totalKelasResult: action.payload.data,
        totalKelasError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
