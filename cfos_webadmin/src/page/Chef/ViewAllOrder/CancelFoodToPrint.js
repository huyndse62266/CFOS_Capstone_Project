import React from 'react';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
class CancelFoodToPrint extends React.Component {
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
    console.log('cancel', item);
    console.log('mon an', item.foodVM.foodName);
    console.log('cua hang', item.storeVM.foodName);
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
              Address: 672 Quang Trung, P. 11, Q. Gò Vấp, Ho Chi Minh City, Vietnam
            </h6>
          </Col>
        </Row>
        <Row className="text-center">
          <h3>Hủy món ăn</h3>
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
          <h4>Cửa Hàng: {item.storeVM.storeName}</h4>
          <h4>Món Ăn: {item.foodVM.foodName}</h4>
          <h4>
            Giá Tiền:{' '}
            <NumberFormat
              value={item.foodVM.price}
              displayType={'text'}
              thousandSeparator={','}
            />{' '}
            VNĐ
          </h4>
        </div>
        <hr />
        <Row>
          <h6>
            Món ăn đã bị hủy vì lý do nhà hàng hết nguyên liệu ngoài ý muốn
            (Chúng tôi đã cập nhật lại menu)
          </h6>
          <h6>Vui lòng mang hóa đơn này đến quầy thu ngân để hoàn lại tiền</h6>
        </Row>
      </div>
    );
  }
}
export default CancelFoodToPrint;
