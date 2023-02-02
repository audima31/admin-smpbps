import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Table } from "reactstrap";
import { getListTypeTagihan } from "store/actions/jenisTagihanAction";
import { getDetailSiswaTagihan } from "store/actions/TagihanAction";
import { updateTagihan } from "store/actions/TagihanAction";
import { getDetailTagihan } from "store/actions/TagihanAction";
import Swal from "sweetalert2";

class editDataTagihan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.match.params.key,
      id: this.props.match.params.id,
      jenisTagihan: "",
      keterangan: "",
      bulan: "",
      tahun: "",
      status: false,
      nominal: "",
      waktu: "",
    };
  }

  componentDidMount() {
    const { key, id } = this.state;

    this.props.dispatch(getDetailTagihan(key, id));
    this.props.dispatch(getDetailSiswaTagihan(key));
    this.props.dispatch(getListTypeTagihan());
  }

  handleJenisTagihan = (event) => {
    this.setState({
      jenisTagihan: event.target.value,
    });
  };

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

  handleNominal = (event) => {
    this.setState({
      nominal: event.target.value,
    });
  };

  handleKeterangan = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { jenisTagihan, keterangan, bulan, tahun, nominal, status, key, id } =
      this.state;

    event.preventDefault();

    if (jenisTagihan && keterangan && nominal && bulan && tahun) {
      const data = {
        jenisTagihan: jenisTagihan,
        bulan: bulan,
        tahun: tahun,
        nominal: nominal,
        keterangan: keterangan,
        status: "PENDING",
        key: key,
        id: id,
      };
      //ke Auth Action
      this.props.dispatch(updateTagihan(key, id, data));
      Swal.fire("Tagihan berhasil dibuat", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Data tidak boleh kosong!",
      });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      getDetailTagihanResult,
      updateTagihanResult,
      getDetailSiswaTagihanResult,
    } = this.props;

    if (
      getDetailTagihanResult &&
      prevProps.getDetailTagihanResult !== getDetailTagihanResult
    ) {
      this.setState({
        jenisTagihan: getDetailTagihanResult.jenisTagihan,
        keterangan: getDetailTagihanResult.keterangan,
        bulan: getDetailTagihanResult.bulan,
        tahun: getDetailTagihanResult.tahun,
        status: getDetailTagihanResult.status,
        nominal: getDetailTagihanResult.nominal,
      });
    }

    if (
      updateTagihanResult &&
      prevProps.updateTagihanResult !== updateTagihanResult
    ) {
      Swal.fire(
        "Good job!",
        `Update tagihan ${getDetailSiswaTagihanResult.nama} telah berhasil`,
        "success"
      );
      // this.props.history.push("/admin/tagihan");
    }
  }

  render() {
    const { key, id, jenisTagihan, keterangan, bulan, tahun, nominal } =
      this.state;

    const {
      getDetailTagihanResult,
      getDetailSiswaTagihanResult,
      getListJenisTagihanResult,
      updateTagihanLoading,
    } = this.props;

    console.log("detail Tagihan: ", getDetailTagihanResult);
    return (
      <div className="content">
        <div className="page">
          <div>
            <h2>Rincian Pembayaran</h2>
          </div>

          <div>
            <p>Nama : {getDetailSiswaTagihanResult.nama}</p>
            <p>Kelas : {getDetailSiswaTagihanResult.kelas}</p>
          </div>

          <Table>
            <thead className="text-primary">
              <tr>
                <th>Waktu</th>
                <th>Jenis Tagihan</th>
                <th>Nominal Tagihan</th>
                <th>Status</th>
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
                          <p>
                            {getListJenisTagihanResult[key].jenisTagihanId ===
                            getDetailTagihanResult.jenisTagihan
                              ? getListJenisTagihanResult[key].namaJenisTagihan
                              : []}
                          </p>
                        );
                      })}
                    </td>
                    <td>{getDetailTagihanResult.nominal}</td>
                    <td>{getDetailTagihanResult.status}</td>
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
                    <Spinner color="primary">Loading...</Spinner>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <form onSubmit={(event) => this.handleSubmit(event)}>
            {/* Form Jenis Tagihan */}
            <div className="mb-3">
              <label>
                Jenis Tagihan<label className="btg-wajib">*</label> :
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={jenisTagihan}
                onChange={(event) => this.handleJenisTagihan(event)}
                data-testid="select-kelas"
              >
                <option value="">Pilih jenis tagihan</option>
                {Object.keys(getListJenisTagihanResult).map((key) => {
                  return (
                    <option value={key} key={key}>
                      {getListJenisTagihanResult[key].namaJenisTagihan}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* END Form Jenis Tagihan */}
            {/* Form Bulan */}
            <div className="mb-3">
              <label>
                Bulan<label className="btg-wajib">*</label> :
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={bulan}
                onChange={(event) => this.handleBulan(event)}
              >
                <option value="">-- PILIH --</option>
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
              <label>
                Tahun<label className="btg-wajib">*</label> :
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={tahun}
                onChange={(event) => this.handleTahun(event)}
              >
                <option value="">-- PILIH --</option>
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
            {/* Form Jumlah Nominal Tagihan*/}
            <div className="mb-3">
              <label htmlFor="inputNominal" className="form-label">
                Jumlah Nominal <label className="btg-wajib">*</label>
              </label>
              <input
                type="number"
                className="form-control"
                id="inputNominal"
                value={nominal}
                onChange={(event) => this.handleNominal(event)}
              />
            </div>
            {/* Form Jumlah Nominal Tagihan*/}
            {/* Form Keterangan*/}
            <div className="mb-3">
              <label htmlFor="inputKeterangan" className="form-label">
                Keterangan <label className="btg-wajib">*</label>
              </label>
              <input
                className="form-control"
                id="inputKeterangan"
                value={keterangan}
                onChange={(event) => this.handleKeterangan(event)}
              />
            </div>
            {/* End Form Keterangan*/}
            {updateTagihanLoading ? (
              <div class="vstack gap-2 col-md-5 mx-auto">
                <button type="submit" className="btn btn-primary">
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </button>
              </div>
            ) : (
              <div class="vstack gap-2 col-md-5 mx-auto">
                <button type="submit" className="btn btn-primary">
                  SIMPAN
                </button>
                <a
                  class="btn btn-outline-secondary"
                  href="/admin/tagihan/"
                  style={{ color: "#FFFFFF" }}
                >
                  BATAL
                </a>
              </div>
            )}
          </form>
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

  updateTagihanLoading: state.TagihanReducer.updateTagihanLoading,
  updateTagihanResult: state.TagihanReducer.updateTagihanLoading,
  updateTagihanError: state.TagihanReducer.updateTagihanLoading,
});

export default connect(mapStateToProps, null)(editDataTagihan);
