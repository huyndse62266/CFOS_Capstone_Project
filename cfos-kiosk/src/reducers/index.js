import { combineReducers } from 'redux';
import foods from './foods'
import categories from './categories'
import cart from './cart'
import stores from './stores'
import orders from './orders'

const appReducers = combineReducers({
    foods,
    categories,
    stores,
    cart,
    orders,
});

export default appReducers;