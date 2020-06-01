export function addCart(orderDetail, originalPrice, totalOrder) {
  return {
    type: "ADD_CART",
    orderDetail,
    originalPrice,
    totalOrder
  };
}
export function resetCart() {
  return {
    type: "RESET_CART"
  };
}
export function removeItem(index, count, originalPrice, totalOrder) {
  return {
    type: "REMOVE_ITEM",
    index,
    count,
    originalPrice,
    totalOrder
  };
}
