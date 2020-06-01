import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { payableStore } from './PayableService';
import { MODE } from '../../../utils/constants/constants';
class PayableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isErr: false
    };
  }
  async componentDidMount() {}
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { itemSelected } = this.props;
        try {
          await payableStore({
            ...values,
            storeId: itemSelected.storeId
          });
          delete itemSelected.storeName;
          message.success('Giao Dịch Thành Công!');
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
    const { visible, mode, itemSelected } = this.props;
    return (
      <Modal
        title="Trả Tiền Cho Cửa Hàng"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Tên Cửa Hàng</span>
              <Form.Item>
                {getFieldDecorator('storeName', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.storeName : '',
                  rules: [{ required: true, message: 'Nhập từ 1 - 100 kí tự!' }]
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Nội Dung Giao Dịch</span>
              <Form.Item>
                {getFieldDecorator('tranDescription', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.tranDescription : '',
                  rules: [{ required: true, message: 'Nhập từ 1 - 100 kí tự!' }]
                })(<Input placeholder="Mô tả" maxLength={200} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Số Tiền</span>
              <Form.Item>
                {getFieldDecorator('tranTotal', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.tranTotal : '',
                  rules: [{ required: true, message: 'Nhập số tiền!' }]
                })(<Input placeholder="1" type="number" />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(PayableModal);
