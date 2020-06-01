import { request } from 'axios';
import cookie from 'js-cookie';
import { TOKEN, BASE_URL } from '../constants/constants';

const api = (options = {}) => {
  return request({
    baseURL: BASE_URL,
    ...options,
    headers: {
      Authorization: cookie.get(TOKEN) && `Bearer ${cookie.get(TOKEN)}`,
      ...options.headers
    }
  });
};

export default api;
