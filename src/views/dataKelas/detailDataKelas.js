import React, { Component } from "react";

export default class detailDataKelas extends Component {
  render() {
    return (
      <div className="content">
        <div className="card">
          <p>PELER</p>

          <table className="table table-striped table-hover ">
            <thead>
              <tr className="text-primary">
                <th scope="col">NIS</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Jenis Kelamin</th>
                <th scope="col">Kelas</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
