import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  getDetailTypeTagihan,
  updateTypeTagihan,
} from "store/actions/jenisTagihanAction";
import Swal from "sweetalert2";

class editJenisTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      namaJenisTagihan: "",
    };
  }

  componentDidMount() {
    //this.props.match.params.id = Merupakan ID dari FIREBASE
    this.props.dispatch(getDetailTypeTagihan(this.props.match.params.id));
    console.log("ID : ", this.props.match.params.id);
  }

  handleNamaJenisTagihan = (event) => {
    this.setState({
      namaJenisTagihan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { namaJenisTagihan } = this.state;
    event.preventDefault();
    if (namaJenisTagihan) {
      //ke Auth Action
      this.props.dispatch(updateTypeTagihan(this.state));
      console.log("Data", this.state);
    } else {
      Swal.fire("Gagal!", "Data wajib disi!", "error");
    }
  };

  // eslint-disable-next-line no-dupe-class-members
  componentDidUpdate(prevProps) {
    const { detailTypeTagihanResult, updateJenisTagihanResult } = this.props;
    if (
      detailTypeTagihanResult &&
      prevProps.detailTypeTagihanResult !== detailTypeTagihanResult
    ) {
      this.setState({
        namaJenisTagihan: detailTypeTagihanResult.namaJenisTagihan,
      });
    }
    if (
      updateJenisTagihanResult &&
      prevProps.updateJenisTagihanResult !== updateJenisTagihanResult
    ) {
      Swal.fire("Good job!", "Update jenis tagihan telah berhasil", "success");
      this.props.history.push("/admin/jenistagihan");
    }
  }

  render() {
    const { namaJenisTagihan } = this.state;
    const { updateJenisTagihanLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <Link to="/admin/jenistagihan" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
          <Col md={8}>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="mb-3">
                <label htmlFor="inputNamaJenisTagihan" className="form-label">
                  Nama Jenis Tagihan:
                </label>
                <input
                  className="form-control"
                  id="inputNamaJenisTagihan"
                  placeholder="Nama Jenis Tagihan"
                  data-testid="input-namaJenisTagihan"
                  value={namaJenisTagihan}
                  onChange={(event) => this.handleNamaJenisTagihan(event)}
                />
              </div>
              {updateJenisTagihanLoading ? (
                <button type="submit" className="btn btn-primary">
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  SIMPAN
                </button>
              )}
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateJenisTagihanLoading:
    state.jenisTagihanReducer.updateJenisTagihanLoading,
  updateJenisTagihanResult: state.jenisTagihanReducer.updateJenisTagihanResult,
  updateJenisTagihanError: state.jenisTagihanReducer.updateJenisTagihanError,

  detailTypeTagihanLoading: state.jenisTagihanReducer.detailTypeTagihanLoading,
  detailTypeTagihanResult: state.jenisTagihanReducer.detailTypeTagihanResult,
  detailTypeTagihanError: state.jenisTagihanReducer.detailTypeTagihanError,
});

export default connect(mapStateToProps, null)(editJenisTagihan);
