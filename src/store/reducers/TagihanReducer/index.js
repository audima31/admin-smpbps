import {
  TAMBAH_TAGIHAN,
  GET_LIST_TAGIHAN,
  GET_DETAIL_TAGIHAN,
  GET_DETAIL_SISWA_TAGIHAN,
  UPDATE_TAGIHAN,
  DELETE_TAGIHAN,
  LUNAS_TAGIHAN,
  GET_LIST_TAGIHAN_SISWA_BY_ID,
} from "store/actions/TagihanAction";

const initialState = {
  tambahTagihanLoading: false,
  tambahTagihanResult: false,
  tambahTagihanError: false,

  getListTagihanLoading: false,
  getListTagihanResult: false,
  getListTagihanError: false,

  getDetailTagihanLoading: false,
  getDetailTagihanResult: false,
  getDetailTagihanError: false,

  getDetailSiswaTagihanLoading: false,
  getDetailSiswaTagihanResult: false,
  getDetailSiswaTagihanError: false,

  updateTagihanLoading: false,
  updateTagihanResult: false,
  updateTagihanError: false,

  deleteTagihanLoading: false,
  deleteTagihanResult: false,
  deleteTagihanError: false,

  // lunasTagihanLoading: false,
  // lunasTagihanResult: false,
  // lunasTagihanError: false,

  getListTagihanSiswaByIdLoading: false,
  getListTagihanSiswaByIdResult: false,
  getListTagihanSiswaByIdError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TAMBAH_TAGIHAN:
      return {
        ...state,
        tambahTagihanLoading: action.payload.loading,
        tambahTagihanResult: action.payload.data,
        tambahTagihanError: action.payload.errorMessage,
      };

    case GET_LIST_TAGIHAN:
      return {
        ...state,
        getListTagihanLoading: action.payload.loading,
        getListTagihanResult: action.payload.data,
        getListTagihanError: action.payload.errorMessage,
      };

    case GET_DETAIL_TAGIHAN:
      return {
        ...state,
        getDetailTagihanLoading: action.payload.loading,
        getDetailTagihanResult: action.payload.data,
        getDetailTagihanError: action.payload.errorMessage,
      };

    case GET_DETAIL_SISWA_TAGIHAN:
      return {
        ...state,
        getDetailSiswaTagihanLoading: action.payload.loading,
        getDetailSiswaTagihanResult: action.payload.data,
        getDetailSiswaTagihanError: action.payload.errorMessage,
      };

    case UPDATE_TAGIHAN:
      return {
        ...state,
        updateTagihanLoading: action.payload.loading,
        updateTagihanResult: action.payload.data,
        updateTagihanError: action.payload.errorMessage,
      };

    case DELETE_TAGIHAN:
      return {
        ...state,
        deleteTagihanLoading: action.payload.loading,
        deleteTagihanResult: action.payload.data,
        deleteTagihanError: action.payload.errorMessage,
      };

    // case LUNAS_TAGIHAN:
    //   return {
    //     ...state,
    //     lunasTagihanLoading: action.payload.loading,
    //     lunasTagihanResult: action.payload.data,
    //     lunasTagihanError: action.payload.errorMessage,
    //   };

    case GET_LIST_TAGIHAN_SISWA_BY_ID:
      return {
        ...state,
        getListTagihanSiswaByIdLoading: action.payload.loading,
        getListTagihanSiswaByIdResult: action.payload.data,
        getListTagihanSiswaByIdError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
