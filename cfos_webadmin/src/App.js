import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Routes from './Routes';
import './App.scss';
import Header from './components/Header/Header';
import MenuList from './components/Menu/MenuList';
import Footer from './components/Footer/Footer';
// import { isDiff } from './utils/helpers/helpers';
import { TOKEN } from './utils/constants/constants';
import * as routes from './utils/constants/route';
import { updateRole } from './page/system/systemAction';
import { ROLES } from './utils/constants/constants';

class App extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return isDiff(nextProps.location !== this.props.location);
  // }
  componentDidMount() {
    // refresh keep token and update role in redux
    if (Cookie.get(TOKEN)) {
      const decoded = jwt_decode(Cookie.get(TOKEN));
      this.props.updateRole(decoded.JWTAuthoritiesKey);
    } else {
      window.location.href = '#' + routes.ROUTE_LOGIN;
    }
  }
  render() {
    const { location, role } = this.props;
    const isLogin = location.pathname === '/login';
    return (
      <div className="wrapper">
        {!isLogin &&
          role !== ROLES.CHEF &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS_FC && <Header />}
        {!isLogin &&
          role !== ROLES.CHEF &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS_FC && <MenuList />}
        <div style={{ minHeight: 'calc(100% - 167px)' }}>
          <Routes />
        </div>
        {!isLogin &&
          role !== ROLES.CHEF &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS &&
          location.pathname !== routes.ROUTE_ORDER_SUCCESS_FC && <Footer />}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      role: state.system.role
    }),
    {
      updateRole
    }
  )(App)
);
