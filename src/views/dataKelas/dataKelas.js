import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListKelas, deleteKelas } from "store/actions/KelasAction";
import { Button, Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import Swal from "sweetalert2";

class dataKelas extends Component {
  componentDidMount() {
    this.props.dispatch(getListKelas());
  }

  removeData = (id) => {
    this.props.dispatch(deleteKelas(id));
  };

  componentDidUpdate(prevProps) {
    const { deleteKelasResult } = this.props;
    if (
      deleteKelasResult &&
      prevProps.deleteKelasResult !== deleteKelasResult
    ) {
      Swal.fire("Success", deleteKelasResult, "success");
      this.props.dispatch(getListKelas());
    }
  }

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
        <div>
          <Row>
            <Col>
              <Link
                to="/admin/kelas/tambah"
                className="btn btn-primary float-left"
              >
                + Tambah Kelas
              </Link>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>Nama Kelas</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListKelasResult ? (
                        Object.keys(getListKelasResult).map((key) => {
                          return (
                            <tr key={key}>
                              <td>{getListKelasResult[key].namaKelas}</td>
                              <td>
                                <Button color="primary">
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Detail
                                </Button>
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
