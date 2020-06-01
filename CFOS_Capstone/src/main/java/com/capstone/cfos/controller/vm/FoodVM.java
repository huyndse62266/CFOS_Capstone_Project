package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class FoodVM {

    private Long foodId;

    private String foodName;

    private List<ImageVM> imageVMS;

    private String foodDescription;

    private String foodUnit;

    private int count;

    private double price;

    private int quantity;

    private boolean active;

    private double rate;

    private double promotion;

    private Long storeCategoryId;

    private Long fcSubCategoryId;

    private List<FoodOptionVM> foodOptionVMS;
}
