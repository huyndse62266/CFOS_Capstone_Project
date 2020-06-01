package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class OrderDetailReponseVM {
    private Long orderDetailId;


    private int quantity;

    private int orderDetailNumber;

    private double totalPrice;


    private String oderDetailStatus;


    private Long orderId;


    private List<OrderDetailFoodOptionReponseVM> orderDetailFoodOption;

    private StoreVM storeVM;
    private FoodVM foodVM;
    private int orderNumber;
    private String scheduleTime;
    //private String timeRemain;
    private Date orderDetailDate;
}
