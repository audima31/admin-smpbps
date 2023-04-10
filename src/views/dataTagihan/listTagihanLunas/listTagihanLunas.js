import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import { listPembayaranSiswa } from "store/actions/PaymentAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";
import { deleteTagihan } from "store/actions/TagihanAction";
import moment from "moment";

class listTagihanLunas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1, // halaman saat ini
      dataPerPage: 10, // jumlah data per halaman
      searchInput: "", // input search
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(listPembayaranSiswa());
  }

  componentDidUpdate(prevProps) {
    const { deleteTagihanResult } = this.props;
    if (
      deleteTagihanResult &&
      prevProps.deleteTagihanResult !== deleteTagihanResult
    ) {
      Swal.fire("Success", "Berhasil Dihapus", "success");
      this.props.dispatch(listPembayaranSiswa());
    }
  }

  handleSearch(event) {
    this.setState({
      searchInput: event.target.value,
      currentPage: 1,
    });
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    const {
      listPembayaranSiswaResult,
      listPembayaranSiswaLoading,
      listPembayaranSiswaError,
      deleteTagihanLoading,
    } = this.props;

    const { currentPage, dataPerPage, searchInput } = this.state;

    // filter data berdasarkan input search
    const filteredData = listPembayaranSiswaResult
      ? Object.values(listPembayaranSiswaResult).filter(
          (item) =>
            item.nama.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.status.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.kelas.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.jenisTagihan.toLowerCase().includes(searchInput.toLowerCase())
        )
      : [];

    // logika untuk menentukan index awal dan akhir data yang akan ditampilkan
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

    // logika untuk membuat tombol pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    });

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
                <th scope="col">Tanggal Pembayaran</th>
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
                Object.keys(currentData).map((key, index) => {
                  console.log("ID : ", currentData[key]);
                  const removeData = (id) => {
                    Swal.fire({
                      title: "Apakah anda yakin?",
                      text: `menghapus proses pembayaran "${currentData[key].nama} - ${currentData[key].jenisTagihan}"`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Iya, hapus proses pembayaran!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          "Deleted!",
                          `Data proses pembayaran "${currentData[key].nama} - ${currentData[key].jenisTagihan}" berhasil dihapus.`,
                          "success"
                        );
                        this.props.dispatch(deleteTagihan(id));
                      }
                    });
                  };

                  const tanggal = currentData[key].waktuPembayaran;
                  const tanggalObj = moment(tanggal);
                  const hari = tanggalObj.format("DD");
                  const bulan = tanggalObj.format("MM");
                  const tahun = tanggalObj.year();

                  return (
                    <tr key={key}>
                      <td>{index + 1} .</td>
                      <td>{`${hari}-${bulan}-${tahun}`}</td>
                      <td>{currentData[key].nama}</td>
                      <td>{currentData[key].kelas}</td>
                      <td>{currentData[key].jenisTagihan}</td>
                      <td>Rp. {numberWithCommas(currentData[key].nominal)}</td>
                      <td>
                        {currentData[key].status === "PENDING" ? (
                          <p className="badge bg-warning text-wrap p-2 my-1">
                            {currentData[key].status}
                          </p>
                        ) : currentData[key].status === "BELUM DIBAYAR" ? (
                          <p className="badge bg-danger text-wrap py-2 my-1">
                            {currentData[key].status}
                          </p>
                        ) : (
                          <p className="badge bg-success text-wrap py-2 my-1">
                            {currentData[key].status}
                          </p>
                        )}
                      </td>
                      {/* BUTTON */}

                      <td>
                        <>
                          <a
                            {...this.props}
                            href={
                              "/admin/listPembayaranLunas/detail/" +
                              currentData[key].order_id
                            }
                            class="btn btn-primary mr-2 "
                          >
                            Detail
                          </a>

                          {currentData[key].status === "PENDING" ? (
                            <>
                              <a
                                {...this.props}
                                href={
                                  "/admin/tagihan/edit/" +
                                  currentData[key].idTagihanDetail
                                }
                                class="btn btn-warning "
                              >
                                Edit
                              </a>

                              <button
                                type="submit"
                                className="btn btn-danger ml-2"
                                onClick={() =>
                                  removeData(currentData[key].idTagihanDetail)
                                }
                              >
                                Hapus
                              </button>
                            </>
                          ) : deleteTagihanLoading &&
                            currentData[key].status === "PENDING" ? (
                            <button type="submit" className="btn btn-primary">
                              <div
                                class="spinner-border text-light"
                                role="status"
                              >
                                <span class="visually-hidden"></span>
                              </div>
                            </button>
                          ) : (
                            <></>
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
          <ul className="mb-3" id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listPembayaranSiswaLoading: state.PaymentReducer.listPembayaranSiswaLoading,
  listPembayaranSiswaResult: state.PaymentReducer.listPembayaranSiswaResult,
  listPembayaranSiswaError: state.PaymentReducer.listPembayaranSiswaError,

  deleteTagihanLoading: state.TagihanReducer.deleteTagihanLoading,
  deleteTagihanResult: state.TagihanReducer.deleteTagihanResult,
  deleteTagihanError: state.TagihanReducer.deleteTagihanError,
});

export default connect(mapStateToProps, null)(listTagihanLunas);
