import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const GET_LIST_BULAN = "GET_LIST_BULAN";

export const getListBulan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_BULAN);

    FIREBASE.database()
      .ref("bulan/")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_BULAN, data);
        console.log("BULAN Actions: ", data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_BULAN, error);
        alert(error);
      });
  };
};
