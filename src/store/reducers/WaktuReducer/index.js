import { GET_LIST_BULAN } from "store/actions/WaktuAction";

const initialState = {
  getListBulanLoading: false,
  getListBulanResult: false,
  getListBulanError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_BULAN:
      console.log("Reduer Bulan", action);
      return {
        ...state,
        getListBulanLoading: action.payload.loading,
        getListBulanResult: action.payload.data,
        getListBulanError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
