import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap";
import { getListKelas } from "store/actions/KelasAction";
import { getListSiswa } from "store/actions/SiswaAction";
import { getDetailSiswa } from "store/actions/SiswaAction";
import { deleteSiswa } from "store/actions/SiswaAction";
import Swal from "sweetalert2";
import "../../assets/css/Pagination.css";

class dataSiswa extends Component {
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
    this.props.dispatch(getListSiswa());
    this.props.dispatch(getListKelas());
    this.props.dispatch(getDetailSiswa(this.props.match.params.id));
  }

  handleKelas = (event) => {
    this.setState({
      kelas: event.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    const { deleteSiswaResult } = this.props;
    if (
      deleteSiswaResult &&
      prevProps.deleteSiswaResult !== deleteSiswaResult
    ) {
      this.props.dispatch(getListSiswa());
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
      getListSiswaResult,
      getListSiswaLoading,
      getListSiswaError,
      getListKelasResult,
      deleteSiswaLoading,
    } = this.props;

    const { currentPage, dataPerPage, searchInput } = this.state;

    // filter data berdasarkan input search
    const filteredData = getListSiswaResult
      ? Object.values(getListSiswaResult).filter((item) =>
          item.nama.toLowerCase().includes(searchInput.toLowerCase())
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
        <div>
          <Row>
            <Col>
              <div className="d-flex justify-content-between">
                <Link
                  to="/admin/siswa/tambah"
                  className="btn btn-primary float-left"
                >
                  + Tambah Akun Siswa
                </Link>

                {/* button search */}
                <div class="input-group rounded" style={{ width: "15%" }}>
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={this.handleSearch}
                    class="form-control rounded"
                    aria-label="Search"
                    aria-describedby="search-addon"
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
                        <th scope="col">NO</th>
                        <th scope="col">NIS</th>
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Kelas</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getListSiswaResult ? (
                        Object.keys(currentData).map((key, index) => {
                          const removeData = (id) => {
                            Swal.fire({
                              title: `Apakah anda yakin?`,
                              text: `menghapus data "${currentData[key].nama}"`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Iya, hapus data siswa!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "Deleted!",
                                  `Data "${currentData[key].nama}" berhasil dihapus.`,
                                  "success"
                                );
                                this.props.dispatch(deleteSiswa(id));
                              }
                            });
                          };

                          console.log("DATA NIH : ", currentData);

                          return (
                            <tr key={key}>
                              <td>{index + 1 + "."}</td>
                              <td>{currentData[key].NIS}</td>
                              <td>{currentData[key].nama}</td>
                              <td>{currentData[key].jenisKelamin}</td>

                              <td>
                                {getListKelasResult ? (
                                  Object.keys(getListKelasResult).map((id) => {
                                    // eslint-disable-next-line no-lone-blocks
                                    return (
                                      <p>
                                        {getListKelasResult[id].kelasId ===
                                        currentData[key].kelas
                                          ? getListKelasResult[id].namaKelas
                                          : []}
                                      </p>
                                    );
                                  })
                                ) : (
                                  <p>Kelas Tidak Ditemukan</p>
                                )}
                              </td>
                              <td>
                                <Link
                                  className="btn btn-primary mr-2"
                                  to={
                                    "/admin/siswa/detail/" +
                                    currentData[key].uid
                                  }
                                >
                                  Detail
                                </Link>

                                <Link
                                  className="btn btn-warning ml-2"
                                  to={
                                    "/admin/siswa/edit/" + currentData[key].uid
                                  }
                                >
                                  Edit
                                </Link>

                                {deleteSiswaLoading ? (
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
                                    onClick={() =>
                                      removeData(currentData[key].uid)
                                    }
                                  >
                                    Hapus
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : getListSiswaLoading ? (
                        <tr>
                          <td colSpan="6" align="center">
                            <Spinner color="primary">Loading...</Spinner>
                          </td>
                        </tr>
                      ) : getListSiswaError ? (
                        <tr>
                          <td colSpan="6" align="center">
                            {getListSiswaError}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            Data Kosong
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <ul id="page-numbers">{renderPageNumbers}</ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListSiswaLoading: state.SiswaReducer.getListSiswaLoading,
  getListSiswaResult: state.SiswaReducer.getListSiswaResult,
  getListSiswaError: state.SiswaReducer.getListSiswaError,

  getListKelasLoading: state.KelasReducer.getListKelasLoading,
  getListKelasResult: state.KelasReducer.getListKelasResult,
  getListKelasError: state.KelasReducer.getListKelasError,

  deleteSiswaLoading: state.SiswaReducer.deleteSiswaLoading,
  deleteSiswaResult: state.SiswaReducer.deleteSiswaResult,
  deleteSiswaError: state.SiswaReducer.deleteSiswaError,
});

export default connect(mapStateToProps, null)(dataSiswa);
