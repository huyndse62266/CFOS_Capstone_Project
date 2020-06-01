import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteMap } from '../../utils/constants';
import { ROLES } from '../../utils/constants/constants';
import banner from '../../assets/Image/banner.png';
class MenuList extends Component {
  isActive = route => {
    return route === this.props.location.pathname;
  };
  getMenu = role => {
    return [
      {
        name: 'Home',
        iconName: 'dashboard',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_DASHBOARD
      },
      {
        name: 'Home',
        iconName: 'dashboard',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_STATIC_STORE
      },
      {
        name: 'Home',
        iconName: 'dashboard',
        isShow: role === ROLES.CASHIER,
        route: RouteMap.ROUTE_STATIC_CASHIER
      },
      {
        name: 'Staff',
        iconName: 'person',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_STAFF
      },
      {
        name: 'Member',
        iconName: 'how_to_reg',
        isShow: role === ROLES.CASHIER,
        route: RouteMap.ROUTE_MEMBER
      },
      {
        name: 'Food',
        iconName: 'fastfood',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_PRODUCTS
      },
      {
        name: 'Food Option',
        iconName: 'more',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_FOOD_OPTION
      },
      {
        name: 'Food Court Manager',
        iconName: 'person',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_CREATE_FOODCOURT
      },
      {
        name: 'Food court',
        iconName: 'store',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_MANAGE_FOODCOURT
      },

      {
        name: 'Store',
        iconName: 'store_mall_directory',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_STORE_INFOMATION
      },

      {
        name: 'Guest Order',
        iconName: 'assignment',
        isShow: role === ROLES.CASHIER,
        route: RouteMap.ROUTE_ORDER
      },
      // {
      //   name: 'Management Order Cancel',
      //   iconName: 'remove_shopping_cart',
      //   route: RouteMap.ROUTE_CANCEL_ORDER
      // },
      {
        name: 'Categories',
        iconName: 'list_alt',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_CATEGORIES
      },
      {
        name: 'Payable',
        iconName: 'swap_horiz',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_FC_PAYABLE
      },
      {
        name: 'Show Finished Food',
        iconName: 'check',
        isShow: role === ROLES.FOOD_COURT_MANAGER,
        route: RouteMap.ROUTE_ORDER_SUCCESS_FC
      },
      {
        name: 'Transaction History',
        iconName: 'attach_money',
        isShow: role === ROLES.CASHIER,
        route: RouteMap.ROUTE_TRANSACTION
      },
      {
        name: 'Receivable',
        iconName: 'swap_horiz',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_STORE_RECEIVABLE
      },
      {
        name: 'Feedback',
        iconName: 'feedback',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_FEEDBACK
      },
      {
        name: 'View Order Success',
        iconName: 'check',
        isShow: role === ROLES.STORE_MANAGER,
        route: RouteMap.ROUTE_ORDER_SUCCESS
      },
      {
        name: 'Refund Guest Order',
        iconName: 'cancel',
        isShow: role === ROLES.CASHIER,
        route: RouteMap.ROUTE_ORDER_CANCEL
      }
    ];
  };

  render() {
    const { role } = this.props;
    const menu = this.getMenu(role);
    return (
      <div>
        <div
          className="sidebar"
          data-color="purple"
          data-background-color="white"
          data-image="../assets/img/sidebar-1.jpg"
        >
          <div className="logo">
            {role === ROLES.FOOD_COURT_MANAGER && (
              <Link to={RouteMap.ROUTE_DASHBOARD}>
                <div className="simple-text logo-normal">
                  {' '}
                  <img alt="" src={banner} width="100%" />
                </div>
              </Link>
            )}
            {role === ROLES.SYSTEM_ADMIN && (
              <Link to={RouteMap.ROUTE_CREATE_FOODCOURT}>
                <div className="simple-text logo-normal">
                  <img alt="" src={banner} width="100%" />
                </div>
              </Link>
            )}
            {role === ROLES.STORE_MANAGER && (
              <Link to={RouteMap.ROUTE_STATIC_STORE}>
                <div className="simple-text logo-normal">
                  {' '}
                  <img alt="" src={banner} width="100%" />
                </div>
              </Link>
            )}
            {role === ROLES.CASHIER && (
              <Link to={RouteMap.ROUTE_STATIC_CASHIER}>
                <div className="simple-text logo-normal">
                  {' '}
                  <img alt="" src={banner} width="100%" />
                </div>
              </Link>
            )}
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {menu.map((el, index) => {
                if (el.isShow) {
                  return (
                    <li
                      key={index}
                      className={`nav-item ${this.isActive(el.route) &&
                        'active'}`}
                    >
                      <Link className="nav-link" to={el.route}>
                        <i className="material-icons">{el.iconName}</i>
                        <p>{el.name}</p>
                      </Link>
                    </li>
                  );
                }
                return '';
              })}
            </ul>
          </div>
        </div>
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
      // action
    }
  )(MenuList)
);
