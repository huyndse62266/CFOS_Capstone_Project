import * as Types from '../constants/ActionTypes';

var initialState = [];


const messages = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_MESSAGE:
            state = action.categories;
            return [...state];
        default: return [...state];
    }
};

export default messages;