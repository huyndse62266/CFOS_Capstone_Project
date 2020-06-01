package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class SearchFoodVM {

    private List<AppStoreVM> appStoreVMS;

    private List<FoodVMDetailResponse> foodVMDetailResponses;
}