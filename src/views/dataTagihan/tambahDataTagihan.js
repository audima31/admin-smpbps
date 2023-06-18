import React, { Component } from "react";
import { connect } from "react-redux";
import { getListKelas } from "store/actions/KelasAction";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { tambahTagihan } from "store/actions/TagihanAction";
import { getData } from "utils";
import { getListSiswa } from "store/actions/SiswaAction";

class tambahDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kelas: "",
      nama: "",
      jenisTagihan: "",
      nominal: "",
      keterangan: "",
      status: "BELUM DIBAYAR",
      penagih: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getListTypeTagihan());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getListSiswa());
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    const { tambahTagihanResult } = this.props;
    if (
      tambahTagihanResult &&
      prevProps.tambahTagihanResult !== tambahTagihanResult
    ) {
      this.props.history.push("/admin/tagihan");
    }
  }

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        this.setState({
          penagih: data.nama,
        });
      }
    });
  };

  handleKelas = (event) => {
    this.setState({
      kelas: event.target.value,
    });
  };

  handleNama = (event) => {
    this.setState({
      nama: event.target.value,
    });
  };

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

  handleNamaOrtu = (event) => {
    this.setState({
      namaOrangTua: event.target.value,
    });
  };

  handleNoHandphoneOrtu = (event) => {
    this.setState({
      noHandphoneOrangTua: event.target.value,
    });
  };

  handleKeterangan = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleTambahTagihan = (event) => {
    const {
      getListSiswaResult,
      getListJenisTagihanResult,
      getListKelasResult,
    } = this.props;
    const { kelas, nama, jenisTagihan, keterangan, nominal, status, penagih } =
      this.state;
    event.preventDefault();
    if (kelas && nama && jenisTagihan && nominal && keterangan) {
      // eslint-disable-next-line no-lone-blocks
      {
        Object.keys(getListKelasResult).map((x) => {
          // eslint-disable-next-line no-lone-blocks
          {
            Object.keys(getListJenisTagihanResult).map((id) => {
              // eslint-disable-next-line no-lone-blocks
              {
                Object.keys(getListSiswaResult).map((key) => {
                  if (
                    getListSiswaResult[key].uid === nama &&
                    getListJenisTagihanResult[id].jenisTagihanId ===
                      jenisTagihan &&
                    getListKelasResult[x].kelasId === kelas
                  ) {
                    const data = {
                      id: new Date().getTime() + "-" + nama,
                      kelas: getListKelasResult[x].namaKelas,
                      nama: getListSiswaResult[key].nama,
                      jenisTagihan:
                        getListJenisTagihanResult[id].namaJenisTagihan,
                      nominal: nominal,
                      keterangan: keterangan,
                      status: status,
                      penagih: penagih,
                      idSiswa: nama,
                      idJenisTagihan: jenisTagihan,
                    };
                    //ke Auth Action
                    this.props.dispatch(tambahTagihan(data));
                    Swal.fire({
                      icon: "success",
                      title: "Tagihan berhasil dibuat",
                      showConfirmButton: true,
                      timer: 1500,
                    });
                  }
                });
              }
            });
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

  render() {
    const { nama, kelas, jenisTagihan, nominal, keterangan } = this.state;
    console.log("Nama : ", nama);
    const {
      getListKelasResult,
      registerSiswaLoading,
      getListSiswaResult,
      getListJenisTagihanResult,
    } = this.props;

    return (
      <div className="content">
        <Link to="/admin/tagihan" className="btn btn-secondary">
          <i className="bi bi-caret-left-fill"> </i>
          Kembali
        </Link>
        <div className="page">
          <form onSubmit={(event) => this.handleTambahTagihan(event)}>
            {/* Form Kelas */}
            <div className="mb-3">
              <label>
                Kelas : <label className="btg-wajib">*</label>
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={kelas}
                onChange={(event) => this.handleKelas(event)}
                data-testid="select-kelas"
              >
                <option value="">Pilih kelas</option>
                {Object.keys(getListKelasResult).map((key) => {
                  return (
                    <option value={key} key={key}>
                      {getListKelasResult[key].namaKelas}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Form Nama Siswa */}
            <div className="mb-3">
              <label>
                Nama : <label className="btg-wajib">*</label>
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={nama}
                onChange={(event) => this.handleNama(event)}
                data-testid="select-kelas"
              >
                <option value="">Pilih nama</option>
                {Object.keys(getListSiswaResult).map((key) => {
                  return (
                    <>
                      {getListSiswaResult[key].kelas === kelas ? (
                        <option value={key} key={key}>
                          {getListSiswaResult[key].nama}
                        </option>
                      ) : (
                        []
                      )}
                    </>
                  );
                })}
              </select>
            </div>

            {/* Form Jenis Tagihan */}
            <div className="mb-3">
              <label>
                Jenis Tagihan : <label className="btg-wajib">*</label>
              </label>
              <select
                class="form-select"
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

            {/* Form Jumlah Nominal Tagihan*/}
            <div className="mb-3">
              <label htmlFor="inputNominal" className="form-label">
                Jumlah Nominal : <label className="btg-wajib">*</label>
              </label>
              <input
                type="number"
                className="form-control"
                id="inputNominal"
                value={nominal}
                onChange={(event) => this.handleNominal(event)}
              />
            </div>

            {/* Form Keterangna Tagihan*/}
            <div className="mb-3">
              <label htmlFor="inputNominal" className="form-label">
                Keterangan Tagihan : <label className="btg-wajib">*</label>
              </label>
              <input
                className="form-control"
                id="inputNominal"
                value={keterangan}
                onChange={(event) => this.handleKeterangan(event)}
              />
            </div>

            <div>
              {registerSiswaLoading ? (
                <button type="submit" color="primary" disabled>
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,

  getListSiswaLoading: state.SiswaReducer.getListSiswaLoading,
  getListSiswaResult: state.SiswaReducer.getListSiswaResult,
  getListSiswaError: state.SiswaReducer.getListSiswaError,

  getListJenisTagihanLoading:
    state.jenisTagihanReducer.getListJenisTagihanLoading,
  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListJenisTagihanError: state.jenisTagihanReducer.getListJenisTagihanError,

  tambahTagihanLoading: state.TagihanReducer.tambahTagihanLoading,
  tambahTagihanResult: state.TagihanReducer.tambahTagihanResult,
  tambahTagihanError: state.TagihanReducer.tambahTagihanError,
});

export default connect(mapStateToProps, null)(tambahDataTagihan);
