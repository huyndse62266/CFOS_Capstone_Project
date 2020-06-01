package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class StoreFoodOptionVM {
    private Long foodOptionParentId;

    private String FoodOptionNameParent;

    private Long storeId;

    private String subName;

    private boolean isCount;

    private boolean isSelectMore;

    List<FoodOptionVM> foodOptionVMS;
}
