import React, { Component } from "react";
import { connect } from "react-redux";
import { changePassword } from "store/actions/ProfileAction";
import Swal from "sweetalert2";
import { getData } from "utils";

class ubahPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      password: "",
      email: "",
      newPassword: "",
      newPasswordConfirmation: "",
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleNewPassword = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };

  handleNewPasswordConfirmation = (event) => {
    this.setState({
      newPasswordConfirmation: event.target.value,
    });
  };

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        this.setState({
          uid: data.uid,
          email: data.email,
        });
      }
    });
  };

  handleSubmit = (event) => {
    const { uid, email, password, newPassword, newPasswordConfirmation } =
      this.state;
    event.preventDefault();

    if (newPassword !== newPasswordConfirmation) {
      Swal.fire(
        "Gagal",
        "Password baru dan Password baru konfirmasi tidak sesuai!",
        "error"
      );
    } else if (newPassword.length <= 5 && newPasswordConfirmation <= 5) {
      Swal.fire("Gagal", "Password baru minimal sepanjang 6 digit", "error");
    } else if (password && newPassword && newPasswordConfirmation) {
      const parameter = {
        uid: uid,
        email: email,
        password: password,
        newPassword: newPassword,
      };

      this.props.dispatch(changePassword(parameter));
    } else {
      Swal.fire(
        "Gagal",
        "Password Lama, Password Baru dan Konfirmasi Password Baru Harus Diisi!",
        "error"
      );
    }
  };

  componentDidUpdate(prevProps) {
    const { changePasswordResult } = this.props;

    if (
      changePasswordResult &&
      prevProps.changePasswordResult !== changePasswordResult
    ) {
      Swal.fire("Berhasil", "Ganti Password Berhasil", "success");
    }
  }

  render() {
    const { password, newPassword, newPasswordConfirmation } = this.state;
    const { changePasswordLoading } = this.props;
    return (
      <div className="content ">
        <div
          className="card "
          style={{ width: "40%", padding: "2em", marginTop: "3%" }}
        >
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="mb-3">
              <strong htmlFor="inputNominal" className="form-label">
                Password lama : <label style={{ color: "red" }}>*</label>
              </strong>
              <input
                className="form-control"
                type="password"
                id="inputNominal"
                value={password}
                onChange={(event) => this.handlePassword(event)}
              />
            </div>
            <div className="mb-3">
              <strong htmlFor="inputNominal" className="form-label">
                Password baru : <label style={{ color: "red" }}>*</label>
              </strong>
              <input
                className="form-control"
                type="password"
                id="inputNominal"
                value={newPassword}
                onChange={(event) => this.handleNewPassword(event)}
              />
            </div>
            <div className="mb-3">
              <strong htmlFor="inputNominal" className="form-label">
                Konfirmasi password baru :{" "}
                <label style={{ color: "red" }}>*</label>
              </strong>
              <input
                className="form-control"
                type="password"
                id="inputNominal"
                value={newPasswordConfirmation}
                onChange={(event) => this.handleNewPasswordConfirmation(event)}
              />
            </div>
            {changePasswordLoading ? (
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
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  changePasswordLoading: state.ProfileReducer.changePasswordLoading,
  changePasswordResult: state.ProfileReducer.changePasswordResult,
  changePasswordError: state.ProfileReducer.changePasswordError,
});
export default connect(mapStateToProps, null)(ubahPassword);
