import api from '../../../utils/helpers/api';

export const getAllFoodOption = data => {
  return api({
    method: 'get',
    url: '/api/food-options',
    data
  });
};
export const createFoodOption = data => {
  return api({
    method: 'post',
    url: '/api/food-option/create',
    data
  });
};
export const updateFoodOption = data => {
  return api({
    method: 'put',
    url: '/api/food-option/update',
    data
  });
};
