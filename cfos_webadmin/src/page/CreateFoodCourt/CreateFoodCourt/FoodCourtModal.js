import React, { Component } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import {
  getListRoles,
  getListFoodCourt,
  createFoodCourt
} from './FoodCourtService';
import { isEmpty } from '../../../utils/helpers/helpers';
class FoodCourtModal extends Component {
  state = {
    roleList: [],
    fcList: [],
    isErr: false
  };

  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getListRoles();
    const { data } = await getListFoodCourt();
    this.setState({ roleList: res.data, fcList: data });
  }

  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await createFoodCourt(values);
          message.success('Tạo Mới Thành Công!');
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const { roleList, fcList, isErr } = this.state;
    return (
      <Modal
        title="Tạo Mới Tài Khoản"
        centered
        width={960}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Username</span>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Nhập từ 1-30 kí tự!' }]
                })(<Input placeholder="Username" maxLength={30}  />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Họ Tên</span>
              <Form.Item>
                {getFieldDecorator('fullname', {
                  rules: [{ required: true, message: 'Nhập từ 1-200 kí tự!' }]
                })(<Input placeholder="fullname" maxLength={200} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Số Điện Thoại</span>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [
                    { required: true, message: 'Chưa Nhập số điện thoại!' }
                  ]
                })(<Input placeholder="phone" maxLength={10} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Email</span>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'Sai Định Dạng Mail!'
                    },
                    {
                      required: true,
                      message: 'Nhập Mail!'
                    }
                  ]
                })(<Input placeholder="abc@gmail.com" />)}
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Vai Trò</span>
              <Form.Item>
                {getFieldDecorator('roleId', {
                  rules: [{ required: true, message: 'Chọn Vai Trò!' }]
                })(
                  <Select style={{ width: '100%' }}>
                    {!isEmpty(roleList) &&
                      roleList.map(el => (
                        <Select.Option value={el.roleId} key={el.roleId}>
                          {el.roleName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Food court</span>
              <Form.Item>
                {getFieldDecorator('fcId', {
                  rules: [{ required: true, message: 'Chọn Food court!' }]
                })(
                  <Select style={{ width: '100%' }}>
                    {!isEmpty(fcList) &&
                      fcList.map(el => (
                        <Select.Option value={el.fcId} key={el.fcId}>
                          {el.fcName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Tài khoản đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(FoodCourtModal);
