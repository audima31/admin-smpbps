import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_SISWA = "TAMBAH_SISWA";
export const GET_LIST_SISWA = "GET_LIST_SISWA";
export const GET_DETAIL_SISWA = "GET_DETAIL_SISWA";
export const UPDATE_SISWA = "UPDATE_SISWA";
export const DELETE_SISWA = "DELETE_SISWA";
export const TOTAL_SISWA = "TOTAL_SISWA";

export const tambahSiswa = (data) => {
  return (dispatch) => {
    console.log("data: ", data);
    dispatchLoading(dispatch, TAMBAH_SISWA);

    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((success) => {
        console.log("SUKSES : ", success.user);
        // Ambil UID, dan buat DataBaru (data+uid)
        const dataBaru = {
          ...data,
          uid: success.user.uid,
        };

        //SIMPAN ke realTime Database Firebase
        FIREBASE.database().ref("siswa/").child(dataBaru.uid).set(dataBaru);

        //SUKSES
        dispatchSuccess(dispatch, TAMBAH_SISWA, dataBaru);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, TAMBAH_SISWA, error.message);

        alert(error.message);
        console.log("ERROR : ", error.message);
      });
  };
};

export const getListSiswa = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_SISWA);

    FIREBASE.database()
      .ref("siswa/")
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_LIST_SISWA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_SISWA, error);
        alert(error.message);
      });
  };
};

export const getDetailSiswa = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_SISWA);

    FIREBASE.database()
      .ref("siswa/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_SISWA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_SISWA, error);
        alert(error);
      });
  };
};

export const updateSiswa = (data) => {
  console.log("action : ", data);
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_SISWA);

    const dataBaru = {
      NIS: data.NIS,
      alamatRumah: data.alamatRumah,
      email: data.email,
      jenisKelamin: data.jenisKelamin,
      kelas: data.kelas,
      nama: data.nama,
      namaOrangTua: data.namaOrangTua,
      noHandphoneOrangTua: data.noHandphoneOrangTua,
      noHandphoneSiswa: data.noHandphoneSiswa,
    };

    FIREBASE.database()
      .ref("siswa/" + data.id)
      .update(dataBaru)
      .then((response) => {
        console.log("action : ", response);
        dispatchSuccess(dispatch, UPDATE_SISWA, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_SISWA, error);
        alert(error);
      });
  };
};

export const deleteSiswa = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_SISWA);

    FIREBASE.database()
      .ref("siswa/" + id)
      .remove()
      .then(() => {
        dispatchSuccess(dispatch, DELETE_SISWA, "SISWA BERHASIL DIHAPUS");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_SISWA, error);
        alert(error);
      });
  };
};

export const totalSiswa = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, TOTAL_SISWA);

    FIREBASE.database()
      .ref("siswa/")
      .once("value", (querySnapshot) => {
        var count = querySnapshot.numChildren();
        dispatchSuccess(dispatch, TOTAL_SISWA, count);
      })
      .catch((error) => {
        dispatchError(dispatch, TOTAL_SISWA, error);
      });
  };
};
