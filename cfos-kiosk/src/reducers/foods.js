import * as Types from '../constants/ActionTypes';

var initialState = [];


const foods = (state = initialState, {type, action}) => {
    switch (type) {
        case Types.FETCH_FOOD:
            return  action;
        default: return [...state];
    }
};

export default foods;