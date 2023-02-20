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
} from "reactstrap";
import { totalKelas } from "store/actions/KelasAction";
import { totalSiswa } from "store/actions/SiswaAction";
import { listPembayaranSiswa } from "store/actions/TagihanAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(totalSiswa());
    this.props.dispatch(totalKelas());
    this.props.dispatch(listPembayaranSiswa());
  }

  render() {
    const {
      totalSiswaResult,
      totalKelasResult,
      listPembayaranSiswaResult,
      pembayaranBerhasilResult,
    } = this.props;

    return (
      <div className="content">
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

  listPembayaranSiswaLoading: state.TagihanReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.TagihanReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.TagihanReducer.listPembayaranSiswaError,
});

export default connect(mapStateToProps, null)(Dashboard);
