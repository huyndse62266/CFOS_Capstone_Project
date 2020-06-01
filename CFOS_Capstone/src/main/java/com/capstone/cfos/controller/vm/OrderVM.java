package com.capstone.cfos.controller.vm;

import com.capstone.cfos.model.OrderDetail;
import com.capstone.cfos.model.Store;
import com.capstone.cfos.model.Transaction;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderVM {

    private Long orderId;

    private int orderNumber;

    private double totalOrder;

    private Date orderDate;

    private String status;

    private String customerId;

    private double originalPrice;

    private List<OrderDetailVM> orderDetails;

    private String scheduleTime;
    //
    private List<Integer> days;

}
