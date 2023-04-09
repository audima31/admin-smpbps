import React, { Component } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

export default class Gagal extends Component {
  toRiwayat = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    console.log("Order ID gagal : ", order_id);
    console.log("Transaction Status gagal : ", transaction_status);

    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <Card style={{ backgroundColor: "#d6d8db" }}>
            <div align="center" className="my-4">
              <i
                class="bi bi-emoji-frown-fill fa-3x"
                style={{ color: "#dc3545" }}
              />
              <br />
              <h5>
                <strong>MAAF ADA KESALAHAN DALAM PROSES TRANSAKSI</strong>
              </h5>
              <p>
                Silahkan <strong>cek email</strong> anda untuk melanjutkan
                pembayaran.
              </p>
            </div>
            <CardBody className="text-center">
              <p>Apabila masalah tetap berlanjut, silahkan hubungi admin</p>
              <p>ORDER ID : {order_id}</p>
              <p>
                STATUS TRANSAKSI :
                <strong style={{ color: "RED" }}>{transaction_status}</strong>
              </p>

              <Button
                color="primary"
                type="submit"
                onClick={() => this.toRiwayat()}
              >
                Lanjutkan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
