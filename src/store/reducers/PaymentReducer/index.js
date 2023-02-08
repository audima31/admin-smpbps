import { UPDATE_PAYMENT } from "store/actions/PaymentAction";

const initialState = {
  updatePaymentLoading: false,
  updatePaymentResult: false,
  updatePaymentError: false,
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
    default:
      return state;
  }
}
