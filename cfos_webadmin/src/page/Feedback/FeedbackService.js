import api from '../../utils/helpers/api';

export const getListFeedBack = param => {
  return api({
    method: 'get',
    url: '/api/stores/feedbacks',
    params: { ...param }
  });
};
