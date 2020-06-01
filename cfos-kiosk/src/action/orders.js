import * as Types from '../constants/ActionTypes';
import callApi from '../utils/ApiCaller';

export const actFetchOrderRequest = (id) => {
    return dispatch => {
        return callApi(`orders/search-order?orderNumber=${id}`,'GET',null).then(res =>{
            dispatch(fetchOrder(res.data));
        })
    };
}

export const fetchOrder = (orders) =>{
    return {
        type: Types.FETCH_ORDER,
        orders
    }
}

export const addOrder = (orderNumber) =>{
    return {
        type: Types.ADD_ORDER,
        orderNumber
    }
}
