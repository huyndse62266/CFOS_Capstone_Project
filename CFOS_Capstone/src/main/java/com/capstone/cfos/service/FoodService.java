package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.FoodVM;
import com.capstone.cfos.controller.vm.FoodVMDetailResponse;
import com.capstone.cfos.controller.vm.FoodVMListResponse;
import com.capstone.cfos.controller.vm.SearchFoodVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FoodService {

    FoodVM getFoodById(Long id);

    FoodVM createFood(FoodVM vm, String username);

    FoodVM updateFood(FoodVM vm, String username);

    FoodVMDetailResponse findFoodDetailByID(Long id);

    String deleteFood(Long id);

    Page<FoodVM> getFoodByCategory(Pageable pageable, Long categoryId);

    Page<FoodVM> searchFood(Pageable pageable, String name, Long categoryId);

    List<FoodVMListResponse> findTop2PerStore(Long cateID);

    List<FoodVMListResponse> findAllWithPromotionByCategory(Long id);

    List<FoodVMListResponse> findAllWithStore(Long id);

    List<FoodVMDetailResponse> getFoodNear(String usernameCus);

    List<FoodVMDetailResponse> searchFoods(String foodName);

    List<FoodVMListResponse> findTop2ByCategory(long categoryId);

    List<FoodVMDetailResponse> getFoodsByCategoryId(Long cateId);

    FoodVMDetailResponse getFoodDetailById(Long id);

    List<FoodVMDetailResponse> getPromotionFoods(Long fcId);

    List<FoodVMDetailResponse> getPopularFoods(Long fcId);

    SearchFoodVM searchFoods(String name, Long fcId);
    List<FoodVMListResponse> getListFoodPopular(long fcCate);

    List<FoodVMDetailResponse> findAllSortByRate();
}
