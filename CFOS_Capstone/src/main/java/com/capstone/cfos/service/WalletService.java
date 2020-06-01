package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.WalletVM;

public interface WalletService {
    WalletVM getWalletByCustomerId(String customerId);
    void changeCreditCustomer(String customerId,double amount, boolean isDecrease);
}
