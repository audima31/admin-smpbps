import React, { Component } from "react";

export default class Laporan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bulan: "",
      tahun: "",
    };
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

  handleSubmit = (event) => {};

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="col-5">
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
                      class="form-select"
                      aria-label="Default select example"
                      // value={}
                      onChange={(event) => this.handleBulan(event)}
                      data-testid="select-kelas"
                    >
                      <option value="">-- Bulan --</option>
                    </select>
                  </div>

                  {/* Form Tahun */}
                  <div className="mb-3">
                    <label className="text-dark">
                      Tahun : <label className="text-danger">*</label>
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      // value={}
                      onChange={(event) => this.handleTahun(event)}
                      data-testid="select-kelas"
                    >
                      <option value="">-- Tahun --</option>
                    </select>
                  </div>

                  <div className="vstack gap-2  mx-auto">
                    <button type="submit" className="btn btn-primary">
                      Unduh Laporan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}
