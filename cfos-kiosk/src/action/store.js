import * as Types from '../constants/ActionTypes';
import callApi from '../utils/ApiCaller';

export const actFetchStoreCategoriesRequest = (id) => {
    return dispatch => {
        return callApi(`stores/${id}`,'GET',null).then(res =>{
            dispatch(actFetchStores(res.data));
        })
    };
}


export const actFetchStores = (stores) => {
    return {
        type : Types.FETCH_STORE,
        stores
    }
}
