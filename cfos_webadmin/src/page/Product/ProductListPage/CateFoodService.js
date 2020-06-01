import api from '../../../utils/helpers/api';

export const getAllFoodOption = data => {
  return api({
    method: 'get',
    url: '/api/food-options',
    data
  });
};
export const getListCategoryStore = () => {
  return api({
    method: 'get',
    url: '/api/stores/all-category'
  });
};
export const getCategoryFc = () => {
  return api({
    method: 'get',
    url: '/api/foodcourt/all-category'
  });
};
export const getListFoodByCate = categoryId => {
  return api({
    method: 'get',
    url: '/api/category/food',
    params: { categoryId }
  });
};

export const createFood = data => {
  return api({
    method: 'post',
    url: '/api/create-food',
    data
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
export const updateFood = data => {
  return api({
    method: 'put',
    url: '/api/update-food',
    data
  });
};
