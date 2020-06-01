import Service from "./Service";

export class CategoryService {
  getAllSubCategories() {
    return Service.getRestClient().get("app/categories");
  }
  getCategoriesByFcId(fcId) {
    return Service.getRestClient().get("fc/categories?fcId=" + fcId);
  }
}
