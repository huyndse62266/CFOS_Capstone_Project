import api from './../../../utils/helpers/api';

export const getRevenue = () => {
  return api({
    method: 'get',
    url: '/api/stores/current-revenue'
  });
};
export const getOrderSuccess = () => {
  return api({
    method: 'get',
    url: '/api/stores/count-order-success'
  });
};
export const getOrderFail = () => {
  return api({
    method: 'get',
    url: '/api/stores/count-order-unsuccess'
  });
};
export const getStoreStatic = param => {
  return api({
    method: 'get',
    url: '/api/statistic-store',
    params: { ...param }
  });
};
