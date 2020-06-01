import React, { Component } from 'react';
import './StacticCashier.scss';
import dollar from '../../../assets/Image/dollar.png';
import successLogo from '../../../assets/Image/success.png';
import failLogo from '../../../assets/Image/fail.png';
import depositLogo from '../../../assets/Image/deposit.png';
import NumberFormat from 'react-number-format';
import { getRevenue } from './StaticCashierService';
class StaticCashierPage extends Component {
  state = {
    revenue: {}
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const res = await getRevenue();
    this.setState({ revenue: res.data });
    console.log('data', res.data);
  };

  render() {
    const { revenue } = this.state;
    let a = revenue.guestRollbackTotal;
    let result = Math.abs(a);
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-static-cashier-container">
          <div className="revenue-container">
            <div className="data-revenue-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={revenue.totalCash}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp; VNĐ
              </h3>
              <p style={{ color: 'white' }}>Số Tiền Mặt Nhận Được Trong Ngày</p>
            </div>
            <div className="revenue-image">
              <img
                alt="logo"
                src={dollar}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 header-static-cashier-bottom-container">
          <div className="revenue-container">
            <div className="data-revenue-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={revenue.depositTotal}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp; VNĐ
              </h3>
              <p style={{ color: 'white' }}>Tổng Số Tiền Thành Viên Đã Nạp</p>
            </div>
            <div className="revenue-image">
              <img
                alt="logo"
                src={depositLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
          <div className="success-container">
            <div className="data-success-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={revenue.guestOrderedTotal}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp;VNĐ
              </h3>
              <p style={{ color: 'white' }}>Tổng Số Tiền Từ Khách Vãng Lai</p>
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
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={result}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp; VNĐ
              </h3>
              <p style={{ color: 'white' }}>
                Số Tiền Hoàn Lại Cho Khách Vãng Lai
              </p>
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
      </div>
    );
  }
}

export default StaticCashierPage;
