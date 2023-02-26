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
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

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

  componentDidUpdate(prevProps) {
    const { deleteSiswaResult } = this.props;
    if (
      deleteSiswaResult &&
      prevProps.deleteSiswaResult !== deleteSiswaResult
    ) {
      this.props.dispatch(getListSiswa());
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

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
              <div className="d-flex justify-content-between">
                <Link
                  to="/admin/siswa/tambah"
                  className="btn btn-primary float-left"
                >
                  + Tambah Akun Siswa
                </Link>

                {/* button search */}
                <div class="input-group rounded" style={{ width: "15%" }}>
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={(event) => this.handleSearch(event)}
                    value={this.state.search}
                  />
                  <span class="input-group-text border-0" id="search-addon">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </Col>

            <Col md="12">
              <Card>
                <CardBody>
                  <Table striped className="text-center table-hover">
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">NIS</th>
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Kelas</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListSiswaResult ? (
                        Object.keys(getListSiswaResult)
                          .filter((item) => {
                            return this.state.search.toLowerCase() === ""
                              ? item
                              : getListSiswaResult[item].nama
                                  .toLowerCase()
                                  .includes(this.state.search);
                          })
                          .map((key, index) => {
                            const removeData = (id) => {
                              Swal.fire({
                                title: `Apakah anda yakin?`,
                                text: `menghapus data "${getListSiswaResult[key].nama}"`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Iya, hapus data siswa!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    "Deleted!",
                                    `Data "${getListSiswaResult[key].nama}" berhasil dihapus.`,
                                    "success"
                                  );
                                  this.props.dispatch(deleteSiswa(id));
                                }
                              });
                            };

                            return (
                              <tr key={key}>
                                <td>{index + 1 + "."}</td>
                                <td>{getListSiswaResult[key].NIS}</td>
                                <td>{getListSiswaResult[key].nama}</td>
                                <td>{getListSiswaResult[key].jenisKelamin}</td>

                                <td>
                                  {getListKelasResult ? (
                                    Object.keys(getListKelasResult).map(
                                      (id) => {
                                        // eslint-disable-next-line no-lone-blocks
                                        return (
                                          <p className="mt-4">
                                            {getListKelasResult[id].kelasId ===
                                            getListSiswaResult[key].kelas
                                              ? getListKelasResult[id].namaKelas
                                              : []}
                                          </p>
                                        );
                                      }
                                    )
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
                                      onClick={() => removeData(key)}
                                    >
                                      <i className="nc-icon nc-basket"></i>{" "}
                                      Hapus
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                      ) : getListSiswaLoading ? (
                        <tr>
                          <td colSpan="6" align="center">
                            <Spinner color="primary">Loading...</Spinner>
                          </td>
                        </tr>
                      ) : getListSiswaError ? (
                        <tr>
                          <td colSpan="6" align="center">
                            {getListSiswaError}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
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
