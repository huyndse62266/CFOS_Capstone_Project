package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.FcPayableVM;
import com.capstone.cfos.controller.vm.FcStroreTransactionVM;
import com.capstone.cfos.controller.vm.TransactionVM;
import com.capstone.cfos.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TransactionService {

    List<TransactionVM> getAllTransaction(String customerId);

    void recordTransaction(TransactionVM transactionVM);

    TransactionVM getTransactionById(Long tranId);

    Page<TransactionVM> getAllTransactionByStatus(Pageable pageable, String status, String authorize,long tranId);

    TransactionVM deposit(TransactionVM vm, String authorityUsername,String password);

    void recordTransaction(String customerId,double totalOrder,long orderIdNew,String empId);
    String changeUnreadTransaction(String customerId);
    String deleteNoti(String authorityUsername,long transactionId);

    double getStoreReceivable(String username);
    List<FcPayableVM> getFcPayable(String authorityUsername);

    String fcPostTransaction(String authorityUsername,FcStroreTransactionVM fcStroreTransactionVM);

    List<FcStroreTransactionVM> getStoreReceivableHistory(String authorityUsername);

    String fcCancelTransaction(String authorityUsername,long tranId);

    String storeConfirmTrans(String authorityUsername, long tranId);







}
