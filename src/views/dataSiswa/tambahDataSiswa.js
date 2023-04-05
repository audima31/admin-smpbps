import React, { Component } from "react";
import { connect } from "react-redux";
import { getListKelas } from "store/actions/KelasAction";
import { tambahSiswa } from "store/actions/SiswaAction";
import Swal from "sweetalert2";

class tambahDataSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NIS: "",
      nama: "",
      jenisKelamin: "",
      kelas: "",
      email: "",
      password: "",
      alamatRumah: "",
      noHandphoneSiswa: "",
      namaOrangTua: "",
      noHandphoneOrangTua: "",
      status: "siswa",
    };
  }

  componentDidMount() {
    this.props.dispatch(getListKelas());
  }

  handleNIS = (event) => {
    this.setState({
      NIS: event.target.value,
    });
  };

  handleNama = (event) => {
    this.setState({
      nama: event.target.value,
    });
  };

  handleJenisKelamin = (event) => {
    this.setState({
      jenisKelamin: event.target.value,
    });
  };

  handleKelas = (event) => {
    this.setState({
      kelas: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleAlamatRumah = (event) => {
    this.setState({
      alamatRumah: event.target.value,
    });
  };

  handleNoHandphoneSiswa = (event) => {
    this.setState({
      noHandphoneSiswa: event.target.value,
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

  handleBack = () => {
    this.props.history.goBack();
  };

  handleSubmit = (event) => {
    const {
      NIS,
      nama,
      jenisKelamin,
      kelas,
      email,
      password,
      alamatRumah,
      noHandphoneSiswa,
      namaOrangTua,
      noHandphoneOrangTua,
    } = this.state;
    event.preventDefault();
    if (NIS && nama && jenisKelamin && kelas && email && password.length >= 6) {
      const data = {
        NIS: NIS,
        nama: nama,
        jenisKelamin: jenisKelamin,
        kelas: kelas,
        email: email,
        password: password,
        alamatRumah: alamatRumah,
        noHandphoneSiswa: noHandphoneSiswa,
        namaOrangTua: namaOrangTua,
        noHandphoneOrangTua: noHandphoneOrangTua,
        status: "siswa",
      };
      //ke Auth Action
      this.props.dispatch(tambahSiswa(data));
    } else if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Password minimal berjumlah 6 karakter",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahSiswaResult } = this.props;

    if (
      tambahSiswaResult &&
      prevProps.tambahSiswaResult !== tambahSiswaResult
    ) {
      Swal.fire({
        icon: "success",
        title: "Akun siswa berhasil dibuat",
        showConfirmButton: true,
        timer: 1500,
      });
      this.props.history.push("/admin/siswa");
    }
  }

  render() {
    const {
      NIS,
      nama,
      jenisKelamin,
      kelas,
      email,
      password,
      alamatRumah,
      noHandphoneSiswa,
      namaOrangTua,
      noHandphoneOrangTua,
    } = this.state;
    const { getListKelasResult, tambahSiswaLoading } = this.props;

    return (
      <div className="content">
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
        <div className="page">
          <form onSubmit={(event) => this.handleSubmit(event)}>
            {/* Form NIS */}
            <div className="mb-3">
              <label htmlFor="inputNama" className="form-label">
                NIS<label className="btg-wajib">*</label> :
              </label>
              <input
                type="number"
                className="form-control"
                id="inputNIS"
                placeholder="NIS"
                data-testid="input-NIS"
                value={NIS}
                onChange={(event) => this.handleNIS(event)}
              />
            </div>

            {/* Form Nama Siswa */}
            <div className="mb-3">
              <label htmlFor="inputNama" className="form-label">
                Nama<label className="btg-wajib">*</label> :
              </label>
              <input
                className="form-control"
                id="inputNamaSiswa"
                placeholder="Nama"
                data-testid="input-namaSiswa"
                value={nama}
                onChange={(event) => this.handleNama(event)}
              />
            </div>

            {/* Form Kelas */}
            <div className="mb-3">
              <label>
                Kelas<label className="btg-wajib">*</label> :
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={kelas}
                onChange={(event) => this.handleKelas(event)}
                data-testid="select-kelas"
              >
                <option value="">-- PILIH --</option>
                {Object.keys(getListKelasResult).map((key) => {
                  return (
                    <option value={key} key={key}>
                      {getListKelasResult[key].namaKelas}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Form Jenis Kelamin */}
            <div className="mb-3">
              <label>
                Jenis Kelamin<label className="btg-wajib">*</label> :
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={jenisKelamin}
                onChange={(event) => this.handleJenisKelamin(event)}
                data-testid="select-jenisKelamin"
              >
                <option value="">-- PILIH --</option>
                <option value="Laki-laki">Laki - laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Form Email */}
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email<label className="btg-wajib">*</label> :
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmailSiswa"
                data-testid="input-emailSiswa"
                value={email}
                onChange={(event) => this.handleEmail(event)}
              />
            </div>

            {/* Form Password */}
            <div className="mb-3">
              <label htmlFor="inputPasswordSiswa" className="form-label">
                Password<label className="btg-wajib">*</label> :
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordSiswa"
                value={password}
                onChange={(event) => this.handlePassword(event)}
              />
            </div>

            {/* Form Alamat Rumah */}
            <div className="mb-3">
              <label htmlFor="inputAlamatRumah" className="form-label">
                Alamat Rumah :
              </label>

              <textarea
                className="form-control textArea"
                id="inputAlamatRumah"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                rows="3"
                value={alamatRumah}
                onChange={(event) => this.handleAlamatRumah(event)}
              />
            </div>

            {/* Form No Handphone Siswa */}
            <div className="mb-3">
              <label htmlFor="inputNoHandphoneSiswa" className="form-label">
                No. Handphone
              </label>
              <input
                type={"number"}
                className="form-control"
                id="inputNoHandphoneSiswa"
                value={noHandphoneSiswa}
                onChange={(event) => this.handleNoHandphoneSiswa(event)}
              />
            </div>

            {/* Form Nama Orang Tua */}
            <div className="mb-3">
              <label htmlFor="inputNamaOrangTua" className="form-label">
                Nama Orang Tua
              </label>
              <input
                className="form-control"
                id="inputNamaOrangTua"
                value={namaOrangTua}
                onChange={(event) => this.handleNamaOrtu(event)}
              />
            </div>

            {/* Form No Handphone Orang Tua */}
            <div className="mb-3">
              <label htmlFor="inputNoHandphoneOrangTua" className="form-label">
                No. Handphone Orang Tua
              </label>
              <input
                type={"number"}
                className="form-control"
                id="inputNoHandphoneOrangTua"
                value={noHandphoneOrangTua}
                onChange={(event) => this.handleNoHandphoneOrtu(event)}
              />
            </div>

            <div>
              {tambahSiswaLoading ? (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button type="submit" color="primary" disabled>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
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
  tambahSiswaLoading: state.SiswaReducer.tambahSiswaLoading,
  tambahSiswaResult: state.SiswaReducer.tambahSiswaResult,
  tambahSiswaError: state.SiswaReducer.tambahSiswaError,

  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,
});

export default connect(mapStateToProps, null)(tambahDataSiswa);
