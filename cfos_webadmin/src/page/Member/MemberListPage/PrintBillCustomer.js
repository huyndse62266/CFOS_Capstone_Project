import React, { Component } from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format'; 
class PrintBillCustomer extends Component {
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
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    });
  }
  render() {
    const { item, trandID } = this.props;
    console.log('data nè', item);
    console.log('tranID nè', trandID);
    return (
      <div>
      <Row className="text-center">
          <h3 style={{fontFamily: 'Times New Roman'}}>Aeon Citimart</h3>
      </Row>
      <Row >
      <Col span={22} offset={1}>
          <h6 style={{ fontSize: "12px", fontWeight: 'bold',fontFamily: 'Times New Roman' }}>
              Address: 672 Quang Trung, P. 11, Q. Gò Vấp, Ho Chi Minh City, Vietnam
          </h6>
      </Col>
      </Row>
      <Row className="text-center">
          <h3>Phiếu thanh toán</h3>
          <p style={{textAlign:"right",fontWeight:800,marginRight:"15px"}}>{this.state.date}</p>
      </Row>
      <Row className="text-center">
          <h3>Mã Giao Dịch: {trandID.tranId}</h3>
      </Row>
      <div style={{fontWeight:1000}}>
        
        <h4>Khách hàng: {item.fullname}</h4>
        <h4>Mô Tả Giao Dịch: {item.tranDescription}</h4>
        <h4>Số Tiền: <NumberFormat value={item.tranTotal } displayType={'text'} thousandSeparator={','} /> VNĐ</h4>
      </div>
      <Row type="flex" justify="end" >
          <Col style={{textAlign:'right'}}>
              <h5 style={{marginRight:"5px"}}>Tổng tiền:</h5>  
          </Col>  
          <Col className="text-right" style={{marginRight:"15px"}}>
              <h5><NumberFormat value={item.tranTotal } displayType={'text'} thousandSeparator={','} /> VNĐ</h5> 
          </Col>  
      </Row>
  
</div>
      // <div style={{ textAlign: 'center' }}>
      //   <h2>Khách hàng: {item.fullname}</h2>
      //   <h2>Mô Tả Giao Dịch: {item.tranDescription}</h2>
      //   <h1>Số Tiền: {item.tranTotal}</h1>
      //   <h1>Ngày: {this.state.date}</h1>
      // </div>
    );
  }
}

export default PrintBillCustomer;
