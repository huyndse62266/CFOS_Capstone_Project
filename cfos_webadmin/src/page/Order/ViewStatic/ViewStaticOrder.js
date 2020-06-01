import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { DatePicker, Table, Button, message } from 'antd';
import {
  getStoreStatic,
  getCountDeposit,
  getCountMember,
  getRevenueFc,
  getBanner,
  getCashierMoney,
  submitBanner
} from './StaticFcSServiec';
import { isEmpty } from '../../../utils/helpers/helpers';
import './StaticFc.scss';
import memberLogo from '../../../assets/Image/member.png';
// import depositLogo from '../../../assets/Image/deposit.png';
import dollarLogo from '../../../assets/Image/dollar.png';
import NumberFormat from 'react-number-format';
import UploadFirebase from '../../../components/uploadFirebase/UploadFirebase';

const { MonthPicker } = DatePicker;
class ViewStaticOrder extends Component {
  state = {
    listStoreStatic: [],
    member: '',
    deposit: '',
    revenue: '',
    cashier: [],
    fileList: []
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
    const countMember = await getCountMember();
    const countDeposit = await getCountDeposit();
    const countRevenueFc = await getRevenueFc();
    const moneyCashier = await getCashierMoney();
    const bannerFc = await getBanner();
    const temp = [];
    if (!isEmpty(bannerFc.data.image)) {
      bannerFc.data.image.forEach(el =>
        temp.push({ url: el.image, uid: el.id, status: 'done' })
      );
    }
    this.setState({
      member: countMember.data,
      deposit: countDeposit.data,
      revenue: countRevenueFc.data,
      fileList: [...temp],
      cashier: moneyCashier.data
    });
  };
  handleChange = (date, dateString) => {
    this.fetchStatic({ month: dateString });
  };
  handleChangeUpload = (url, file) => {
    const temp = [...this.state.fileList];
    temp.push({ url: url, uid: file.uid, name: file.name, status: 'done' });
    this.setState({ fileList: temp });
  };

  handleRemove = file => {
    const temp = this.state.fileList.filter(item => item.uid !== file.uid);
    this.setState({ fileList: temp });
  };
  handleSubmit = async () => {
    const { fileList } = this.state;
    const temp = [];
    if (!isEmpty(fileList)) {
      fileList.forEach(el => temp.push({ image: el.url }));
    }
    try {
      await submitBanner({ image: temp });
      message.success('Chỉnh Sửa Thành Công');
    } catch (err) {}
  };
  render() {
    const column = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Tên Thu Ngân',
        dataIndex: 'fullname',
        key: 'fullname',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'cashEndDay',
        render: text => (
          <p>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
            &nbsp; VNĐ
          </p>
        ),
        key: 'cashEndDay',
        align: 'center'
      }
    ];
    const { listStoreStatic, member, revenue, fileList, cashier } = this.state;
    let cate = [];
    let seriesTemp = [];
    if (!isEmpty(listStoreStatic)) {
      listStoreStatic.forEach(el => {
        let temp = { name: el.storeName, data: [] };
        if (!isEmpty(el.statisticVMS)) {
          el.statisticVMS.forEach(item => {
            cate.push(new Date(item.day).getDate());
            temp.data.push(item.total);
          });
        }
        seriesTemp.push(temp);
      });
    } else {
      seriesTemp.push({ name: '', data: [] });
    }
    const options = {
      chart: { id: 'basic-bar' },
      xaxis: { categories: [...cate] }
    };
    const series = [...seriesTemp];
    return (
      <div style={{ paddingLeft: '260px' }}>
        <div className="col-lg-12 header-static-fc-container">
          <div className="revenue-container">
            <div className="data-revenue-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>{member}</h3>
              <p style={{ color: 'white' }}>Tổng Số Lượng Thành Viên</p>
            </div>
            <div className="revenue-image">
              <img
                alt="logo"
                src={memberLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
          {/* <div className="success-container">
            <div className="data-success-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={deposit}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                VNĐ
              </h3>
              <p style={{ color: 'white' }}>
                Tổng Số Tiền Mặt Thu Được Từ Thu Ngân
              </p>
            </div>
            <div className="success-image">
              <img
                alt="logo"
                src={depositLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div> */}
          <div className="cancle-container">
            <div className="data-cancle-container">
              <h3 style={{ color: 'white', fontWeight: '600' }}>
                <NumberFormat
                  value={revenue}
                  displayType={'text'}
                  thousandSeparator={','}
                />
                &nbsp;VNĐ
              </h3>
              <p style={{ color: 'white' }}>Tổng Công Nợ Phải Trả</p>
            </div>
            <div className="cancle-image">
              <img
                alt="logo"
                src={dollarLogo}
                style={{ width: '90px', height: '90px', float: 'right' }}
              />
            </div>
          </div>
        </div>
        <div className="App">
          <h3>Biểu Đồ Doanh Thu Các Cửa Hàng Theo Từng Tháng</h3>
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
        <hr />
        <div className="table-container">
          <div className="tbl-banner">
            <div>
              <h4 className="header-table">Chỉnh Sửa Banner</h4>
              <UploadFirebase
                handleChangeUpload={this.handleChangeUpload}
                handleRemove={this.handleRemove}
                // imageUrl={urlImage}
                fileList={fileList}
              />
            </div>
            <div>
              <Button
                style={{ background: '#1890ff', color: 'white' }}
                onClick={this.handleSubmit}
                icon="save"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className="table-cashier">
          <div className="tbl-cash">
            <div>
              <h4 className="header-table">Thống kê Tiền Mặt Từ Thu Ngân</h4>
            </div>
            <Table
              dataSource={cashier || []}
              columns={column}
              pagination={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ViewStaticOrder;
