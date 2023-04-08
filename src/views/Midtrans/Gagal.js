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
          <Card style={{ backgroundColor: "#FD999F" }}>
            <div align="center" className="my-4">
              <i
                class="bi bi-emoji-frown-fill fa-3x"
                style={{ color: "#dc3545" }}
              />
              <br />
              <h5>
                <strong>
                  MAAF TRANSAKSI <u style={{ color: "#dc3545" }}>GAGAL</u>,
                  DIKARENAKAN TERJADI MEMBUKA PROSES PEMBAYARAN BERULANG-ULANG
                </strong>
              </h5>
            </div>
            <CardBody className="text-center">
              <p>
                Silahkan hubungi Admin, untuk dapat melakukan pembayaran
                selanjutnya
              </p>
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
