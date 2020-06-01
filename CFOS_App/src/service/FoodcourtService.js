import Service from "./Service";

export class FoodcourtService {
  getBanner(fcId) {
    return Service.getRestClient().get("get-banner?fcId=" + fcId);
  }
}
