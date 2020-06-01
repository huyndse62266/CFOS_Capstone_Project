import api from '../../../utils/helpers/api';

export const getListCategoryStore = () => {
  return api({
    method: 'get',
    url: '/api/stores/all-category'
  });
};
export const createCategoryStore = data => {
  return api({
    method: 'post',
    url: '/api/stores/create-category',
    data
  });
};
export const updateCategoryStore = data => {
  return api({
    method: 'put',
    url: '/api/stores/update-category',
    data
  });
};
