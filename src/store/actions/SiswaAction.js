import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const GET_KELAS = "GET_KELAS";
export const GET_DETAIL_SISWA = "GET_DETAIL_SISWA";
export const UPDATE_SISWA = "UPDATE_SISWA";
export const DELETE_SISWA = "DELETE_SISWA";

//INI BIAR NAMPILIN NAMA KELAS DI GET LIST SISWA
export const getKelasSiswa = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_KELAS);

    FIREBASE.database()
      .ref("kelas/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_KELAS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_KELAS, error);
        alert(error);
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
