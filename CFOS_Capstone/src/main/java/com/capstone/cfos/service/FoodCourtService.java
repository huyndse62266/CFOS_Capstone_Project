package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.BannerVM;
import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.controller.vm.FoodCourtVM;
import com.capstone.cfos.model.FoodCourt;

import java.util.List;

public interface FoodCourtService {

    FoodCourtVM getFoodCourt(Long fcId);

    List<FoodCourtVM> getAllFoodCourt();

    FoodCourtVM createFoodCourt(FoodCourtVM vm);

    FoodCourtVM updateFoodCourt(FoodCourtVM vm);

    int countMember(String authoryUsername);

    double countMemberDepositInDay(String authoryUsername);

    double countBalanceToday(String authoryUsername);

    String createBanner(String authoryUsername, BannerVM bannerVM);

    BannerVM getBanner(long fcId,String username);

    List<EmpVM> getCashEndDay(String username);

    FoodCourt authorityFoodCourt(String authoryUsername);






}
