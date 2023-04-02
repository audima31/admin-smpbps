import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListKelas, deleteKelas } from "store/actions/KelasAction";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import Swal from "sweetalert2";
import "../../assets/css/table.css";

class dataKelas extends Component {
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
    this.props.dispatch(getListKelas());
  }

  componentDidUpdate(prevProps) {
    const { deleteKelasResult } = this.props;
    if (
      deleteKelasResult &&
      prevProps.deleteKelasResult !== deleteKelasResult
    ) {
      this.props.dispatch(getListKelas());
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
      getListKelasResult,
      getListKelasLoading,
      getListKelasError,
      deleteKelasLoading,
    } = this.props;

    const { currentPage, dataPerPage, searchInput } = this.state;

    // filter data berdasarkan input search
    const filteredData = getListKelasResult
      ? Object.values(getListKelasResult).filter((item) =>
          item.namaKelas.toLowerCase().includes(searchInput.toLowerCase())
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
        <Row>
          <Col>
            <div className="d-flex justify-content-between">
              <Link
                to="/admin/kelas/tambah"
                className="btn btn-primary float-left"
              >
                + Tambah Kelas
              </Link>

              {/* button search */}
              <div class="input-group rounded" style={{ width: "15%" }}>
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
          </Col>
          <Col md="12">
            <Card>
              <CardBody>
                <Table striped className="text-center table-hover">
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Kelas</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListKelasResult ? (
                      Object.keys(currentData).map((key, index) => {
                        const removeData = (id) => {
                          Swal.fire({
                            title: "Apakah anda yakin?",
                            text: `menghapus kelas "${currentData[key].namaKelas}"`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Iya, hapus kelas!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                "Deleted!",
                                `Kelas "${currentData[key].namaKelas}" berhasil dihapus.`,
                                "success"
                              );
                              this.props.dispatch(deleteKelas(id));
                            }
                          });
                        };
                        return (
                          <tr key={key}>
                            <td>{index + 1 + "."}</td>
                            <td>{currentData[key].namaKelas}</td>
                            <td>
                              <Link
                                {...this.props}
                                className="btn btn-primary ml-2"
                                to={
                                  "/admin/kelas/detail/" +
                                  currentData[key].kelasId
                                }
                              >
                                Detail
                              </Link>
                              <Link
                                className="btn btn-warning ml-2"
                                to={
                                  "/admin/kelas/edit/" +
                                  currentData[key].kelasId
                                }
                              >
                                Edit
                              </Link>
                              {deleteKelasLoading ? (
                                <button
                                  type="submit"
                                  className="btn btn-danger ml-2"
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
                                  onClick={() =>
                                    removeData(currentData[key].kelasId)
                                  }
                                >
                                  Hapus
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : getListKelasLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListKelasError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListKelasError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <ul className="mb-3" id="page-numbers">
                  {renderPageNumbers}
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,

  deleteKelasLoading: state.KelasReducer.deleteKelasLoading,
  deleteKelasResult: state.KelasReducer.deleteKelasResult,
  deleteKelasError: state.KelasReducer.deleteKelasError,
});

export default connect(mapStateToProps, null)(dataKelas);
