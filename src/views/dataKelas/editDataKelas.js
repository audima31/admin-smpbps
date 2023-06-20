import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { updateKelas, getDetailKelas } from "store/actions/KelasAction";
import Swal from "sweetalert2";

class editDataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      namaKelas: "",
    };
  }

  componentDidMount() {
    //this.props.match.params.id = Merupakan ID dari FIREBASE
    this.props.dispatch(getDetailKelas(this.props.match.params.id));
  }

  handleNamaKelas = (event) => {
    this.setState({
      namaKelas: event.target.value,
    });
  };

  handleEditKelas = (event) => {
    const { namaKelas } = this.state;
    event.preventDefault();

    var x = document.forms["FormEditKelas"]["FormNamaKelas"].value;

    if (x.trim() == null || x.trim() == "" || x === " ") {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
      return false;
    } else if (namaKelas) {
      //ke Auth Action
      this.props.dispatch(updateKelas(this.state));
      console.log("Data", this.state);
    } else {
      Swal.fire("Gagal!", "Data wajib disi!", "error");
    }
  };

  // eslint-disable-next-line no-dupe-class-members
  componentDidUpdate(prevProps) {
    const { detailKelasResult, updateKelasResult } = this.props;
    if (
      detailKelasResult &&
      prevProps.detailKelasResult !== detailKelasResult
    ) {
      this.setState({
        namaKelas: detailKelasResult.namaKelas,
      });
    }
    if (
      updateKelasResult &&
      prevProps.updateKelasResult !== updateKelasResult
    ) {
      Swal.fire("Good job!", "Update kelas telah berhasil", "success");
      this.props.history.push("/admin/kelas");
    }
  }

  render() {
    const { namaKelas } = this.state;
    const { updateKelasLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <div className="mt-3">
              <a
                href={"/admin/kelas/"}
                style={{ color: "#FFFFFF" }}
                className="btn btn-secondary"
              >
                <i className="bi bi-caret-left-fill"> </i>
                KEMBALI
              </a>
            </div>
          </Col>
          <Col md={8}>
            <form
              name="FormEditKelas"
              onSubmit={(event) => this.handleEditKelas(event)}
            >
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
                  name="FormNamaKelas"
                />
              </div>
              {updateKelasLoading ? (
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
  updateKelasLoading: state.KelasReducer.updateKelasLoading,
  updateKelasResult: state.KelasReducer.updateKelasResult,
  updateKelasError: state.KelasReducer.updateKelasError,

  detailKelasLoading: state.KelasReducer.detailKelasLoading,
  detailKelasResult: state.KelasReducer.detailKelasResult,
  detailKelasError: state.KelasReducer.detailKelasError,
});

export default connect(mapStateToProps, null)(editDataKelas);
