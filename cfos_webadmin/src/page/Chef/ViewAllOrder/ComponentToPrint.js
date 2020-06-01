import React from 'react';
import { Row } from 'antd';
class ComponentToPrint extends React.Component {
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
    console.log('item', item);
    return (
      <div>
        <Row className="text-center">
          <h3>{item.storeName}</h3>
        </Row>
        <div style={{ fontWeight: 1000 }}>
          <h1 style={{ textAlign: 'center' }}>{item.orderNumber}</h1>
          <h3>
            Món Ăn:
            {item.listOrderDetail.map(el => (
              <p>{el.foodVM.foodName}</p>
            ))}
          </h3>
        </div>
      </div>
    );
  }
}
export default ComponentToPrint;
