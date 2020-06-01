import api from './../../../utils/helpers/api';

export const getListRoles = () => {
    return api({
        method: 'get',
        url: '/api/all-role'
    });
}
export const getListStore = () => {
    return api({
        method: 'get',
        url: '/api/all-store'
    });
}
export const createStaff = data => {
    return api({
        method: 'post',
        url: '/api/auth/sign-up',
        data
    });
}
