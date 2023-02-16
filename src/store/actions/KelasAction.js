import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_KELAS = "TAMBAH_KELAS";
export const GET_LIST_KELAS = "GET_LIST_KELAS";
export const GET_DETAIL_KELAS = "GET_DETAIL_KELAS";
export const UPDATE_KELAS = "UPDATE_KELAS";
export const DELETE_KELAS = "DELETE_KELAS";
export const TOTAL_KELAS = "TOTAL_KELAS";

export const tambahKelas = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_KELAS);

    const dataBaru = {
      namaKelas: data.namaKelas,
    };

    FIREBASE.database()
      .ref("kelas/")
      .push(dataBaru)
      .then((response) => {
        //AMBIL ID namaKelas
        console.log("ID : ", response._delegate._path.pieces_[1]);
        const dataId = {
          ...dataBaru,
          kelasId: response._delegate._path.pieces_[1],
        };

        //SIMPAN BARU
        FIREBASE.database()
          .ref("kelas/" + response._delegate._path.pieces_[1])
          .set(dataId);

        dispatchSuccess(dispatch, TAMBAH_KELAS, dataId);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_KELAS, error);
        alert(error);
      });
  };
};

export const getListKelas = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_KELAS);

    FIREBASE.database()
      .ref("kelas/")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_KELAS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_KELAS, error);
        alert(error);
      });
  };
};

export const getDetailKelas = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_KELAS);

    FIREBASE.database()
      .ref("kelas/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_KELAS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_KELAS, error);
        alert(error);
      });
  };
};

export const updateKelas = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_KELAS);

    const dataBaru = {
      namaKelas: data.namaKelas,
    };

    FIREBASE.database()
      .ref("kelas/" + data.id)
      .update(dataBaru)
      .then((response) => {
        console.log("Action Update : ", response);
        dispatchSuccess(dispatch, UPDATE_KELAS, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_KELAS, error);
        alert(error);
      });
  };
};

export const deleteKelas = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_KELAS);

    FIREBASE.database()
      .ref("kelas/" + id)
      .remove()
      .then(() => {
        dispatchSuccess(dispatch, DELETE_KELAS, "KELAS BERHASIL DIHAPUS");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_KELAS, error);
        alert(error);
      });
  };
};

export const totalKelas = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, TOTAL_KELAS);

    FIREBASE.database()
      .ref("kelas/")
      .once("value", (querySnapshot) => {
        var count = querySnapshot.numChildren();
        dispatchSuccess(dispatch, TOTAL_KELAS, count);
      })
      .catch((error) => {
        dispatchError(dispatch, TOTAL_KELAS, error);
      });
  };
};
