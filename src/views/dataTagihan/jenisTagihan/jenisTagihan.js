import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import Swal from "sweetalert2";
import {
  getListTypeTagihan,
  deleteTypeTagihan,
} from "store/actions/jenisTagihanAction";

class jenisTagihan extends Component {
  componentDidMount() {
    this.props.dispatch(getListTypeTagihan());
  }

  removeData = (id) => {
    this.props.dispatch(deleteTypeTagihan(id));
  };

  componentDidUpdate(prevProps) {
    const { deleteJenisTagihanResult } = this.props;
    if (
      deleteJenisTagihanResult &&
      prevProps.deleteJenisTagihanResult !== deleteJenisTagihanResult
    ) {
      Swal.fire("Success", deleteJenisTagihanResult, "success");
      this.props.dispatch(getListTypeTagihan());
    }
  }

  render() {
    const {
      getListJenisTagihanResult,
      getListJenisTagihanLoading,
      getListJenisTagihanError,
      deleteJenisTagihanLoading,
    } = this.props;

    console.log("GET LIST tagihan", getListJenisTagihanResult);
    return (
      <div className="content">
        <div>
          <Row>
            <Col>
              <Link to="/admin/tagihan" className="btn btn-primary float-left">
                Kembali
              </Link>

              <Link
                to="/admin/jenistagihan/tambah"
                className="btn btn-primary float-left"
              >
                + Tambah Jenis Tagihan
              </Link>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>Nama Tagihan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListJenisTagihanResult ? (
                        Object.keys(getListJenisTagihanResult).map((key) => {
                          console.log("KEY : ", key);
                          return (
                            <tr key={key}>
                              <td>
                                {
                                  getListJenisTagihanResult[key]
                                    .namaJenisTagihan
                                }
                              </td>
                              <td>
                                <Link
                                  className="btn btn-warning ml-2"
                                  to={"/admin/jenistagihan/edit/" + key}
                                >
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Edit
                                </Link>
                                {deleteJenisTagihanLoading ? (
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
                      ) : getListJenisTagihanLoading ? (
                        <tr>
                          <td colSpan="3" align="center">
                            <Spinner color="primary">Loading...</Spinner>
                          </td>
                        </tr>
                      ) : getListJenisTagihanError ? (
                        <tr>
                          <td colSpan="3" align="center">
                            {getListJenisTagihanError}
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
  getListJenisTagihanLoading:
    state.jenisTagihanReducer.getListJenisTagihanLoading,
  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListJenisTagihanError: state.jenisTagihanReducer.getListJenisTagihanError,

  deleteJenisTagihanLoading:
    state.jenisTagihanReducer.deleteJenisTagihanLoading,
  deleteJenisTagihanResult: state.jenisTagihanReducer.deleteJenisTagihanResult,
  deleteJenisTagihanError: state.jenisTagihanReducer.deleteJenisTagihanError,
});

export default connect(mapStateToProps, null)(jenisTagihan);
