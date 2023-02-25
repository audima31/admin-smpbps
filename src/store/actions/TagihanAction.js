import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const TAMBAH_TAGIHAN = "TAMBAH_TAGIHAN";
export const GET_LIST_TAGIHAN = "GET_LIST_TAGIHAN";
export const UPDATE_TAGIHAN = "UPDATE_TAGIHAN";
export const GET_DETAIL_TAGIHAN = "GET_DETAIL_TAGIHAN";
export const GET_DETAIL_SISWA_TAGIHAN = "GET_DETAIL_SISWA_TAGIHAN";
export const DELETE_TAGIHAN = "DELETE_TAGIHAN";
export const LUNAS_TAGIHAN = "LUNAS_TAGIHAN";
export const GET_LIST_TAGIHAN_SISWA_BY_ID = "GET_LIST_TAGIHAN_SISWA_BY_ID";

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

//Ini masih bagian dari tambah tagihan
export const tagihanDetail = (data) => {
  return (dispatch) => {
    console.log("data action : ", data);
    const detailTagihans = {
      nama: data.nama,
      kelas: data.kelas,
      jenisTagihan: data.jenisTagihan,
      nominal: data.nominal,
      waktuTagihan: new Date().toDateString(),
      keterangan: data.keterangan,
      bulan: data.bulan,
      tahun: data.tahun,
      status: data.status,
      penagih: data.penagih,
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
      waktuTagihan: new Date().toDateString(),
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

//Untuk Data Tagihan Page
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

export const getListTagihan2 = (key, id) => {
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

//Mengganti status tagihan menjadi lunas
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
        FIREBASE.database()
          .ref("tagihans/" + key)
          .child("detailTagihans")
          .child(id)
          .once("value", (querySnapshot) => {
            const dataTagihans = querySnapshot.val();

            //Ini ngambil data dari tagihan, terus ditaruh ke riwayats
            const dataRiwayats = { ...dataTagihans };
            dataRiwayats.url = "PEMBAYARAN TUNAI";
            dataRiwayats.order_id = new Date().getTime() + "-" + key;
            dataRiwayats.waktuPembayaran = new Date().toString();
            dataRiwayats.waktuPembayaran2 = new Date().toDateString();
            dataRiwayats.metodePembayaran = "Tunai";

            FIREBASE.database()
              .ref("riwayats")
              .child(dataRiwayats.order_id)
              .set(dataRiwayats)
              .then((response) => {
                console.log("Nambah data riwayats");
                dispatchSuccess(
                  dispatch,
                  LUNAS_TAGIHAN,
                  response ? response : []
                );

                //Mengecek data 'riwayats/'
                FIREBASE.database()
                  .ref("riwayats/")
                  .child(dataRiwayats.order_id)
                  .once("value", (querySnapshot) => {
                    let data = querySnapshot.val();
                    console.log("Cek data riwayats : ", data.status);
                    //MEMBUAT TABLE BARU, DENGAN NAMA tagihanLunas
                    if (data.status === "LUNAS") {
                      FIREBASE.database()
                        .ref("tagihanLunas")
                        .child(dataRiwayats.order_id)
                        .set(data)
                        .then((response) => {});
                    }
                  })
                  .catch((error) => {
                    alert(error);
                  });
              });

            //Menghapus data lunas yang ada di tagihans
            console.log("status data : ", dataTagihans.status);
            if (dataTagihans.status === "LUNAS") {
              console.log("IFELSE pengahpusan");
              FIREBASE.database()
                .ref("tagihans/" + key)
                .child("detailTagihans")
                .child(id)
                .remove()
                .then(() => {})
                .catch((error) => {});
            } else {
            }
          });

        //Kalo di detailTagihans nya udah gada data, maka dihapus
        FIREBASE.database()
          .ref("tagihans/" + key)
          .child("detailTagihans")
          .once("value", (querySnapshot) => {
            //KALO MISAL TAGIHANNYA UDAH GADA, MAKA HAPUS DATA SISWANYA DI TAGIHAN
            if (querySnapshot.val() === null) {
              FIREBASE.database()
                .ref("tagihans/")
                .child(key)
                .remove()
                .then(() => {
                  console.log("Data dihapus");
                });
            }
          });
        //Hasil
      })
      .catch((error) => {
        dispatchError(dispatch, LUNAS_TAGIHAN, error);
        alert(error);
      });
  };
};

//Untuk detail siswa pages
export const getListTagihanSiswaById = (id) => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, GET_LIST_TAGIHAN_SISWA_BY_ID);

    FIREBASE.database()
      .ref("tagihans/" + id)
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val();

        console.log("Data Keranjang Action : ", data);

        if (data) {
          dispatchSuccess(
            dispatch,
            GET_LIST_TAGIHAN_SISWA_BY_ID,
            data ? data : []
          );
        } else {
          dispatchError(dispatch, GET_LIST_TAGIHAN_SISWA_BY_ID, "");
        }
      })
      .catch((error) => {
        //KALO TERJADI ERROR
        dispatchError(dispatch, GET_LIST_TAGIHAN_SISWA_BY_ID, error);

        alert(error.message);
      });
  };
};
