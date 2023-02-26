import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListKelas, deleteKelas } from "store/actions/KelasAction";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import Swal from "sweetalert2";
import "../../assets/css/table.css";

class dataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getListKelas());
  }

  componentDidUpdate(prevProps) {
    const { deleteKelasResult } = this.props;
    if (
      deleteKelasResult &&
      prevProps.deleteKelasResult !== deleteKelasResult
    ) {
      this.props.dispatch(getListKelas());
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const {
      getListKelasResult,
      getListKelasLoading,
      getListKelasError,
      deleteKelasLoading,
    } = this.props;

    console.log("GET LIST KELAS", getListKelasResult);
    return (
      <div className="content">
        <Row>
          <Col>
            <div className="d-flex justify-content-between">
              <Link
                to="/admin/kelas/tambah"
                className="btn btn-primary float-left"
              >
                + Tambah Kelas
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
                      <th scope="col">No</th>
                      <th scope="col">Nama Kelas</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListKelasResult ? (
                      Object.keys(getListKelasResult)
                        .filter((item) => {
                          return this.state.search.toLowerCase() === ""
                            ? item
                            : getListKelasResult[item].namaKelas
                                .toLowerCase()
                                .includes(this.state.search);
                        })
                        .map((key, index) => {
                          const removeData = (id) => {
                            Swal.fire({
                              title: "Apakah anda yakin?",
                              text: `menghapus kelas "${getListKelasResult[key].namaKelas}"`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Iya, hapus kelas!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "Deleted!",
                                  `Kelas "${getListKelasResult[key].namaKelas}" berhasil dihapus.`,
                                  "success"
                                );
                                this.props.dispatch(deleteKelas(id));
                              }
                            });
                          };
                          return (
                            <tr key={key}>
                              <td>{index + 1 + "."}</td>
                              <td>{getListKelasResult[key].namaKelas}</td>
                              <td>
                                <Link
                                  {...this.props}
                                  className="btn btn-primary ml-2"
                                  to={"/admin/kelas/detail/" + key}
                                >
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Detail
                                </Link>
                                <Link
                                  className="btn btn-warning ml-2"
                                  to={"/admin/kelas/edit/" + key}
                                >
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Edit
                                </Link>
                                {deleteKelasLoading ? (
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
                                    onClick={() => removeData(key)}
                                  >
                                    <i className="nc-icon nc-basket"></i> Hapus
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                    ) : getListKelasLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListKelasError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListKelasError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
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
    );
  }
}
const mapStateToProps = (state) => ({
  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,

  deleteKelasLoading: state.KelasReducer.deleteKelasLoading,
  deleteKelasResult: state.KelasReducer.deleteKelasResult,
  deleteKelasError: state.KelasReducer.deleteKelasError,
});

export default connect(mapStateToProps, null)(dataKelas);
