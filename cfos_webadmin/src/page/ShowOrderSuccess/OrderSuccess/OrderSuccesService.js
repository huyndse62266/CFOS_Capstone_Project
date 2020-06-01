import api from '../../../utils/helpers/api';

export const getOrderSuccess = () => {
  return api({
    method: 'get',
    url: '/api/orders/stores/orderDetails-ready'
  });
};
export const getOrderCancelForStore = () => {
  return api({
    method: 'get',
    url: '/api/orders/order-cancel-store'
  });
};
