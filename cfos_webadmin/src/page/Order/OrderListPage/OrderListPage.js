import React, { Component } from 'react';
import {
  Table,
  Button,
  Input,
  message,
  Modal,
  Tooltip,
  Pagination
} from 'antd';
import { isEmpty } from './../../../utils/helpers/helpers';
import { getOrderGuest, submitOrderForGuest } from './OrderGuestServiec';
import './OrderGuest.scss';
import PrintBillOrderGuest from './PrintBillOrderGuest';
import ReactToPrint from 'react-to-print';
import NumberFormat from 'react-number-format';
const confirm = Modal.confirm;
let pageNo = 0;
class OrderListPage extends Component {
  state = {
    isErr: false,
    listOrderGuest: []
  };
  componentDidMount() {
    this.fecthOrderGuest();
  }
  fecthOrderGuest = async params => {
    try {
      const res = await getOrderGuest(params);
      this.setState({ listOrderGuest: res.data });
    } catch (err) {}
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fecthOrderGuest({ page: pageNo });
  };
  printBillGuest(item) {
    try {
      confirm({
        title: 'In Hóa Đơn',
        content: (
          <div>
            <ReactToPrint
              trigger={() => (
                <span id="print-bill-guest" style={{ opacity: 0, width: 0 }}>
                  1
                </span>
              )}
              content={() => this.componentRef}
              copyStyles
            />
            <PrintBillOrderGuest
              ref={el => (this.componentRef = el)}
              item={item}
            />
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',

        onOk() {
          document.getElementById('print-bill-guest').click();
          message.success('Thực Hiện Thành Công!');
        },
        onCancel() {}
      });
    } catch (err) {}
  }
  submitOrderGuest(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Chuyển Order Đến Store</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await submitOrderForGuest({ orderId: item.orderId });
          this.printBillGuest(item);
          this.fecthOrderGuest();
          // message.success('Thực Hiện Thành Công!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  handleSearch = async value => {
    if (isEmpty(value)) {
      this.fecthOrderGuest();
    } else {
      try {
        const res = await getOrderGuest({ orderNumber: value });
        this.setState({ listOrderGuest: res.data });
      } catch (err) {
        this.setState({ isErr: true });
        message.warning('Không tìm thấy kết quả!');
      }
    }
  };
  render() {
    const { listOrderGuest } = this.state;
    console.log('listOrderGuest', listOrderGuest);
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      // {
      //   title: 'OrderId',
      //   dataIndex: 'orderId',
      //   key: 'orderId',
      //   align: 'center'
      // },
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'totalOrder',
        render: text => (
          <span>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
            &nbsp; VNĐ
          </span>
        ),
        key: 'totalOrder',
        align: 'center'
      },

      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, records) => (
          <Tooltip title="Đã Nhận Tiền Từ Khách Hàng">
            <div>
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="check"
                onClick={() => this.submitOrderGuest(records)}
              />
            </div>
          </Tooltip>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div className="order-guest" style={{ paddingLeft: 260 }}>
        <div
          className="col-lg-4 header-page-order-guest"
          style={{ paddingBottom: '15px', marginLeft: '66%' }}
        >
          <Input.Search
            placeholder="Search"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="card-body order-guest-container">
          <p className="header-order-guest">Danh Sách Order Khách Vãng Lai</p>
          <Table
            columns={columns}
            dataSource={listOrderGuest.content || []}
            pagination={false}
            bordered
          />
          {!isEmpty(listOrderGuest) && (
            <div className="pag-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={
                  listOrderGuest.content ? listOrderGuest.totalElements : 0
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default OrderListPage;
