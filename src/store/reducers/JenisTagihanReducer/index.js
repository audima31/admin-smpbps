import {
  TAMBAH_JENIS_TAGIHAN,
  GET_LIST_JENIS_TAGIHAN,
  UPDATE_JENIS_TAGIHAN,
  DELETE_JENIS_TAGIHAN,
  GET_DETAIL_JENIS_TAGIHAN,
} from "store/actions/jenisTagihanAction";

const initialState = {
  tambahJenisTagihanLoading: false,
  tambahJenisTagihanResult: false,
  tambahJenisTagihanError: false,

  getListJenisTagihanLoading: false,
  getListJenisTagihanResult: false,
  getListJenisTagihanError: false,

  updateJenisTagihanLoading: false,
  updateJenisTagihanResult: false,
  updateJenisTagihanError: false,

  detailTypeTagihanLoading: false,
  detailTypeTagihanResult: false,
  detailTypeTagihanError: false,

  deleteJenisTagihanLoading: false,
  deleteJenisTagihanResult: false,
  deleteJenisTagihanError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TAMBAH_JENIS_TAGIHAN:
      return {
        ...state,
        tambahJenisTagihanLoading: action.payload.loading,
        tambahJenisTagihanResult: action.payload.data,
        tambahJenisTagihanError: action.payload.errorMessage,
      };

    case GET_LIST_JENIS_TAGIHAN:
      return {
        ...state,
        getListJenisTagihanLoading: action.payload.loading,
        getListJenisTagihanResult: action.payload.data,
        getListJenisTagihanError: action.payload.errorMessage,
      };

    case UPDATE_JENIS_TAGIHAN:
      return {
        ...state,
        updateJenisTagihanLoading: action.payload.loading,
        updateJenisTagihanResult: action.payload.data,
        updateJenisTagihanError: action.payload.errorMessage,
      };

    case GET_DETAIL_JENIS_TAGIHAN:
      return {
        ...state,
        detailTypeTagihanLoading: action.payload.loading,
        detailTypeTagihanResult: action.payload.data,
        detailTypeTagihanError: action.payload.errorMessage,
      };

    case DELETE_JENIS_TAGIHAN:
      return {
        ...state,
        deleteJenisTagihanLoading: action.payload.loading,
        deleteJenisTagihanResult: action.payload.data,
        deleteJenisTagihanError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
