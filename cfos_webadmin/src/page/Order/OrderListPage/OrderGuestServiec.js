import api from '../../../utils/helpers/api';

export const getOrderGuest = param => {
  return api({
    method: 'get',
    url: '/api/orders/orders/guests',
    params: { ...param }
  });
};

export const submitOrderForGuest = params => {
  return api({
    method: 'post',
    url: '/api/orders/pay-order',
    params
  });
};

// export const searchOrder = params => {
//   return api({
//     method: 'get',
//     url: '/api/orders/search-order',
//     params
//   });
// };
