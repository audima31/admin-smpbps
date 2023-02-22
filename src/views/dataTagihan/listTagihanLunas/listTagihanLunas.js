import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import { getListSiswa } from "store/actions/AuthAction";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListKelas } from "store/actions/KelasAction";
import { deleteTagihanLunas } from "store/actions/TagihanAction";
import { listPembayaranSiswa } from "store/actions/TagihanAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";

class listTagihanLunas extends Component {
  componentDidMount() {
    this.props.dispatch(listPembayaranSiswa());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListTypeTagihan());
  }

  removeData = (id) => {
    this.props.dispatch(deleteTagihanLunas(id));
  };

  componentDidUpdate(prevProps) {
    const { deleteTagihanLunasResult } = this.props;
    if (
      deleteTagihanLunasResult &&
      prevProps.deleteTagihanLunasResult !== deleteTagihanLunasResult
    ) {
      Swal.fire("Success", "Berhasil Dihapus", "success");
      this.props.dispatch(listPembayaranSiswa());
    }
  }

  render() {
    const {
      listPembayaranSiswaResult,
      listPembayaranSiswaLoading,
      listPembayaranSiswaError,
      getListKelasResult,
      getListSiswaResult,
      getListJenisTagihanResult,
      deleteTagihanLunasLoading,
    } = this.props;
    return (
      <div className="content">
        <div className="row">
          <div className="col">
            <Link to="/admin/tagihan" className="btn btn-secondary float-left">
              <i className="bi bi-caret-left-fill"> </i>
              Kembali
            </Link>
          </div>
        </div>

        <div className="col card">
          <Table striped className="text-center table-hover">
            <thead className="text-primary">
              <tr>
                <th scope="col">Tanggal</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Kelas</th>
                <th scope="col">Tagihan</th>
                <th scope="col">Nominal</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listPembayaranSiswaResult ? (
                Object.keys(listPembayaranSiswaResult).map((key) => {
                  return (
                    <tr>
                      <td>{listPembayaranSiswaResult[key].waktuTagihan}</td>
                      <td>
                        {getListSiswaResult ? (
                          Object.keys(getListSiswaResult).map((id) => {
                            return (
                              <>
                                {getListSiswaResult[id].uid ===
                                listPembayaranSiswaResult[key].nama
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
                                listPembayaranSiswaResult[key].kelas
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
                          Object.keys(getListJenisTagihanResult).map((x) => {
                            return (
                              <>
                                {getListJenisTagihanResult[x].jenisTagihanId ===
                                listPembayaranSiswaResult[key].jenisTagihan
                                  ? getListJenisTagihanResult[x]
                                      .namaJenisTagihan
                                  : []}
                              </>
                            );
                          })
                        ) : (
                          <p>Tidak Ditermukan</p>
                        )}
                      </td>
                      <td>
                        Rp.{" "}
                        {numberWithCommas(
                          listPembayaranSiswaResult[key].nominal
                        )}
                      </td>
                      <td>
                        {listPembayaranSiswaResult[key].status === "PENDING" ? (
                          <p className="badge bg-warning text-wrap p-2 my-1">
                            {listPembayaranSiswaResult[key].status}
                          </p>
                        ) : listPembayaranSiswaResult[key].status ===
                          "BELUM DIBAYAR" ? (
                          <p className="badge bg-danger text-wrap px-3 py-2 my-1">
                            {listPembayaranSiswaResult[key].status}
                          </p>
                        ) : (
                          <p className="badge bg-success text-wrap px-3 py-2 my-1">
                            {listPembayaranSiswaResult[key].status}
                          </p>
                        )}
                      </td>
                      {/* BUTTON */}

                      <td>
                        <>
                          <a
                            {...this.props}
                            href={"/admin/listPembayaranLunas/detail/" + key}
                            class="btn btn-primary mr-2 "
                          >
                            Detail
                          </a>

                          {listPembayaranSiswaResult[key].status === "LUNAS" ? (
                            <></>
                          ) : (
                            <>
                              {deleteTagihanLunasLoading ? (
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
                                  onClick={() => this.removeData(key)}
                                >
                                  <i className="nc-icon nc-basket"></i> Hapus
                                </button>
                              )}
                            </>
                          )}
                        </>
                      </td>
                      {/* END BUTTON */}
                    </tr>
                  );
                })
              ) : listPembayaranSiswaLoading ? (
                <tr>
                  <td colSpan="7" align="center">
                    <Spinner color="primary">Loading...</Spinner>
                  </td>
                </tr>
              ) : listPembayaranSiswaError ? (
                <tr>
                  <td colSpan="7" align="center">
                    {listPembayaranSiswaError}
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
  listPembayaranSiswaLoading: state.TagihanReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.TagihanReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.TagihanReducer.listPembayaranSiswaError,

  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListSiswaResult: state.AuthReducer.getListSiswaResult,
  getListKelasResult: state.KelasReducer.getListKelasResult,

  deleteTagihanLunasLoading: state.TagihanReducer.deleteTagihanLunasLoading,
  deleteTagihanLunasResult: state.TagihanReducer.deleteTagihanLunasResult,
  deleteTagihanLunasError: state.TagihanReducer.deleteTagihanLunasError,
});

export default connect(mapStateToProps, null)(listTagihanLunas);
