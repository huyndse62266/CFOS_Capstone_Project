package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class FoodOptionVM {

    private Long foId;

    private String foName;

    private String subName;

    private double optionPrice;

    private Long storeId;

    private Long foodOptionParent;

    private String parentName;

    private boolean count;

    private boolean selectMore;

    private boolean isDefault;

}
