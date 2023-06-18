import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { listPembayaranSiswa } from "store/actions/PaymentAction";
import moment from "moment/moment";

class menuLaporan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bulan: "",
      tahun: "",
    };

    this.tableRef = React.createRef(null);
  }

  componentDidMount() {
    this.props.dispatch(listPembayaranSiswa());
  }

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

  handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Download data keuangan telah berhasil",
    });
  };

  render() {
    const { listPembayaranSiswaResult } = this.props;
    const { bulan, tahun } = this.state;

    return (
      <div className="content">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className=" px-4">
                <h5 className="mt-4  text-primary fw-bold">
                  Laporan Pembayaran
                </h5>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                  {/* Form Bulan */}
                  <div className="mb-3">
                    <label className="text-dark">
                      Bulan : <label className="text-danger">*</label>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={bulan}
                      onChange={(event) => this.handleBulan(event)}
                      data-testid="select-kelas"
                    >
                      <option value="">-- Bulan --</option>
                      <option value={"01"}>Januari</option>
                      <option value={"02"}>Februari</option>
                      <option value={"03"}>Maret</option>
                      <option value={"04"}>April</option>
                      <option value={"05"}>Mei</option>
                      <option value={"06"}>Juni</option>
                      <option value={"07"}>Juli</option>
                      <option value={"08"}>Agustus</option>
                      <option value={"09"}>September</option>
                      <option value={"10"}>Oktober</option>
                      <option value={"11"}>November</option>
                      <option value={"12"}>Desember</option>
                    </select>
                  </div>

                  {/* Form Tahun */}
                  <div className="mb-3">
                    <label className="text-dark">
                      Tahun : <label className="text-danger">*</label>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={tahun}
                      onChange={(event) => this.handleTahun(event)}
                      data-testid="select-kelas"
                    >
                      <option value="">-- Tahun --</option>
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

                  {/* Button Download */}
                  <div className="vstack gap-2  mx-auto">
                    <DownloadTableExcel
                      filename={
                        "Laporan keuangan " +
                        " " +
                        "Bulan " +
                        this.state.bulan +
                        " " +
                        "Tahun " +
                        this.state.tahun
                      }
                      sheet={
                        "Bulan " +
                        this.state.bulan +
                        " " +
                        "Tahun " +
                        this.state.tahun
                      }
                      currentTableRef={this.tableRef.current}
                    >
                      <button type="submit" className="btn btn-primary">
                        <i class="bi bi-filetype-xls"></i> Unduh Laporan
                      </button>
                    </DownloadTableExcel>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 card">
            <table
              ref={this.tableRef}
              className="table table-hover text-center"
              style={{ fontSize: "12px" }}
            >
              <thead className="text-primary">
                <tr>
                  <th style={{ fontSize: "12px" }}>Tanggal Pembayaran</th>
                  <th style={{ fontSize: "12px" }}>Nama</th>
                  <th style={{ fontSize: "12px" }}>Kelas</th>
                  <th style={{ fontSize: "12px" }}>Jenis Tagihan</th>
                  <th style={{ fontSize: "12px" }}>Metode Pembayaran</th>
                  <th style={{ fontSize: "12px" }}>Keterangan</th>
                  <th style={{ fontSize: "12px" }}>Status</th>
                  <th style={{ fontSize: "12px" }}>Nominal</th>
                </tr>
              </thead>
              <tbody>
                {listPembayaranSiswaResult ? (
                  Object.keys(listPembayaranSiswaResult).map((key) => {
                    //Ngambil data bulan dan tahun dari pembayaran siswa
                    const tanggal =
                      listPembayaranSiswaResult[key].waktuPembayaran;
                    const tanggalObj = moment(tanggal);
                    const hari = tanggalObj.format("DD");
                    const bulan = tanggalObj.format("MM");
                    const tahun = tanggalObj.year();

                    return (
                      <>
                        {listPembayaranSiswaResult[key].status === "LUNAS" &&
                        bulan.toString() === this.state.bulan &&
                        tahun.toString() === this.state.tahun ? (
                          <>
                            <tr>
                              <td>{`${hari}-${bulan}-${tahun}`}</td>
                              <td>{listPembayaranSiswaResult[key].nama}</td>
                              <td>{listPembayaranSiswaResult[key].kelas}</td>
                              <td>
                                {listPembayaranSiswaResult[key].jenisTagihan}
                              </td>
                              <td>
                                {
                                  listPembayaranSiswaResult[key]
                                    .metodePembayaran
                                }
                              </td>
                              <td>
                                {listPembayaranSiswaResult[key].keterangan}
                              </td>
                              <td>{listPembayaranSiswaResult[key].status}</td>
                              <td>{listPembayaranSiswaResult[key].nominal}</td>
                            </tr>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listPembayaranSiswaLoading: state.PaymentReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.PaymentReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.PaymentReducer.listPembayaranSiswaError,
});

export default connect(mapStateToProps, null)(menuLaporan);
