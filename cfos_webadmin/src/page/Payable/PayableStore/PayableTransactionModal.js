import React, { Component } from 'react';
import { Modal, Form, Tooltip, Icon, Table, message } from 'antd';
import { cancelTransaction } from './PayableService';
import { isEmpty } from '../../../utils/helpers/helpers';
import NumberFormat from 'react-number-format';
const confirm = Modal.confirm;
class PayableTransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isErr: false
    };
  }
  cancelTransaction(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Hủy Giao Dịch</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelTransaction({ tranId: item.tranId });
          this.props.fetchDataTransaction();
          message.success('Đã hủy giao dịch!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }

  render() {
    const { visible, itemSelected } = this.props;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Nội Dung Giao Dịch',
        dataIndex: 'tranDescription',
        render: (text, record) => <span>{record.tranDescription}</span>,
        key: 'tranDescription',
        align: 'center'
      },
      {
        title: 'Ngày',
        dataIndex: 'tranDate',
        render: (text, record) => (
          <span>{new Date(record.tranDate).toLocaleDateString()}</span>
        ),
        key: 'tranDate',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'tranDate',
        render: (text, record) => (
          <div>
            {record.status === 'SPENDING' && (
              <span style={{ color: 'red' }}>Chưa Được Xác Nhận</span>
            )}
            {record.status === 'FC_CANCEL' && (
              <span style={{ color: 'blue' }}>Đã Hủy Giao Dịch</span>
            )}
            {record.status === 'COMPLETED' && (
              <span style={{ color: 'green' }}>Cửa Hàng Đã Nhận Tiền</span>
            )}
          </div>
        ),
        key: 'tranDate',
        align: 'center'
      },
      {
        title: 'Số Tiền',
        dataIndex: 'tranTotal',
        render: (text, record) => (
          <span>
            <NumberFormat
              value={record.tranTotal}
              displayType={'text'}
              thousandSeparator={','}
            />
          </span>
        ),
        key: 'tranTotal',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            {record.status === 'SPENDING' && (
              <Tooltip title="Hủy Giao Dịch">
                <Icon
                  type="close-circle"
                  className="edit-icon"
                  style={{ color: 'red' }}
                  onClick={() => this.cancelTransaction(record)}
                />
              </Tooltip>
            )}
            {record.status === 'COMPLETED' && (
              <Icon
                type="close-circle"
                className="edit-icon"
                style={{ opacity: '0.1', color: 'red' }}
              />
            )}
            {record.status === 'FC_CANCEL' && (
              <Icon
                type="close-circle"
                className="edit-icon"
                style={{ opacity: '0.1', color: 'red' }}
              />
            )}
          </div>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <Modal
        title="Lịch Sử Giao Dịch"
        centered
        visible={visible}
        width={960}
        footer={[null]}
        // onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <div>
          <Table
            dataSource={
              !isEmpty(itemSelected.fcStroreTransactionVMS)
                ? itemSelected.fcStroreTransactionVMS
                : []
            }
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
      </Modal>
    );
  }
}

export default Form.create()(PayableTransactionModal);
