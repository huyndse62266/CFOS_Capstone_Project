import * as constants from '../../utils/constants/actionType';

const initialState = {
  isLoading: false,
  foodList: []
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case constants.PENDING:
      return {
        ...state,
        isLoading: true
      };
    case constants.FETCH_FOOD_PRODUCT + constants.SUCCESS:
      return {
        ...state,
        foodList: action.payload
      };
    case constants.ERROR:
      return {
        ...initialState
      };
    case constants.DONE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default product;
