import api from '../../../utils/helpers/api';
export const getProfile = () => {
    return api({
        method: 'get',
        url: '/api/profile',
    });
}
export const updateProfile = data => {
    return api({
        method: 'put',
        url: '/api/user/update',
        data
    });
}