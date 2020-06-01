package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class AppCategoryVM {

    private CategoryVM categoryVM;

    private List<FoodVMDetailResponse> foodVMDetailResponses;
}