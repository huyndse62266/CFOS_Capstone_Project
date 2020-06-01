import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { deposit } from './MemberService';
import md5 from 'md5';
import PrintBillCustomer from './PrintBillCustomer';
import ReactToPrint from 'react-to-print';
class DepositModal extends Component {
  state = {
    isErr: false,
    data: {}
  };
  printBill = item => {
    console.log("item",item);
    try {
      const { data } = this.state;
      Modal.confirm({
        title: 'In Hóa Đơn',
        content: (
          <div>
            <ReactToPrint
              trigger={() => (
                <span id="print-bill" style={{ opacity: 0, width: 0 }}>
                  1
                </span>
              )}
              content={() => this.componentRef}
              copyStyles
            />
            <PrintBillCustomer
              ref={el => (this.componentRef = el)}
              item={data}
              trandID={item}
            />
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',

        onOk() {
          document.getElementById('print-bill').click();
          message.success('Nộp tiền thành công!');
        },
        onCancel() {}
      });
    } catch (err) {}
  };
  handleSubmit = e => {
    let password = '';
    let temp = {};
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { itemSelected } = this.props;
          temp = { ...values, customerId: itemSelected.customerId };
          this.setState({ data: temp });
          delete itemSelected.fullname;
        } catch (err) {}
      }
    });

    Modal.confirm({
      title: 'Nhập Password Xác Thực !',
      content: (
        <div>
          <p>Password</p>
          <Input
            type="password"
            onChange={e => (password = md5(e.target.value.trim()))}
          />
        </div>
      ),
      onOk: async () => {
        try {
          const res =  await deposit({ ...temp }, { password });
          this.printBill(res.data);
          this.props.cancelDepositModal();
        } catch (err) {
          this.setState({ isErr: true });
          message.error('Giao Dịch Thất Bại!');
        }
      },
      onCancel() {}
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, itemSelected } = this.props;
    return (
      <Modal
        title="Nộp Tiền Cho Khách Hàng"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelDepositModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Tên Khách Hàng</span>
              <Form.Item>
                {getFieldDecorator('fullname', {
                  initialValue: itemSelected.fullname
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Số Tiền</span>
              <Form.Item>
                {getFieldDecorator('tranTotal', {
                  rules: [{ required: true, message: 'Nhập Số Tiền' }]
                })(<Input placeholder="Số tiền" type="number" min={1} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Mô Tả Giao Dịch</span>
              <Form.Item>
                {getFieldDecorator('tranDescription', {
                  rules: [{ required: true, message: 'Nhập Mô Tả Giao Dịch!' }]
                })(<Input placeholder="Mô Tả" />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(DepositModal);
