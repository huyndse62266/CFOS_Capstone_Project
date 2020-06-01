import React, { Component } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { getListRoles, getListStore, createStaff } from './StaffService';
import { isEmpty } from '../../../utils/helpers/helpers';
class StaffModal extends Component {
  state = {
    roleList: [],
    fcList: [],
    storeList: [],
    roleId: '',
    isErr: false
  };
  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getListRoles();

    const store = await getListStore();
    this.setState({ roleList: res.data, storeList: store.data });
  }
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        try {
          await createStaff(values);
          message.success('Tạo mới thành công');
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  handleSelect = value => this.setState({ roleId: value });
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const { roleList, storeList, roleId, isErr } = this.state;
    return (
      <Modal
        title="Tạo Mới Nhân Viên"
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
                  rules: [{ required: true, message: 'Nhập từ 1-50 kí tự!' }]
                })(<Input placeholder="Username" maxLength={50} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Họ Và Tên</span>
              <Form.Item>
                {getFieldDecorator('fullname', {
                  rules: [{ required: true, message: 'Nhập từ 1-200 kí tự!' }]
                })(<Input placeholder="Họ Tên" maxLength={200} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Số Điện Thoại</span>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Nhập Số Điện Thoại!' }]
                })(<Input type="number" placeholder="Số Điện Thoại" />)}
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
            <div className="col-md-12">
              <span className="lab-text">Vai Trò</span>
              <Form.Item>
                {getFieldDecorator('roleId', {
                  rules: [{ required: true, message: 'Chọn Vai Trò!' }]
                })(
                  <Select
                    style={{ width: '100%' }}
                    onSelect={this.handleSelect}
                  >
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
          </div>
          {(roleId === 5 || roleId === 4) && (
            <div className="row">
              <div className="col-md-12">
                <span className="lab-text">Cửa Hàng</span>
                <Form.Item>
                  {getFieldDecorator('storeId', {
                    rules: [{ required: true, message: 'Chọn Cửa Hàng!' }]
                  })(
                    <Select style={{ width: '100%' }}>
                      {!isEmpty(storeList) &&
                        storeList.map(el => (
                          <Select.Option value={el.storeId} key={el.storeId}>
                            {el.storeName}
                          </Select.Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
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

export default Form.create()(StaffModal);
