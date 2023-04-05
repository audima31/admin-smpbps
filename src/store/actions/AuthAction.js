import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";
import { error } from "jquery";

export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const REGISTER_ADMIN = "REGISTER_ADMIN";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";

export const loginUser = (email, password) => {
  return (dispatch) => {
    console.log("Masuk Action");
    dispatchLoading(dispatch, LOGIN_ADMIN);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Masuk ke sign");
        //Nyambungin ke Realtime database, ngecek ada gaa akunnya di realtime database
        FIREBASE.database()
          .ref(`users/${userCredential.user.uid}`)
          .once("value")
          .then((querySnapshot) => {
            console.log("Masuk sign 2", querySnapshot.val());
            // Signed in
            if (querySnapshot.val()) {
              if (querySnapshot.val().status === "admin") {
                //NGIRIM DATA KE LOCALSTORAGE
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(querySnapshot.val())
                );
                dispatchSuccess(dispatch, LOGIN_ADMIN, querySnapshot.val());
              } else if (querySnapshot.val().status === "siswa") {
                dispatchError(dispatch, LOGIN_ADMIN, error.message);
                Swal.fire("Failed", "Anda tidak memiliki hak akses", "error");
              } else {
                dispatchError(dispatch, LOGIN_ADMIN, error.message);
                Swal.fire(
                  "Failed",
                  "Email dan password tidak terdaftar",
                  "error"
                );
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_ADMIN, error.message);
            Swal.fire("Error", "Email dan password tidak terdaftar", "error");
          });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGIN_ADMIN, error.message);
        Swal.fire("Error", "Email dan password tidak terdaftar", "error");
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
          .ref("users/" + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_ADMIN, dataBaru);
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
        .ref("users/" + user.uid)
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
    dispatchLoading(dispatch, LOGOUT_ADMIN);

    FIREBASE.auth()
      .signOut()
      .then((res) => {
        //menghapus localStorage yang namanya user
        window.localStorage.removeItem("user");
        dispatchSuccess(dispatch, LOGOUT_ADMIN, res);
        Swal.fire("Berhasil Logout", "", "success");
        history.push({ pathname: "/login" });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGOUT_ADMIN, error.message);
        Swal.fire("Gagal!", error.message, "error");
      });
  };
};
