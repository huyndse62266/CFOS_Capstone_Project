import api from '../../../utils/helpers/api';

export const getOrderChef = () => {
  return api({
    method: 'get',
    url: '/api/orders/stores/orderDetails'
  });
};
export const cancelOrder = params => {
  return api({
    method: 'post',
    url: '/api/orders/chef-cancel',
    params
  });
};
export const submitOrder = params => {
  return api({
    method: 'post',
    url: '/api/orders/chef-ready-order',
    params
  });
};
