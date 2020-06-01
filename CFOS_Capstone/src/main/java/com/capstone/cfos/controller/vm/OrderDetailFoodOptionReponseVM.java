package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class OrderDetailFoodOptionReponseVM {

    private Long id;

    private String foName;

    private String foDescription;

    //private Long orderDetailId;

    private int quantity;

    private String parentName;

    private Long foId;
}
