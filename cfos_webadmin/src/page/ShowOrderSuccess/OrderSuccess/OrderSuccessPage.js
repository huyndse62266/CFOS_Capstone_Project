import React, { Component } from 'react';
import { Tabs } from 'antd';
import './OrderSuccessStore.scss';
import { getOrderSuccess, getOrderCancelForStore } from './OrderSuccesService';
import OrderSuccess from './OrderSuccess';
import OrderCancel from './OrderCancel';
import cooking from '../../../assets/Image/cooking.svg';
import { isEmpty } from '../../../utils/helpers/helpers';
const { TabPane } = Tabs;
class OrderSuccessPage extends Component {
  intervalID = 0;
  state = {
    activeTab: 'success',
    orderListSuccess: [],
    orderCancelStore: []
  };
  componentDidMount() {
    this.intervalID = setInterval(this.getData, 10000);
    // this.getData();
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  getData = async () => {
    try {
      const res = await getOrderSuccess();
      const { data } = await getOrderCancelForStore();
      const tempActive =
        this.state.activeTab === 'success' ? 'cancel' : 'success';
      this.setState({
        orderListSuccess: res.data,
        orderCancelStore: data,
        activeTab: isEmpty(data) ? 'success' : tempActive
      });
    } catch (err) {}
    // const tempActive =
    //   this.state.activeTab === 'success' ? 'cancel' : 'success';
    // this.setState({
    //   activeTab: tempActive
    // });
  };
  handleChange = key => {
    this.setState({ activeTab: key });
  };
  render() {
    const { activeTab, orderListSuccess, orderCancelStore } = this.state;
    console.log('orderCancelStore', orderCancelStore);
    return (
      <div className="Order-success-container">
        <Tabs activeKey={activeTab} onChange={this.handleChange}>
          <TabPane
            tab={
              <span>
                <img
                  alt=""
                  src={cooking}
                  width={'30px'}
                  height={'30px'}
                  style={{ marginRight: '10px' }}
                />
                Danh sách món ăn hoàn thành
              </span>
            }
            key="success"
          >
            <OrderSuccess listSuccess={orderListSuccess || []} />
          </TabPane>
          <TabPane tab="Danh sách món ăn bị hủy" key="cancel">
            <OrderCancel listCancel={orderCancelStore || []} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default OrderSuccessPage;
