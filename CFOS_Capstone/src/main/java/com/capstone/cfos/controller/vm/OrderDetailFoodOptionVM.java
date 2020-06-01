package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class OrderDetailFoodOptionVM {

    private Long id;


    private Long orderDetailId;

    private int quantity;
    private Long foId;
}
