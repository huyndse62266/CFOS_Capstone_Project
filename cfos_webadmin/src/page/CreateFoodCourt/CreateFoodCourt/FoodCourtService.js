import api from '../../../utils/helpers/api'; //config api with axios

export const getListRoles = () => {
  return api({
    method: 'get',
    url: '/api/all-role'
  });
};
export const getListUser = param => {
  return api({
    method: 'get',
    url: '/api/user',
    params: { ...param, size: 5 }
  });
};
export const getListFoodCourt = () => {
  return api({
    method: 'get',
    url: '/api/foodcourt/all'
  });
};
export const createFoodCourt = data => {
  return api({
    method: 'post',
    url: '/api/auth/sign-up',
    data
  });
};
export const updateStatusUser = data => {
  return api({
    method: 'put',
    url: '/api/user/update',
    data
  });
};
export const searchUser = params => {
  return api({
    method: 'get',
    url: '/api/search-emp',
    params
  });
};
