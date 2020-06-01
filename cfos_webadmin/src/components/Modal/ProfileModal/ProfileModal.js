import React, { Component } from 'react';
import { Modal, Form, Input, message, DatePicker } from 'antd';
import moment from 'moment';
import { getProfile, updateProfile } from './ProfileService';
import { isEmpty } from '../../../utils/helpers/helpers';
class ProfileModal extends Component {
  state = {
    profile: {},
    date: ''
  };
  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getProfile();
    // const { data } = await getListFoodCourt();
    // const store = await getListStore();
    this.setState({ profile: res.data });
  }
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { date } = this.state;
        await updateProfile({
          ...this.state.profile,
          ...values,
          birthday: date
        });
        message.success('update success');
        this.props.cancelModal();
      }
    });
  };
  onChange = (value, dateString) => {
    this.setState({ date: dateString });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const { profile } = this.state;
    return (
      <Modal
        title="Thông Tin Tài Khoản"
        centered
        width={960}
        visible={visible}
        okText="Update"
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Username</span>
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValue: profile.username,
                  rules: [{ required: true, message: 'Nhập từ 1-50 kí tự!' }]
                })(<Input placeholder="Username" maxLength={50} disabled />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Họ Tên</span>
              <Form.Item>
                {getFieldDecorator('fullname', {
                  initialValue: profile.fullname,
                  rules: [{ required: true, message: 'Nhập từ 1-150 kí tự!' }]
                })(<Input placeholder="fullname" maxLength={150} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Số Điện Thoại</span>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: profile.phone,
                  rules: [{ required: true, message: 'Nhập Số Điện Thoại!' }]
                })(<Input type="number" placeholder="phone" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Email</span>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: profile.email,
                  rules: [
                    {
                      type: 'email',
                      message: 'Sai Định Dạng E-mail!'
                    },
                    {
                      required: true,
                      message: 'Nhập E-mail!'
                    }
                  ]
                })(<Input placeholder="abc@gmail.com" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Địa Chỉ</span>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: profile.address
                })(<Input placeholder="Địa chỉ" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Ngày Sinh</span>
              <Form.Item>
                {getFieldDecorator('birthday', {
                  initialValue: !isEmpty(profile.birthday)
                    ? moment(profile.birthday)
                    : null
                })(<DatePicker onChange={this.onChange} />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ProfileModal);
