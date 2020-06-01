import api from '../../../utils/helpers/api';

export const getStoreStatic = param => {
  return api({
    method: 'get',
    url: '/api/statistic-fcs',
    params: { ...param }
  });
};

export const submitBanner = data => {
  return api({
    method: 'post',
    url: '/api/foodcourt-add-banner',
    data
  });
};
export const getCountMember = () => {
  return api({
    method: 'get',
    url: '/api/count-member'
  });
};
export const getCountDeposit = () => {
  return api({
    method: 'get',
    url: '/api/count-member-deposit'
  });
};
export const getRevenueFc = () => {
  return api({
    method: 'get',
    url: '/api/foodcourt-today-balance'
  });
};
export const getBanner = () => {
  return api({
    method: 'get',
    url: '/api/get-banner'
  });
};
export const getCashierMoney = () => {
  return api({
    method: 'get',
    url: '/api/cash-end-day'
  });
};
