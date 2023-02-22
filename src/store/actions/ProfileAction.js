import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from "../../utils";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

export const updateProfile = (data) => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, UPDATE_PROFILE);

    const dataBaru = {
      NBM: data.NBM,
      uid: data.uid,
      nama: data.nama,
      email: data.email,
    };

    FIREBASE.database()
      .ref("admin/" + dataBaru.uid)
      .update(dataBaru)
      .then((response) => {
        //SUKSES
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : []);
        //local Storage (Async Storage)
        storeData("user", dataBaru);
      })
      .catch((error) => {
        //ERROR
        dispatchError(dispatch, UPDATE_PROFILE, error.message);
        alert("error", error.message);
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHANGE_PASSWORD);

    //Cek dulu apakah benar email & password lama (login)
    FIREBASE.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        //jika sukses maka update password
        var user = FIREBASE.auth().currentUser;

        user
          .updatePassword(data.newPassword)
          .then(function () {
            // Update successful.

            FIREBASE.database()
              .ref("admin/")
              .child(data.uid)
              .once("value", (querySnapshot) => {
                let res = querySnapshot.val();
                console.log("data siswa : ", res.password);
                if (res) {
                  FIREBASE.database()
                    .ref("admin/")
                    .child(data.uid)
                    .update({
                      password: `${data.newPassword}`,
                    })
                    .then((response) => {
                      console.log("Berhasil", response);
                    })
                    .catch((error) => {
                      console.log("Gagal", error);
                    });
                }
              })
              .catch((error) => {
                console.log("error", error);
              });

            dispatchSuccess(dispatch, CHANGE_PASSWORD, "Sukses Ganti Password");
          })
          .catch(function (error) {
            // An error happened.
            // ERROR
            dispatchError(dispatch, CHANGE_PASSWORD, error.message);

            alert(error.message);
          });
      })
      .catch((error) => {
        // ERROR
        dispatchError(dispatch, CHANGE_PASSWORD, error.message);

        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };
};
