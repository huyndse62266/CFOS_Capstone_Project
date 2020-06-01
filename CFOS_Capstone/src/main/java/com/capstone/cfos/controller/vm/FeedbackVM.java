package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.Date;
@Data
public class FeedbackVM {


    private Long fbId;

    private String fbContent;

    private Date fbDate;

    private double rate;

    private String customerId;

    private StoreVM storeVM;

    private FoodVM foodVM;

    private long foodId;

}
