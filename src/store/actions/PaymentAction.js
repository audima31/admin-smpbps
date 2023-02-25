import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const LIST_PEMBAYARAN_SISWA = "LIST_PEMBAYARAN_SISWA";
export const GET_DETAIL_TAGIHAN_LUNAS = "GET_DETAIL_TAGIHAN_LUNAS";
export const DELETE_TAGIHAN_LUNAS = "DELETE_TAGIHAN_LUNAS";
export const TOTAL_LUNAS = "TOTAL_LUNAS";
export const LIMIT_LUNAS = "LIMIT_LUNAS";

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

export const listPembayaranSiswa = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, LIST_PEMBAYARAN_SISWA);

    FIREBASE.database()
      .ref("riwayats/")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, LIST_PEMBAYARAN_SISWA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, LIST_PEMBAYARAN_SISWA, error);
      });
  };
};

export const getDetailTagihanLunas = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TAGIHAN_LUNAS);

    FIREBASE.database()
      .ref("riwayats/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, GET_DETAIL_TAGIHAN_LUNAS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_TAGIHAN_LUNAS, error);
        alert(error);
      });
  };
};

export const deleteTagihanLunas = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_TAGIHAN_LUNAS);

    FIREBASE.database()
      .ref("riwayats/" + id)
      .remove()
      .then(() => {
        dispatchSuccess(
          dispatch,
          DELETE_TAGIHAN_LUNAS,
          "TAGIHAN LUNAS BERHASIL DIHAPUS"
        );
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_TAGIHAN_LUNAS, error);
        alert(error);
      });
  };
};

export const totalPembayaranLunas = () => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, TOTAL_LUNAS);

    FIREBASE.database()
      .ref("tagihanLunas/")
      .once("value", (querySnapshot) => {
        //hasil
        var count = querySnapshot.numChildren();
        console.log("Action Count : ", count);
        dispatchSuccess(dispatch, TOTAL_LUNAS, count);
      })
      .catch((error) => {
        dispatchError(dispatch, TOTAL_LUNAS, error);
        alert(error.message);
      });
  };
};

export const limitPembayaranLunas = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, LIMIT_LUNAS);

    FIREBASE.database()
      .ref("tagihanLunas/")
      .limitToLast(5)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, LIMIT_LUNAS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, LIMIT_LUNAS, error);
        alert(error);
      });
  };
};
