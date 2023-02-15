import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import { getListSiswa } from "store/actions/AuthAction";
import { getListKelas } from "store/actions/KelasAction";
import { getDetailSiswa } from "store/actions/SiswaAction";
import { deleteSiswa } from "store/actions/SiswaAction";
import Swal from "sweetalert2";

class dataSiswa extends Component {
  componentDidMount() {
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getDetailSiswa(this.props.match.params.id));
  }

  handleKelas = (event) => {
    this.setState({
      kelas: event.target.value,
    });
  };

  removeData = (id) => {
    this.props.dispatch(deleteSiswa(id));
  };

  componentDidUpdate(prevProps) {
    const { deleteSiswaResult } = this.props;
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
      getListSiswaError,
      getListKelasResult,
      deleteSiswaLoading,
    } = this.props;
    console.log("getKelasSiswaResult : ", getListKelasResult);
    console.log("getSiswa : ", getListSiswaResult);

    return (
      <div className="content">
        <div>
          <Row>
            <Col>
              <Link
                to="/admin/siswa/tambah"
                className="btn btn-primary float-left"
              >
                + Tambah Akun Siswa
              </Link>
            </Col>

            <Col md="12">
              <Card>
                <CardBody>
                  <Table striped className="text-center table-hover">
                    <thead className="text-primary">
                      <tr>
                        <th>NIS</th>
                        <th>Nama Siswa</th>
                        <th>Jenis Kelamin</th>
                        <th>Kelas</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListSiswaResult ? (
                        Object.keys(getListSiswaResult).map((key) => {
                          return (
                            <tr id={key}>
                              <td>{getListSiswaResult[key].NIS}</td>
                              <td>{getListSiswaResult[key].nama}</td>
                              <td>{getListSiswaResult[key].jenisKelamin}</td>

                              <td>
                                {getListKelasResult ? (
                                  Object.keys(getListKelasResult).map((id) => {
                                    // eslint-disable-next-line no-lone-blocks
                                    return (
                                      <p className="mt-4">
                                        {getListKelasResult[id].kelasId ===
                                        getListSiswaResult[key].kelas
                                          ? getListKelasResult[id].namaKelas
                                          : []}
                                      </p>
                                    );
                                  })
                                ) : (
                                  <p>Kelas Tidak Ditemukan</p>
                                )}
                              </td>
                              <td>
                                <a
                                  {...this.props}
                                  class="btn btn-primary mr-2 "
                                  href={"/admin/siswa/detail/" + key}
                                >
                                  Detail
                                </a>

                                <Link
                                  className="btn btn-warning ml-2"
                                  to={"/admin/siswa/edit/" + key}
                                >
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Edit
                                </Link>

                                {deleteSiswaLoading ? (
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
                              </td>
                            </tr>
                          );
                        })
                      ) : getListSiswaLoading ? (
                        <tr>
                          <td colSpan="5" align="center">
                            <Spinner color="primary">Loading...</Spinner>
                          </td>
                        </tr>
                      ) : getListSiswaError ? (
                        <tr>
                          <td colSpan="5" align="center">
                            {getListSiswaError}
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
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
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

export default connect(mapStateToProps, null)(dataSiswa);
