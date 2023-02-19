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
import { checkLogin } from "store/actions/AuthAction";
import { loginUser } from "store/actions/AuthAction";
import Swal from "sweetalert2";
import logo from "../../assets//img/Logo.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(checkLogin(this.props.history));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      //Action Login
      this.props.dispatch(loginUser(this.state.email, this.state.password));
    } else {
      Swal.fire("Gagal Login", "Email dan password tidak terdaftar", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult, checkLoginResult } = this.props;

    if (checkLoginResult && prevProps.checkLoginResult !== checkLoginResult) {
      this.props.history.push("/admin/dashboard");
    }

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;

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
                ADMIN LOGIN
              </CardHeader>

              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Masukan Email"
                      onChange={(event) => this.handleChange(event)}
                    ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Masukan password"
                      onChange={(event) => this.handleChange(event)}
                    ></Input>
                  </FormGroup>

                  {loginLoading ? (
                    <div className="vstack gap-2 mx-auto">
                      <Button color="primary" type="submit" disabled>
                        <Spinner />
                      </Button>
                    </div>
                  ) : (
                    <div className="vstack gap-2 mx-auto">
                      <Button color="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  )}

                  <div className="text-center mt-3">
                    <p>
                      Belum memiliki akun?
                      <a href="/register"> Klik daftar.</a>
                    </p>
                  </div>
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
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  checkLoginLoading: state.AuthReducer.checkLoginLoading,
  checkLoginResult: state.AuthReducer.checkLoginResult,
  checkLoginError: state.AuthReducer.checkLoginError,
});

export default connect(mapStateToProps, null)(Login);
