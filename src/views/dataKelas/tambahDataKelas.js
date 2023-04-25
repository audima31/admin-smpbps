import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { tambahKelas } from "store/actions/KelasAction";
import Swal from "sweetalert2";

class tambahDataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namaKelas: "",
    };
  }

  handleNamaKelas = (event) => {
    this.setState({
      namaKelas: event.target.value,
    });
  };

  handleTambahKelas = (event) => {
    const { namaKelas } = this.state;
    event.preventDefault();
    const data = {
      namaKelas: namaKelas,
    };
    if (namaKelas) {
      //ke Auth Action
      this.props.dispatch(tambahKelas(data));
      Swal.fire({
        icon: "success",
        title: "Kelas Berhasil disimpan",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  // eslint-disable-next-line no-dupe-class-members
  componentDidUpdate(prevProps) {
    const { tambahKelasResult } = this.props;
    if (
      tambahKelasResult &&
      prevProps.tambahKelasResult !== tambahKelasResult
    ) {
      this.props.history.push("/admin/kelas");
    }
  }

  render() {
    const { namaKelas } = this.state;
    const { tambahKelasLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12} className="mb-5">
            <Link to="/admin/kelas" className="btn btn-secondary">
              <i className="bi bi-caret-left-fill"> </i>
              Kembali
            </Link>
          </Col>
          <Col md={8}>
            <form onSubmit={(event) => this.handleTambahKelas(event)}>
              <div className="mb-3">
                <label htmlFor="inputNama" className="form-label">
                  Nama Kelas :
                </label>
                <input
                  className="form-control"
                  id="inputNamaSiswa"
                  placeholder="Nama Kelas"
                  data-testid="input-namaSiswa"
                  value={namaKelas}
                  onChange={(event) => this.handleNamaKelas(event)}
                />
              </div>
              {tambahKelasLoading ? (
                <button type="submit" className="btn btn-primary">
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Simpan
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
  tambahKelasLoading: state.KelasReducer.tambahKelasLoading,
  tambahKelasResult: state.KelasReducer.tambahKelasResult,
  tambahKelasError: state.KelasReducer.tambahKelasError,
});

export default connect(mapStateToProps, null)(tambahDataKelas);
