package com.capstone.cfos.controller.vm;


import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDetailVM {


    private Long orderDetailId;

    private int orderDetailNumber;

    private int quantity;

    private double totalPrice;

    private String oderDetailStatus;

    private Long orderId;

    private Long foodId;

    private List<OrderDetailFoodOptionVM> orderDetailFoodOption;

    private Long storeId;

    private Date orderDetailDate;


}
