import React, { Component } from 'react';
import { Table, Button, Modal, message, Tag, Tooltip, Badge } from 'antd';
import './OrderPage.scss';
import { getOrderChef, submitOrder, cancelOrder } from './OrderPageService';
import { isEmpty } from './../../../utils/helpers/helpers';
import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';
import CancelFoodToPrint from './CancelFoodToPrint';
const confirm = Modal.confirm;
class ViewAllOrderPage extends Component {
  intervalID = 0;
  state = {
    listOrder: {}
  };

  componentDidMount() {
    this.intervalID = setInterval(this.fetchOrder, 5000);
    // this.fetchOrder();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchOrder = async () => {
    try {
      const res = await getOrderChef();
      this.setState({ listOrder: res.data });
      console.log('listOrder', res.data);
    } catch (err) {}
  };
  printBillCancelFood(item) {
    try {
      confirm({
        title: 'In Hóa Đơn',
        content: (
          <div>
            <ReactToPrint
              trigger={() => (
                <span
                  id="print-bill-cancel-food"
                  style={{ opacity: 0, width: 0 }}
                >
                  1
                </span>
              )}
              content={() => this.componentRef}
              copyStyles
            />
            <CancelFoodToPrint
              ref={el => (this.componentRef = el)}
              item={item}
            />
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',

        onOk() {
          document.getElementById('print-bill-cancel-food').click();
          message.success('Đã Hủy Món Ăn!');
        },
        onCancel() {}
      });
    } catch (err) {}
  }
  showDeleteConfirm(item) {
    console.log('item', item);
    confirm({
      title: 'Hủy Món Ăn?',
      content: <p>Bạn chắc chắn muốn hủy món ăn</p>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelOrder({ orderDetailId: item.orderDetailId });
          this.fetchOrder();
          // this.printBillCancelFood(item);
          message.success('Đã Hủy Món Ăn!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  showMessageSucces = async item => {
    try {
      await submitOrder({ orderNumber: item.orderNumber });
      this.fetchOrder();
      confirm({
        title: 'In Hóa Đơn',
        content: (
          <div>
            <ReactToPrint
              trigger={() => (
                <span id="print-order" style={{ opacity: 0, width: 0 }}>
                  1
                </span>
              )}
              content={() => this.componentRef}
              copyStyles
            />
            <ComponentToPrint
              ref={el => (this.componentRef = el)}
              item={item}
            />
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',

        onOk() {
          document.getElementById('print-order').click();
          message.success('Hoàn thành món ăn!');
        },
        onCancel() {}
      });
    } catch (err) {}
  };
  render() {
    const { listOrder } = this.state;
    const columns = [
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        render: text => (
          <span style={{ fontWeight: '800', color: 'white', fontSize: 35 }}>
            {text}
          </span>
        ),
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Thời Gian',
        dataIndex: 'scheduleTime',
        render: (text, records) => (
          // <b style={{ color: 'white' }}>{records.listOrderDetail}</b>,
          // console.log("hien thi", records.listOrderDetail)
          <div>
            <b style={{ color: 'white' }}>{records.scheduleTime.slice(0, 5)}</b>
          </div>
        ),
        key: 'scheduleTime',
        align: 'center'
      },
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, records) => (
          <div>
            {records.listOrderDetail.map(el => (
              <p style={{ margin: 0 }}>
                <b style={{ color: 'white' }}>{el.foodVM.foodName}</b>
              </p>
            ))}
          </div>
        ),
        key: 'foodName'
        // align: 'center'
      },

      {
        title: 'Tùy Chọn',
        dataIndex: 'foName',
        render: (text, records) => (
          <div>
            {!isEmpty(records.listOrderDetail) &&
              records.listOrderDetail.map(item => (
                <div>
                  {!isEmpty(item.orderDetailFoodOption) ? (
                    item.orderDetailFoodOption.map((el, index) => (
                      <Badge count={el.quantity}>
                        <Tag
                          style={{
                            backgroundColor: '#234A1B',
                            fontSize: '20px',
                            padding: '10px',
                            color: 'white'
                          }}
                          key={index}
                        >
                          <b>
                            {el.parentName}: {el.foName}
                          </b>
                        </Tag>
                      </Badge>
                    ))
                  ) : (
                    <Tag
                      style={{
                        backgroundColor: '#283650',
                        color: 'white',
                        fontSize: '20px',
                        padding: '10px'
                      }}
                      key="default"
                    >
                      <b>Mặc Định</b>
                    </Tag>
                  )}
                </div>
              ))}
          </div>
        ),
        key: 'foName'
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        render: (text, records) => (
          <div>
            {records.listOrderDetail.map(el => (
              <p style={{ margin: 0 }}>
                <b style={{ color: 'white' }}>{el.quantity}</b>
              </p>
            ))}
          </div>
          // <b style={{ color: 'white' }}>{records.quantity}</b>
        ),
        key: 'quantity',
        align: 'center'
      },
      {
        title: 'Hủy Món',
        dataIndex: 'action',
        render: (text, records) => (
          <div>
            {records.listOrderDetail.map(el => (
              <div>
                <Tooltip title="Hủy Món Ăn">
                  <Button
                    style={{
                      color: 'white',
                      background: '#4a4a4a',
                      border: '1px solid #4a4a4a'
                    }}
                    icon="close"
                    onClick={() => this.showDeleteConfirm(el)}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        ),
        key: 'action',
        align: 'center'
      },
      {
        title: 'Hoàn thành',
        dataIndex: 'action',
        render: (text, records) => (
          <div>
            <Tooltip title="Hoàn Thành Món Ăn">
              <Button
                style={{
                  marginRight: 10,
                  color: 'green',
                  backgroundColor: '#4a4a4a',
                  border: '1px solid #4a4a4a'
                }}
                icon="check"
                onClick={() => this.showMessageSucces(records)}
              />
            </Tooltip>
          </div>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div className="order-chef-container">
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={!isEmpty(listOrder) ? listOrder : []}
            pagination={false}
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'row-custom' : ''
            }
          />
        </div>
      </div>
    );
  }
}
export default ViewAllOrderPage;
