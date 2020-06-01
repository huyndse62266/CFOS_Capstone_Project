import api from './../../../utils/helpers/api';
export const getAllFoodCourt = () => {
    return api({
        method: 'get',
        url: '/api/foodcourt/all'
    });
};
export const createFoodCourt = data => {
    return api({
        method: 'post',
        url: '/api/foodcourt/create',
        data
    });
};
export const updateFoodCourt = data => {
    return api({
        method: 'put',
        url: '/api/foodcourt/update',
        data
    });
};