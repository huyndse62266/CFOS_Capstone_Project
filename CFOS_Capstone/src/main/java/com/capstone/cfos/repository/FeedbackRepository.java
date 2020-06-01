package com.capstone.cfos.repository;


import com.capstone.cfos.model.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface FeedbackRepository extends JpaRepository<FeedBack, Long> {
    FeedBack findByFbId(Long fbid);
    Page<FeedBack> findAllByFoodStoreCategoryStoreStoreId(Pageable pageable, Long storeId);
    List<FeedBack> findAllByCustomerCustomerIdOrderByFbDateDesc(String customerId);
    long countByFoodFoodId(long foodId);
    FeedBack findByCustomerCustomerIdAndFoodFoodIdAndFbDateBetween
            (String customerId, long feedbackId, Date start,Date end);
}


