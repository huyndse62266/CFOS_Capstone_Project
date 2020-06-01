import api from './../../../utils/helpers/api';

export const getCategoryFc = () => {
  return api({
    method: 'get',
    url: '/api/foodcourt/all-category'
  });
};
export const updateCategoryFc = data => {
  return api({
    method: 'put',
    url: '/api/foodcourt/update-category',
    data
  });
};
export const createCategoryFc = data => {
  return api({
    method: 'post',
    url: '/api/foodcourt/create-category',
    data
  });
};
