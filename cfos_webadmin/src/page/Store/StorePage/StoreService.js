import api from '../../../utils/helpers/api';

export const getListStore = () => {
  return api({
    method: 'get',
    url: '/api/all-store'
  });
};
export const createStore = data => {
  return api({
    method: 'post',
    url: '/api/store/create',
    data
  });
};
export const updateStore = data => {
  return api({
    method: 'put',
    url: '/api/store/update',
    data
  });
};
