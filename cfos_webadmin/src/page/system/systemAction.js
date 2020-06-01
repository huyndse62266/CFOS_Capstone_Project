import cookie from 'js-cookie';
import { message } from 'antd';
import api from '../../utils/helpers/api';
import * as constants from '../../utils/constants/actionType';
import { TOKEN, EXPIRED } from '../../utils/constants/constants';

export const actionLogout = () => {
  cookie.remove(TOKEN);
  cookie.remove(EXPIRED);
  return { type: constants.SIGN_OUT };
};
export const handleError = err => {
  if (err.status && err.status === 401) {
    message.error('server error!');
    window.location.href = 'logout';
  } else {
    console.log('server error: ', err);
  }
};
export const actionGetAccountInfo = () => async dispatch => {
  try {
    dispatch({ type: constants.PENDING });
    const { data } = await api({
      method: 'get',
      url: '/api/account'
    });
    dispatch({
      type: constants.FETCH_ACCOUNT_INFO + constants.SUCCESS,
      payload: data
    });
  } catch (error) {
    handleError(error);
  } finally {
    dispatch({ type: constants.DONE });
  }
};
export const updateRole = roles => ({
  type: constants.UPDATE_ROLE,
  payload: roles
});
