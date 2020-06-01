import Service from "./Service";

export class SchedulerService {
  getBlock() {
    return Service.getRestClient().get("orders/block-remain");
  }
  changeActive(orderId) {
    return Service.getRestClient().put(
      "orders/change-active-scheduler?orderId=" + orderId
    );
  }
  deleteScheduler(orderId) {
    return Service.getRestClient().delete(
      "orders/delete-scheduler?orderId=" + orderId
    );
  }

  updateScheduler(order) {
    return Service.getRestClient().put("orders/update-scheduler", order);
  }
}
