import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import {
  deleteTagihanLunas,
  listPembayaranSiswa,
} from "store/actions/PaymentAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";

class listTagihanLunas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(listPembayaranSiswa());
  }

  componentDidUpdate(prevProps) {
    const { deleteTagihanLunasResult } = this.props;
    if (
      deleteTagihanLunasResult &&
      prevProps.deleteTagihanLunasResult !== deleteTagihanLunasResult
    ) {
      Swal.fire("Success", "Berhasil Dihapus", "success");
      this.props.dispatch(listPembayaranSiswa());
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const {
      listPembayaranSiswaResult,
      listPembayaranSiswaLoading,
      listPembayaranSiswaError,
      deleteTagihanLunasLoading,
    } = this.props;
    return (
      <div className="content">
        <div className="row">
          <div className="col">
            <Link to="/admin/tagihan" className="btn btn-secondary float-left">
              <i className="bi bi-caret-left-fill"> </i>
              Kembali
            </Link>

            {/* button search */}
            <div
              class="input-group rounded float-right ml-3"
              style={{ width: "15%" }}
            >
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(event) => this.handleSearch(event)}
                value={this.state.search}
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col card">
          <Table striped className="text-center table-hover">
            <thead className="text-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Kelas</th>
                <th scope="col">Tagihan</th>
                <th scope="col">Nominal</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listPembayaranSiswaResult ? (
                Object.keys(listPembayaranSiswaResult)
                  .filter((item) => {
                    return this.state.search.toLowerCase() === ""
                      ? item
                      : listPembayaranSiswaResult[item].nama
                          .toLowerCase()
                          .includes(this.state.search) ||
                          listPembayaranSiswaResult[item].jenisTagihan
                            .toLowerCase()
                            .includes(this.state.search) ||
                          listPembayaranSiswaResult[item].order_id
                            .toLowerCase()
                            .includes(this.state.search);
                  })
                  .map((key, index) => {
                    const removeData = (id) => {
                      Swal.fire({
                        title: "Apakah anda yakin?",
                        text: `menghapus proses pembayaran "${listPembayaranSiswaResult[key].nama} - ${listPembayaranSiswaResult[key].jenisTagihan}"`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Iya, hapus proses pembayaran!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Deleted!",
                            `Data proses pembayaran "${listPembayaranSiswaResult[key].nama} - ${listPembayaranSiswaResult[key].jenisTagihan}" berhasil dihapus.`,
                            "success"
                          );
                          this.props.dispatch(deleteTagihanLunas(id));
                        }
                      });
                    };

                    return (
                      <tr key={key}>
                        <td>{index + 1} .</td>
                        <td>{listPembayaranSiswaResult[key].waktuTagihan}</td>
                        <td>{listPembayaranSiswaResult[key].nama}</td>
                        <td>{listPembayaranSiswaResult[key].kelas}</td>
                        <td>{listPembayaranSiswaResult[key].jenisTagihan}</td>
                        <td>
                          Rp.{" "}
                          {numberWithCommas(
                            listPembayaranSiswaResult[key].nominal
                          )}
                        </td>
                        <td>
                          {listPembayaranSiswaResult[key].status ===
                          "PENDING" ? (
                            <p className="badge bg-warning text-wrap p-2 my-1">
                              {listPembayaranSiswaResult[key].status}
                            </p>
                          ) : listPembayaranSiswaResult[key].status ===
                            "BELUM DIBAYAR" ? (
                            <p className="badge bg-danger text-wrap px-3 py-2 my-1">
                              {listPembayaranSiswaResult[key].status}
                            </p>
                          ) : (
                            <p className="badge bg-success text-wrap px-3 py-2 my-1">
                              {listPembayaranSiswaResult[key].status}
                            </p>
                          )}
                        </td>
                        {/* BUTTON */}

                        <td>
                          <>
                            <a
                              {...this.props}
                              href={"/admin/listPembayaranLunas/detail/" + key}
                              class="btn btn-primary mr-2 "
                            >
                              Detail
                            </a>

                            {listPembayaranSiswaResult[key].status ===
                            "LUNAS" ? (
                              <></>
                            ) : (
                              <>
                                {deleteTagihanLunasLoading ? (
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    <div
                                      class="spinner-border text-light"
                                      role="status"
                                    >
                                      <span class="visually-hidden"></span>
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-danger ml-2"
                                    onClick={() => removeData(key)}
                                  >
                                    <i className="nc-icon nc-basket"></i> Hapus
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        </td>
                        {/* END BUTTON */}
                      </tr>
                    );
                  })
              ) : listPembayaranSiswaLoading ? (
                <tr>
                  <td colSpan="8" align="center">
                    <Spinner color="primary">Loading...</Spinner>
                  </td>
                </tr>
              ) : listPembayaranSiswaError ? (
                <tr>
                  <td colSpan="8" align="center">
                    {listPembayaranSiswaError}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8" align="center">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listPembayaranSiswaLoading: state.PaymentReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.PaymentReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.PaymentReducer.listPembayaranSiswaError,

  deleteTagihanLunasLoading: state.PaymentReducer.deleteTagihanLunasLoading,
  deleteTagihanLunasResult: state.PaymentReducer.deleteTagihanLunasResult,
  deleteTagihanLunasError: state.PaymentReducer.deleteTagihanLunasError,
});

export default connect(mapStateToProps, null)(listTagihanLunas);
