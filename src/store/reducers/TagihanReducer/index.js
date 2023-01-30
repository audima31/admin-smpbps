import { TAMBAH_TAGIHAN, GET_LIST_TAGIHAN } from "store/actions/TagihanAction";

const initialState = {
  tambahTagihanLoading: false,
  tambahTagihanResult: false,
  tambahTagihanError: false,

  getListTagihanLoading: false,
  getListTagihanResult: false,
  getListTagihanError: false,
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

    default:
      return state;
  }
}
