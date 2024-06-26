import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { tambahTypeTagihan } from "store/actions/jenisTagihanAction";
import Swal from "sweetalert2";

class tambahJenisTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namaJenisTagihan: "",
    };
  }

  handleNamaJenisTagihan = (event) => {
    this.setState({
      namaJenisTagihan: event.target.value,
    });
  };

  handleTambahJenisTagihan = (event) => {
    const { namaJenisTagihan } = this.state;
    event.preventDefault();

    var x =
      document.forms["FormTambahJenistagihan"]["FormNamaJenisTagihan"].value;

    if (x.trim() == null || x.trim() == "" || x === " ") {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
      return false;
    } else if (namaJenisTagihan) {
      //ke Auth Action
      this.props.dispatch(tambahTypeTagihan(namaJenisTagihan));
    } else {
      Swal.fire({
        icon: "error",
        title: "Data tidak boleh kosong!",
        showConfirmButton: true,
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahJenisTagihanResult } = this.props;
    if (
      tambahJenisTagihanResult &&
      prevProps.tambahJenisTagihanResult !== tambahJenisTagihanResult
    ) {
      this.props.history.push("/admin/jenistagihan");
    }
  }
  render() {
    const { namaJenisTagihan } = this.state;
    const { tambahJenisTagihanLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12} className="mb-3">
            <Link to="/admin/jenistagihan" className="btn btn-secondary">
              <i className="bi bi-caret-left-fill"> </i>
              Kembali
            </Link>
          </Col>
          <Col md={8}>
            <form
              name="FormTambahJenistagihan"
              onSubmit={(event) => this.handleTambahJenisTagihan(event)}
            >
              <div className="mb-3">
                <label htmlFor="inputNamaJenisTagihan" className="form-label">
                  Nama Tagihan :
                </label>
                <input
                  className="form-control"
                  id="inputNamaJenisTagihan"
                  placeholder="Nama jenis tagihan"
                  data-testid="input-namaJenisTagihan"
                  value={namaJenisTagihan}
                  onChange={(event) => this.handleNamaJenisTagihan(event)}
                  name="FormNamaJenisTagihan"
                />
              </div>
              {tambahJenisTagihanLoading ? (
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
  tambahJenisTagihanLoading:
    state.jenisTagihanReducer.tambahJenisTagihanLoading,
  tambahJenisTagihanResult: state.jenisTagihanReducer.tambahJenisTagihanResult,
  tambahJenisTagihanError: state.jenisTagihanReducer.tambahJenisTagihanError,
});

export default connect(mapStateToProps, null)(tambahJenisTagihan);
