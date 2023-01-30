import FIREBASE from "config/FIREBASE";
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from "../../utils";

export const REGISTER_SISWA = "REGISTER_SISWA";
export const GET_LIST_SISWA = "GET_LIST_SISWA";

export const registerSiswa = (data) => {
  return (dispatch) => {
    console.log("data: ", data);
    dispatchLoading(dispatch, REGISTER_SISWA);

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
        FIREBASE.database()
          .ref("siswa/" + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_SISWA, dataBaru);

        //Local Storage (Async Storage)
        //nampung data, jadi kalo berhasil bakal bawa dataBaru
        //user ini cuman opsi nama storeData
        storeData("user", dataBaru);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, REGISTER_SISWA, error.message);

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
