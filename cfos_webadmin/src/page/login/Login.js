import React, { Component } from 'react';
import { Form, Button, Icon, Input } from 'antd';
import md5 from 'md5';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { TOKEN } from '../../utils/constants/constants';
import { ROLES } from '../../utils/constants/constants';
import * as routes from '../../utils/constants/route';
import { requestLogin } from './LoginService';
import { updateRole } from '../system/systemAction';
import ForgotPasswordModal from './ForgotPasswordModal';
import logo from '../../assets/Image/logo.png';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visibleModal: false,
      isErr: false
    };
    // if (Cookie.get(TOKEN)) {
    //   window.history.back();
    // }
  }

  openModal = () => this.setState({ visibleModal: true });
  handleCancelForgotPass = () => this.setState({ visibleModal: false });

  decode = token => {
    const decoded = jwt_decode(token);
    return decoded.JWTAuthoritiesKey;
  };
  handleRedirect = role => {
    // implement redirect page after login success
    if (role === ROLES.SYSTEM_ADMIN) return routes.ROUTE_CREATE_FOODCOURT;
    if (role === ROLES.FOOD_COURT_MANAGER) return routes.ROUTE_DASHBOARD;
    if (role === ROLES.STORE_MANAGER) return routes.ROUTE_STATIC_STORE;
    if (role === ROLES.CASHIER) return routes.ROUTE_STATIC_CASHIER;
    if (role === ROLES.CHEF) return routes.ROUTE_CHEF;
    return routes.ROUTE_LOGIN;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({ loading: true });
        try {
          const res = await requestLogin({
            ...values,
            password: md5(values.password)
          });
          const auth = res.headers.authorization.split(' ')[1];
          Cookie.set(TOKEN, auth);
          const role = this.decode(auth);
          this.props.updateRole(role);
          window.location.href = '#' + this.handleRedirect(role);
          this.setState({ loading: false, isErr: false });
        } catch (err) {
          this.setState({ loading: false, isErr: true });
          // api error
        }
      }
    });
  };

  usrFieldOptions = {
    rules: [
      { required: true, message: 'Hãy nhập username!' },
      { pattern: "^[_'.@A-Za-z0-9-]*$", message: 'Hãy nhập username' }
    ],
    getValueFromEvent: e => e.target.value.trim()
  };

  pwdFieldOptions = {
    rules: [{ required: true, message: 'Hãy nhập password!' }],
    getValueFromEvent: e => e.target.value.trim()
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({ loading: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, visibleModal, isErr } = this.state;
    // if (Cookie.get(TOKEN)) {
    //   return null;
    // }
    return (
      <div className="login-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                      <img
                        alt=""
                        src={logo}
                        width={'100%'}
                        height={'auto'}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>

                        <Form className="user" onSubmit={this.handleSubmit}>
                          <span className="lab-text">Username</span>
                          <Form.Item>
                            {getFieldDecorator(
                              'username',
                              this.usrFieldOptions
                            )(
                              <Input
                                prefix={<Icon type="user" />}
                                placeholder="Username"
                              />
                            )}
                          </Form.Item>
                          <span className="lab-text">Password</span>
                          <Form.Item>
                            {getFieldDecorator(
                              'password',
                              this.pwdFieldOptions
                            )(
                              <Input
                                type="password"
                                prefix={<Icon type="lock" />}
                                placeholder="Password"
                              />
                            )}
                          </Form.Item>
                          {isErr && (
                            <p style={{ color: 'red', textAlign: 'center' }}>
                              Username hoặc Password sai!
                            </p>
                          )}
                          <Form.Item>
                            <Button
                              type="primary"
                              className="btn btn-lg btn-block"
                              style={{ paddingBottom: 30 }}
                              htmlType="submit"
                              loading={loading}
                            >
                              ĐĂNG NHẬP
                            </Button>
                          </Form.Item>
                        </Form>
                        <hr />

                        <div className="text-center">
                          <p
                            className="small"
                            style={{ color: 'blue', cursor: 'pointer' }}
                            type="primary"
                            onClick={this.openModal}
                          >
                            Quên mật khẩu?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {visibleModal && (
          <ForgotPasswordModal
            visible={visibleModal}
            cancelModal={this.handleCancelForgotPass}
          />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  {
    updateRole
  }
)(Form.create()(Login));
