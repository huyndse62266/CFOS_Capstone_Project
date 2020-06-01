import React, { Component } from 'react';
// import {actFetchRole} from '../../actions/action';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import logo from '../images/mgm-grand-restaurants-food-court-architecture-exterior-01.jpg';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      Role: '',
      isManager: false,
      token: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ Username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ Password: e.target.value });
  }

  decode(token) {
    var decoded = jwt_decode(token);
    var username = decoded.auth;
    this.setState({
      Role: decoded.sub
    });
  }

  login() {
    // const user = {
    //   username: this.state.Username,
    //   password: this.state.Password
    // }
    // console.log("user")
    // console.log(user)
    // axios.post('http://8437d74a.ngrok.io/api/authenticate', user)
    //   .then(res => {
    //     // this.setState({
    //     //   token: res.id_token
    //     // })
    //     document.cookie = 'token=abc';
    //     window.location.href = "/";
    //     this.decode(res.data.id_token)
    //   })

    // document.cookie = 'token=abc';
    // this.props.actFetchRole('admin');
    window.location.href = '/dashboard';
  }

  isManager = () => {
    if (this.state.Role === 'Manager') {
      return true;
    }
    return false;
  };

  signIn() {
    alert(
      'Email address is ' +
        this.state.Username +
        ' Password is ' +
        this.state.Password
    );
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { roles } = this.props;
    console.log('test', roles);
    return (
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image">
                    {/* <img src={logo} className="login-logo" width={"100%"} height={"100%"}/> */}
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            name="Username"
                            onChange={this.handleEmailChange}
                            placeholder="Enter Username"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            name="Password"
                            onChange={this.handlePasswordChange}
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn btn-lg btn-primary btn-block"
                          onClick={this.login}
                          type="button"
                        >
                          Sign in
                        </button>
                      </form>
                      <hr />

                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    roles: state.system.roles
  }),
  {
    // actFetchRole
  }
)(LoginForm);
