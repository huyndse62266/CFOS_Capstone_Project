import api from '../../../utils/helpers/api';

export const getOrderSuccessFC = () => {
  return api({
    method: 'get',
    url: '/api/orders/order-ready-foodcourt'
  });
};
export const getOrderCancelForFC = () => {
  return api({
    method: 'get',
    url: '/api/orders/order-cancel-foodcourt'
  });
};
