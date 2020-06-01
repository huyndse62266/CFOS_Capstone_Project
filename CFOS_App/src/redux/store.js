import { CartReducer } from "./reducers/CartReducer";
import { DataReducer } from "./reducers/DataReducer";
import { AccountReducer } from "./reducers/AccountReducer";
// import { createStore, combineReducers } from "redux";
var redux = require("redux");

const reducer = redux.combineReducers({
  cart: CartReducer,
  data: DataReducer,
  account: AccountReducer
});

var store = redux.createStore(reducer);
// store.subscribe(() => console.log("+++", store.getState().cart.orderDetails));
export default store;
