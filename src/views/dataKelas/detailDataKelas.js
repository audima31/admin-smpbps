import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { getListSiswa } from "store/actions/AuthAction";
import { getListKelas } from "store/actions/KelasAction";
import { deleteSiswa } from "store/actions/SiswaAction";
import Swal from "sweetalert2";

class detailDataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idKelas: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListKelas());
  }

  removeData = (id) => {
    this.props.dispatch(deleteSiswa(id));
  };

  componentDidUpdate(prevProps) {
    const { deleteSiswaResult, getListKelasResult } = this.props;
    if (
      deleteSiswaResult &&
      prevProps.deleteSiswaResult !== deleteSiswaResult
    ) {
      Swal.fire("Success", deleteSiswaResult, "success");
      this.props.dispatch(getListSiswa());
    }
  }

  render() {
    const {
      getListSiswaResult,
      getListSiswaLoading,
      getListKelasResult,
      deleteSiswaLoading,
    } = this.props;
    const { idKelas } = this.state;

    return (
      <div className="content">
        <div className="mt-3">
          <a
            href={"/admin/kelas/"}
            style={{ color: "#FFFFFF" }}
            className="btn btn-warning"
          >
            <i className="bi bi-caret-left-fill"> </i>
            KEMBALI
          </a>
        </div>
        <div className="card p-4 ">
          <label className="fw-bold fs-3 text-dark">
            {getListKelasResult ? (
              Object.keys(getListKelasResult).map((id) => {
                return (
                  <>
                    {idKelas === getListKelasResult[id].kelasId ? (
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
          </label>

          <br />

          <table className="table table-hover text-center ">
            <thead>
              <tr className="text-primary">
                <th scope="col">NIS</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Jenis Kelamin</th>
                <th scope="col">Kelas</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getListSiswaResult ? (
                Object.keys(getListSiswaResult).map((key) => {
                  console.log("List Siswa:", getListSiswaResult.length);

                  console.log("getSiswa :", getListSiswaResult[key].kelas);
                  console.log("idKelas : ", idKelas);
                  return (
                    <tr key={key}>
                      {getListSiswaResult[key].kelas === idKelas ? (
                        <>
                          <td>{getListSiswaResult[key].NIS}</td>
                          <td>{getListSiswaResult[key].nama}</td>
                          <td>{getListSiswaResult[key].jenisKelamin}</td>

                          {/* Data Kelas */}
                          <td>
                            {getListKelasResult ? (
                              Object.keys(getListKelasResult).map((id) => {
                                return (
                                  <>
                                    {getListSiswaResult[key].kelas ===
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
                          </td>

                          {/* Button */}
                          <td>
                            <Link
                              {...this.props}
                              className="btn btn-primary ml-2"
                              to={"/admin/siswa/detail/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Detail
                            </Link>
                            <Link
                              className="btn btn-warning ml-2"
                              to={"/admin/siswa/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            {deleteSiswaLoading ? (
                              <button type="submit" className="btn btn-primary">
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
                          </td>
                        </>
                      ) : (
                        []
                      )}
                    </tr>
                  );
                })
              ) : getListSiswaLoading ? (
                <tr>
                  <td colSpan="5" align="center">
                    <Spinner color="primary">Loading...</Spinner>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListSiswaLoading: state.AuthReducer.getListSiswaLoading,
  getListSiswaResult: state.AuthReducer.getListSiswaResult,
  getListSiswaError: state.AuthReducer.getListSiswaError,

  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,

  deleteSiswaLoading: state.SiswaReducer.deleteSiswaLoading,
  deleteSiswaResult: state.SiswaReducer.deleteSiswaResult,
  deleteSiswaError: state.SiswaReducer.deleteSiswaError,
});

export default connect(mapStateToProps, null)(detailDataKelas);
