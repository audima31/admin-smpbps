import React, { Component } from "react";
import { connect } from "react-redux";
import { getListSiswa } from "store/actions/AuthAction";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getListKelas } from "store/actions/KelasAction";
import { lunasTagihan } from "store/actions/TagihanAction";
import {
  getDetailSiswaTagihan,
  getDetailTagihan,
} from "store/actions/TagihanAction";
import Swal from "sweetalert2";

class detailDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.match.params.key,
      id: this.props.match.params.id,
      status: false,
    };
  }

  componentDidMount() {
    const { key, id } = this.state;
    console.log("key ", key);
    console.log("id ", id);

    this.props.dispatch(getDetailTagihan(key, id));
    this.props.dispatch(getDetailSiswaTagihan(key));
    this.props.dispatch(getListTypeTagihan());
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListKelas());
  }

  handleSubmit = (event) => {
    const { status, key, id } = this.state;
    console.log("Status : ", status);

    event.preventDefault();

    const data = {
      status: "LUNAS",
    };
    console.log("data submit : ", data);
    this.props.dispatch(lunasTagihan(key, id, data));
  };

  componentDidUpdate(prevProps) {
    const {
      getDetailTagihanResult,
      lunasTagihanResult,
      getDetailSiswaTagihanResult,
    } = this.props;

    if (
      getDetailTagihanResult &&
      prevProps.getDetailTagihanResult !== getDetailTagihanResult
    ) {
      this.setState({
        status: getDetailTagihanResult.status,
      });
    }

    if (
      lunasTagihanResult &&
      prevProps.lunasTagihanResult !== lunasTagihanResult
    ) {
      Swal.fire(
        "Berhasil",
        `Tagihan ${getDetailSiswaTagihanResult.nama} telah lunas`,
        "success"
      );
      this.props.history.push("/admin/tagihan");
    }
  }

  render() {
    const {
      getDetailTagihanResult,
      getDetailSiswaTagihanResult,
      getListJenisTagihanResult,
      lunasTagihanLoading,
      getListSiswaResult,
      getListKelasResult,
    } = this.props;

    return (
      <div className="content">
        <div className="page">
          <div className="mt-3">
            <a
              href={"/admin/tagihan/"}
              style={{ color: "#FFFFFF" }}
              className="btn btn-warning"
            >
              <i className="bi bi-caret-left-fill"> </i>
              KEMBALI
            </a>
          </div>

          <div className="card p-4">
            <h2 className=" mt-4 ml-3">Rincian Pembayaran</h2>
            <hr></hr>
            <div className="ml-3">
              <p>
                Nama :{" "}
                {getListSiswaResult ? (
                  Object.keys(getListSiswaResult).map((id) => {
                    return (
                      <>
                        {getListSiswaResult[id].uid ===
                        getDetailSiswaTagihanResult.nama
                          ? getListSiswaResult[id].nama
                          : []}
                      </>
                    );
                  })
                ) : (
                  <>Nama Siswa Tidak Ditemukan</>
                )}
              </p>
              <p>
                Kelas :{" "}
                {getListKelasResult ? (
                  Object.keys(getListKelasResult).map((id) => {
                    return (
                      <>
                        {getListKelasResult[id].kelasId ===
                        getDetailSiswaTagihanResult.kelas
                          ? getListKelasResult[id].namaKelas
                          : []}
                      </>
                    );
                  })
                ) : (
                  <>Kelas Tidak Ditemukan</>
                )}
              </p>
            </div>
            <table className="table table-bordered text-center">
              <thead className="text-primary">
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jenis Tagihan</th>
                  <th scope="col">Nominal</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {getDetailTagihanResult ? (
                  <>
                    <tr>
                      <td>{getDetailTagihanResult.waktu}</td>
                      <td>
                        {Object.keys(getListJenisTagihanResult).map((key) => {
                          return (
                            <p key={key}>
                              {getListJenisTagihanResult[key].jenisTagihanId ===
                              getDetailTagihanResult.jenisTagihan
                                ? getListJenisTagihanResult[key]
                                    .namaJenisTagihan
                                : []}
                            </p>
                          );
                        })}
                      </td>
                      <td>{getDetailTagihanResult.nominal}</td>
                      <td>
                        <p className="badge bg-danger text-wrap p-2 my-1">
                          {getDetailTagihanResult.status}
                        </p>
                      </td>
                    </tr>
                    <tr className="table-secondary">
                      <td className="fw-bold ">Total Harga</td>
                      <td className="fw-bold" colSpan={"3"} align="center">
                        {getDetailTagihanResult.nominal}
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

            <div>
              {lunasTagihanLoading ? (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden"></span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="vstack gap-2 col-md-5 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(event) => this.handleSubmit(event)}
                  >
                    BAYAR SEKARANG
                  </button>
                  <a
                    href={"/admin/tagihan/"}
                    style={{ color: "#FFFFFF" }}
                    className="btn btn-danger"
                  >
                    BATAL
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDetailSiswaTagihanLoading:
    state.TagihanReducer.getDetailSiswaTagihanLoading,
  getDetailSiswaTagihanResult: state.TagihanReducer.getDetailSiswaTagihanResult,
  getDetailSiswaTagihanError: state.TagihanReducer.getDetailSiswaTagihanError,

  getDetailTagihanLoading: state.TagihanReducer.getDetailTagihanLoading,
  getDetailTagihanResult: state.TagihanReducer.getDetailTagihanResult,
  getDetailTagihanError: state.TagihanReducer.getDetailTagihanError,

  getListJenisTagihanLoading:
    state.jenisTagihanReducer.getListJenisTagihanLoading,
  getListJenisTagihanResult:
    state.jenisTagihanReducer.getListJenisTagihanResult,
  getListJenisTagihanError: state.jenisTagihanReducer.getListJenisTagihanError,

  lunasTagihanLoading: state.TagihanReducer.lunasTagihanLoading,
  lunasTagihanResult: state.TagihanReducer.lunasTagihanResult,
  lunasTagihanError: state.TagihanReducer.getDetailTagihanError,

  getListSiswaResult: state.AuthReducer.getListSiswaResult,
  getListKelasResult: state.KelasReducer.getListKelasResult,
});

export default connect(mapStateToProps, null)(detailDataTagihan);
