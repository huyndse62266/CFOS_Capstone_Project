package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.FeedbackVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedbackService {
    FeedbackVM postFeedback(FeedbackVM feedbackVM,String usernameCus);
    Page<FeedbackVM> getAllFeedbackByStoreId(Pageable pageable, Long strodeId);
    List<FeedbackVM> getAllFeedbackCustomer(String usernameCus);
}
