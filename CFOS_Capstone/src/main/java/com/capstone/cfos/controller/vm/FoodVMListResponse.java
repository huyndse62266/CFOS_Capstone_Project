package com.capstone.cfos.controller.vm;


import lombok.Data;

import java.util.List;
@Data
public class FoodVMListResponse {
    private Long foodId;

    private String foodName;

    private String foodImage;

    private double price;

    private double rate;

    private double promotion;

    private Long storeCategoryId;

    private Long fcSubCategoryId;

    private Long storeId;

    private String storeName;

    private String storeIcon;
}
