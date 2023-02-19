import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from "../../utils";

export const REGISTER_SISWA = "REGISTER_SISWA";
export const GET_LIST_SISWA = "GET_LIST_SISWA";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const REGISTER_ADMIN = "REGISTER_ADMIN";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT = "LOGOUT";

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

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_ADMIN);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Nyambungin ke Realtime database, ngecek ada gaa akunnya di realtime database
        FIREBASE.database()
          .ref(`admin/${userCredential.user.uid}`)
          .once("value")
          .then((userCredential) => {
            // Signed in
            if (userCredential.val()) {
              if (userCredential.val().status === "admin") {
                //NGIRIM DATA KE LOCALSTORAGE
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(userCredential.val())
                );
                dispatchSuccess(dispatch, LOGIN_ADMIN, userCredential.val());
              } else {
                dispatchError(
                  dispatch,
                  LOGIN_ADMIN,
                  "Anda tidak memiliki akses"
                );
                Swal.fire(
                  "Tidak Memiliki Akses",
                  "Anda tidak memiliki akses",
                  "error"
                );
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_ADMIN, error.message);
            Swal.fire("Error", error.message, "error");
          });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGIN_ADMIN, error.message);
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const registerAdmin = (data) => {
  return (dispatch) => {
    console.log("data: ", data);
    dispatchLoading(dispatch, REGISTER_ADMIN);

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
          .ref("admin/" + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_ADMIN, dataBaru);

        //Local Storage (Async Storage)
        //nampung data, jadi kalo berhasil bakal bawa dataBaru
        //user ini cuman opsi nama storeData
        storeData("user", dataBaru);
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, REGISTER_ADMIN, error.message);

        alert(error.message);
        console.log("ERROR : ", error.message);
      });
  };
};

export const checkLogin = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHECK_LOGIN);

    if (window.localStorage.getItem("user")) {
      const user = JSON.parse(window.localStorage.getItem("user"));

      FIREBASE.database()
        .ref("admin/" + user.uid)
        .once("value")
        .then((resDB) => {
          if (resDB.val()) {
            if (resDB.val().status === "admin") {
              dispatchSuccess(dispatch, CHECK_LOGIN, resDB.val());
            } else {
              dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin!");
              history.push({ pathname: "/login" });
            }
          } else {
            dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin!");
            history.push({ pathname: "/login" });
          }
        })
        .catch((error) => {
          dispatchError(dispatch, CHECK_LOGIN, error);
          history.push({ pathname: "/login" });
        });
    } else {
      dispatchError(dispatch, CHECK_LOGIN, "Belom login!");
      history.push({ pathname: "/login" });
    }
  };
};

export const logoutUser = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGOUT);

    FIREBASE.auth()
      .signOut()
      .then((res) => {
        //menghapus localStorage yang namanya user
        window.localStorage.removeItem("user");
        dispatchSuccess(dispatch, LOGOUT, res);
        Swal.fire("Berhasil Logout", "", "success");
        history.push({ pathname: "/login" });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGOUT, error.message);
        Swal.fire("Gagal!", error.message, "error");
      });
  };
};
