package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class FcPayableVM {
    private long storeId;
    private String storeName;
    private double payableRemain;
    private List<FcStroreTransactionVM> fcStroreTransactionVMS;

}
