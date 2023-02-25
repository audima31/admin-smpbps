import {
  UPDATE_PAYMENT,
  TOTAL_LUNAS,
  LIST_PEMBAYARAN_SISWA,
  DELETE_TAGIHAN_LUNAS,
  GET_DETAIL_TAGIHAN_LUNAS,
  LIMIT_LUNAS,
} from "store/actions/PaymentAction";

const initialState = {
  updatePaymentLoading: false,
  updatePaymentResult: false,
  updatePaymentError: false,

  listPembayaranSiswaLoading: false,
  listPembayaranSiswaResult: false,
  listPembayaranSiswaError: false,

  getDetailTagihanLunasLoading: false,
  getDetailTagihanLunasResult: false,
  getDetailTagihanLunasError: false,

  deleteTagihanLunasLoading: false,
  deleteTagihanLunasResult: false,
  deleteTagihanLunasError: false,

  totalPembayaranLoading: false,
  totalPembayaranResult: false,
  totalPembayaranError: false,

  listPembayaranSiswaLimitLoading: false,
  listPembayaranSiswaLimitResult: false,
  listPembayaranSiswaLimitError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYMENT:
      return {
        ...state,
        updatePaymentLoading: action.payload.loading,
        updatePaymentResult: action.payload.data,
        updatePaymentError: action.payload.errorMessage,
      };

    case LIST_PEMBAYARAN_SISWA:
      return {
        ...state,
        listPembayaranSiswaLoading: action.payload.loading,
        listPembayaranSiswaResult: action.payload.data,
        listPembayaranSiswaError: action.payload.errorMessage,
      };

    case GET_DETAIL_TAGIHAN_LUNAS:
      return {
        ...state,
        getDetailTagihanLunasLoading: action.payload.loading,
        getDetailTagihanLunasResult: action.payload.data,
        getDetailTagihanLunasError: action.payload.errorMessage,
      };

    case DELETE_TAGIHAN_LUNAS:
      return {
        ...state,
        deleteTagihanLunasLoading: action.payload.loading,
        deleteTagihanLunasResult: action.payload.data,
        deleteTagihanLunasError: action.payload.errorMessage,
      };

    case TOTAL_LUNAS:
      return {
        ...state,
        totalPembayaranLoading: action.payload.loading,
        totalPembayaranResult: action.payload.data,
        totalPembayaranError: action.payload.errorMessage,
      };

    case LIMIT_LUNAS:
      return {
        ...state,
        listPembayaranSiswaLimitLoading: action.payload.loading,
        listPembayaranSiswaLimitResult: action.payload.data,
        listPembayaranSiswaLimitError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
