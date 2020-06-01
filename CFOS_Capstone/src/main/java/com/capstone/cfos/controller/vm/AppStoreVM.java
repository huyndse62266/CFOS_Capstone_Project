package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class AppStoreVM {

    private StoreVM storeVM;

    private int foodCount;

    private int drinkCount;

    private List<AppCategoryVM> appCategoryVMS;
}
