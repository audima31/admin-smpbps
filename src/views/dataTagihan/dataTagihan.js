import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import { getListSiswa } from "store/actions/AuthAction";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListKelas } from "store/actions/KelasAction";
import { deleteTagihan, getListTagihan } from "store/actions/TagihanAction";
import Swal from "sweetalert2";

class dataTagihan extends Component {
  componentDidMount() {
    this.props.dispatch(getListTagihan());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListTypeTagihan());
  }

  removeData = (namaSiswa, tagihanDetailSiswa, id) => {
    this.props.dispatch(deleteTagihan(namaSiswa, tagihanDetailSiswa, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteTagihanResult } = this.props;
    if (
      deleteTagihanResult &&
      prevProps.deleteTagihanResult !== deleteTagihanResult
    ) {
      Swal.fire("Success", "Berhasil Dihapus", "success");
      this.props.dispatch(getListTagihan());
    }
  }

  render() {
    const {
      getListTagihanResult,
      getListTagihanLoading,
      getListTagihanError,
      getListKelasResult,
      getListSiswaResult,
      getListJenisTagihanResult,
      deleteTagihanLoading,
    } = this.props;
    return (
      <div className="content">
        <div className="row">
          <div className="col">
            <Link
              to="/admin/tagihan/tambah"
              className="btn btn-primary float-left"
            >
              + Tambah Tagihan Baru
            </Link>
            <Link
              to="/admin/jenistagihan"
              class="btn btn-primary float-left ml-3"
            >
              Tambah Jenis Tagihan
            </Link>
          </div>
        </div>

        <div className="col card">
          <Table striped className="text-center table-hover">
            <thead className="text-primary">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Kelas</th>
                <th scope="col">Tagihan</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getListTagihanResult ? (
                Object.keys(getListTagihanResult).map((key) => {
                  return (
                    <>
                      {getListTagihanResult[key].detailTagihans ? (
                        Object.keys(
                          getListTagihanResult[key].detailTagihans
                        ).map((id, index) => {
                          const namaSiswa = getListTagihanResult[key];
                          const tagihanDetailSiswa =
                            getListTagihanResult[key].detailTagihans[id];

                          console.log("nama Siswa", namaSiswa);
                          console.log(
                            "tagihanDetailSiswa ",
                            tagihanDetailSiswa
                          );

                          return (
                            <tr>
                              <td>{index + 1 + "."}</td>
                              <td>
                                {
                                  getListTagihanResult[key].detailTagihans[id]
                                    .waktu
                                }
                              </td>
                              <td>
                                {getListSiswaResult ? (
                                  Object.keys(getListSiswaResult).map((id) => {
                                    return (
                                      <>
                                        {getListSiswaResult[id].uid ===
                                        getListTagihanResult[key].nama
                                          ? getListSiswaResult[id].nama
                                          : []}
                                      </>
                                    );
                                  })
                                ) : (
                                  <>Nama Siswa Tidak Ditemukan</>
                                )}
                              </td>
                              <td>
                                {getListKelas ? (
                                  Object.keys(getListKelasResult).map((id) => {
                                    return (
                                      <>
                                        {getListKelasResult[id].kelasId ===
                                        getListTagihanResult[key].kelas
                                          ? getListKelasResult[id].namaKelas
                                          : []}
                                      </>
                                    );
                                  })
                                ) : (
                                  <p>Kelas Tidak Ditemukan</p>
                                )}
                              </td>
                              <td>
                                {getListJenisTagihanResult ? (
                                  Object.keys(getListJenisTagihanResult).map(
                                    (x) => {
                                      return (
                                        <>
                                          {getListJenisTagihanResult[x]
                                            .jenisTagihanId ===
                                          getListTagihanResult[key]
                                            .detailTagihans[id].jenisTagihan
                                            ? getListJenisTagihanResult[x]
                                                .namaJenisTagihan
                                            : []}
                                        </>
                                      );
                                    }
                                  )
                                ) : (
                                  <p>Tidak Ditermukan</p>
                                )}
                              </td>
                              <td>
                                {getListTagihanResult[key].detailTagihans[id]
                                  .status === "PENDING" ? (
                                  <p className="badge bg-warning text-wrap p-2 my-1">
                                    {
                                      getListTagihanResult[key].detailTagihans[
                                        id
                                      ].status
                                    }
                                  </p>
                                ) : getListTagihanResult[key].detailTagihans[id]
                                    .status === "BELUM DIBAYAR" ? (
                                  <p className="badge bg-danger text-wrap px-3 py-2 my-1">
                                    {
                                      getListTagihanResult[key].detailTagihans[
                                        id
                                      ].status
                                    }
                                  </p>
                                ) : (
                                  <p className="badge bg-success text-wrap px-3 py-2 my-1">
                                    {
                                      getListTagihanResult[key].detailTagihans[
                                        id
                                      ].status
                                    }
                                  </p>
                                )}
                              </td>
                              {/* BUTTON */}

                              <td>
                                {getListTagihanResult[key].detailTagihans[id]
                                  .status === "LUNAS" ? (
                                  <>
                                    <p></p>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      {...this.props}
                                      href={
                                        "/admin/tagihan/detail/" +
                                        key +
                                        "/" +
                                        id
                                      }
                                      class="btn btn-primary mr-2 "
                                    >
                                      Detail
                                    </a>

                                    <a
                                      {...this.props}
                                      href={
                                        "/admin/tagihan/edit/" + key + "/" + id
                                      }
                                      class="btn btn-warning "
                                    >
                                      Edit
                                    </a>

                                    {deleteTagihanLoading ? (
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
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
                                          this.removeData(
                                            namaSiswa,
                                            tagihanDetailSiswa,
                                            id
                                          )
                                        }
                                      >
                                        <i className="nc-icon nc-basket"></i>{" "}
                                        Hapus
                                      </button>
                                    )}
                                  </>
                                )}
                              </td>
                              {/* END BUTTON */}
                            </tr>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })
              ) : getListTagihanLoading ? (
                <tr>
                  <td colSpan="7" align="center">
                    <Spinner color="primary">Loading...</Spinner>
                  </td>
                </tr>
              ) : getListTagihanError ? (
                <tr>
                  <td colSpan="7" align="center">
                    {getListTagihanError}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7" align="center">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListTagihanLoading: state.TagihanReducer.getListTagihanLoading,
  getListTagihanResult: state.TagihanReducer.getListTagihanResult,
  getListTagihanError: state.TagihanReducer.getListTagihanError,

  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListSiswaResult: state.AuthReducer.getListSiswaResult,
  getListKelasResult: state.KelasReducer.getListKelasResult,

  deleteTagihanLoading: state.TagihanReducer.deleteTagihanLoading,
  deleteTagihanResult: state.TagihanReducer.deleteTagihanResult,
  deleteTagihanError: state.TagihanReducer.deleteTagihanError,
});

export default connect(mapStateToProps, null)(dataTagihan);
