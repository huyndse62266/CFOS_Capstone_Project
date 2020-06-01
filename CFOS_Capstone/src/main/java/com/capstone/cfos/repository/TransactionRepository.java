package com.capstone.cfos.repository;

import com.capstone.cfos.controller.vm.TransactionVM;
import com.capstone.cfos.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByCustomerCustomerId(String customerId);
    List<Transaction> findAllByCustomerCustomerIdAndTranDescriptionNotOrderByTranDateDesc(String customerId, String tranDesc);

    Transaction findByTranId(Long tranId);
    Page<Transaction> findAllByStatus(Pageable pageable,String status);
    Page<Transaction> findAllByTranId(Pageable pageable,long tranId);
    List<Transaction>
            findAllByStatusAndOrderOrderDetailsStoreStoreIdAndTranDateBetween
            (String status, Long storeId, Date timeStart, Date timeEnd);

    List<Transaction>
    findAllByStatusAndOrderOrderDetails
            (String status, Long storeId);

    int countByTranDescriptionAndCustomerCustomerId(String description,String customerId);

    Transaction findByCustomerCustomerIdAndTranId(String customerId,long tranId);

    List<Transaction> findAllByStatusAndEmployeeFoodCourtFcIdAndTranDateBetween
            (String status,long fcId,Date timeStart, Date timeEnd);

    List<Transaction> findAllByEmployeeEmpIdAndStatusAndTranDateBetween
            (String empId,String status,Date timeStart, Date timeEnd);

    List<Transaction> findAllByStoreStoreIdAndFoodCourtFcIdOrderByTranDateDesc
            (long storeId,long fcId);

}
