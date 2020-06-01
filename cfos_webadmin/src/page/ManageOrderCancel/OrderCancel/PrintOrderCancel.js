import React, { Component } from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
class PrintOrderCancel extends Component {
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
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min 
    });
  }
  render() {
    const { item } = this.props;
    console.log('data nè', item);
    return (
      <div>
        <Row className="text-center">
          <h3 style={{ fontFamily: 'Times New Roman' }}>Aeon Citimart</h3>
        </Row>
        <Row >
          <Col span={22} offset={1}>
            <h6 style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
              Address: 672 Quang Trung, P. 11, Q. Gò Vấp, Ho Chi Minh City, Vietnam
          </h6>
          </Col>
        </Row>
        <Row className="text-center">
          <h3>Phiếu thanh toán</h3>
          <p style={{ textAlign: "right", fontWeight: 800, marginRight: "15px" }}>{this.state.date}</p>
        </Row>
        <Row>
          <h5 style={{ textAlign: "center" }}>Số đơn hàng: {item.orderNumber}</h5>
        </Row>
        <div style={{ fontWeight: 1000 }}>
          <h6>{item.oderDetailStatus === "GUEST_CANCEL" && (<p>Nội Dung: Hoàn Lại Tiền</p>)}</h6>
          <h6>Cửa Hàng: {item.storeVM.storeName}</h6>
          <h6>Món Ăn: {item.foodVM.foodName}</h6>
          <h6>Số Lượng: {item.quantity}</h6>
        </div>
        <Row type="flex" justify="end" >
          <Col style={{ textAlign: 'right'}}>
            <h5 style={{marginRight:"5px"}}>Tổng tiền: </h5>
          </Col>
          <Col className="text-right" style={{ marginRight: "15px" ,fontWeight: 1000}}>
            <h5> <NumberFormat value={item.totalPrice} displayType={'text'} thousandSeparator={','} /> VNĐ</h5>
          </Col>
        </Row>

      </div>
    );
  }
}

export default PrintOrderCancel;
