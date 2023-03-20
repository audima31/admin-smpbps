import FIREBASE from "config/FIREBASE";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Spinner,
} from "reactstrap";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListKelas } from "store/actions/KelasAction";
import { totalKelas } from "store/actions/KelasAction";
import { limitPembayaranLunas } from "store/actions/PaymentAction";
import { totalPembayaranLunas } from "store/actions/PaymentAction";
import { getListSiswa } from "store/actions/SiswaAction";
import { totalSiswa } from "store/actions/SiswaAction";
import { numberWithCommas } from "utils";

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(totalSiswa());
    this.props.dispatch(totalKelas());
    this.props.dispatch(totalPembayaranLunas());
    this.props.dispatch(limitPembayaranLunas());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListTypeTagihan());
  }

  componentDidUpdate() {
    const { history } = this.props;

    setTimeout(() => {
      FIREBASE.auth()
        .signOut()
        .then((res) => {
          //menghapus localStorage yang namanya user
          window.localStorage.removeItem("user");
          history.push({ pathname: "/login" });
        });
    }, 3600 * 6000);
  }

  render() {
    const {
      totalSiswaResult,
      totalKelasResult,
      totalPembayaranResult,
      listPembayaranSiswaLimitResult,
      listPembayaranSiswaLimitLoading,
      listPembayaranSiswaLimitError,
    } = this.props;

    return (
      <div className="content">
        <a
          {...this.props}
          href={"/admin/register"}
          class="btn btn-primary mr-2 mb-4 "
        >
          + Tambah Akun Admin
        </a>
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="text-center ">
                      <i class="bi bi-people-fill fa-4x text-primary"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Siswa</p>
                      <CardTitle tag="p">{totalSiswaResult}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="text-center ">
                      <i class="bi bi-buildings-fill fa-4x text-warning"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Kelas</p>
                      <CardTitle tag="p">{totalKelasResult}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>

              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="text-center ">
                      <i class="bi bi-cash fa-4x text-success"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Pembayaran Berhasil</p>
                      <CardTitle tag="p">{totalPembayaranResult}</CardTitle>

                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>

              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "5%" }}>
          <div className="row ">
            <div className="col">
              <h3>List pembayaran terakhir</h3>
            </div>
            <div className="col d-flex justify-content-end"></div>
          </div>
          <Card className="card-stats ">
            <CardBody>
              <Table striped className="text-center table-hover">
                <thead className="text-primary">
                  <tr>
                    <th scope="col">No</th>
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
                  {listPembayaranSiswaLimitResult ? (
                    Object.keys(listPembayaranSiswaLimitResult).map(
                      (key, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {listPembayaranSiswaLimitResult[key].waktuTagihan}
                            </td>
                            <td>{listPembayaranSiswaLimitResult[key].nama}</td>
                            <td>{listPembayaranSiswaLimitResult[key].kelas}</td>
                            <td>
                              {listPembayaranSiswaLimitResult[key].jenisTagihan}
                            </td>
                            <td>
                              Rp.{" "}
                              {numberWithCommas(
                                listPembayaranSiswaLimitResult[key].nominal
                              )}
                            </td>
                            <td>
                              {listPembayaranSiswaLimitResult[key].status ===
                              "PENDING" ? (
                                <p className="badge bg-warning text-wrap p-2 my-1">
                                  {listPembayaranSiswaLimitResult[key].status}
                                </p>
                              ) : listPembayaranSiswaLimitResult[key].status ===
                                "BELUM DIBAYAR" ? (
                                <p className="badge bg-danger text-wrap px-3 py-2 my-1">
                                  {listPembayaranSiswaLimitResult[key].status}
                                </p>
                              ) : (
                                <p className="badge bg-success text-wrap px-3 py-2 my-1">
                                  {listPembayaranSiswaLimitResult[key].status}
                                </p>
                              )}
                            </td>
                            {/* BUTTON */}

                            <td>
                              <>
                                <a
                                  {...this.props}
                                  href={
                                    "/admin/listPembayaranLunas/detail/" + key
                                  }
                                  class="btn btn-primary mr-2 "
                                >
                                  Detail
                                </a>

                                {listPembayaranSiswaLimitResult[key].status ===
                                "LUNAS" ? (
                                  <></>
                                ) : (
                                  <></>
                                )}
                              </>
                            </td>
                            {/* END BUTTON */}
                          </tr>
                        );
                      }
                    )
                  ) : listPembayaranSiswaLimitLoading ? (
                    <tr>
                      <td colSpan="8" align="center">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                    </tr>
                  ) : listPembayaranSiswaLimitError ? (
                    <tr>
                      <td colSpan="8" align="center">
                        {listPembayaranSiswaLimitError}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="8" align="center">
                        Data Kosong
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalSiswaLoading: state.SiswaReducer.totalSiswaLoading,
  totalSiswaResult: state.SiswaReducer.totalSiswaResult,
  totalSiswaError: state.SiswaReducer.totalSiswaError,

  totalKelasLoading: state.KelasReducer.totalKelasLoading,
  totalKelasResult: state.KelasReducer.totalKelasResult,
  totalKelasError: state.KelasReducer.totalKelasError,

  totalPembayaranLoading: state.PaymentReducer.totalPembayaranLoading,
  totalPembayaranResult: state.PaymentReducer.totalPembayaranResult,
  totalPembayaranError: state.PaymentReducer.totalPembayaranError,

  listPembayaranSiswaLimitLoading:
    state.PaymentReducer.listPembayaranSiswaLimitLoading,
  listPembayaranSiswaLimitResult:
    state.PaymentReducer.listPembayaranSiswaLimitResult,
  listPembayaranSiswaLimitError:
    state.PaymentReducer.listPembayaranSiswaLimitError,
});

export default connect(mapStateToProps, null)(Dashboard);
