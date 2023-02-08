/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { updatePayment } from "store/actions/PaymentAction";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    //Mengambil paramater yang ada di website
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });

      //Masuk ke action update status di riwayat
      this.props.dispatch(updatePayment(order_id, transaction_status));
    }
  }

  //Suapaya User(Mobile), setelah bayar akan diarahkan ke riwayat pembayaran
  toRiwayat = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };

  render() {
    const { order_id, transaction_status } = this.state;
    const { updatePaymentLoading } = this.props;

    return (
      <Row className="justify-content-center mt-5">
        {updatePaymentLoading ? (
          <Spinner color="primary"></Spinner>
        ) : (
          <Col md="5" className="mt-5">
            <Card style={{ backgroundColor: "#e8fbf7" }}>
              <div align="center" className="my-4">
                <i
                  class="bi bi-check-circle-fill fa-3x "
                  style={{ color: "#008188" }}
                ></i>
                <br />
                <h5>
                  <strong>PEMBAYARAN BERHASIL</strong>
                </h5>
              </div>

              <CardBody className="text-center">
                <p style={{ color: "red" }}>
                  {transaction_status === "pending" &&
                    "Untuk Selanjutnya Harap Selesaikan Pembayarannya jika belum bayar, dan apabila telah bayar maka update status pembayaran di halaman riwayat"}
                </p>
                <p>
                  ORDER ID :<strong>{order_id}</strong>
                </p>
                <p>
                  STATUS TRANSAKSI :
                  <strong>
                    {transaction_status === "settlement" ||
                    transaction_status === "capture"
                      ? "LUNAS"
                      : transaction_status}
                  </strong>
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
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  updatePaymentLoading: state.PaymentReducer.updatePaymentLoading,
});

export default connect(mapStateToProps, null)(Finish);
