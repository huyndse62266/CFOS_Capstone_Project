import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { changePassword } from './ChangePasswordService';
import { getProfile } from '../ProfileModal/ProfileService';
import md5 from 'md5';

class ChangePasswordModal extends Component {
  state = {
    profile: {},
    isConfirm: true,
    isErr: false
  };
  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getProfile();
    // const res = await getListRoles();
    // const { data } = await getListFoodCourt();
    // const store = await getListStore();
    this.setState({ profile: res.data });
  }
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.confirmPassword === values.newPassword) {
          this.setState({ isConfirm: true });
          try {
            await changePassword({
              ...values,
              id: this.state.profile.id,
              oldPassword: md5(values.oldPassword),
              newPassword: md5(values.newPassword)
            });
            message.success('Thay Đổi Password thành công!');
            this.props.cancelModal();
          } catch (err) {
            this.setState({ isErr: true });
            message.error('Thay Đổi Password thất bại!');
          }
        } else {
          this.setState({ isConfirm: false });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const { profile, isConfirm, isErr } = this.state;
    return (
      <Modal
        title="Thay Đổi Password"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Tên Đăng Nhập</span>
              <Form.Item>
                {getFieldDecorator('id', {
                  initialValue: profile.username
                })(<Input type="text" disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Mật Khẩu cũ</span>
              <Form.Item>
                {getFieldDecorator('oldPassword', {
                  rules: [{ required: true, message: 'Nhập mật khẩu cũ!' }]
                })(<Input type="password" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Mật Khẩu mới</span>
              <Form.Item>
                {getFieldDecorator('newPassword', {
                  rules: [{ required: true, message: 'Nhập lại mật khẩu!' }]
                })(<Input type="password" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Nhập Lại Mật Khẩu</span>
              <Form.Item>
                {getFieldDecorator('confirmPassword', {
                  rules: [{ required: true, message: 'Nhập mật khẩu mới!' }]
                })(<Input type="password" />)}
              </Form.Item>
              {!isConfirm && (
                <p
                  style={{
                    fontSize: '12px',
                    color: 'red',
                    margin: '-21px 0 0 0'
                  }}
                >
                  Mật Khẩu Mới Không Khớp!
                </p>
              )}
              {isErr && (
                <p style={{ color: 'red', textAlign: 'center' }}>
                  Mật Khẩu Cũ Không Đúng !
                </p>
              )}
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ChangePasswordModal);
