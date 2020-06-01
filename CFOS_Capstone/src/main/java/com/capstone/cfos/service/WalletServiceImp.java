package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.WalletVM;
import com.capstone.cfos.mapper.WalletMapper;
import com.capstone.cfos.model.Wallet;
import com.capstone.cfos.repository.CustomerRepository;
import com.capstone.cfos.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class WalletServiceImp implements WalletService {
    @Autowired
    WalletRepository repository;

    @Autowired
    WalletMapper walletMapper;

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public WalletVM getWalletByCustomerId(String usernameCus){
        String customerId = customerRepository.findByUserUsername(usernameCus).getCustomerId();

        Wallet wallet = repository.findByCustomerCustomerId(customerId);
        if(wallet == null){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Account does not exit!");
        }
        return  walletMapper.toWalletVM(wallet);
    }

    @Override
    public void changeCreditCustomer(String customerId,double amount, boolean isDecrease){
        Wallet wallet = repository.findByCustomerCustomerId(customerId);
        double balance = wallet.getAmount();
        if(isDecrease){//When customer submit an Order
            balance = balance - amount;
        }else {//When Customer deposit  or store rollback money.
            balance = balance + amount;
        }
        wallet.setAmount(balance);
        repository.save(wallet);
    }
}
