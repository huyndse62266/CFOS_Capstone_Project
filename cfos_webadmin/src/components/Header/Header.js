import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import * as routes from '../../utils/constants/route';
import ProfileModal from '../Modal/ProfileModal/ProfileModal';
import ChangePasswordModal from '../Modal/ChangePassword/ChangePasswordModal';
import { getProfile } from '../Modal/ProfileModal/ProfileService';
import './Header.scss';
import { isEmpty } from '../../utils/helpers/helpers';

class Header extends Component {
  state = {
    visible: false,
    type: '',
    profile: {}
  };
  componentDidMount() {
    this.fetchProfile();
  }
  fetchProfile = async () => {
    const res = await getProfile();
    this.setState({ profile: res.data });
  };
  handleClick = item => {
    if (item.key === routes.ROUTE_PROFILE) {
      this.setState({ visible: true, type: 'profile' });
    } else if (item.key === routes.ROUTE_CHANGE_PASSWORD) {
      this.setState({ visible: true, type: 'password' });
    } else {
      window.location.href = '#' + item.key;
    }
  };
  handleCancelModal = () => this.setState({ visible: false, type: '' });
  getHeader = () => {
    const { location } = this.props;
    if (location.pathname === routes.ROUTE_DASHBOARD) return 'Home';
    if (location.pathname === routes.ROUTE_STATIC_STORE) return 'Home';
    if (location.pathname === routes.ROUTE_STATIC_CASHIER) return 'Home';
    if (location.pathname === routes.ROUTE_STAFF) return 'Quản Lý Nhân Viên';
    if (location.pathname === routes.ROUTE_MEMBER) return 'Quản Lý Thành Viên';
    if (location.pathname === routes.ROUTE_PRODUCTS) return 'Quản Lý Món Ăn';
    if (location.pathname === routes.ROUTE_FOOD_OPTION) return 'Tùy Chọn Món Ăn';
    if (location.pathname === routes.ROUTE_CREATE_FOODCOURT)
      return 'Thành Viên Quản Lý Food Court';
    if (location.pathname === routes.ROUTE_MANAGE_FOODCOURT)
      return 'Quản Lý Food Court';
    if (location.pathname === routes.ROUTE_STORE_INFOMATION)
      return 'Quản Lý Cửa Hàng';
    if (location.pathname === routes.ROUTE_FC_PAYABLE) return 'Quản Lý Công Nợ';
    if (location.pathname === routes.ROUTE_MANAGE_CATEGORY_STORE)
      return 'Quản Lý Danh Mục Food Court';
    if (location.pathname === routes.ROUTE_CATEGORIES)
      return 'Quản Lý Danh Mục Food Court';
    if (location.pathname === routes.ROUTE_ORDER)
      return 'Quản Lý Order Khách Vãn Lai';
    if (location.pathname === routes.ROUTE_TRANSACTION)
      return 'Lịch Sử Giao Dịch';
    if (location.pathname === routes.ROUTE_STORE_RECEIVABLE)
      return 'Xác Nhận Thanh Toán Công Nợ';
    if (location.pathname === routes.ROUTE_FEEDBACK) return 'Feedback';
    if (location.pathname === routes.ROUTE_ORDER_SUCCESS)
      return 'Show Order Success';
    if (location.pathname === routes.ROUTE_ORDER_CANCEL) return 'Hủy Món Ăn';

    return '';
  };
  render() {
    const { visible, type, profile } = this.state;
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item key={routes.ROUTE_PROFILE}>Profile</Menu.Item>
        <Menu.Item key={routes.ROUTE_CHANGE_PASSWORD}>
          Change Password
        </Menu.Item>
        <Menu.Item key={routes.ROUTE_LOGOUT}>Logout</Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header className="header-container">
        <div className="header-page">{this.getHeader()}</div>
        <Dropdown overlay={menu} placement="bottomRight">
          <span style={{ position: 'absolute', right: 40 }}>
            <Icon type="user" className="user-icon" />
            {!isEmpty(profile) && (
              <span style={{ color: 'white' }}>{profile.fullname}</span>
            )}
          </span>
        </Dropdown>
        {visible && type === 'profile' && (
          <ProfileModal
            visible={visible}
            cancelModal={this.handleCancelModal}
          />
        )}
        {visible && type === 'password' && (
          <ChangePasswordModal
            visible={visible}
            cancelModal={this.handleCancelModal}
          />
        )}
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
