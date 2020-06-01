import * as Types from '../constants/ActionTypes';

export const actIncOption = (option, foodId) => {
    return {
        type : Types.INC_OPTION,
        option,
        foodId
    }
}

export const actDecOption = (option,foodId) => {
    return {
        type : Types.DEC_OPTION,
        option,
        foodId
    }
}