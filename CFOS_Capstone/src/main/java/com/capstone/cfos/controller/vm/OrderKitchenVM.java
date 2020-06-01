package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;
@Data
public class OrderKitchenVM {
    private int orderNumber;
    private List<OrderDetailReponseVM> listOrderDetail;
    private String scheduleTime;
    private String storeName;
    private String storeIcon;
    private int storeNumber;
}
