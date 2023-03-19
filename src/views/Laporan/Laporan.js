import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { listPembayaranSiswa } from "store/actions/PaymentAction";

class Laporan extends Component {
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
                        this.state.bulan +
                        " " +
                        this.state.tahun
                      }
                      sheet={
                        "Laporan keuangan " +
                        this.state.bulan +
                        " " +
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

          <div className="col-8 card">
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
                    return (
                      <>
                        {listPembayaranSiswaResult[key].status === "LUNAS" &&
                        listPembayaranSiswaResult[key].bulan ===
                          this.state.bulan &&
                        listPembayaranSiswaResult[key].tahun ===
                          this.state.tahun ? (
                          <>
                            <tr>
                              <td>
                                {
                                  listPembayaranSiswaResult[key]
                                    .waktuPembayaran2
                                }
                              </td>
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

export default connect(mapStateToProps, null)(Laporan);
