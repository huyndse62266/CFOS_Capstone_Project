import api from '../../../utils/helpers/api';

export const getListReceivable = () => {
  return api({
    method: 'get',
    url: '/api/store-receivable-history'
  });
};
export const confirmTransaction = params => {
  return api({
    method: 'post',
    url: '/api/store-confirm-transaction',
    params
  });
};
export const getNumberReceivable = () => {
  return api({
    method: 'get',
    url: '/api/store-receivable'
  });
};
