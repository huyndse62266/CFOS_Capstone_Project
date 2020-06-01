export function loadCategories(categories) {
  return {
    type: "LOAD_CATEGORIES",
    categories
  };
}
export function loadStores(stores) {
  return {
    type: "LOAD_STORES",
    stores
  };
}
export function loadPromotionFoods(promotionFoods) {
  return {
    type: "LOAD_PROMOTION_FOODS",
    promotionFoods
  };
}
export function loadPopularFoods(popularFoods) {
  return {
    type: "LOAD_POPULAR_FOODS",
    popularFoods
  };
}
export function loadFoodsNear(foodsNear) {
  return {
    type: "LOAD_FOODS_NEAR",
    foodsNear
  };
}
export function countNoti(countNoti) {
  return {
    type: "COUNT_NOTI",
    countNoti
  };
}
export function showHome(show) {
  return {
    type: "SHOW",
    show
  };
}
export function loadOrder(orders) {
  return {
    type: "LOAD_ORDERS",
    orders
  };
}
export function loadToday(today) {
  return {
    type: "LOAD_TODAY",
    today
  };
}
