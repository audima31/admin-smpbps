import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_TAGIHAN = "TAMBAH_TAGIHAN";
export const GET_LIST_TAGIHAN = "GET_LIST_TAGIHAN";
export const UPDATE_TAGIHAN = "UPDATE_TAGIHAN";
export const GET_DETAIL_TAGIHAN = "GET_DETAIL_TAGIHAN";
export const GET_DETAIL_SISWA_TAGIHAN = "GET_DETAIL_SISWA_TAGIHAN";
export const DELETE_TAGIHAN = "DELETE_TAGIHAN";

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
      status: data.status,
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

//Update Tagihan
export const updateTagihan = (key, id, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_TAGIHAN);

    const dataBaru = {
      jenisTagihan: data.jenisTagihan,
      nominal: data.nominal,
      waktu: new Date().toDateString(),
      keterangan: data.keterangan,
      bulan: data.bulan,
      tahun: data.tahun,
      status: data.status,
    };

    FIREBASE.database()
      .ref("tagihans/" + key)
      .child("detailTagihans")
      .child(id)
      .update(dataBaru)
      .then((response) => {
        console.log("Data Update Action:", response);
        //Hasil
        dispatchSuccess(dispatch, UPDATE_TAGIHAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_TAGIHAN, error);
        alert(error);
      });
  };
};

//
export const getListTagihan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_TAGIHAN);

    FIREBASE.database()
      .ref("tagihans/")
      .once("value", (querySnapshot) => {
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

//BUAT NGAMBIL NAMA DAN KELAS
export const getDetailSiswaTagihan = (key) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_SISWA_TAGIHAN);

    FIREBASE.database()
      .ref("tagihans/" + key)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        console.log("data nama: ", data);
        dispatchSuccess(dispatch, GET_DETAIL_SISWA_TAGIHAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_SISWA_TAGIHAN, error);
        alert(error);
      });
  };
};

//BUAT NGAMBIL DATA DETAIL TAGIHANNYA
export const getDetailTagihan = (key, id, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TAGIHAN);

    FIREBASE.database()
      .ref("tagihans/" + key)
      .child("detailTagihans")
      .child(id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        console.log("data action: ", data);
        dispatchSuccess(dispatch, GET_DETAIL_TAGIHAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_TAGIHAN, error);
        alert(error);
      });
  };
};

//DELETE TAGIHAN
export const deleteTagihan = (namaSiswa, tagihanDetailSiswa, id) => {
  console.log("Delete Action : ", namaSiswa, tagihanDetailSiswa);
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_TAGIHAN);

    //NGECEK APA KAH TAGIHANNYA MASIH ADA APA BELOM

    //KALO TERNYATA SI SISWA NYA INI MASIH ADA TAGIHAN LAIN
    FIREBASE.database()
      .ref("tagihans/" + namaSiswa.nama)
      .child("detailTagihans")
      .child(id)
      .remove()
      .then((response) => {
        console.log("Data Delete Action:", response);
        dispatchSuccess(dispatch, DELETE_TAGIHAN, "Tagihan Berhasil Dihapus");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_TAGIHAN, error);
        alert(error);
      });

    FIREBASE.database()
      .ref("tagihans/" + namaSiswa.nama)
      .child("detailTagihans")
      .once("value", (querySnapshot) => {
        console.log("CEK DATA DI DELETE : ", querySnapshot.val());

        if (querySnapshot.val() === null) {
          FIREBASE.database()
            .ref("tagihans/")
            .child(namaSiswa.nama)
            .remove()
            .then((response) => {
              dispatchSuccess(dispatch, DELETE_TAGIHAN, "");
            })
            .catch((error) => {
              dispatchError(dispatch, DELETE_TAGIHAN, error);
              alert(error);
            });
        }
      });
    //HAPUS DATA TAGIHAN UTAMA BERDASRAKAN NAMA
  };
};
