import api from '../../../utils/helpers/api';
export const getListTransaction = params => {
  return api({
    method: 'get',
    url: '/api/transaction-status',
    params: params
  });
};
export const searchTransaction = params => {
  return api({
    method: 'get',
    url: '/api/transaction',
    params
  });
};
