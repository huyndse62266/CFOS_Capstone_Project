package com.capstone.cfos.repository;

import com.capstone.cfos.model.Customer;
import com.capstone.cfos.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;

@Repository
@Transactional
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findByCustomerId( String customerId);
    Customer findByWalletCustomerCustomerId(String customerId);
    Customer findByUserUsername(String username);
//    Customer findByCardId(String cardId);
    int countAllByActiveTrue();
//    @Query("SELECT c.customerId,c.active,c.point from Customer c")
//    Customer findByCustomerIdA(@Param("customerID") String customerId);
}
