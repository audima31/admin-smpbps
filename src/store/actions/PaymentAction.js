import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const GET_LIST_PAYMENT = "GET_LIST_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";

export const getListPesanan = () => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, GET_LIST_PAYMENT);

    FIREBASE.database()
      .ref("riwayats/")
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        dispatchSuccess(dispatch, GET_LIST_PAYMENT, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PAYMENT, error);
        alert(error.message);
      });
  };
};

export const updatePayment = (order_id, transaction_status) => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, UPDATE_PAYMENT);

    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "LUNAS"
        : transaction_status;

    FIREBASE.database()
      .ref("riwayats/")
      .child(order_id)
      .update({ status: status })
      .then((response) => {
        //hasil
        dispatchSuccess(dispatch, UPDATE_PAYMENT, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PAYMENT, error);
        alert(error.message);
      });
  };
};
