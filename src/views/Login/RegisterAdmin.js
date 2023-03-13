import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAdmin } from "store/actions/AuthAction";
import Swal from "sweetalert2";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NBM: "",
      nama: "",
      email: "",
      password: "",
      status: "admin",
    };
  }

  handleNBM = (event) => {
    this.setState({
      NBM: event.target.value,
    });
  };

  handleNama = (event) => {
    this.setState({
      nama: event.target.value,
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

  handleSubmit = (event) => {
    const { NBM, nama, email, password } = this.state;
    event.preventDefault();
    if (NBM && nama && email && password) {
      const data = {
        NBM: NBM,
        nama: nama,
        email: email,
        password: password,
        status: "admin",
      };
      //ke Auth Action
      this.props.dispatch(registerAdmin(data));
      Swal.fire({
        icon: "success",
        title: "Akun admin berhasil dibuat",
        showConfirmButton: false,
      });
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
    const { registerAdminResult } = this.props;

    if (
      registerAdminResult &&
      prevProps.registerAdminResult !== registerAdminResult
    ) {
      window.location = "/admin/dashboard";
    }
  }

  render() {
    const { NBM, nama, email, password } = this.state;
    const { registerAdminLoading } = this.props;

    return (
      <div className="content">
        <div
          className="card"
          style={{ width: "40%", padding: "2em", marginTop: "3%" }}
        >
          <h5 className="text-center text-primary">Daftar Akun Admin</h5>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            {/* Form NBM */}
            <div className="mb-3">
              <label
                htmlFor="inputNama"
                className="form-label text-dark fw-bold"
              >
                NBM : <label className="text-danger">*</label>
              </label>
              <input
                className="form-control"
                type="number"
                id="inputNBM"
                placeholder="Masukan NBM"
                data-testid="input-NBM"
                value={NBM}
                onChange={(event) => this.handleNBM(event)}
              />
            </div>
            {/* Form Nama Admin */}
            <div className="mb-3">
              <label
                htmlFor="inputNama"
                className="form-label text-dark fw-bold"
              >
                Nama : <label className="text-danger">*</label>
              </label>
              <input
                className="form-control"
                id="inputNamaAdmin"
                placeholder="Masukan nama"
                data-testid="input-namaAdmin"
                value={nama}
                onChange={(event) => this.handleNama(event)}
              />
            </div>
            {/* Form Email */}
            <div className="mb-3">
              <label
                htmlFor="inputEmail"
                className="form-label text-dark fw-bold"
              >
                Email : <label className="text-danger">*</label>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@gmail.com"
                id="inputEmailAdmin"
                data-testid="input-emailAdmin"
                value={email}
                onChange={(event) => this.handleEmail(event)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputPasswordAdmin"
                className="form-label text-dark fw-bold"
              >
                Password : <label className="text-danger">*</label>
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordAdmin"
                value={password}
                onChange={(event) => this.handlePassword(event)}
              />
            </div>
            {registerAdminLoading ? (
              <div className="vstack gap-2 mx-auto">
                <button type="submit" className="btn btn-primary">
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="vstack gap-2 mx-auto">
                <button type="submit" className="btn btn-primary">
                  SIMPAN
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={this.handleBack}
                >
                  BATAL
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerAdminLoading: state.AuthReducer.registerAdminLoading,
  registerAdminResult: state.AuthReducer.registerAdminResult,
  registerAdminError: state.AuthReducer.registerAdminError,
});

export default connect(mapStateToProps, null)(RegisterAdmin);
