import Service from "./Service";
import { AsyncStorage } from "react-native";

export class FoodService {
  getFoodsByCateId(cateId) {
    return Service.getRestClient().get("category/foods?cateId=" + cateId);
  }
  getFoodById(foodId) {
    return Service.getRestClient().get("food-detail?foodId=" + foodId);
  }
  getPromotionFoods(fcId) {
    return Service.getRestClient().get("promotion/foods?fcId=" + fcId);
  }
  getPopularFoods(fcId) {
    return Service.getRestClient().get("popular/foods?fcId=" + fcId);
  }
  getFoodNear() {
    return Service.getRestClient().get("customer/food-near");
  }
  searchFoods(fcId, name) {
    return Service.getRestClient().get(
      "search/foods?name=" + name + "&fcId=" + fcId
    );
  }
}
