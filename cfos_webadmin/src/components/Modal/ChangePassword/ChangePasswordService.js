import api from '../../../utils/helpers/api';
export const changePassword = data => {
    return api({
        method: 'put',
        url: '/api/edit-password',
        data
    });
}