import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_JENIS_TAGIHAN = "TAMBAH_JENIS_TAGIHAN";
export const GET_LIST_JENIS_TAGIHAN = "GET_LIST_JENIS_TAGIHAN";
export const UPDATE_JENIS_TAGIHAN = "UPDATE_JENIS_TAGIHAN";
export const DELETE_JENIS_TAGIHAN = "DELETE_JENIS_TAGIHAN";
export const GET_DETAIL_JENIS_TAGIHAN = "GET_DETAIL_JENIS_TAGIHAN";

export const tambahTypeTagihan = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JENIS_TAGIHAN);

    const dataBaru = {
      namaJenisTagihan: data.namaJenisTagihan,
    };

    FIREBASE.database()
      .ref("jenisTagihan/")
      .push(dataBaru)
      .then((response) => {
        //AMBIL ID namaJenisTagihan
        console.log("ID : ", response._delegate._path.pieces_[1]);
        const dataId = {
          ...dataBaru,
          jenisTagihanId: response._delegate._path.pieces_[1],
        };
        console.log(dataId);

        //SIMPAN BARU
        FIREBASE.database()
          .ref("jenisTagihan/" + response._delegate._path.pieces_[1])
          .set(dataId);

        dispatchSuccess(dispatch, TAMBAH_JENIS_TAGIHAN, dataId);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_JENIS_TAGIHAN, error);
        alert(error);
      });
  };
};

export const getListTypeTagihan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JENIS_TAGIHAN);

    FIREBASE.database()
      .ref("jenisTagihan/")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JENIS_TAGIHAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JENIS_TAGIHAN, error);
        alert(error);
      });
  };
};

export const deleteTypeTagihan = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_JENIS_TAGIHAN);

    FIREBASE.database()
      .ref("jenisTagihan/" + id)
      .remove()
      .then(() => {
        dispatchSuccess(
          dispatch,
          DELETE_JENIS_TAGIHAN,
          "JENIS TAGIHAN BERHASIL DIHAPUS"
        );
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_JENIS_TAGIHAN, error);
        alert(error);
      });
  };
};

export const getDetailTypeTagihan = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JENIS_TAGIHAN);

    FIREBASE.database()
      .ref("jenisTagihan/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_JENIS_TAGIHAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_JENIS_TAGIHAN, error);
        alert(error);
      });
  };
};

export const updateTypeTagihan = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JENIS_TAGIHAN);

    const dataBaru = {
      namaJenisTagihan: data.namaJenisTagihan,
    };

    console.log("data :", data);

    FIREBASE.database()
      .ref("jenisTagihan/" + data.id)
      .update(dataBaru)
      .then((response) => {
        console.log("Action Update : ", response);
        dispatchSuccess(
          dispatch,
          UPDATE_JENIS_TAGIHAN,
          response ? response : []
        );
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_JENIS_TAGIHAN, error);
        alert(error);
      });
  };
};
