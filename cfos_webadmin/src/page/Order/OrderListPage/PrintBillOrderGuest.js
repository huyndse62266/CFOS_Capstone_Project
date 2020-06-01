import React, { Component } from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
class PrintBillOrderGuest extends Component {
  state = {
    date: ''
  };
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    that.setState({
      //Setting the value of the date time
      date: date + '/' + month + '/' + year + ' ' + hours + ':' + min
    });
  }
  render() {
    const { item } = this.props;
    console.log('item guest', item);
    return (
      <div>
        <Row className="text-center">
          <h3 style={{ fontFamily: 'Times New Roman' }}>Aeon Citimart</h3>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <h6
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'Times New Roman'
              }}
            >
              Address: 672 Quang Trung, P. 11, Q. Gò Vấp, Ho Chi Minh City,
              Vietnam
            </h6>
          </Col>
        </Row>
        <Row className="text-center">
          <h3>Phiếu thanh toán</h3>
          <p
            style={{ textAlign: 'right', fontWeight: 800, marginRight: '15px' }}
          >
            {this.state.date}
          </p>
        </Row>
        <Row>
          <h3 style={{ textAlign: 'center' }}>
            Số đơn hàng: {item.orderNumber}
          </h3>
        </Row>
        <div style={{ fontWeight: 1000 }}>
          <h6>
            {item.status === 'ORDER_GUEST' && <p>Nội Dung: Đã Nhận Tiền</p>}
          </h6>
          <h6>
            Số Tiền:{' '}
            <NumberFormat
              value={item.totalOrder}
              displayType={'text'}
              thousandSeparator={','}
            />{' '}
            VNĐ
          </h6>
        </div>
        <Row type="flex" justify="end">
          <Col style={{ textAlign: 'right' }}>
            <h5 style={{ marginRight: '5px' }}>Tổng tiền:</h5>
          </Col>
          <Col className="text-right" style={{ marginRight: '15px' }}>
            <h5>
              <NumberFormat
                value={item.totalOrder}
                displayType={'text'}
                thousandSeparator={','}
              />{' '}
              VNĐ
            </h5>
          </Col>
        </Row>
      </div>
      // <div style={{ textAlign: 'center' }}>
      //   <p>Số Order: {item.orderNumber}</p>
      //   <p>Ngày: {this.state.date}</p>
      //   <p>Nội Dung: {item.status}</p>
      //   <p>Tổng Số Tiền: {item.totalOrder} VNĐ</p>
      // </div>
    );
  }
}

export default PrintBillOrderGuest;
