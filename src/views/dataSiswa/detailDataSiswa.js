import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getListKelas } from "store/actions/KelasAction";
import {
  deleteTagihanLunas,
  listPembayaranSiswa,
} from "store/actions/PaymentAction";
import { getDetailSiswa } from "store/actions/SiswaAction";
import {
  deleteTagihan,
  getListTagihanSiswaById,
} from "store/actions/TagihanAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";
class detailDataSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idSiswa: this.props.match.params.id,
    };
  }

  componentDidMount() {
    const { idSiswa } = this.state;
    this.props.dispatch(getDetailSiswa(idSiswa));
    this.props.dispatch(getListTagihanSiswaById(idSiswa));
    this.props.dispatch(getListKelas());
    this.props.dispatch(listPembayaranSiswa());
  }

  componentDidUpdate(prevProps) {
    const { idSiswa } = this.state;
    console.log("ID SISWA : ", idSiswa);
    const { deleteTagihanResult, deleteTagihanLunasResult } = this.props;
    if (
      deleteTagihanResult &&
      prevProps.deleteTagihanResult !== deleteTagihanResult
    ) {
      this.props.dispatch(getDetailSiswa(idSiswa));
      this.props.dispatch(getListTagihanSiswaById(idSiswa));
    }

    if (
      deleteTagihanLunasResult &&
      prevProps.deleteTagihanLunasResult !== deleteTagihanLunasResult
    ) {
      this.props.dispatch(getDetailSiswa(idSiswa));
      this.props.dispatch(listPembayaranSiswa());
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      detailSiswaResult,
      detailSiswaLoading,
      getListTagihanSiswaByIdResult,
      getListKelasResult,
      deleteTagihanLoading,
      listPembayaranSiswaResult,
      deleteTagihanLunasLoading,
    } = this.props;
    return (
      <div className="content">
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.handleBack}
          >
            <i className="bi bi-caret-left-fill"> </i>
            Kembali
          </button>
        </div>

        <div className="card">
          {detailSiswaResult ? (
            <>
              <div className=" ps-4 pe-4">
                <h5 className="mt-4 ml-3 text-dark fw-bold">
                  {detailSiswaResult.nama} {""}
                  <label>( {detailSiswaResult.NIS} )</label>
                </h5>
                <hr></hr>
              </div>

              <div className="ps-4 ml-3 pe-4">
                <div className="row">
                  <div className="col-3">
                    <p>Kelas</p>
                    <p>Jenis Kelamin</p>
                    <p>Email</p>
                    <p>No Handphone</p>
                    <p>Alamat</p>
                    <p>Nama Orang Tua</p>
                    <p>No Handphone Orang Tua</p>
                  </div>
                  <div className="col">
                    <p>
                      :{" "}
                      {getListKelasResult ? (
                        Object.keys(getListKelasResult).map((id) => {
                          return (
                            <>
                              {detailSiswaResult.kelas ===
                              getListKelasResult[id].kelasId ? (
                                <>{getListKelasResult[id].namaKelas}</>
                              ) : (
                                <> </>
                              )}
                            </>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>: {detailSiswaResult.jenisKelamin}</p>
                    <p>: {detailSiswaResult.email}</p>
                    <p>: {detailSiswaResult.noHandphoneSiswa}</p>
                    <p>
                      :{" "}
                      {detailSiswaResult.alamatRumah
                        ? detailSiswaResult.alamatRumah
                        : " - "}
                    </p>
                    <p>
                      :{" "}
                      {detailSiswaResult.namaOrangTua
                        ? detailSiswaResult.namaOrangTua
                        : " - "}
                    </p>
                    <p>
                      :{" "}
                      {detailSiswaResult.noHandphoneOrangTua
                        ? detailSiswaResult.noHandphoneOrangTua
                        : " - "}
                    </p>
                  </div>
                </div>
                <hr></hr>

                {/* Info Tagihan */}
                <div>
                  <h5 className=" mt-4 ml-3 text-dark fw-bold">Info Tagihan</h5>

                  {/* Table */}
                  <table className="table table-striped text-center">
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">Tanggal Penagihan</th>
                        <th scope="col">Jenis Tagihan</th>
                        <th scope="col">Nominal</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Status</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListTagihanSiswaByIdResult ? (
                        Object.keys(getListTagihanSiswaByIdResult).map(
                          (key) => {
                            const removeDataTagihan = (id) => {
                              Swal.fire({
                                title: "Apakah anda yakin?",
                                text: `menghapus tagihan "${getListTagihanSiswaByIdResult[key].nama} - ${getListTagihanSiswaByIdResult[key].jenisTagihan}"`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Iya, hapus data tagihan!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    "Deleted!",
                                    `Data tagihan "${getListTagihanSiswaByIdResult[key].nama} - ${getListTagihanSiswaByIdResult[key].jenisTagihan}" berhasil dihapus.`,
                                    "success"
                                  );
                                  this.props.dispatch(deleteTagihan(id));
                                }
                              });
                            };

                            const tagihanObj = moment(
                              getListTagihanSiswaByIdResult[key].waktuTagihan
                            );
                            const hariTagihan = tagihanObj.format("DD");
                            const bulanTagihan = tagihanObj.format("MM");
                            const tahunTagihan = tagihanObj.year();

                            console.log("Waktu Tagihan : ", tagihanObj);
                            return (
                              <>
                                <tr id={key}>
                                  <td>
                                    {`${hariTagihan} ${
                                      bulanTagihan === "01"
                                        ? "Januari"
                                        : bulanTagihan === "02"
                                        ? "Februari"
                                        : bulanTagihan === "03"
                                        ? "Maret"
                                        : bulanTagihan === "04"
                                        ? "April"
                                        : bulanTagihan === "05"
                                        ? "Mei"
                                        : bulanTagihan === "06"
                                        ? "Juni"
                                        : bulanTagihan === "07"
                                        ? "Juli"
                                        : bulanTagihan === "08"
                                        ? "Agustus"
                                        : bulanTagihan === "09"
                                        ? "September"
                                        : bulanTagihan === "10"
                                        ? "Oktober"
                                        : bulanTagihan === "11"
                                        ? "November"
                                        : bulanTagihan === "12"
                                        ? "Desember"
                                        : "error"
                                    } ${tahunTagihan}`}
                                  </td>

                                  <td>
                                    {
                                      getListTagihanSiswaByIdResult[key]
                                        .jenisTagihan
                                    }
                                  </td>

                                  <td>
                                    Rp.{" "}
                                    {numberWithCommas(
                                      getListTagihanSiswaByIdResult[key].nominal
                                    )}
                                  </td>

                                  <td>
                                    {
                                      getListTagihanSiswaByIdResult[key]
                                        .keterangan
                                    }
                                  </td>

                                  <td>
                                    {getListTagihanSiswaByIdResult[key]
                                      .status === "PENDING" ? (
                                      <p className="badge bg-warning p-2 my-1 ">
                                        {
                                          getListTagihanSiswaByIdResult[key]
                                            .status
                                        }
                                      </p>
                                    ) : getListTagihanSiswaByIdResult[key]
                                        .status === "BELUM DIBAYAR" ? (
                                      <p className="badge bg-danger p-2 my-1  ">
                                        {
                                          getListTagihanSiswaByIdResult[key]
                                            .status
                                        }
                                      </p>
                                    ) : (
                                      <>Data tidak ditemukan</>
                                    )}
                                  </td>

                                  {/* Button */}
                                  <td>
                                    <a
                                      {...this.props}
                                      href={"/admin/tagihan/detail/" + key}
                                      class="btn btn-primary mr-2 "
                                    >
                                      Detail
                                    </a>
                                    <a
                                      {...this.props}
                                      href={"/admin/tagihan/edit/" + key}
                                      class="btn btn-warning "
                                    >
                                      Edit
                                    </a>
                                    {deleteTagihanLoading ? (
                                      <button
                                        type="submit"
                                        className="btn btn-danger ml-2"
                                      >
                                        <div
                                          class="spinner-border text-light"
                                          role="status"
                                        >
                                          <span class="visually-hidden"></span>
                                        </div>
                                      </button>
                                    ) : (
                                      <button
                                        type="submit"
                                        className="btn btn-danger ml-2"
                                        onClick={() => removeDataTagihan(key)}
                                      >
                                        <i className="nc-icon nc-basket"></i>{" "}
                                        Hapus
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              </>
                            );
                          }
                        )
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            Data Kosong
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <hr />

                {/* Info Pembayaran */}
                <div>
                  <h5 className=" mt-5 ml-3 text-dark fw-bold">
                    Info Pembayaran
                  </h5>

                  {/* Table */}
                  <table className="table table-striped text-center">
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">Tanggal Pembayaran</th>
                        <th scope="col">Jenis Tagihan</th>
                        <th scope="col">Nominal</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Status</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listPembayaranSiswaResult ? (
                        Object.keys(listPembayaranSiswaResult).map((key) => {
                          const removeDataPembayaran = (id) => {
                            Swal.fire({
                              title: "Apakah anda yakin?",
                              text: `menghapus proses pembayaran "${listPembayaranSiswaResult[key].nama} - ${listPembayaranSiswaResult[key].jenisTagihan}"`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText:
                                "Iya, hapus proses pembayaran!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "Deleted!",
                                  `Data proses pembayaran "${listPembayaranSiswaResult[key].nama} - ${listPembayaranSiswaResult[key].jenisTagihan}" berhasil dihapus.`,
                                  "success"
                                );
                                this.props.dispatch(deleteTagihanLunas(id));
                              }
                            });
                          };

                          const pembayaranObj = moment(
                            listPembayaranSiswaResult[key].waktuPembayaran
                          );
                          const hariPembayaran = pembayaranObj.format("DD");
                          const bulanPembayaran = pembayaranObj.format("MM");
                          const tahunPembayaran = pembayaranObj.year();

                          console.log("Waktu bayar", pembayaranObj);

                          return (
                            <>
                              {listPembayaranSiswaResult[key].idSiswa ===
                              detailSiswaResult.uid ? (
                                <>
                                  <tr id={key}>
                                    <td>
                                      {`${hariPembayaran} ${
                                        bulanPembayaran === "01"
                                          ? "Januari"
                                          : bulanPembayaran === "02"
                                          ? "Februari"
                                          : bulanPembayaran === "03"
                                          ? "Maret"
                                          : bulanPembayaran === "04"
                                          ? "April"
                                          : bulanPembayaran === "05"
                                          ? "Mei"
                                          : bulanPembayaran === "06"
                                          ? "Juni"
                                          : bulanPembayaran === "07"
                                          ? "Juli"
                                          : bulanPembayaran === "08"
                                          ? "Agustus"
                                          : bulanPembayaran === "09"
                                          ? "September"
                                          : bulanPembayaran === "10"
                                          ? "Oktober"
                                          : bulanPembayaran === "11"
                                          ? "November"
                                          : bulanPembayaran === "12"
                                          ? "Desember"
                                          : "error"
                                      } ${tahunPembayaran}`}
                                    </td>

                                    <td>
                                      {
                                        listPembayaranSiswaResult[key]
                                          .jenisTagihan
                                      }
                                    </td>

                                    <td>
                                      Rp.{" "}
                                      {numberWithCommas(
                                        listPembayaranSiswaResult[key].nominal
                                      )}
                                    </td>

                                    <td>
                                      {
                                        listPembayaranSiswaResult[key]
                                          .keterangan
                                      }
                                    </td>

                                    <td>
                                      {listPembayaranSiswaResult[key].status ===
                                      "PENDING" ? (
                                        <p className="badge bg-warning p-2 my-1 ">
                                          {
                                            listPembayaranSiswaResult[key]
                                              .status
                                          }
                                        </p>
                                      ) : listPembayaranSiswaResult[key]
                                          .status === "LUNAS" ? (
                                        <p className="badge bg-success p-2 my-1 ">
                                          {
                                            listPembayaranSiswaResult[key]
                                              .status
                                          }
                                        </p>
                                      ) : (
                                        <>Data tidak ditemukan</>
                                      )}
                                    </td>

                                    {/* Button */}
                                    <td>
                                      <a
                                        {...this.props}
                                        href={
                                          "/admin/listPembayaranLunas/detail/" +
                                          key
                                        }
                                        class="btn btn-primary mr-2 "
                                      >
                                        Detail
                                      </a>

                                      {listPembayaranSiswaResult[key].status ===
                                      "LUNAS" ? (
                                        <></>
                                      ) : (
                                        <>
                                          {deleteTagihanLunasLoading ? (
                                            <button
                                              type="submit"
                                              className="btn btn-danger ml-2"
                                            >
                                              <div
                                                class="spinner-border text-light"
                                                role="status"
                                              >
                                                <span class="visually-hidden"></span>
                                              </div>
                                            </button>
                                          ) : (
                                            <button
                                              type="submit"
                                              className="btn btn-danger ml-2"
                                              onClick={() =>
                                                removeDataPembayaran(key)
                                              }
                                            >
                                              <i className="nc-icon nc-basket"></i>{" "}
                                              Hapus
                                            </button>
                                          )}
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            Data Kosong
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : detailSiswaLoading ? (
            <>
              <div className="vstack gap-2 col-md-5 mx-auto">
                <button type="submit" className="btn btn btn-link" disabled>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailSiswaLoading: state.SiswaReducer.detailSiswaLoading,
  detailSiswaResult: state.SiswaReducer.detailSiswaResult,
  detailSiswaError: state.SiswaReducer.detailSiswaError,

  getListTagihanSiswaByIdLoading:
    state.TagihanReducer.getListTagihanSiswaByIdLoading,
  getListTagihanSiswaByIdResult:
    state.TagihanReducer.getListTagihanSiswaByIdResult,
  getListTagihanSiswaByIdError:
    state.TagihanReducer.getListTagihanSiswaByIdError,

  getListKelasResult: state.KelasReducer.getListKelasResult,

  deleteTagihanLoading: state.TagihanReducer.deleteTagihanLoading,
  deleteTagihanResult: state.TagihanReducer.deleteTagihanResult,
  deleteTagihanError: state.TagihanReducer.deleteTagihanError,

  listPembayaranSiswaLoading: state.PaymentReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.PaymentReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.PaymentReducer.listPembayaranSiswaError,

  deleteTagihanLunasLoading: state.PaymentReducer.deleteTagihanLunasLoading,
  deleteTagihanLunasResult: state.PaymentReducer.deleteTagihanLunasResult,
  deleteTagihanLunasError: state.PaymentReducer.deleteTagihanLunasError,
});

export default connect(mapStateToProps, null)(detailDataSiswa);
