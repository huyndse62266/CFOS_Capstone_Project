import * as Types from './../constants/ActionTypes';

var initialState = {};


const orders = (state = initialState, action) => {

    switch (action.type) {
        case Types.FETCH_ORDER:
            state = action.orders;
            return {...state};
        case Types.ADD_ORDER:
            return action
        default: return {...state};
    }
};

export default orders;