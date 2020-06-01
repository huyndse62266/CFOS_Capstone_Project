import Service from "./Service";

export class TransactionService {
  updateStatusTrans(tranId) {
    return Service.getRestClient().put(
      "detele-noti?tranId=" + tranId
    );
  }
}