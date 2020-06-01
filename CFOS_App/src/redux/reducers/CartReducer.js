
const initState = {
  orderDetails: [],
  originalPrice: 0,
  totalOrder: 0,
  count: 0
};

export const CartReducer = (state = initState, action) => {
  if (action.type === "ADD_CART") {
    let tmp = state.orderDetails;
    let flag = false;
    let tmp2 = {};
    tmp.map(o => {
      if (
        (o.food.foodId === action.orderDetail[0].food.foodId &&
          o.orderDetailFoodOption.length < 1 &&
          action.orderDetail[0].orderDetailFoodOption.length < 1) ||
        (o.food.foodId === action.orderDetail[0].food.foodId &&
          o.orderDetailFoodOption !== undefined &&
          action.orderDetail[0].orderDetailFoodOption !== undefined &&
          o.orderDetailFoodOption.length ===
            action.orderDetail[0].orderDetailFoodOption.length &&
          JSON.stringify(o.orderDetailFoodOption) ===
            JSON.stringify(action.orderDetail[0].orderDetailFoodOption))
      ) {
        o.quantity = o.quantity + action.orderDetail[0].quantity;
        o.totalPrice = o.totalPrice + action.orderDetail[0].totalPrice;
        flag = true;
        if (o.quantity < 1) {
          tmp2 = o;
        }
      }
    });
    if (flag == false && action.orderDetail[0].quantity < 1) {
      return state;
    }
    if (flag == false) {
      tmp = action.orderDetail.concat(state.orderDetails);
    }
    flag == false;
    let index = tmp.indexOf(tmp2);
    if (index !== -1) {
      tmp.splice(index, 1);
    }
    return {
      orderDetails: tmp,
      count: state.count + action.orderDetail[0].quantity,
      originalPrice: state.originalPrice + action.originalPrice,
      totalOrder: state.totalOrder + action.totalOrder
    };
  }
  if (action.type === "RESET_CART") {
    return {
      orderDetails: [],
      originalPrice: 0,
      totalOrder: 0,
      count: 0
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let tmp = state.orderDetails;
    let index = action.index;
    if (index !== -1) {
      tmp.splice(index, 1);
    }
    return {
      orderDetails: tmp,
      originalPrice: state.originalPrice - action.originalPrice,
      totalOrder: state.totalOrder - action.totalOrder,
      count: state.count - action.count
    };
  }
  return state;
};
