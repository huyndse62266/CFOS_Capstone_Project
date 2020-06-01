import api from './../../../utils/helpers/api';

export const getRevenue = () => {
  return api({
    method: 'get',
    url: '/api/cashier/total-cash-today'
  });
};
