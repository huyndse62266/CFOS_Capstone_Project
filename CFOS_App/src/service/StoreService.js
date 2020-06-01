import Service from "./Service";

export class StoreService {
  getAllStore(fcId) {
    return Service.getRestClient().get("app/stores?fcId=" + fcId);
  }
  getStoreDetail(storeId) {
    return Service.getRestClient().get("app/store?storeId=" + storeId);
  }
}
