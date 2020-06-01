package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;
@Data
public class TransactionVM {

    private Long tranId;

    private String tranDescription;

    private double tranTotal;

    private String status;

    private Date tranDate;

    private String customerId;

    private String  empId;

    private Long orderId;

    private int countNoti;

    private int orderNumber;

    private String orderNumberString;
}
