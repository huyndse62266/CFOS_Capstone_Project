import React, { Component } from 'react';
import './StaticStore.scss';
import dollar from '../../../assets/Image/dollar.png';
import successLogo from '../../../assets/Image/success.png';
import failLogo from '../../../assets/Image/fail.png';
import NumberFormat from 'react-number-format';
import {
  getRevenue,
  getOrderSuccess,
  getOrderFail,
  getStoreStatic
} from './StoreStaticService';
import { isEmpty } from '../../../utils/helpers/helpers';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { DatePicker } from 'antd';
const { MonthPicker } = DatePicker;
class StoreStaticPage extends Component {
  state = {
    listStoreStatic: {},
    revenue: '',
    success: '',
    fail: ''
  };
  componentDidMount() {
    this.fetchStatic({
      month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
    });
    this.fetchData();
  }
  fetchStatic = async params => {
    const res = await getStoreStatic(params);
    this.setState({ listStoreStatic: res.data });
  };
  fetchData = async () => {
    const res = await getRevenue();
    const successOrder = await getOrderSuccess();
    const failOrder = await getOrderFail();
    this.setState({
      revenue: res.data,
      success: successOrder.data,
      fail: failOrder.data
    });
    console.log('revenue', res.data);
  };
  handleChange = (date, dateString) => {
    this.fetchStatic({ month: dateString });
  };
  render() {
    const { revenue, success, fail, listStoreStatic } = this.state;
    console.log('listStoreStatic', listStoreStatic.storeName);
    let cate = [];
    let seriesTemp = [];
    if (!isEmpty(listStoreStatic)) {
      let temp = { name: listStoreStatic.storeName, data: [] };
      if (!isEmpty(listStoreStatic.statisticVMS)) {
        listStoreStatic.statisticVMS.map(item => {
          cate.push(new Date(item.day).getDate());
          temp.data.push(item.total);
        });
      }
      seriesTemp.push(temp);
    } else {
      seriesTemp.push({ name: '', data: [] });
    }
    const options = {
      chart: { id: 'basic-bar' },
      xaxis: { categories: [...cate] }
    };
    const series = [...seriesTemp];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-static-container">
          <div className="revenue-container">
            <div className="data-revenue-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={revenue}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp;VNĐ
              </h3>
              <p style={{ color: 'white' }}>Tổng Thu Nhập Trong Ngày</p>
            </div>
            <div className="revenue-image">
              <img
                alt="logo"
                src={dollar}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
          <div className="success-container">
            <div className="data-success-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>{success}</h3>
              <p style={{ color: 'white' }}>Số Order Được Hoàn Thành</p>
            </div>
            <div className="success-image">
              <img
                alt="logo"
                src={successLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
          <div className="cancle-container">
            <div className="data-cancle-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>{fail}</h3>
              <p style={{ color: 'white' }}>Số Order Bị Hủy</p>
            </div>
            <div className="cancle-image">
              <img
                alt="logo"
                src={failLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
        </div>
        <div className="App">
          <h3>Biểu Đồ Doanh Thu Cửa Hàng Theo Từng Tháng</h3>
          <div style={{ paddingBottom: '20px' }}>
            <MonthPicker
              placeholder="Select month"
              defaultValue={moment(
                `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                'YYYY-MM'
              )}
              onChange={this.handleChange}
            />
          </div>
          <div
            style={{ textAlign: 'center', width: '80%', paddingLeft: '15%' }}
          >
            <Chart options={options} series={series} type="line" />
          </div>
        </div>
      </div>
    );
  }
}

export default StoreStaticPage;
