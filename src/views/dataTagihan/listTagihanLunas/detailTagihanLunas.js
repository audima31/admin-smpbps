import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { getDetailTagihanLunas } from "store/actions/PaymentAction";
import { numberWithCommas } from "utils";

class detailTagihanLunas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idTagihanLunas: this.props.match.params.id,
    };
  }

  componentDidMount() {
    const { idTagihanLunas } = this.state;
    console.log("id:", idTagihanLunas);
    this.props.dispatch(getDetailTagihanLunas(idTagihanLunas));
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { getDetailTagihanLunasResult, getDetailTagihanLunasLoading } =
      this.props;

    const tagihanObj = moment(getDetailTagihanLunasResult.waktuTagihan);
    const hariTagihan = tagihanObj.format("DD");
    const bulanTagihan = tagihanObj.format("MM");
    const tahunTagihan = tagihanObj.year();

    const pembayaranObj = moment(getDetailTagihanLunasResult.waktuPembayaran);
    const hariPembayaran = pembayaranObj.format("DD");
    const bulanPembayaran = pembayaranObj.format("MM");
    const tahunPembayaran = pembayaranObj.year();
    const waktuPembayaran = moment(
      getDetailTagihanLunasResult.waktuPembayaran
    ).format("LT");

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

        <div className="card">
          {getDetailTagihanLunasResult ? (
            <>
              <div className=" ps-4">
                <label className="mt-4 ml-3 text-dark fw-bold fs-5">
                  {getDetailTagihanLunasResult.nama}
                </label>
                <label className="text-secondary fw-bold fs-6 ml-2">
                  {getDetailTagihanLunasResult.kelas}
                </label>
                <hr></hr>

                <div className="row">
                  <div className="col-3">
                    <p>Status Pembayaran</p>
                    <p>Metode Pembayaran</p>
                    <p>Jenis Tagihan</p>
                    <p>Order ID</p>
                    <p>Nominal</p>
                    <p className="mb-5">Keterangan</p>
                    <p>Waktu Tagihan</p>
                    <p>Waktu Pembayaran</p>
                    <p>Penagih</p>
                  </div>
                  <div className="col">
                    <p>: {getDetailTagihanLunasResult.status} </p>
                    <p>: {getDetailTagihanLunasResult.metodePembayaran}</p>
                    <p>: {getDetailTagihanLunasResult.jenisTagihan}</p>
                    <p>: {getDetailTagihanLunasResult.order_id}</p>
                    <p>
                      : Rp.{" "}
                      {numberWithCommas(getDetailTagihanLunasResult.nominal)}
                    </p>
                    <p className="mb-5">
                      : {getDetailTagihanLunasResult.keterangan}
                    </p>
                    <p>: {`${hariTagihan}-${bulanTagihan}-${tahunTagihan}`}</p>
                    <p>
                      :
                      {getDetailTagihanLunasResult.waktuPembayaran
                        ? `${hariPembayaran}-${bulanPembayaran}-${tahunPembayaran} - ${waktuPembayaran}`
                        : "Dalam proses pembayaran"}
                    </p>
                    <p>: {getDetailTagihanLunasResult.penagih}</p>
                  </div>
                </div>
              </div>
            </>
          ) : getDetailTagihanLunasLoading ? (
            <>
              <div align="center">
                <Spinner color="primary">Loading...</Spinner>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDetailTagihanLunasLoading:
    state.PaymentReducer.getDetailTagihanLunasLoading,
  getDetailTagihanLunasResult: state.PaymentReducer.getDetailTagihanLunasResult,
  getDetailTagihanLunasError: state.PaymentReducer.getDetailTagihanLunasError,
});

export default connect(mapStateToProps, null)(detailTagihanLunas);
