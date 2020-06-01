import * as constants from '../../utils/constants/actionType';

const initialState = {
  isLoading: false,
  account: {},
  role: ''
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case constants.PENDING:
      return {
        ...state,
        isLoading: true
      };
    case constants.FETCH_ACCOUNT_INFO + constants.SUCCESS:
      return {
        ...state,
        account: action.payload
      };
    case constants.UPDATE_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case constants.SIGN_OUT:
      return {
        ...initialState,
        isLoading: false
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

export default system;
