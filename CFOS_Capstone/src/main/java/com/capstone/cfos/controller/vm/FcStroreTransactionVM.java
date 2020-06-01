package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.Date;
@Data
public class FcStroreTransactionVM {

    private Long tranId;

    private String tranDescription;
    private double tranTotal;
    private String status;


    private Date tranDate;

    private Date tranDateEnd;


    private long fcId;


    private long storeId;
}
