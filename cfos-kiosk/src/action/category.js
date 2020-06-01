import * as Types from '../constants/ActionTypes';
import callApi from '../utils/ApiCaller';

export const actFetchCategoriesRequest = () => {
    return dispatch => {
        return callApi(`categories/`,'GET',null).then(res =>{
            dispatch(actFetchCategories(res.data));
        })
    };
}

export const actFetchParentCategoriesRequest = (id) => {
    return dispatch => {
        return callApi(`categories/parent?name=${id}`,'GET',null).then(res =>{
            dispatch(actFetchCategories(res.data));
        })
    };
}


export const actFetchCategories = (categories) => {
    return {
        type : Types.FETCH_CATEGORY,
        categories
    }
}