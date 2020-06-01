package com.capstone.cfos.repository;

import com.capstone.cfos.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface WalletRepository extends JpaRepository<Wallet,Long> {
   // Wallet findByCustomerCustomerId(String customerId);
    @Query("select w from Wallet w where w.customer.customerId = :customerID")
    Wallet findByCustomerCustomerId(@Param("customerID")String customerId);



}
