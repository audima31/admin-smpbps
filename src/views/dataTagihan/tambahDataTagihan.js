import React, { Component } from "react";
import { getListSiswa } from "../../store/actions/AuthAction";
import { connect } from "react-redux";
import { getListKelas } from "store/actions/KelasAction";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListBulan } from "store/actions/WaktuAction";
import { tambahTagihan } from "store/actions/TagihanAction";
import { getData } from "utils";

class tambahDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kelas: "",
      nama: "",
      jenisTagihan: "",
      bulan: "",
      tahun: "",
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
    this.props.dispatch(getListBulan());
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

  handleBulan = (event) => {
    this.setState({
      bulan: event.target.value,
    });
  };

  handleTahun = (event) => {
    this.setState({
      tahun: event.target.value,
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

  handleSubmit = (event) => {
    const {
      kelas,
      nama,
      jenisTagihan,
      bulan,
      tahun,
      keterangan,
      nominal,
      status,
      penagih,
    } = this.state;
    event.preventDefault();
    if (
      kelas &&
      nama &&
      jenisTagihan &&
      nominal &&
      bulan &&
      tahun &&
      keterangan
    ) {
      const data = {
        id: new Date().getTime() + "-" + nama,
        kelas: kelas,
        nama: nama,
        jenisTagihan: jenisTagihan,
        bulan: bulan,
        tahun: tahun,
        nominal: nominal,
        keterangan: keterangan,
        status: status,
        penagih: penagih,
      };
      //ke Auth Action
      this.props.dispatch(tambahTagihan(data));
      Swal.fire("Tagihan berhasil dibuat", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  render() {
    const {
      nama,
      kelas,
      jenisTagihan,
      nominal,
      bulan,
      tahun,
      keterangan,
      penagih,
    } = this.state;
    console.log("Nama kelas : ", kelas);
    console.log("Penagih : ", penagih);
    const {
      getListKelasResult,
      registerSiswaLoading,
      getListSiswaResult,
      getListBulanResult,
      getListJenisTagihanResult,
    } = this.props;

    return (
      <div className="content">
        <Link to="/admin/tagihan" className="btn btn-secondary">
          <i className="bi bi-caret-left-fill"> </i>
          Kembali
        </Link>
        <div className="page">
          <form onSubmit={(event) => this.handleSubmit(event)}>
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

            {/* Form Bulan */}
            <div className="mb-3">
              <label>
                Bulan : <label className="btg-wajib">*</label>
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={bulan}
                onChange={(event) => this.handleBulan(event)}
                data-testid="select-kelas"
              >
                <option value="">-- PILIH --</option>
                <option value={"Januari"}>Januari</option>
                <option value={"Februari"}>Februari</option>
                <option value={"Maret"}>Maret</option>
                <option value={"April"}>April</option>
                <option value={"Mei"}>Mei</option>
                <option value={"Juni"}>Juni</option>
                <option value={"Juli"}>Juli</option>
                <option value={"Agustus"}>Agustus</option>
                <option value={"September"}>September</option>
                <option value={"Oktober"}>Oktober</option>
                <option value={"November"}>November</option>
                <option value={"Desember"}>Desember</option>
              </select>
            </div>

            {/* Form Tahun */}
            <div className="mb-3">
              <label>
                Tahun : <label className="btg-wajib">*</label>
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={tahun}
                onChange={(event) => this.handleTahun(event)}
                data-testid="select-kelas"
              >
                <option value="">-- PILIH --</option>
                <option value={"2023"}>2023</option>
                <option value={"2024"}>2024</option>
                <option value={"2025"}>2025</option>
                <option value={"2026"}>2026</option>
                <option value={"2027"}>2027</option>
                <option value={"2028"}>2028</option>
                <option value={"2029"}>2029</option>
                <option value={"2030"}>2030</option>
                <option value={"2031"}>2031</option>
                <option value={"2032"}>2032</option>
                <option value={"2033"}>2033</option>
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
                    Submit
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

  getListSiswaLoading: state.AuthReducer.getListSiswaLoading,
  getListSiswaResult: state.AuthReducer.getListSiswaResult,
  getListSiswaError: state.AuthReducer.getListSiswaError,

  getListJenisTagihanLoading:
    state.jenisTagihanReducer.getListJenisTagihanLoading,
  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListJenisTagihanError: state.jenisTagihanReducer.getListJenisTagihanError,

  getListBulanResult: state.WaktuReducer.getListBulanResult,

  tambahTagihanLoading: state.TagihanReducer.tambahTagihanLoading,
  tambahTagihanResult: state.TagihanReducer.tambahTagihanLoading,
  tambahTagihanError: state.TagihanReducer.tambahTagihanLoading,
});

export default connect(mapStateToProps, null)(tambahDataTagihan);
