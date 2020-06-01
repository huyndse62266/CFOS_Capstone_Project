package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class StoreVM {

    private Long storeId;

    private String storeName;

    private String storeDescription;

    private String storeImage;

    private String storeIcon;

    private int storeNumber;

    private boolean active;

    private Long fcId;

    private double revenue;
    private int foodPerBlock;


}
