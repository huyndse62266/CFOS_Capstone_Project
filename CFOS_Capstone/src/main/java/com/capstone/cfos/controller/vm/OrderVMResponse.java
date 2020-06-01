package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderVMResponse {
    private Long orderId;

    private int orderNumber;

    private double totalOrder;

    private Date orderDate;

    private String status;

    private String customerId;

    private double originalPrice;

    private String scheduleTime;

    private List<OrderDetailReponseVM> orderDetailReponseVMList;

    private List<Integer> days;

    private boolean schedulerStatus;

    private String orderNumberString;
}
