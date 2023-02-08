import React, { Component } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

export default class Unfinish extends Component {
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <Card style={{ backgroundColor: "#FFEA80" }}>
            <div align="center" className="my-4">
              <i class="bi bi-stopwatch fa-3x" style={{ color: "#dc3545" }} />
              <br />
              <h5>
                <strong>
                  PEMBAYARAN <u style={{ color: "#dc3545" }}>PENDING</u>,
                  LANJUTKAN PEMBAYARAN DIHALAMAN{" "}
                  <u style={{ color: "#dc3545" }}>RIWAYAT</u>
                </strong>
              </h5>
            </div>

            <CardBody className="text-center">
              <p style={{ fontSize: "80%" }}>
                ORDER ID :<strong> {order_id}</strong>
              </p>
              <p style={{ fontSize: "80%" }}>
                STATUS TRANSAKSI :
                <strong style={{ color: "RED" }}>{transaction_status}</strong>
              </p>

              <Button color="primary" type="submit">
                Lanjutkan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
