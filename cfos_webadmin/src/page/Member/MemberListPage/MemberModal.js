import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createMember, updateStatusUser } from './MemberService';
import { MODE } from '../../../utils/constants/constants';
class MemberModal extends Component {
  state = {
    isErr: false,
    err: false
  };
  async componentDidMount() {
    // const res = await getListRoles();
    // const { data } = await getListFoodCourt();
    // const store = await getListStore();
  }
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mode, itemSelected } = this.props;

        if (mode === MODE.ADD) {
          try {
            await createMember(values);
            message.success('Tạo mới thành công');
            this.props.cancelModal();
            this.props.fetchData();
          } catch (err) {
            this.setState({ isErr: true })
          }

        } else {
          try {
            await updateStatusUser({ ...itemSelected, ...values });
            message.success('Chỉnh Sửa thành công');
            this.props.cancelModal();
            this.props.fetchData();
            console.log("value", values);
          } catch (err) {
            this.setState({ err: true })
          }
        }
      }
    });
  };
  render() {
    const { isErr,err } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal =
      mode === MODE.ADD ? 'Tạo Mới Thành Viên' : 'Chỉnh Sửa Thành Viên';
    return (
      <Modal
        title={titleModal}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          {mode === MODE.ADD && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Username</span>
                <Form.Item>
                  {getFieldDecorator('username', {
                    initialValue:
                      mode === MODE.EDIT ? itemSelected.username : '',
                    rules: [{ required: true, message: 'Nhập từ 1-50 kí tự!' }]
                  })(<Input placeholder="Username" maxLength={50} />)}
                </Form.Item>
              </div>
              <div className="col-md-6">
                <span className="lab-text">Họ Và Tên</span>
                <Form.Item>
                  {getFieldDecorator('fullname', {
                    initialValue:
                      mode === MODE.EDIT ? itemSelected.fullname : '',
                    rules: [{ required: true, message: 'Nhập từ 1-200 kí tự!' }]
                  })(<Input placeholder="Nguyễn Văn A" maxLength={200} />)}
                </Form.Item>
              </div>
            </div>
          )}

          {mode === MODE.ADD && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Số Điện Thoại</span>
                <Form.Item>
                  {getFieldDecorator('phone', {
                    initialValue: mode === MODE.EDIT ? itemSelected.phone : '',
                    rules: [{ required: true, message: 'Nhập Số Điện Thoại!' }]
                  })(<Input placeholder="0123456789" type="number" />)}
                </Form.Item>
              </div>
              <div className="col-md-6">
                <span className="lab-text">Email</span>
                <Form.Item>
                  {getFieldDecorator('email', {
                    initialValue: mode === MODE.EDIT ? itemSelected.email : '',
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
          )}
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Mã thẻ</span>
              <Form.Item>
                {getFieldDecorator('cardId', {
                  initialValue: mode === MODE.EDIT ? itemSelected.cardId : '',
                  rules: [{ required: true, message: 'Nhập Mã Thẻ!' }]
                })(<Input placeholder="01235" type="number" />)}
              </Form.Item>
            </div>
          </div>
          {mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Trạng Thái</span>
                <Form.Item>
                  {getFieldDecorator('active', {
                    initialValue: itemSelected.active
                  })(
                    <Radio.Group>
                      <Radio value={true}>Hiện</Radio>
                      <Radio value={false}>Ẩn</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
          {mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Thao Tác Thẻ</span>
                <Form.Item>
                  {getFieldDecorator('cardStatus', {
                    initialValue: itemSelected.cardStatus
                  })(
                    <Radio.Group>
                      <Radio value={"ACTIVATE"}>Mở thẻ mới</Radio>
                      <Radio value={"LOST"}>Khóa thẻ bị mất </Radio>
                    </Radio.Group>
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
            {err && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Thẻ không thể sử dụng!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(MemberModal);
