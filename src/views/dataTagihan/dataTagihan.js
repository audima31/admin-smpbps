import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Table } from "reactstrap";
import { deleteTagihan, getListTagihan } from "store/actions/TagihanAction";
import Swal from "sweetalert2";
import { numberWithCommas } from "utils";

class dataTagihan extends Component {
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
    this.props.dispatch(getListTagihan());
  }

  componentDidUpdate(prevProps) {
    const { deleteTagihanResult } = this.props;
    if (
      deleteTagihanResult &&
      prevProps.deleteTagihanResult !== deleteTagihanResult
    ) {
      this.props.dispatch(getListTagihan());
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
      getListTagihanResult,
      getListTagihanLoading,
      getListTagihanError,
      deleteTagihanLoading,
    } = this.props;

    const { currentPage, dataPerPage, searchInput } = this.state;

    // filter data berdasarkan input search
    const filteredData = getListTagihanResult
      ? Object.values(getListTagihanResult).filter(
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
            <Link to="/admin/tagihan/tambah" className="btn btn-primary ">
              + Tambah Tagihan Baru
            </Link>
            <Link to="/admin/jenistagihan" class="btn btn-primary  ml-3">
              <i class="bi bi-clipboard-plus"> </i>
              Tambah Jenis Tagihan
            </Link>

            <Link
              to="/admin/listPembayaranLunas"
              class="btn btn-success  ml-3 "
            >
              <i class="bi bi-clipboard-check"> </i>
              List Proses Pembayaran
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
                value={searchInput}
                onChange={this.handleSearch}
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col card" style={{ fontSize: "12px" }}>
          <Table striped className="text-center table-hover">
            <thead className="text-primary">
              <tr>
                <th scope="col">No</th>
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
              {getListTagihanResult ? (
                Object.keys(currentData).map((key, index) => {
                  const removeData = (id) => {
                    Swal.fire({
                      title: "Apakah anda yakin?",
                      text: `menghapus tagihan "${currentData[key].nama} - ${currentData[key].jenisTagihan}"`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Iya, hapus data tagihan!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          "Deleted!",
                          `Data tagihan "${currentData[key].nama} - ${currentData[key].jenisTagihan}" berhasil dihapus.`,
                          "success"
                        );
                        this.props.dispatch(deleteTagihan(id));
                      }
                    });
                  };

                  return (
                    <tr key={key}>
                      <td>{index + 1 + "."}</td>
                      <td>{currentData[key].waktuTagihan}</td>
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
                          <p className="badge bg-danger text-wrap px-3 py-2 my-1">
                            {currentData[key].status}
                          </p>
                        ) : (
                          <p className="badge bg-success text-wrap px-3 py-2 my-1">
                            {currentData[key].status}
                          </p>
                        )}
                      </td>
                      {/* BUTTON */}

                      <td>
                        {currentData[key].status === "LUNAS" ? (
                          <>
                            <p></p>
                          </>
                        ) : (
                          <>
                            <a
                              {...this.props}
                              href={
                                "/admin/tagihan/detail/" +
                                currentData[key].idTagihanDetail
                              }
                              class="btn btn-primary mr-2 "
                            >
                              Detail
                            </a>

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

                            {deleteTagihanLoading ? (
                              <button type="submit" className="btn btn-primary">
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
                                onClick={() =>
                                  removeData(currentData[key].idTagihanDetail)
                                }
                              >
                                Hapus
                              </button>
                            )}
                          </>
                        )}
                      </td>
                      {/* END BUTTON */}
                    </tr>
                  );
                })
              ) : getListTagihanLoading ? (
                <tr>
                  <td colSpan="8" align="center">
                    <Spinner color="primary">Loading...</Spinner>
                  </td>
                </tr>
              ) : getListTagihanError ? (
                <tr>
                  <td colSpan="8" align="center">
                    {getListTagihanError}
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
  getListTagihanLoading: state.TagihanReducer.getListTagihanLoading,
  getListTagihanResult: state.TagihanReducer.getListTagihanResult,
  getListTagihanError: state.TagihanReducer.getListTagihanError,

  deleteTagihanLoading: state.TagihanReducer.deleteTagihanLoading,
  deleteTagihanResult: state.TagihanReducer.deleteTagihanResult,
  deleteTagihanError: state.TagihanReducer.deleteTagihanError,
});

export default connect(mapStateToProps, null)(dataTagihan);
