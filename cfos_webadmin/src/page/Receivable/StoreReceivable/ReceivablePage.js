import React, { Component } from 'react';
import {
  getListReceivable,
  confirmTransaction,
  getNumberReceivable
} from './ReceivableService';
import { Table, Tooltip, Button, Modal, message } from 'antd';
import { isEmpty } from '../../../utils/helpers/helpers';
import NumberFormat from 'react-number-format';
import dollar from '../../../assets/Image/dollar.png';
const confirm = Modal.confirm;
class ReceivablePage extends Component {
  state = {
    receivableList: [],
    numberReceivable: ''
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const res = await getListReceivable();
    const receivable = await getNumberReceivable();
    this.setState({
      receivableList: res.data,
      numberReceivable: receivable.data
    });
  };
  confirmTransaction(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Xác Nhận Đã Nhận Tiền</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await confirmTransaction({ tranId: item.tranId });
          message.success('Hoàn tất giao dịch!');
          this.fetchData();
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  render() {
    const { receivableList, numberReceivable } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Mô Tả Giao Dịch',
        dataIndex: 'tranDescription',
        key: 'tranDescription',
        align: 'center'
      },

      {
        title: 'Ngày Giao Dịch',
        dataIndex: 'tranDate',
        render: text => <span>{new Date(text).toLocaleDateString()}</span>,
        key: 'tranDate',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'status',
        render: text => (
          <div>
            {text === 'SPENDING' && (
              <span style={{ color: 'blue' }}>Đang Chờ Chấp Nhận</span>
            )}
            {text === 'COMPLETED' && (
              <span style={{ color: 'green' }}>Đã Nhận Tiền</span>
            )}
            {text === 'FC_CANCEL' && (
              <span style={{ color: 'red' }}>Giao Dịch Đã Bị Hủy</span>
            )}
          </div>
        ),
        key: 'status',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'tranTotal',
        render: text => (
          <span>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
            &nbsp;VNĐ
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
              <Tooltip title="Xác Nhận">
                <div>
                  <Button
                    style={{
                      marginRight: 5,
                      color: 'green',
                      background: '#e6e6e6'
                    }}
                    icon="check"
                    onClick={() => this.confirmTransaction(record)}
                  />
                </div>
              </Tooltip>
            )}
            {record.status === 'COMPLETED' && (
              <div>
                <Button
                  style={{
                    opacity: '0.1',
                    marginRight: 5,
                    color: 'green',
                    background: '#e6e6e6'
                  }}
                  icon="check"
                />
              </div>
            )}
            {record.status === 'FC_CANCEL' && (
              <div>
                <Button
                  style={{
                    opacity: '0.1',
                    marginRight: 5,
                    color: 'green',
                    background: '#e6e6e6'
                  }}
                  icon="check"
                />
              </div>
            )}
          </div>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-static-container">
          <div className="cancle-container">
            <div className="data-cancle-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                {' '}
                <NumberFormat
                  value={numberReceivable}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp; VNĐ
              </h3>
              <p style={{ color: 'white' }}>
                Tổng Số Tiền Foodcourt Chưa Thanh Toán
              </p>
            </div>
            <div className="cancle-image">
              <img
                alt="logo"
                src={dollar}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
        </div>
        <div className="card-body store-container">
          <p className="header-table">Xác Nhận Thanh Toán Công Nợ</p>
          <Table
            dataSource={!isEmpty(receivableList) ? receivableList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
      </div>
    );
  }
}

export default ReceivablePage;
