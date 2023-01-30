import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_TAGIHAN = "TAMBAH_TAGIHAN";
export const GET_LIST_TAGIHAN = "GET_LIST_TAGIHAN";

export const tambahTagihan = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_TAGIHAN);

    //Tambah Tagihan
    FIREBASE.database()
      .ref("tagihans/" + data.nama)
      .once("value", (querySnapshot) => {
        if (querySnapshot.val()) {
          const tagihanUtama = querySnapshot.val();
          FIREBASE.database()
            .ref("tagihans")
            .child(data.nama)
            .update(tagihanUtama)
            .then((response) => {
              dispatch(tagihanDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_TAGIHAN, error);
              alert(error);
            });
        } else {
          //Data belom ada
          const tagihanUtama = {
            nama: data.nama,
            kelas: data.kelas,
          };
          //SIMPAN KE FIREBASE
          FIREBASE.database()
            .ref("tagihans")
            .child(data.nama)
            .set(tagihanUtama)
            .then((response) => {
              //Simpan ke tagihan detail
              dispatch(tagihanDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_TAGIHAN, error);
              alert(error);
            });
        }
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_TAGIHAN, error);
        alert(error);
      });
  };
};

export const tagihanDetail = (data) => {
  return (dispatch) => {
    const detailTagihans = {
      jenisTagihan: data.jenisTagihan,
      nominal: data.nominal,
      waktu: new Date().toDateString(),
      keterangan: data.keterangan,
      bulan: data.bulan,
      tahun: data.tahun,
      status: data.statusPembayaran,
    };

    FIREBASE.database()
      .ref("tagihans/" + data.nama)
      .child("detailTagihans")
      .push(detailTagihans)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_TAGIHAN, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_TAGIHAN, error);
        alert(error);
      });
  };
};
// -- END TAMBAH TAGIHAN --

export const getListTagihan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_TAGIHAN);

    FIREBASE.database()
      .ref("tagihans/")
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());
        //hasil
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, GET_LIST_TAGIHAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_TAGIHAN, error);
        alert(error);
      });
  };
};
