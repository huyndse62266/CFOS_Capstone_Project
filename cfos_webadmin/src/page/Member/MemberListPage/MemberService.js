import api from '../../../utils/helpers/api';
export const createMember = data => {
  return api({
    method: 'post',
    url: '/api/auth/sign-up',
    data
  });
};
export const deposit = (data, params) => {
  return api({
    method: 'post',
    url: '/api/deposit',
    data,
    params
  });
};
export const getListMember = param => {
  return api({
    method: 'get',
    url: '/api/all-customers',
    params: { ...param, size: 5 }
  });
};
export const updateStatusUser = data => {
  return api({
    method: 'put',
    url: '/api/user/update-cus',
    data
  });
};
export const searchUser = params => {
  return api({
    method: 'get',
    url: '/api/search-customer',
    params
  });
};
