import React, { Component } from 'react';
import { Table, Modal, Tooltip, Button, message, Pagination } from 'antd';
import { getOrderCancel, rollbackOrder } from './OrderCancelService';
import { isEmpty } from './../../../utils/helpers/helpers';
import './OrderCancel.scss';
import PrintOrderCancel from './PrintOrderCancel';
import ReactToPrint from 'react-to-print';
import NumberFormat from 'react-number-format';
const confirm = Modal.confirm;
let pageNo = 0;
class OrderCancelPage extends Component {
  intervalID = 0;
  state = {
    listOrderCancel: []
  };
  componentDidMount() {
    this.intervalID = setInterval(this.fecthOrderCancel, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  fecthOrderCancel = async params => {
    try {
      const res = await getOrderCancel(params);
      this.setState({ listOrderCancel: res.data });
    } catch (err) {}
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fecthOrderCancel({ page: pageNo });
  };
  printBillOrderCancel(item) {
    try {
      confirm({
        title: 'In Hóa Đơn',
        content: (
          <div>
            <ReactToPrint
              trigger={() => (
                <span
                  id="print-bill-order-cancel"
                  style={{ opacity: 0, width: 0 }}
                >
                  1
                </span>
              )}
              content={() => this.componentRef}
              copyStyles
            />
            <PrintOrderCancel
              ref={el => (this.componentRef = el)}
              item={item}
            />
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',

        onOk() {
          document.getElementById('print-bill-order-cancel').click();
          message.success('Thực Hiện Thành Công!');
        },
        onCancel() {}
      });
    } catch (err) {}
  }
  rollbackOrder(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Hoàn Tiền Cho Khách</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await rollbackOrder({ orderDetailId: item.orderDetailId });
          this.printBillOrderCancel(item);
          this.fecthOrderCancel();
          // message.success('Đã Hủy Order!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  render() {
    const { listOrderCancel } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, record) => <span>{record.foodVM.foodName}</span>,
        key: 'foodName',
        align: 'center'
      },

      {
        title: 'Cửa hàng',
        dataIndex: 'storeName',
        render: (text, record) => <span>{record.storeVM.storeName}</span>,
        key: 'storeName',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'totalPrice',
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
        key: 'totalPrice',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, records) => (
          <span>
            {records.oderDetailStatus && (
              <b style={{ color: 'red' }}>Hủy Bỏ Món Ăn</b>
            )}
          </span>
        ),
        key: 'active',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, records) => (
          <Tooltip title="Hoàn Tiền Cho Khách">
            <div>
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="check"
                onClick={() => this.rollbackOrder(records)}
              />
            </div>
          </Tooltip>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="card-body order-cancel-container">
          <p className="header-table">Danh Sách Món Ăn Bị Hủy</p>
          <Table
            style={{ marginRight: '10px' }}
            columns={columns}
            dataSource={listOrderCancel.content || []}
            pagination={false}
            bordered
          />
          {!isEmpty(listOrderCancel) && (
            <div className="pag-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={
                  listOrderCancel.content ? listOrderCancel.totalElements : 0
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default OrderCancelPage;
