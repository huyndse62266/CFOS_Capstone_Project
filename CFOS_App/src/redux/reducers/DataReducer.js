const initState = {
  categories: [],
  stores: [],
  foodsNear: [],
  promotionFoods: [],
  popularFoods: [],
  countNoti: 0,
  show: -4,
  orders: [],
  today: []
};

export const DataReducer = (state = initState, action) => {
  if (action.type === "LOAD_CATEGORIES") {
    return {
      ...state,
      categories: action.categories
    };
  }
  if (action.type === "LOAD_STORES") {
    return {
      ...state,
      stores: action.stores
    };
  }
  if (action.type === "LOAD_PROMOTION_FOODS") {
    return {
      ...state,
      promotionFoods: action.promotionFoods
    };
  }
  if (action.type === "LOAD_POPULAR_FOODS") {
    return {
      ...state,
      popularFoods: action.popularFoods
    };
  }
  if (action.type === "LOAD_FOODS_NEAR") {
    return {
      ...state,
      foodsNear: action.foodsNear
    };
  }
  if (action.type === "COUNT_NOTI") {
    return {
      ...state,
      countNoti: action.countNoti
    };
  }
  if (action.type === "SHOW") {
    return {
      ...state,
      show: state.show + action.show
    };
  }
  if (action.type === "LOAD_ORDERS") {
    return {
      ...state,
      orders: action.orders
    };
  }
  if (action.type === "LOAD_TODAY") {
    return {
      ...state,
      today: action.today
    };
  }
  return state;
};
