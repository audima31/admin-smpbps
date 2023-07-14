import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import logo from "../../assets//img/Logo.png";
import { resetPassword } from "store/actions/AuthAction";

class LupaPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  handleResetPassword = (event) => {
    const { email } = this.state;
    event.preventDefault();
    this.props.dispatch(resetPassword(email));
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    const { resetPasswordResult } = this.props;

    console.log("Result : ", resetPasswordResult);

    if (
      resetPasswordResult &&
      prevProps.resetPasswordResult !== resetPasswordResult
    ) {
      this.props.history.push("/login");
    }
  }
  render() {
    const { email } = this.state;
    const { resetPasswordLoading, resetPasswordError } = this.props;
    console.log("Loading : ", resetPasswordLoading);
    console.log("Error : ", resetPasswordError);

    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <img
                src={logo}
                className="rounded mx-auto d-block"
                style={{ width: "35%" }}
              />
              <CardHeader tag={"h5"} className="text-center">
                LUPA PASSWORD
              </CardHeader>

              <CardBody>
                <form onSubmit={(event) => this.handleResetPassword(event)}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Masukan Email"
                      onChange={(event) => this.handleEmail(event)}
                    ></Input>
                  </FormGroup>

                  {resetPasswordLoading ? (
                    <div className="vstack gap-2 mx-auto">
                      <Button color="primary" type="submit" disabled>
                        <Spinner />
                      </Button>
                    </div>
                  ) : (
                    <div className="vstack gap-2 mx-auto">
                      <Button color="primary" type="submit">
                        SUBMIT
                      </Button>
                    </div>
                  )}
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resetPasswordLoading: state.AuthReducer.resetPasswordLoading,
  resetPasswordResult: state.AuthReducer.resetPasswordResult,
  resetPasswordError: state.AuthReducer.resetPasswordError,
});

export default connect(mapStateToProps, null)(LupaPassword);
