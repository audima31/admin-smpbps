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

  handleSubmit = (event) => {
    const { namaJenisTagihan } = this.state;
    event.preventDefault();
    const data = {
      namaJenisTagihan: namaJenisTagihan,
    };
    //ke Auth Action
    this.props.dispatch(tambahTypeTagihan(data));
    console.log("Data", data);
  };

  componentDidUpdate(prevProps) {
    const { tambahJenisTagihanResult } = this.props;
    if (
      tambahJenisTagihanResult &&
      prevProps.tambahJenisTagihanResult !== tambahJenisTagihanResult
    ) {
      Swal.fire("Good job!", "Tambah kelas telah berhasil", "success");
      this.props.history.push("/admin/jenistagihan");
    }
  }
  render() {
    const { namaJenisTagihan } = this.state;
    const { tambahJenisTagihanLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12} className="mb-5">
            <Link to="/admin/jenistagihan" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
          <Col md={8}>
            <form onSubmit={(event) => this.handleSubmit(event)}>
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
                  Submit
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
