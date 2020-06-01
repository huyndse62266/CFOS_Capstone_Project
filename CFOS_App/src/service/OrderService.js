import Service from "./Service";

export class OrderService {
  getOrderHistores() {
    return Service.getRestClient().get("customer/all-order");
  }
  searchOrder(orderNumber) {
    return Service.getRestClient().get(
      "orders/search-order?orderNumber=" + orderNumber
    );
  }

  submitOrder(order) {
    return Service.getRestClient().post("orders/orders/submit-order", order);
  }

  cancelOrder(orderNumber) {
    return Service.getRestClient().get(
      "orders/customer/order-cancel?orderNumber=" + orderNumber
    );
  }
}
