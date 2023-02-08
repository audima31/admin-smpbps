import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_TAGIHAN = "TAMBAH_TAGIHAN";
export const GET_LIST_TAGIHAN = "GET_LIST_TAGIHAN";
export const UPDATE_TAGIHAN = "UPDATE_TAGIHAN";
export const GET_DETAIL_TAGIHAN = "GET_DETAIL_TAGIHAN";
export const GET_DETAIL_SISWA_TAGIHAN = "GET_DETAIL_SISWA_TAGIHAN";
export const DELETE_TAGIHAN = "DELETE_TAGIHAN";
export const LUNAS_TAGIHAN = "LUNAS_TAGIHAN";

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
    console.log("data action : ", data);
    const detailTagihans = {
      nama: data.nama,
      kelas: data.kelas,
      jenisTagihan: data.jenisTagihan,
      nominal: data.nominal,
      waktu: new Date().toDateString(),
      keterangan: data.keterangan,
      bulan: data.bulan,
      tahun: data.tahun,
      status: data.status,
      tagihanDetailId: "",
    };

    FIREBASE.database()
      .ref("tagihans/" + data.nama)
      .child("detailTagihans")
      .push(detailTagihans)
      .then((response) => {
        console.log("Tagihan Id : ", response);

        //Menambah ID Tagihan pada data detailTagihans
        const tagihanDetailId = {
          tagihanDetailId: response._delegate._path.pieces_[3],
        };

        console.log("Data Lengkap : ", tagihanDetailId);

        //Simpan Id Tagihan
        FIREBASE.database()
          .ref("tagihans/" + data.nama)
          .child("detailTagihans")
          .child(response._delegate._path.pieces_[3])
          .update(tagihanDetailId)
          .then((response) => {
            console.log("SUKSES : ", response);
            dispatchSuccess(dispatch, TAMBAH_TAGIHAN, response ? response : []);
          });

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
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_TAGIHAN);

    //MENGHAPUS DATA DETAIL TAGIHAN
    FIREBASE.database()
      .ref("tagihans/" + namaSiswa.nama)
      .child("detailTagihans")
      .child(id)
      .remove()
      .then(() => {
        dispatchSuccess(dispatch, DELETE_TAGIHAN, "Tagihan Berhasil Dihapus");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_TAGIHAN, error);
        alert(error);
      });

    //NGECEK APA KAH TAGIHANNYA MASIH ADA APA BELOM
    FIREBASE.database()
      .ref("tagihans/" + namaSiswa.nama)
      .child("detailTagihans")
      .once("value", (querySnapshot) => {
        //KALO MISAL TAGIHANNYA UDAH GADA, MAKA HAPUS DATA SISWANYA DI TAGIHAN
        if (querySnapshot.val() === null) {
          FIREBASE.database()
            .ref("tagihans/")
            .child(namaSiswa.nama)
            .remove()
            .then(() => {
              dispatchSuccess(
                dispatch,
                DELETE_TAGIHAN,
                "Tagihan Berhasil Dihapus"
              );
            })
            .catch((error) => {
              dispatchError(dispatch, DELETE_TAGIHAN, error);
              alert(error);
            });
        }
      });
  };
};

export const lunasTagihan = (key, id, data) => {
  console.log("ACTION MASUK :", data, key, id);
  return (dispatch) => {
    dispatchLoading(dispatch, LUNAS_TAGIHAN);

    const dataBaru = {
      status: data.status,
    };

    FIREBASE.database()
      .ref("tagihans/" + key)
      .child("detailTagihans")
      .child(id)
      .update(dataBaru)
      .then((response) => {
        //Hasil
        console.log("SUKSES : ", response);
        dispatchSuccess(dispatch, LUNAS_TAGIHAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, LUNAS_TAGIHAN, error);
        alert(error);
      });
  };
};
