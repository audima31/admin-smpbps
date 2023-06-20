import React, { Component } from "react";
import { connect } from "react-redux";
import { getListKelas } from "store/actions/KelasAction";
import Swal from "sweetalert2";
import { getDetailSiswa } from "store/actions/SiswaAction";
import { updateSiswa } from "store/actions/SiswaAction";
import "../../assets/css/dataSiswa.css";

class editDataSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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
    this.props.dispatch(getDetailSiswa(this.props.match.params.id));
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

  handleEditSiswa = (event) => {
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
      id,
    } = this.state;
    event.preventDefault();
    if (NIS && nama && jenisKelamin && kelas && email && password) {
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
        id: id,
        status: "siswa",
      };
      //ke Auth Action
      this.props.dispatch(updateSiswa(data));
    } else if (
      !NIS ||
      !nama ||
      !jenisKelamin ||
      !kelas ||
      !email ||
      !password
    ) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Terdapat data wajib yang belum terisi",
      });
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidUpdate(prevProps) {
    const { detailSiswaResult, updateSiswaResult } = this.props;
    if (
      detailSiswaResult &&
      prevProps.detailSiswaResult !== detailSiswaResult
    ) {
      this.setState({
        NIS: detailSiswaResult.NIS,
        nama: detailSiswaResult.nama,
        jenisKelamin: detailSiswaResult.jenisKelamin,
        email: detailSiswaResult.email,
        password: detailSiswaResult.password,
        alamatRumah: detailSiswaResult.alamatRumah,
        noHandphoneSiswa: detailSiswaResult.noHandphoneSiswa,
        namaOrangTua: detailSiswaResult.namaOrangTua,
        noHandphoneOrangTua: detailSiswaResult.noHandphoneOrangTua,
        kelas: detailSiswaResult.kelas,
      });
    }
    if (
      updateSiswaResult &&
      prevProps.updateSiswaResult !== updateSiswaResult
    ) {
      Swal.fire("Good job!", "Update siswa telah berhasil", "success");
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
    const { updateSiswaLoading, getListKelasResult } = this.props;

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
          <form onSubmit={(event) => this.handleEditSiswa(event)}>
            {/* Form NIS */}
            <div className="mb-3">
              <label htmlFor="inputNama" className="form-label">
                NIS<label className="btg-wajib">*</label> :
              </label>
              <input
                className="form-control"
                type="number"
                id="inputNIS"
                placeholder="NIS"
                data-testid="input-NIS"
                value={NIS}
                onChange={(event) => this.handleNIS(event)}
                required
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
                required
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
                required
              >
                <option value="">--Pilih--</option>
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
                required
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
                disabled
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
                disabled
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
                className="form-control"
                id="inputNoHandphoneOrangTua"
                value={noHandphoneOrangTua}
                onChange={(event) => this.handleNoHandphoneOrtu(event)}
              />
            </div>

            <div>
              {updateSiswaLoading ? (
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
  getListKelasResult: state.KelasReducer.getListKelasResult,

  updateSiswaLoading: state.SiswaReducer.updateSiswaLoading,
  updateSiswaResult: state.SiswaReducer.updateSiswaResult,
  updateSiswaError: state.SiswaReducer.updateSiswaError,

  detailSiswaLoading: state.SiswaReducer.detailSiswaLoading,
  detailSiswaResult: state.SiswaReducer.detailSiswaResult,
  detailSiswaError: state.SiswaReducer.detailSiswaError,
});

export default connect(mapStateToProps, null)(editDataSiswa);
