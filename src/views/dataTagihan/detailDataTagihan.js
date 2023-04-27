import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { pembayaranTunai } from "store/actions/TagihanAction";
import { getDetailTagihan } from "store/actions/TagihanAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";

class detailDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      status: false,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    console.log("id ", id);

    this.props.dispatch(getDetailTagihan(id));
  }

  handleTunai = (order_id) => {
    const { status, id } = this.state;
    console.log("Status : ", status);
    // event.preventDefault();

    const data = {
      status: "LUNAS",
    };
    Swal.fire({
      title: "Apakah anda yakin melunaskan pembayaran?",
      text: "Anda tidak dapat mengembalikan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, lunaskan pembayaran!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.dispatch(pembayaranTunai(id, data, order_id));
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { getDetailTagihanResult, pembayaranTunaiResult } = this.props;

    if (
      getDetailTagihanResult &&
      prevProps.getDetailTagihanResult !== getDetailTagihanResult
    ) {
      this.setState({
        status: getDetailTagihanResult.status,
      });
    }

    if (
      pembayaranTunaiResult &&
      prevProps.pembayaranTunaiResult !== pembayaranTunaiResult
    ) {
      Swal.fire("Berhasil", `Tagihan telah lunas`, "success");
      this.props.history.push("/admin/tagihan");
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { getDetailTagihanResult, pembayaranTunaiLoading } = this.props;

    const tanggalObj = moment(getDetailTagihanResult.waktuTagihan);
    const hari = tanggalObj.format("DD");
    const bulan = tanggalObj.format("MM");
    const tahun = tanggalObj.year();
    const waktu = moment(getDetailTagihanResult.waktuTagihan).format("LT");

    console.log("Data Tagihan Detail : ", getDetailTagihanResult);

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
            <h2 className=" mt-4 ml-3">Rincian Pembayaran</h2>
            <hr></hr>
            <div className="ml-3">
              <p>Nama : {getDetailTagihanResult.nama}</p>
              <p>Kelas : {getDetailTagihanResult.kelas}</p>
              <p>Waktu Tagihan : {`${hari}-${bulan}-${tahun} - ${waktu}`}</p>
              <p>Keterangan : {getDetailTagihanResult.keterangan}</p>
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
                        ) : getDetailTagihanResult.status === "PENDING" ? (
                          <p className="badge bg-warning text-wrap p-2 my-1">
                            {getDetailTagihanResult.status}
                          </p>
                        ) : (
                          <></>
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

            <div>
              {pembayaranTunaiLoading ? (
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
                    onClick={() =>
                      this.handleTunai(
                        getDetailTagihanResult.order_id
                          ? getDetailTagihanResult.order_id
                          : ""
                      )
                    }
                  >
                    BAYAR TUNAI
                  </button>
                  <button
                    onClick={this.handleBack}
                    style={{ color: "#FFFFFF" }}
                    className="btn btn-danger"
                  >
                    BATAL
                  </button>
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
  getDetailTagihanLoading: state.TagihanReducer.getDetailTagihanLoading,
  getDetailTagihanResult: state.TagihanReducer.getDetailTagihanResult,
  getDetailTagihanError: state.TagihanReducer.getDetailTagihanError,

  pembayaranTunaiLoading: state.TagihanReducer.pembayaranTunaiLoading,
  pembayaranTunaiResult: state.TagihanReducer.pembayaranTunaiResult,
  pembayaranTunaiError: state.TagihanReducer.pembayaranTunaiError,
});

export default connect(mapStateToProps, null)(detailDataTagihan);
