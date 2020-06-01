package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.FoodOptionVM;
import com.capstone.cfos.controller.vm.StoreFoodOptionVM;

import java.util.List;

public interface FoodOptionService {
    FoodOptionVM addNewFoodOption(FoodOptionVM foodOptionVM,String authorityUsername);
    String updateFoodOption(FoodOptionVM vm);
    List<FoodOptionVM> findAll();
    List<StoreFoodOptionVM> getAllFoodOptionByStore(String authorityUsername);
    List<StoreFoodOptionVM> getAllFoodOptionByFood(long foodId);
    List<FoodOptionVM> findAllFoodOptionByFoodId(long foodId);
}
