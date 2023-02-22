import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAdmin } from "store/actions/AuthAction";
import { updateProfile } from "store/actions/ProfileAction";
import Swal from "sweetalert2";
import { getData } from "utils";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      NBM: "",
      nama: "",
      email: "",
      status: "admin",
    };
  }

  componentDidMount() {
    this.getUserData();
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

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        this.setState({
          uid: data.uid,
          NBM: data.NBM,
          nama: data.nama,
          email: data.email,
        });
      }
    });
  };

  handleSubmit = (event) => {
    const { NBM, nama, email, uid } = this.state;
    event.preventDefault();
    if (NBM && nama && email) {
      const data = {
        NBM: NBM,
        nama: nama,
        uid: uid,
        email: email,
      };
      this.props.dispatch(updateProfile(data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { updateProfileResult } = this.props;

    if (
      updateProfileResult &&
      prevProps.updateProfileResult !== updateProfileResult
    ) {
      Swal.fire({
        icon: "success",
        title: "Update profile berhasil",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  }

  render() {
    const { NBM, nama, email } = this.state;
    const { updateProfileLoading } = this.props;

    console.log("NBM : ", NBM);
    return (
      <div className="content">
        <div className="d-flex justify-content-center">
          <div
            className="card"
            style={{ width: "40%", padding: "2em", marginTop: "3%" }}
          >
            <div>
              <a href={"/admin/dashboard"}> {"<- Kembali"}</a>
            </div>
            <h5 className="text-center text-primary">Edit Profile</h5>
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
                  disabled
                  className="form-control"
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
                  disabled
                  type="email"
                  className="form-control"
                  placeholder="admin@gmail.com"
                  id="inputEmailAdmin"
                  data-testid="input-emailAdmin"
                  value={email}
                  onChange={(event) => this.handleEmail(event)}
                />
              </div>

              {updateProfileLoading ? (
                <div className="vstack gap-2 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden"></span>
                    </div>
                  </button>
                </div>
              ) : (
                <>
                  <div className="vstack gap-2 mx-auto mt-4">
                    <button type="submit" className="btn btn-primary">
                      SIMPAN
                    </button>
                  </div>

                  <a href="/admin/edit-profile/ubahPassword">
                    <div className="text-center mt-4">
                      <p>Change password</p>
                    </div>
                  </a>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);
