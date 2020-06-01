import api from '../../utils/helpers/api';
import * as constants from '../../utils/constants/actionType';

export const actionGetListFoodByCate = categoryId => async dispatch => {
  try {
    dispatch({ type: constants.PENDING });
    const { data } = await api({
      method: 'get',
      url: '/api/category/food',
      params: { categoryId, size: 1000 }
    });
    dispatch({
      type: constants.FETCH_FOOD_PRODUCT + constants.SUCCESS,
      payload: data.content
    });
  } catch (error) {
    // error
  } finally {
    dispatch({ type: constants.DONE });
  }
};
