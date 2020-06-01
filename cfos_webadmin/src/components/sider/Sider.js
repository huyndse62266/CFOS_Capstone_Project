import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteMap } from '../../utils/constants';
import './Sider.scss';
import vsmart_icon from '../../assets/vsmart_icon.svg';

const menuList = [
  { icon: 'home', name: 'Dashboard', route: RouteMap.ROUTE_DASHBOARD },
  { icon: 'home', name: 'Course', route: RouteMap.ROUTE_COURSE },
  { icon: 'home', name: 'Topic', route: RouteMap.ROUTE_TOPIC },
  { icon: 'home', name: 'Handful', route: RouteMap.ROUTE_HANDFUL },
  { icon: 'home', name: 'Lesson', route: RouteMap.ROUTE_LESSON },
  { icon: 'home', name: 'Quiz', route: RouteMap.ROUTE_QUIZ },
  { icon: 'user', name: 'Users', route: RouteMap.ROUTE_USERS },
  { icon: 'question-circle', name: 'Q&A', route: RouteMap.ROUTE_QA }
];
class Sider extends Component {
  state = {
    isCollapsed: false
  };
  onCollapse = (collapsed, type) => {
    this.setState({ isCollapsed: collapsed });
  };
  handleChangeMenu = ({ key }) => (window.location.href = `#${key}`);
  render() {
    const { location } = this.props;
    const { isCollapsed } = this.state;
    return (
      <Layout.Sider
        collapsed={isCollapsed}
        collapsible
        onCollapse={this.onCollapse}
        className="sider-container"
      >
        <Menu
          mode="inline"
          onClick={this.handleChangeMenu}
          selectedKeys={[location.pathname]}
          theme="dark"
          inlineCollapsed={isCollapsed}
          style={{ height: '100%' }}
        >
          {menuList.map(item => (
            <Menu.Item key={item.route}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Menu.Item>
          ))}
        </Menu>
        <div className="bottom-logo logo">
          <img src={vsmart_icon} alt="logo" />
          <span className={`${isCollapsed && 'hide'}`}>Vsmart</span>
          <p className={`version-app ${isCollapsed && 'hide'}`}>
            v1.1 VSmart 2019
          </p>
        </div>
      </Layout.Sider>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      // state
    }),
    {
      // action
    }
  )(Sider)
);
