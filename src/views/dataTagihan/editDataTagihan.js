import React, { Component } from "react";
import { connect } from "react-redux";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { updateTagihan, getDetailTagihan } from "store/actions/TagihanAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";
import "../../assets/css/dataSiswa.css";
import moment from "moment";

class editDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      jenisTagihan: "",
      keterangan: "",
      status: "",
      nominal: "",
    };
  }

  componentDidMount() {
    const { id } = this.state;

    this.props.dispatch(getDetailTagihan(id));
    this.props.dispatch(getListTypeTagihan());
  }

  handleJenisTagihan = (event) => {
    this.setState({
      jenisTagihan: event.target.value,
    });
  };

  handleNominal = (event) => {
    this.setState({
      nominal: event.target.value,
    });
  };

  handleKeterangan = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleStatusPembayaran = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  handleEditTagihan = (event) => {
    const { getListJenisTagihanResult, getDetailTagihanResult } = this.props;
    const { jenisTagihan, keterangan, nominal, status, id } = this.state;

    event.preventDefault();

    if (jenisTagihan && keterangan && nominal && status) {
      // eslint-disable-next-line no-lone-blocks
      {
        Object.keys(getListJenisTagihanResult).map((key) => {
          if (getListJenisTagihanResult[key].jenisTagihanId === jenisTagihan) {
            const data = {
              kelas: getDetailTagihanResult.kelas,
              nama: getDetailTagihanResult.nama,
              jenisTagihan: getListJenisTagihanResult[key].namaJenisTagihan,
              nominal: nominal,
              keterangan: keterangan,
              status: status,
              penagih: getDetailTagihanResult.penagih,
              idSiswa: getDetailTagihanResult.idSiswa,
              idJenisTagihan: jenisTagihan,
            };
            //ke Auth Action
            this.props.dispatch(updateTagihan(id, data));
            Swal.fire("Berhasil", `Update tagihan telah berhasil`, "success");
          }
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidUpdate(prevProps) {
    const { getDetailTagihanResult, updateTagihanResult } = this.props;

    if (
      getDetailTagihanResult &&
      prevProps.getDetailTagihanResult !== getDetailTagihanResult
    ) {
      this.setState({
        jenisTagihan: getDetailTagihanResult.idJenisTagihan,
        keterangan: getDetailTagihanResult.keterangan,
        status: getDetailTagihanResult.status,
        nominal: getDetailTagihanResult.nominal,
      });
    }

    if (
      updateTagihanResult &&
      prevProps.updateTagihanResult !== updateTagihanResult
    ) {
      this.props.history.push("/admin/tagihan");
    }
  }

  render() {
    const { jenisTagihan, keterangan, nominal, status } = this.state;

    const {
      getDetailTagihanResult,
      updateTagihanLoading,
      getListJenisTagihanResult,
    } = this.props;

    const tanggalObj = moment(getDetailTagihanResult.waktuTagihan);
    const hari = tanggalObj.format("DD");
    const bulan = tanggalObj.format("MM");
    const tahun = tanggalObj.year();
    const waktu = moment(getDetailTagihanResult.waktuTagihan).format("LT");

    return (
      <div className="content">
        <div className="page">
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={this.handleBack}
            >
              <i className="bi bi-caret-left-fill"> </i>
              Kembali
            </button>
          </div>

          <div className="card p-4">
            <div>
              <h2>Rincian Pembayaran</h2>
              <hr></hr>
            </div>

            <div>
              <p>Nama : {getDetailTagihanResult.nama}</p>
              <p>Kelas : {getDetailTagihanResult.kelas}</p>
              <p>Waktu Tagihan : {`${hari}-${bulan}-${tahun} - ${waktu}`}</p>
            </div>

            <table className="table table-bordered text-center">
              <thead className="text-primary">
                <tr>
                  <th scope="col">Waktu Tagihan</th>
                  <th scope="col">Jenis Tagihan</th>
                  <th scope="col">Nominal</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {getDetailTagihanResult ? (
                  <>
                    <tr>
                      <td>{`${hari}-${bulan}-${tahun}`}</td>
                      <td>{getDetailTagihanResult.jenisTagihan}</td>
                      <td>
                        Rp. {numberWithCommas(getDetailTagihanResult.nominal)}
                      </td>
                      <td>
                        {getDetailTagihanResult.status === "BELUM DIBAYAR" ? (
                          <p className="badge bg-danger text-wrap p-2 my-1">
                            {getDetailTagihanResult.status}
                          </p>
                        ) : (
                          <p className="badge bg-warning text-wrap p-2 my-1">
                            {getDetailTagihanResult.status}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="table-secondary">
                      <td className="fw-bold ">Total Harga</td>
                      <td className="fw-bold" colSpan={"3"} align="center">
                        Rp. {numberWithCommas(getDetailTagihanResult.nominal)}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={"4"} align="center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <form onSubmit={(event) => this.handleEditTagihan(event)}>
              {/* Form Jenis Tagihan */}
              <div className="mb-3">
                <strong>
                  Jenis Tagihan : <label style={{ color: "red" }}>*</label>
                </strong>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={jenisTagihan}
                  onChange={(event) => this.handleJenisTagihan(event)}
                  data-testid="select-kelas"
                >
                  <option value="">Pilih jenis tagihan</option>
                  {Object.keys(getListJenisTagihanResult).map((key) => {
                    return (
                      <option value={key} key={key}>
                        {getListJenisTagihanResult[key].namaJenisTagihan}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* END Form Jenis Tagihan */}

              {/* Form Jumlah Nominal Tagihan*/}
              <div className="mb-3">
                <strong htmlFor="inputNominal" className="form-label">
                  Jumlah Nominal : <label style={{ color: "red" }}>*</label>
                </strong>
                <input
                  type="number"
                  className="form-control"
                  id="inputNominal"
                  value={nominal}
                  onChange={(event) => this.handleNominal(event)}
                />
              </div>
              {/* End Form Jumlah Nominal Tagihan*/}

              {/* Form Keterangan*/}
              <div className="mb-3">
                <strong htmlFor="inputKeterangan" className="form-label">
                  Keterangan : <label style={{ color: "red" }}>*</label>
                </strong>
                <input
                  className="form-control"
                  id="inputKeterangan"
                  value={keterangan}
                  onChange={(event) => this.handleKeterangan(event)}
                />
              </div>
              {/* End Form Keterangan*/}

              {/* Form Status Pembayaran */}
              <div className="mb-3">
                <strong htmlFor="inputStatus" className="form-label">
                  Status : <label style={{ color: "red" }}>*</label>
                </strong>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={status}
                  onChange={(event) => this.handleStatusPembayaran(event)}
                  data-testid="select-status"
                >
                  <option value="">-- PILIH --</option>
                  <option value="BELUM DIBAYAR">BELUM DIBAYAR</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
              {updateTagihanLoading ? (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden"></span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    SIMPAN
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleBack}
                    style={{ color: "#FFFFFF" }}
                  >
                    BATAL
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDetailTagihanLoading: state.TagihanReducer.getDetailTagihanLoading,
  getDetailTagihanResult: state.TagihanReducer.getDetailTagihanResult,
  getDetailTagihanError: state.TagihanReducer.getDetailTagihanError,

  getListJenisTagihanLoading:
    state.jenisTagihanReducer.getListJenisTagihanLoading,
  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListJenisTagihanError: state.jenisTagihanReducer.getListJenisTagihanError,

  updateTagihanLoading: state.TagihanReducer.updateTagihanLoading,
  updateTagihanResult: state.TagihanReducer.updateTagihanResult,
  updateTagihanError: state.TagihanReducer.updateTagihanError,
});

export default connect(mapStateToProps, null)(editDataTagihan);
