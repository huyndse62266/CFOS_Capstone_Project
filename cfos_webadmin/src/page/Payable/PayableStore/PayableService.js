import api from '../../../utils/helpers/api';

export const getListPayableStore = () => {
  return api({
    method: 'get',
    url: '/api/fc-payable'
  });
};
export const payableStore = data => {
  return api({
    method: 'post',
    url: '/api/fc-payable',
    data
  });
};
export const cancelTransaction = params => {
  return api({
    method: 'post',
    url: '/api/fc-cancel-transaction',
    params
  });
};
