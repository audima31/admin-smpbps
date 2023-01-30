import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CardBody, Spinner } from "reactstrap";
import { getListSiswa } from "store/actions/AuthAction";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListKelas } from "store/actions/KelasAction";
import { getListTagihan } from "store/actions/TagihanAction";

class dataTagihan extends Component {
  componentDidMount() {
    this.props.dispatch(getListTagihan());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListTypeTagihan());
  }

  render() {
    const {
      getListTagihanResult,
      getListTagihanLoading,
      getListTagihanError,
      getListKelasResult,
      getListSiswaResult,
      getListJenisTagihanResult,
    } = this.props;
    console.log("List Tagihan : ", getListTagihanResult);
    return (
      <div className="content">
        <Link to="/admin/tagihan/tambah" className="btn btn-primary float-left">
          + Tambah Tagihan Baru
        </Link>
        <Link to="/admin/jenistagihan" class="btn btn-primary float-left  ">
          Tambah Jenis Tagihan
        </Link>

        <table class="table table-primary">
          <thead>
            <tr>
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
                console.log("Cek : ", getListTagihanResult[key].detailTagihans);
                return (
                  <>
                    {getListTagihanResult[key].detailTagihans ? (
                      Object.keys(getListTagihanResult[key].detailTagihans).map(
                        (id) => {
                          console.log(
                            "Cek 2 :",
                            getListTagihanResult[key].detailTagihans[id]
                          );
                          return (
                            <tr>
                              {/* Data Tanggal */}
                              <td>
                                {
                                  getListTagihanResult[key].detailTagihans[id]
                                    .waktu
                                }
                              </td>
                              {/* END Data Tanggal */}

                              {/* Data Nama */}
                              <td>
                                {getListSiswaResult ? (
                                  Object.keys(getListSiswaResult).map((id) => {
                                    return (
                                      <p>
                                        {getListSiswaResult[id].uid ===
                                        getListTagihanResult[key].nama
                                          ? getListSiswaResult[id].nama
                                          : []}
                                      </p>
                                    );
                                  })
                                ) : (
                                  <p>Nama Siswa Tidak Ditemukan</p>
                                )}
                              </td>
                              {/* END Data Nama */}

                              {/* Data Kelas */}
                              <td>
                                {getListKelas ? (
                                  Object.keys(getListKelasResult).map((id) => {
                                    return (
                                      <p>
                                        {getListKelasResult[id].kelasId ===
                                        getListTagihanResult[key].kelas
                                          ? getListKelasResult[id].namaKelas
                                          : []}
                                      </p>
                                    );
                                  })
                                ) : (
                                  <p>Kelas Tidak Ditemukan</p>
                                )}
                              </td>
                              {/* End Data Kelas */}

                              {/* Data Jenis Tagihan */}
                              <td>
                                {getListJenisTagihanResult ? (
                                  Object.keys(getListJenisTagihanResult).map(
                                    (x) => {
                                      return (
                                        <p>
                                          {getListJenisTagihanResult[x]
                                            .jenisTagihanId ===
                                          getListTagihanResult[key]
                                            .detailTagihans[id].jenisTagihan
                                            ? getListJenisTagihanResult[x]
                                                .namaJenisTagihan
                                            : []}
                                        </p>
                                      );
                                    }
                                  )
                                ) : (
                                  <p>Tidak Ditermukan</p>
                                )}
                              </td>
                              {/* END Data Jenis Tagihan */}

                              <td>
                                {
                                  getListTagihanResult[key].detailTagihans[id]
                                    .status
                                }
                              </td>
                              <td>
                                <a
                                  href="#"
                                  class="btn btn-warning stretched-link"
                                >
                                  Edit
                                </a>

                                <button
                                  type="submit"
                                  className="btn btn-danger ml-2"
                                  onClick={() => this.removeData(key)}
                                >
                                  <i className="nc-icon nc-basket"></i> Hapus
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <div>
                        <p>Kosong</p>
                      </div>
                    )}
                  </>
                );
              })
            ) : getListTagihanLoading ? (
              <tr>
                <td colSpan="5" align="center">
                  <Spinner color="primary">Loading...</Spinner>
                </td>
              </tr>
            ) : getListTagihanError ? (
              <tr>
                <td colSpan="5" align="center">
                  {getListTagihanError}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" align="center">
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
});

export default connect(mapStateToProps, null)(dataTagihan);
